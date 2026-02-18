import * as path from 'path';
import { MountPoint } from './types';

/**
 * SecurityManager enforces an explicit allowlist of real filesystem paths.
 * Every I/O operation on a mounted path is checked against this list before
 * proceeding.  Paths are normalized with path.normalize() before comparison
 * so that trailing slashes and double separators are handled uniformly.
 */
export class SecurityManager {
	private allowlist: Set<string>;

	constructor(allowedPaths: string[]) {
		this.allowlist = new Set(allowedPaths.map(p => path.normalize(p)));
	}

	/** Replace the entire allowlist (call after settings change). */
	setAllowlist(paths: string[]): void {
		this.allowlist = new Set(paths.map(p => path.normalize(p)));
	}

	/**
	 * Returns true when realPath is equal to an allowlisted path, or is
	 * contained inside one.  The check is path-separator-aware to prevent
	 * prefix-substring false positives (e.g. "/foo" must not match "/foobar").
	 */
	isAllowed(realPath: string): boolean {
		const normalized = path.normalize(realPath);
		for (const allowed of this.allowlist) {
			if (
				normalized === allowed ||
				normalized.startsWith(allowed + path.sep)
			) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Validates a candidate mount before it is added to settings.
	 * Returns an error string on failure, or null on success.
	 */
	validateMount(
		mount: Omit<MountPoint, 'id'>,
		existingMounts: MountPoint[]
	): string | null {
		if (!mount.virtualPath || !mount.virtualPath.trim()) {
			return 'Virtual path cannot be empty.';
		}
		if (!mount.realPath || !mount.realPath.trim()) {
			return 'Real path cannot be empty.';
		}
		if (!path.isAbsolute(mount.realPath)) {
			return 'Real path must be an absolute filesystem path.';
		}

		// Block obviously dangerous root-level paths
		const dangerous = ['/', 'C:\\', 'C:/', '/etc', '/usr', '/bin', '/sbin', '/boot', '/dev', '/proc', '/sys'];
		const norm = path.normalize(mount.realPath);
		for (const d of dangerous) {
			if (norm === path.normalize(d)) {
				return `"${mount.realPath}" is a protected system path and cannot be mounted.`;
			}
		}

		// Reject duplicate virtual paths
		const virtualNorm = mount.virtualPath.trim();
		if (existingMounts.some(m => m.virtualPath === virtualNorm)) {
			return `Virtual path "${virtualNorm}" is already in use.`;
		}

		return null;
	}

	/** Add a path to the allowlist. */
	allow(realPath: string): void {
		this.allowlist.add(path.normalize(realPath));
	}

	/** Remove a path from the allowlist. */
	revoke(realPath: string): void {
		this.allowlist.delete(path.normalize(realPath));
	}

	getAllowedPaths(): string[] {
		return Array.from(this.allowlist);
	}
}
