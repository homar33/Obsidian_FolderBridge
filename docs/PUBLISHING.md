# Publishing & Release Checklist

This document defines every step required to release a new version of FolderBridge and pass all automated and manual checks for the Obsidian Community Plugin directory.

---

## 1. Pre-Release Code Checks (Bot Scan)

The Obsidian community-plugin bot validates these automatically when a PR is opened against [`obsidianmd/obsidian-releases`](https://github.com/obsidianmd/obsidian-releases).

### Automated file checks

| Check | Requirement | How we satisfy it |
|-------|-------------|-------------------|
| `manifest.json` present in repo root | Required | ✅ Always committed |
| `manifest.json` `version` matches release tag | Exact match, no `v` prefix | ✅ e.g. tag `2.8.0`, manifest `"version": "2.8.0"` |
| `manifest.json` required fields | `id`, `name`, `version`, `minAppVersion`, `description`, `author` | ✅ All present |
| `versions.json` includes new version | Maps every released version to its `minAppVersion` | ✅ Updated each release |
| `main.js` uploaded to GitHub release | Required | ✅ Attached by release script |
| `manifest.json` uploaded to GitHub release | Required | ✅ Attached by release script |
| `styles.css` uploaded to GitHub release | Required if the file exists | ✅ Attached |

### Code patterns the bot / reviewer checks for

| Pattern | Verdict | Status |
|---------|---------|--------|
| `console.log` / `console.info` | ❌ Banned — use `console.debug` | ✅ Routed through `src/logger.ts` |
| `innerHTML` without sanitization | ❌ Banned — XSS risk | ✅ Not used; DOM built via `createEl` / Obsidian APIs |
| `eval()` | ❌ Banned | ✅ Not used |
| `fetch()` for network requests | ❌ Use `requestUrl` instead | ✅ WebDAV/S3/SFTP use their own authenticated clients; no bare `fetch` |
| Hard-coded `.obsidian` path | ❌ Banned | ✅ Uses `app.vault.configDir` |
| Inline `element.style.*` assignments | ❌ Use CSS classes | ✅ All styles in `styles.css` with `folderbridge-*` prefix |
| Unsafe `as TFile` / `as TFolder` casts | ⚠️ Reviewer flag | ✅ Uses `instanceof` narrowing |
| `require()` at module scope | ⚠️ Breaks mobile | ✅ Uses `loadOptionalNodeModule()` lazy loader |
| Floating `Promise`s | ⚠️ Reviewer flag | ✅ Wrapped with `void` operator |
| `async` event handlers returning `Promise` where `void` expected | ⚠️ Reviewer flag | ✅ Wrapped with synchronous `void (async () => { … })()` |

Run to verify locally:

```sh
npm run lint        # ESLint (catches most of the above)
npm run build       # TypeScript type check + esbuild production bundle
npm test            # Vitest unit tests
```

---

## 2. Version Bump Steps

Every release follows this sequence. **Do not skip steps.**

### 2a. Update version numbers

Update the version string in **all four** of the following files:

```
manifest.json          "version": "X.Y.Z"
package.json           "version": "X.Y.Z"
versions.json          add "X.Y.Z": "0.15.0" entry
CHANGELOG.md           add ## [X.Y.Z] - YYYY-MM-DD section
```

### 2b. Write the CHANGELOG entry

Follow the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format. Use the correct section headers:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Removed
- ...
```

Each bullet must be specific enough for a user to understand what changed and why. Mention the root cause for bug fixes.

### 2c. Commit the version bump

```sh
git add main.ts src/ CHANGELOG.md manifest.json package.json versions.json
git commit -m "chore: release vX.Y.Z"
```

### 2d. Build the production bundle

```sh
npm run build
```

Verify `main.js` is generated and its size is reasonable (generally 200–900 KB).

### 2e. Tag the commit

Tag format: `X.Y.Z` — **no `v` prefix** (matches the Obsidian release tag convention used since v2.4.1).

```sh
git tag X.Y.Z
git push origin main --tags
```

### 2f. Create the GitHub release

```sh
gh release create X.Y.Z \
  --title "X.Y.Z" \
  --latest \
  --notes "$(cat <<'EOF'
## What's Changed

### Fixed
- ...

See [CHANGELOG.md](https://github.com/tescolopio/Obsidian_FolderBridge/blob/main/CHANGELOG.md) for full details.
EOF
)" \
  main.js manifest.json styles.css
```

> **Critical:** The release tag must match `manifest.json` `"version"` exactly. The bot rejects mismatches.

---

## 3. Obsidian Community Plugin Guidelines Summary

These are the reviewer criteria drawn from the [official plugin guidelines](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines). All must be satisfied before submitting to `obsidianmd/obsidian-releases`.

### Required files

- `README.md` — describes the plugin's purpose and usage
- `LICENSE` — open-source license (FolderBridge uses MIT)
- `manifest.json` — valid with all required fields
- `versions.json` — version-to-minAppVersion map
- `main.js` — production bundle (in GitHub release assets, not committed to repo)

### README must include

- What the plugin does (opening paragraph)
- List of features
- Installation instructions
- Usage instructions with steps
- Any required configuration
- Platform limitations (we document macOS/Windows/Linux/Android in a table)
- Disclosure of any network access (WebDAV, S3, SFTP are all disclosed)

### Security & privacy requirements

- Do not request unnecessary permissions
- Disclose all network access in README (✅ done — WebDAV, S3, SFTP, localhost FileServer)
- Do not log or transmit user data
- Credentials must be stored securely (✅ OS keychain via DPAPI/Keychain/libsecret)
- Do not access files outside the vault or user-approved paths (✅ security allowlist)

### UI / UX requirements

- Use sentence case for UI labels (✅ enforced since v2.5.0)
- Prefix all CSS classes with the plugin ID (`folderbridge-*`) (✅ done)
- No modal or notice spam — one notice per action, non-blocking where possible (✅ done)
- Settings must be self-explanatory or have description text (✅ every setting has `.setDesc()`)

---

## 4. Submitting to the Community Plugin Directory

This only needs to be done once (initial submission). Subsequent releases only require new GitHub release tags.

1. Fork [`obsidianmd/obsidian-releases`](https://github.com/obsidianmd/obsidian-releases)
2. Add an entry to `community-plugins.json`:

```json
{
  "id": "folderbridge",
  "name": "Folder Bridge",
  "author": "Timmothy Escolopio",
  "description": "Adds external folders to your vault as seamless, native-feeling directories. Supports local filesystem, WebDAV, S3/Backblaze B2, and SFTP mounts.",
  "repo": "tescolopio/Obsidian_FolderBridge",
  "branch": "main"
}
```

3. Open a PR — the bot will auto-validate and comment results
4. Ensure the latest GitHub release tag matches `manifest.json` `"version"` exactly
5. Address any bot or reviewer comments

---

## 5. Quick Checklist (copy before each release)

```
[ ] manifest.json version updated
[ ] package.json version updated
[ ] versions.json entry added
[ ] CHANGELOG.md entry written with root-cause detail for fixes
[ ] npm run lint — no errors
[ ] npm run build — succeeds, main.js generated
[ ] npm test — all tests pass
[ ] Commit: "chore: release vX.Y.Z"
[ ] Tag: git tag X.Y.Z && git push origin X.Y.Z  (no "v" prefix)
[ ] GitHub release created with main.js, manifest.json, styles.css attached
[ ] Release set as "Latest"
[ ] Release notes written (copy from CHANGELOG)
```
