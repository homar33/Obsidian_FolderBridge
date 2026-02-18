import * as fs from 'fs';
import * as path from 'path';
import { OSPlatform } from './types';

// ---------------------------------------------------------------------------
// Platform detection
// ---------------------------------------------------------------------------

export function getPlatform(): OSPlatform {
	switch (process.platform) {
		case 'win32':  return 'windows';
		case 'linux':  return 'linux';
		case 'darwin': return 'mac';
		default:       return 'unknown';
	}
}

// ---------------------------------------------------------------------------
// Accessibility checks
// ---------------------------------------------------------------------------

export interface PathAccessResult {
	accessible: boolean;
	readOnly: boolean;
	error?: string;
}

/**
 * Check whether a real filesystem path is accessible, and if so whether it
 * is writable.  Safe to call on non-existent paths (returns accessible:false).
 */
export async function checkPathAccessible(realPath: string): Promise<PathAccessResult> {
	try {
		await fs.promises.access(realPath, fs.constants.F_OK);
	} catch (e) {
		return { accessible: false, readOnly: false, error: (e as Error).message };
	}

	let readOnly = false;
	try {
		await fs.promises.access(realPath, fs.constants.W_OK);
	} catch {
		readOnly = true;
	}

	return { accessible: true, readOnly };
}

/** Returns true when realPath exists and is a directory (resolving symlinks). */
export async function isDirectory(realPath: string): Promise<boolean> {
	try {
		return (await fs.promises.stat(realPath)).isDirectory();
	} catch {
		return false;
	}
}

/** Returns true when realPath is a symbolic link (does NOT follow it). */
export async function isSymlink(realPath: string): Promise<boolean> {
	try {
		return (await fs.promises.lstat(realPath)).isSymbolicLink();
	} catch {
		return false;
	}
}

// ---------------------------------------------------------------------------
// Windows-specific helpers
// ---------------------------------------------------------------------------

/**
 * On Windows, detect whether a directory entry is a junction or symlink by
 * checking the lstat result.  Both are reported as symbolic links by Node.js
 * on Windows with a non-zero nlink count for junctions.
 *
 * Always returns false on non-Windows platforms.
 */
export async function isWindowsJunctionOrSymlink(realPath: string): Promise<boolean> {
	if (getPlatform() !== 'windows') return false;
	try {
		return (await fs.promises.lstat(realPath)).isSymbolicLink();
	} catch {
		return false;
	}
}

// ---------------------------------------------------------------------------
// Cross-device detection
// ---------------------------------------------------------------------------

/**
 * Returns true when pathA and pathB reside on different filesystem devices.
 * This is used to warn the user before attempting a cross-device move, which
 * requires a copy-then-delete rather than a simple rename.
 */
export async function areDifferentDevices(pathA: string, pathB: string): Promise<boolean> {
	try {
		const [statA, statB] = await Promise.all([
			fs.promises.stat(pathA).catch(() => null),
			fs.promises.stat(pathB).catch(() => null),
		]);
		if (!statA || !statB) return false;
		return (statA as fs.Stats & { dev: number }).dev !== (statB as fs.Stats & { dev: number }).dev;
	} catch {
		return false;
	}
}

// ---------------------------------------------------------------------------
// Path utilities
// ---------------------------------------------------------------------------

/** Normalize a real OS path (handles mixed separators on Windows). */
export function normalizeRealPath(realPath: string): string {
	return path.normalize(realPath);
}

/**
 * Return a resource URL that Obsidian/Electron can use to display a file
 * from an arbitrary real path (e.g. for images embedded from mounted folders).
 *
 * The "app://local/" protocol is served by the Electron main process and
 * bypasses the vault root restriction.
 */
export function realPathToResourceUrl(realPath: string): string {
	// Electron expects forward slashes even on Windows
	const forward = realPath.split(path.sep).join('/');
	// Ensure there is exactly one leading slash after the protocol
	const withSlash = forward.startsWith('/') ? forward : '/' + forward;
	return `app://local${withSlash}`;
}
