/**
 * A single virtual mount point: maps a vault-relative virtual path
 * to an absolute real filesystem path.
 */
export interface MountPoint {
	id: string;            // Unique identifier (generated at creation)
	virtualPath: string;   // Normalized vault path, e.g. "Projects/Work"
	realPath: string;      // Absolute OS path, e.g. "/home/user/Documents/Work"
	enabled: boolean;      // Whether the mount is currently active
	readOnly: boolean;     // Block all write operations through this mount
	label?: string;        // Optional human-readable display name
	deviceId?: string;     // The device ID that created this mount (for sync compatibility)
	deviceOverrides?: Record<string, string>; // Map of deviceId -> realPath override
	ignoreList?: string[]; // List of file/folder names to ignore for this specific mount
}

export interface FolderBridgeSettings {
	mountPoints: MountPoint[];
	allowlist: string[];    // Approved real paths (must match before any I/O)
	dryRun: boolean;        // Log writes without executing them
	showStatusBar: boolean;
	mountRootDeletionBehavior: 'ask' | 'unmount' | 'delete';
	deviceId: string;       // Unique ID for this specific device
	allowForeignMounts: boolean; // Allow mounting paths created on other devices
}

export const DEFAULT_SETTINGS: FolderBridgeSettings = {
	mountPoints: [],
	allowlist: [],
	dryRun: false,
	showStatusBar: true,
	mountRootDeletionBehavior: 'ask',
	deviceId: '',
	allowForeignMounts: false,
};

export interface MountStatus {
	mount: MountPoint;
	reachable: boolean;
	readOnly: boolean;     // true if OS-level or mount-level read-only
	error?: string;
}

export type OSPlatform = 'windows' | 'linux' | 'mac' | 'unknown';
