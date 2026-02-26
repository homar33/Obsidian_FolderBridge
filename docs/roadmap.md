# Roadmap for Folder Bridge

This document tracks the current status of platform support and planned features. It is updated with each release.

**Current version: v2.3.0** — Last updated: 2026-02-25

---

## Platform Status

| Platform | Status | Notes |
|----------|--------|-------|
| Windows | ✅ Stable | Full support — long paths, UNC, NTFS quirks, OneDrive Files On Demand |
| Linux | ✅ Stable | POSIX paths, WSL cross-environment support |
| macOS | ⚠️ Untested | POSIX code paths are fully implemented; no known blockers. Community testing welcomed — [open an issue](https://github.com/tescolopio/Obsidian_FolderBridge/issues) if you hit anything. |
| Android | ✅ Stable | WebDAV and S3/B2 mounts work fully on Obsidian Android. The UI automatically shows only mobile-compatible mount types. Local and SFTP mounts require the desktop Electron runtime and are hidden on mobile. |
| iOS | ❌ Not feasible | Obsidian's iOS sandbox prevents access to arbitrary filesystem paths and blocks the Node.js networking stack. Not blocked on engineering — blocked by the OS. |

---

## Recently Completed

| Version | What shipped |
|---------|-------------|
| v2.3.0 | **Read-only toggle per mount** — a lock/unlock icon button on every mount row in Settings lets you flip read-only without opening the edit modal; amber tint when locked. **Toggle read-only on all mounts** command — one hotkey-assignable action to lock/unlock every mount on this device. **Toggle read-only on a specific mount…** command — fuzzy picker showing each mount’s current lock state, hotkey-assignable. |
| v2.2.0 | **Multi-select browse for ignore list** — the Browse… button in the per-mount ignore list opens the OS folder picker with multi-selection enabled; all chosen folders are added in one save + vault-reload. |
| v2.1.0 | **Read-only mount graceful handling** — write operations through read-only mounts are now silently swallowed and surface a one-time `Notice` instead of throwing (fixes editor crash loop on auto-save). **VirtualAdapter vault name** — `getName()` now delegates to the underlying adapter instead of returning the hardcoded string `'VirtualAdapter'` (fixes vault name showing incorrectly in the lower-left UI). |
| v2.0.0+ | **Official Obsidian community plugin directory** — listed in the Obsidian plugin browser; install directly via Settings → Community Plugins → Browse. |
| v2.0.0 | **S3 / Backblaze B2 mounts** — mount any S3-compatible bucket (Amazon S3, Backblaze B2, MinIO, Cloudflare R2) as a virtual vault folder with quick-fill presets, OS-keychain-encrypted secret key, and correct ListObjectsV2 virtual-folder semantics. **SFTP mounts** — mount any remote SSH directory (password or private-key auth); persistent auto-reconnecting connection per mount; server-side atomic rename. Generalised `CredentialStore` with generic encrypt/decrypt helpers. Mobile UI shows WebDAV and S3/B2 only. Export/import strips all credential types. `SecurityManager` skips local-path checks for cloud mounts. |
| v1.1.6 | Command palette integration — four commands: Add mount, Toggle mount on/off (fuzzy picker), Reconnect unreachable mounts, Open settings. All assignable to custom hotkeys. |
| v1.1.5 | First-run onboarding welcome modal — shown once to new users with no mounts configured; direct "Add my first mount →" action. |
| v1.1.4 | Import / Export mount configuration — export strips credentials; import appends mounts with fresh IDs. |
| v1.1.3 | WebDAV connection presets — quick-fill for Nextcloud, ownCloud, Synology NAS, QNAP NAS. |
| v1.1.2 | Global ignore patterns — a single pattern list applied across every mount before per-mount rules. |
| v1.1.1 | Persistent WebDAV credentials — OS keychain (DPAPI / macOS Keychain / libsecret) via Electron `safeStorage`; device-specific encrypted blob safe to sync; transparent session-memory fallback on mobile. |
| v1.1.0 | Android / mobile support — WebDAV mounts work on Obsidian Android; UI auto-adapts to mobile-only mode. Configurable image/PDF data: URI size cap (setting). |
| v1.0.0 | Stable release milestone; full README and documentation update. |
| v0.9.0 | Vault-to-vault bridging — mount another vault's folder; auto-ignores `.obsidian`, `.trash`, `.smart-connections`. |
| v0.8.0 | WebDAV support (Nextcloud, ownCloud, generic); health checks via HTTP `exists()` probe; no file watcher for HTTP mounts. |
| v0.7.0 | Per-mount debounce threshold; per-mount polling mode; max-files scan limit; Advanced settings collapsible section. |
| v0.6.0 | Conflict resolution UI — 30s background health checks, orange status bar on unreachable mounts, per-mount reconnect button. |
| v0.5.0 | Edit mount in-place; drag-drop reorder in settings; "Move mount to…" context menu; Browse-to-ignore picker; path-relative ignore patterns; instant file-explorer refresh on ignore add. |
| v0.4.3 | Image/PDF rendering via `data:` URIs; rename race fix; OneDrive cloud placeholder detection; PathMapper O(N) lookup cache. |
| v0.4.2 | FileWatcher hardening — symlink escape fix, watcher restart, 20 unit tests. |
| v0.2.0 | Device-specific mount IDs, foreign mount toggle, path overrides, ignore list, context menu integration. |
| v0.1.0 | Initial release — VirtualAdapter, PathMapper, SecurityManager, Windows hardening, browse buttons, WSL hints. |

---

## Planned Features

### High Priority

- **macOS verified support** — POSIX code paths are implemented and believed to work; a confirmed macOS test pass + community feedback loop would let us mark it ✅ Stable
- **S3 / SFTP connection presets** — quick-fill dropdowns for common SFTP hosts and S3-compatible providers, matching the WebDAV preset UX

### Medium Priority

- **OAuth2-based Google Drive mounting** — requires a local HTTP redirect server for the auth callback; scoped to a future release once the core mount types stabilise
- **OneDrive OAuth2 mounting** — same auth-server requirement as Google Drive; UNC path workaround (`\\server\share`) works today for on-prem scenarios
- **Lazy / paginated directory listing** — for mounts with tens of thousands of files; currently capped at 10 000 entries via a hard limit
- **iOS feasibility re-evaluation** — track Obsidian's iOS plugin API changes; if Apple relaxes sandbox rules or Obsidian ships a network-mount abstraction, revisit

### Low Priority / Exploratory

- **Read-only HTTP/S static server** — serve a mounted folder as a local file server for lightweight in-vault sharing
- **Per-mount credential rotation UI** — re-enter or rotate credentials for a specific mount without removing and recreating it
- **Mount health dashboard** — dedicated view showing uptime, last-seen, and error history per mount
- **Encrypted local mounts** — transparent at-rest encryption layer for local folder mounts (research phase)

---

The roadmap evolves with community feedback and real-world usage patterns. To request a feature or report a platform-specific issue, open an issue on [GitHub](https://github.com/tescolopio/Obsidian_FolderBridge/issues).
