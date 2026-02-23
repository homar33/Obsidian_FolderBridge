# Roadmap for Folder Bridge

This document tracks the current status of platform support and planned features. It is updated with each release.

**Current version: v1.0.0** — Last updated: 2026-02-23

---

## Platform Status

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ Stable | Full support — long paths, UNC, NTFS quirks, OneDrive Files On Demand |
| Linux | ✅ Stable | POSIX paths, WSL cross-environment support |
| macOS | ⚠️ Untested | POSIX code paths are fully implemented; no known blockers. Community testing welcomed — [open an issue](https://github.com/tescolopio/Obsidian_FolderBridge/issues) if you hit anything. |
| iOS | ❌ Not feasible | Obsidian’s iOS sandbox prevents access to arbitrary filesystem paths. Not blocked on engineering — blocked by the OS. |
| Android | ❌ Not feasible | Same sandbox restriction as iOS. |

---

## Planned Features

### High Priority

- ✅ **Done** — Virtual Path Management & Drag-Drop Reorganization
- ✅ **Done** — Edit mount in-place (v0.5.0)
- ✅ **Done** — Drag-drop reordering of mounts in settings (v0.5.0)
- ✅ **Done** — “Move mount to…” context menu (v0.5.0)

### Medium Priority

- ✅ **Done** — WebDAV support (Nextcloud, ownCloud, generic — v0.8.0)
- ✅ **Done** — Improved conflict resolution UI: unreachable indicator, per-mount reconnect button (v0.6.0)
- ✅ **Done** — Performance tuning: per-mount debounce, polling mode, max-files scan limit (v0.7.0)

### Low Priority / Exploratory

- ✅ **Done** — Per-mount sync settings — debounce, polling interval, ignore patterns per mount (v0.7.0)
- ✅ **Done** — Vault-to-vault bridging: mount a folder from another Obsidian vault (v0.9.0)
- **OAuth2-based Google Drive and OneDrive mounting** — requires local HTTP server for auth callback; out of scope for v1.0
- **Read-only HTTP/S folder server** — serve a mounted folder as a local static file server; out of scope for v1.0

---

## Recently Completed

| Version | What shipped |
|---------|-------------|
| v1.0.0 | Final polish; README and roadmap updated to reflect all v0.x work; 1.0 release |
| v0.9.0 | Vault-to-vault bridging: mount another vault’s folder with vault-aware ignore defaults (`.obsidian`, `.trash`, `.smart-connections`) |
| v0.8.0 | WebDAV support (Nextcloud, ownCloud, generic); secure sessionStorage-only credential storage; WebDAV health checks; no file watcher for HTTP mounts |
| v0.7.0 | Per-mount debounce threshold; per-mount polling mode; max-files scan limit; Advanced settings collapsible section in mount modal |
| v0.6.0 | Conflict resolution UI: 30-second background health checks, orange status bar on unreachable mounts, per-mount reconnect button |
| v0.5.0 | Edit mount in-place; drag-drop reorder in settings; “Move mount to…” context menu; Browse-to-ignore picker; path-relative ignore patterns; instant file-explorer refresh on ignore add; CI fixed (ESLint flat config + typescript-eslint v8) |
| v0.4.4 | Platform support documentation; macOS marked untested (not unimplemented); mobile sandbox clarification |
| v0.4.3 | Image/PDF rendering via `data:` URIs; rename race fix (2s poll); 300ms debounce for rapid saves; OneDrive cloud placeholder detection; PathMapper O(N) lookup cache |
| v0.4.2 | FileWatcher hardening (symlink escape fix, event string, watcher restart, 20 unit tests); 0 npm audit vulnerabilities |
| v0.4.1 | Resource URL encoding fix |
| v0.4.0 | ENOENT error code fix for file creation; image path resolution |
| v0.3.0 | WSL folder browser button |
| v0.2.0 | Device-specific mount IDs, foreign mount toggle, path overrides, ignore list, context menu integration |
| v0.1.0 | Initial release — virtual adapter, PathMapper, SecurityManager, Windows hardening, browse buttons, WSL hints |

---

The roadmap evolves with community feedback and real-world usage patterns. To request a feature or report a platform-specific issue, open an issue on [GitHub](https://github.com/tescolopio/Obsidian_FolderBridge/issues).


---

## Platform Status

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ Stable | Full support — long paths, UNC, NTFS quirks, OneDrive Files On Demand |
| Linux | ✅ Stable | POSIX paths, WSL cross-environment support |
| macOS | ⚠️ Untested | POSIX code paths are fully implemented; no known blockers. Community testing welcomed — [open an issue](https://github.com/tescolopio/Obsidian_FolderBridge/issues) if you hit anything. |
| iOS | ❌ Not feasible | Obsidian's iOS sandbox prevents access to arbitrary filesystem paths. Not blocked on engineering — blocked by the OS. |
| Android | ❌ Not feasible | Same sandbox restriction as iOS. |

> **Note on macOS FUSE / macfuse:** An earlier version of this roadmap proposed investigating FUSE-based mounts on macOS. This is no longer necessary — the plugin already works at the Node.js `fs` layer inside Electron/Obsidian Desktop, which runs the same code on all desktop platforms. No native binary or kernel extension is needed.

---

## Planned Features

### High Priority

- ~~**Virtual Path Management & Drag-Drop Reorganization**~~ ✅ **Done (unreleased)**
  - ~~Edit or change the virtual path of an existing mount without deleting and recreating it~~ → **Edit button** pre-populates the full modal; vault tree + watcher update live
  - ~~Drag-drop reordering of mounts in the settings UI~~ → **HTML5 drag-drop** on mount rows; persisted immediately
  - ~~Drag-drop moving of mounts within the vault file explorer~~ → **"Move mount to…" context menu** on mount root folders; uses the vault folder picker

### Medium Priority

- **Cloud provider shortcuts** (without requiring desktop sync apps)
  - WebDAV support (Nextcloud, Nextcloud Talk, ownCloud, generic servers)
  - OAuth2-based Google Drive and OneDrive mounting (requires local HTTP server for auth callback)
  - NAS via SMB already works today via UNC paths (`\\server\share\...`) — file watching may not work on all servers
  - See [comment thread discussion](https://github.com/tescolopio/Obsidian_FolderBridge/issues) for details on what's feasible

- **Improved conflict resolution UI**
  - Visual indicator when a mounted path becomes unreachable
  - Per-mount reconnect / re-scan button without requiring a plugin reload

- **Performance tuning for very large mounts**
  - Lazy/paginated directory listing for folders with tens of thousands of files
  - Optional file index cache with configurable staleness threshold

### Low Priority / Exploratory

- **Per-mount sync settings** — control watcher polling interval, debounce threshold, and ignore patterns at the mount level rather than globally
- **Vault-to-vault bridging** — mount a folder from another Obsidian vault (requires resolving metadata cache conflicts)
- **Read-only HTTP/S folder** — serve a mounted folder as a local static file server for sharing

---

## Recently Completed

| Version | What shipped |
|---------|-------------|
| v0.5.0 | Edit mount in-place; drag-drop reorder in settings; "Move mount to…" context menu; Browse-to-ignore picker; path-relative ignore patterns; instant file-explorer refresh on ignore add; CI fixed (ESLint flat config + typescript-eslint v8) |
| v0.4.4 | Platform support documentation; macOS marked untested (not unimplemented); mobile sandbox clarification |
| v0.4.3 | Image/PDF rendering via `data:` URIs; rename race fix (2s poll); 300ms debounce for rapid saves; OneDrive cloud placeholder detection; PathMapper O(N) lookup cache |
| v0.4.2 | FileWatcher hardening (symlink escape fix, event string, watcher restart, 20 unit tests); 0 npm audit vulnerabilities |
| v0.4.1 | Resource URL encoding fix |
| v0.4.0 | ENOENT error code fix for file creation; image path resolution |
| v0.3.0 | WSL folder browser button |
| v0.2.0 | Device-specific mount IDs, foreign mount toggle, path overrides, ignore list, context menu integration |
| v0.1.0 | Initial release — virtual adapter, PathMapper, SecurityManager, Windows hardening, browse buttons, WSL hints |

---

The roadmap evolves with community feedback and real-world usage patterns. To request a feature or report a platform-specific issue, open an issue on [GitHub](https://github.com/tescolopio/Obsidian_FolderBridge/issues).
