# Changelog

All notable changes to FolderBridge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-02-21

### Added
- Virtual mount point system: map any absolute filesystem path into the vault at any virtual path
- `VirtualAdapter` shim wrapping Obsidian's built-in `FileSystemAdapter` via a JavaScript `Proxy`
- `PathMapper` for bidirectional translation between virtual vault paths and real filesystem paths
- `SecurityManager` with explicit allowlist enforcement; system directories blocked by default
- Full Windows support:
  - Long path prefix (`\\?\`) for paths exceeding 260 characters
  - UNC network path detection and advisory warnings
  - Windows reserved filename blocking (`CON`, `NUL`, `COM1`–`COM9`, `LPT1`–`LPT9`)
  - Case-insensitive NTFS path comparisons
  - Cross-device move fallback (`EXDEV` → copy-then-delete)
- Read-only mount flag to prevent accidental writes
- Mount enable/disable toggle (no removal required)
- Optional display labels for mounts
- Dry-run mode: logs all writes to console without executing them
- Status bar item showing count of active mounts
- `MountManagerModal` UI for adding and validating mount points
- Async mount status badges in settings (reachable / read-only / error)
- `versions.json` for Obsidian's automatic update mechanism
- Vitest unit test suite (72 tests covering PathMapper, SecurityManager, OSHelpers)
- GitHub Actions: build check workflow and release workflow using `softprops/action-gh-release`

### Fixed
- Status bar text was not populated when enabling the status bar item via the settings toggle
- `stat()` now returns a synthetic folder stat for virtual intermediate directories (e.g. `Projects` when the mount is `Projects/Work`), preventing Obsidian from treating them as non-existent
- `getVirtualMountsDirectChildren` now correctly surfaces intermediate virtual directories in vault listings so nested mount paths (e.g. `Projects/Work`) are visible when browsing the vault root
- Binary file copying from vault to a mounted folder now uses `readBinary()` instead of `read()`, preventing UTF-8 corruption of images, PDFs, and other non-text files

[0.1.0]: https://github.com/tescolopio/Obsidian_FolderBridge/releases/tag/0.1.0
