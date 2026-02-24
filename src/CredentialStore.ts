/**
 * CredentialStore — persist WebDAV passwords using Electron's safeStorage API.
 *
 * safeStorage uses the OS keychain as the encryption key:
 *   - Windows : DPAPI (user-account bound)
 *   - macOS   : Keychain
 *   - Linux   : libsecret / kwallet
 *
 * Encrypted blobs are device-specific: even if data.json syncs to another
 * device, the value cannot be decrypted there — the OS key differs.
 *
 * Stored format:  "enc:<base64-of-encrypted-buffer>"
 *
 * Mobile fallback: safeStorage is absent on Obsidian Mobile (Capacitor).
 * encryptPassword() returns null; callers should fall back to sessionStorage.
 */

const PREFIX = 'enc:';

// ---------------------------------------------------------------------------
// Electron safeStorage accessor
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SafeStorage = {
    isEncryptionAvailable(): boolean;
    encryptString(plainText: string): Buffer;
    decryptString(encrypted: Buffer): string;
};

function getSafeStorage(): SafeStorage | null {
    try {
        // Works in Electron renderer: window.require is Electron's require shim.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const electron = (window as any).require?.('electron') ?? (require as any)('electron');
        // safeStorage lives in the main process; Obsidian re-exports it via remote.
        const ss: SafeStorage | undefined =
            electron?.remote?.safeStorage ?? electron?.safeStorage;
        return ss ?? null;
    } catch {
        return null;
    }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns true when OS-level encryption is available on this device.
 * Always false on Obsidian Mobile.
 */
export function isEncryptionAvailable(): boolean {
    try {
        return getSafeStorage()?.isEncryptionAvailable() ?? false;
    } catch {
        return false;
    }
}

/**
 * Encrypt a plaintext password using the OS keychain.
 *
 * Returns `"enc:<base64>"` on success, or `null` if safeStorage is
 * unavailable (mobile, or OS keychain locked).  The caller should fall
 * back to sessionStorage when null is returned.
 */
export function encryptPassword(password: string): string | null {
    try {
        const ss = getSafeStorage();
        if (!ss?.isEncryptionAvailable()) return null;
        const buf: Buffer = ss.encryptString(password);
        return PREFIX + buf.toString('base64');
    } catch {
        return null;
    }
}

/**
 * Decrypt a value previously produced by encryptPassword().
 *
 * Returns the plaintext password, or `null` if:
 *   - The value was not produced on this device (wrong OS key)
 *   - safeStorage is unavailable
 *   - The value is malformed / corrupted
 */
export function decryptPassword(encrypted: string): string | null {
    if (!encrypted?.startsWith(PREFIX)) return null;
    try {
        const ss = getSafeStorage();
        if (!ss?.isEncryptionAvailable()) return null;
        const buf = Buffer.from(encrypted.slice(PREFIX.length), 'base64');
        return ss.decryptString(buf);
    } catch {
        return null;
    }
}
