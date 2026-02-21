import { describe, it, expect, beforeEach } from 'vitest';
import * as path from 'path';
import { SecurityManager } from '../src/SecurityManager';
import type { MountPoint } from '../src/types';

// Helper: temporarily override process.platform
function withPlatform(platform: NodeJS.Platform, fn: () => void): void {
	const orig = process.platform;
	Object.defineProperty(process, 'platform', { value: platform, configurable: true });
	try { fn(); } finally {
		Object.defineProperty(process, 'platform', { value: orig, configurable: true });
	}
}

function mkMount(virtualPath: string, realPath: string): Omit<MountPoint, 'id'> {
	return { virtualPath, realPath, enabled: true, readOnly: false };
}

describe('SecurityManager', () => {
	let sec: SecurityManager;

	beforeEach(() => {
		sec = new SecurityManager(['/allowed/path']);
	});

	describe('isAllowed', () => {
		it('allows an exact match to an allowlisted path', () => {
			expect(sec.isAllowed('/allowed/path')).toBe(true);
		});

		it('allows a subdirectory of an allowlisted path', () => {
			expect(sec.isAllowed('/allowed/path/subdir/file.md')).toBe(true);
		});

		it('rejects a path not in the allowlist', () => {
			expect(sec.isAllowed('/not/allowed')).toBe(false);
		});

		it('rejects a prefix-substring path that is not a subdirectory', () => {
			// /allowed/pathmore should NOT be allowed when /allowed/path is in list
			expect(sec.isAllowed('/allowed/pathmore')).toBe(false);
		});
	});

	describe('allow / revoke', () => {
		it('dynamically adds a path to the allowlist', () => {
			sec.allow('/new/path');
			expect(sec.isAllowed('/new/path/file.txt')).toBe(true);
		});

		it('revokes an allowlisted path', () => {
			sec.revoke('/allowed/path');
			expect(sec.isAllowed('/allowed/path')).toBe(false);
		});

		it('does not affect other entries when revoking', () => {
			sec.allow('/other');
			sec.revoke('/allowed/path');
			expect(sec.isAllowed('/other')).toBe(true);
		});
	});

	describe('validateMount', () => {
		it('returns null for a valid mount', () => {
			expect(sec.validateMount(mkMount('Work', '/home/user/Work'), [])).toBeNull();
		});

		it('rejects empty virtual path', () => {
			expect(sec.validateMount(mkMount('', '/home/user/Work'), [])).toMatch(/virtual path/i);
		});

		it('rejects empty real path', () => {
			expect(sec.validateMount(mkMount('Work', ''), [])).toMatch(/real path/i);
		});

		it('rejects a non-absolute real path', () => {
			expect(sec.validateMount(mkMount('Work', 'relative/path'), [])).toMatch(/absolute/i);
		});

		it('blocks the POSIX system root /', () => {
			expect(sec.validateMount(mkMount('Root', '/'), [])).toMatch(/protected/i);
		});

		it('blocks dangerous POSIX system paths like /etc', () => {
			expect(sec.validateMount(mkMount('Etc', '/etc'), [])).toMatch(/protected/i);
		});

		it('blocks /etc subdirectories', () => {
			expect(sec.validateMount(mkMount('Ssl', '/etc/ssl'), [])).toMatch(/protected/i);
		});

		it('rejects a duplicate virtual path', () => {
			const existing: MountPoint[] = [{
				id: '1', virtualPath: 'Work', realPath: '/real/Work', enabled: true, readOnly: false,
			}];
			const err = sec.validateMount(mkMount('Work', '/real/Other'), existing);
			expect(err).toMatch(/already in use/i);
		});

		it('rejects a virtual path that is a child of an existing mount', () => {
			const existing: MountPoint[] = [{
				id: '1', virtualPath: 'Projects', realPath: '/real/Projects', enabled: true, readOnly: false,
			}];
			const err = sec.validateMount(mkMount('Projects/Work', '/real/Work'), existing);
			expect(err).toMatch(/overlaps/i);
		});

		it('rejects a real path that is a subdirectory of an existing mount real path', () => {
			const existing: MountPoint[] = [{
				id: '1', virtualPath: 'ParentMount', realPath: '/real/parent', enabled: true, readOnly: false,
			}];
			const err = sec.validateMount(mkMount('ChildMount', '/real/parent/child'), existing);
			expect(err).toMatch(/overlaps/i);
		});

	});

	describe('getPathWarnings', () => {
		it('returns a warning for UNC paths', () => {
			const warnings = sec.getPathWarnings('\\\\server\\share\\folder');
			expect(warnings.length).toBeGreaterThan(0);
			expect(warnings[0]).toMatch(/UNC|network/i);
		});

		it('returns no warnings for a normal local path', () => {
			const warnings = sec.getPathWarnings('/home/user/docs');
			expect(warnings).toHaveLength(0);
		});
	});

	// Note: the Windows case-insensitive comparison (normalizeForComparison) is
	// tested in OSHelpers.test.ts. SecurityManager delegates to that function.
});
