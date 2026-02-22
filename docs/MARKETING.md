# Folder Bridge - Marketing Guide

This document contains marketing materials and copy tailored for different platforms to help promote Folder Bridge across the web.

---

## 🎯 Core Value Proposition

**Problem:** Obsidian only supports a single vault root, forcing users to choose between scattering knowledge across multiple vaults or duplicating files.

**Solution:** Folder Bridge lets you mount external folders directly into your vault as native-feeling directories—no copying, no duplicating, no fragile symlinks.

**Benefit:** Unified knowledge management across your entire filesystem.

---

## 📱 Platform-Specific Copy

### GitHub (Repository Readme and Releases)

**Short Description (60 chars):**
```
Mount external folders in Obsidian as native directories
```

**Medium Description (200 chars):**
```
Folder Bridge extends Obsidian's single-root vault by letting you mount external folders as seamless, native-feeling directories. Files stay in their original locations—no copying, no duplicating.
```

**Long Description (500+ chars):**
```
Folder Bridge is an Obsidian plugin that solves the fundamental limitation of Obsidian's single-root vault architecture.

Mount any external folder—shared network drives, project directories, Downloads folders, WSL Linux distributions—directly into your Obsidian vault. The files stay exactly where they are on your filesystem. Obsidian treats them like native vault files. They work with search, Quick Switcher, and all your plugins.

✨ Key Features:
• Zero duplication – files read/written from their real locations
• Multi-root workspaces – work with files from multiple locations
• Sync compatibility – safely sync with Obsidian Sync, Syncthing, etc.
• Per-mount ignore lists – hide node_modules, .git, etc.
• Read-only mounts – protect external folders from edits
• Windows hardened – long paths (>260 chars), UNC paths, WSL support

Perfect for developers, researchers, and knowledge workers who need to bridge Obsidian with their actual project files.
```

---

### Obsidian Community Forums

**Title:** [Plugin Showcase] Folder Bridge: Mount External Folders in Obsidian (No Symlinks Required!)

**Body:**

```markdown
Hey everyone! 👋

I'm excited to share a new plugin I've been working on called **Folder Bridge**.

If you've ever wanted to access files from outside your vault—like a shared network drive, a massive `Downloads` folder, or a separate project directory—without actually copying those files into your vault or messing around with fragile OS-level symlinks, this plugin is for you.

Folder Bridge extends Obsidian's single-root vault by letting you "mount" external folders as seamless, native-feeling directories inside your vault.

### 🚀 How it works
You simply provide a **Real Path** (e.g., `C:\Users\Name\Documents\Work`) and a **Virtual Path** (e.g., `Projects/Work`).

Folder Bridge maps that external folder directly into Obsidian's file explorer. The files stay in their original locations—no copying, no duplicating. Obsidian treats them exactly like native vault files, meaning they work perfectly with the Quick Switcher, search, and all your other plugins.

### ✨ Key Features
*   **Zero Duplication:** Files are read and written directly from their real locations.
*   **Multi-Root Workspaces:** Work with files from multiple locations simultaneously.
*   **Sync Compatibility:** Safely sync your vault across devices (Obsidian Sync, Syncthing). Mounts are device-specific, so you can map a "Work" folder to `C:\Work` on your PC and `/Users/Name/Work` on your Mac.
*   **Per-Mount Ignore Lists:** Hide specific files or folders (like `node_modules` or `.git`) from Obsidian to keep your vault fast and clutter-free.
*   **Read-Only Mounts:** Protect external folders from accidental writes.
*   **Windows Hardened:** Full support for long paths (>260 chars), UNC network paths, and WSL folders.

### 📥 How to get it
Folder Bridge is currently pending review for the official Community Plugins directory, but you can install it right now using [BRAT](https://tfthacker.com/BRAT)!

1. Install the **Obsidian42 - BRAT** plugin.
2. Enable BRAT in your settings.
3. Open the command palette and run **BRAT: Add a beta plugin for testing**.
4. Enter the repository URL: `https://github.com/tescolopio/Obsidian_FolderBridge`
5. Click **Add Plugin**. BRAT will automatically download and install the latest release.

You can also check out the source code and read the full documentation on GitHub:
🔗 **[Folder Bridge on GitHub](https://github.com/tescolopio/Obsidian_FolderBridge)**

I'd love to hear your feedback, feature requests, or any bugs you run into. Let me know what you think!
```

---

### LinkedIn (Professional Network)

**Short Post (200 chars):**
```
If you use Obsidian, you know the struggle of wanting to reference files outside your vault—massive Downloads folders, shared network drives, separate coding projects—without duplicating everything.

I just released Folder Bridge, an Obsidian plugin that solves this by letting you "mount" any external folder directly into your vault. Files stay where they are, but Obsidian treats them like native vault files.

Perfect for developers, researchers, and knowledge workers who need to bridge Obsidian with their real-world file organization.

Check it out: https://github.com/tescolopio/Obsidian_FolderBridge

#Obsidian #PKM #ProductivityTools #KnowledgeManagement #OpenSource
```

**Long Post (500+ chars):**
```
If you use Obsidian, you know the struggle. You want to keep your vault organized around your knowledge, but you also have massive Downloads folders, shared network drives, coding projects, and research databases that live outside your vault.

Obsidian's single-root vault forces you to choose: duplicate files into your vault (storage nightmare), scatter notes across multiple vaults (fragmentation nightmare), or use fragile OS-level symlinks (reliability nightmare).

I built Folder Bridge to solve this.

It's a new Obsidian plugin that lets you "mount" any external folder directly into your vault. The files stay exactly where they are on your filesystem, but Obsidian treats them like native vault files. Full search support, Quick Switcher integration, plugin compatibility—the whole experience.

✅ Zero file duplication
✅ Multi-device sync compatible
✅ Per-folder ignore lists (goodbye node_modules!)
✅ Read-only mount protection
✅ Direct WSL Linux folder mounting for Windows users
✅ Network drive support

It's perfect for developers, researchers, and anyone who needs to bridge Obsidian with their actual file organization.

Folder Bridge is currently pending official Obsidian community plugin review, but you can install it now via BRAT. Open source on GitHub.

Check it out: https://github.com/tescolopio/Obsidian_FolderBridge

#Obsidian #PKM #ProductivityTools #KnowledgeManagement #OpenSourceSoftware #DeveloperTools
```

---

### Twitter / X

**Tweet 1 (280 chars):**
```
Tired of duplicating files to use them in Obsidian? 📁

I built Folder Bridge—a new plugin that lets you mount *any* external folder (project dirs, network drives, WSL) directly into your vault as native-feeling directories.

Zero duplication. Full search support. Multi-device sync compatible.

🔗 https://github.com/tescolopio/Obsidian_FolderBridge

#ObsidianMD #PKM
```

**Tweet 2 (Thread):**
```
1/ The problem with Obsidian's single-root vault:

You have files scattered everywhere on your filesystem. Your Downloads folder. Your project directories. Your shared network drives. Your WSL Linux distribution. But Obsidian forces you into a single vault root.

So you either:
- Duplicate everything (chaos)
- Scatter notes across multiple vaults (fragmentation)
- Use fragile symlinks (breaks constantly)

2/ I spent the last few weeks building a better solution: Folder Bridge.

It's an Obsidian plugin that lets you "mount" any external folder directly into your vault. Files stay where they are. Obsidian treats them like native vault files.

Full search. Quick Switcher. Plugin support. Everything just works.

3/ Key features:
✅ Zero file duplication
✅ Multi-root workspaces
✅ Sync compatible (Obsidian Sync, Syncthing, etc.)
✅ Per-mount ignore lists
✅ Read-only mounts
✅ Direct WSL mounting for Windows users
✅ Network drive support

4/ It's open source and currently pending official Obsidian community plugin review, but you can install it now via BRAT.

Check it out: https://github.com/tescolopio/Obsidian_FolderBridge

Let me know what you think! 🚀

#ObsidianMD #PKM #OpenSource
```

---

### Reddit

**Subreddit:** r/ObsidianMD

**Title:** I built Folder Bridge—an Obsidian plugin that lets you mount external folders directly into your vault. No duplication, no symlinks.

**Body:**

```markdown
Hey everyone!

I spent the last few weeks building an Obsidian plugin called **Folder Bridge**, and I'm excited to share it with the community.

## The Problem

Obsidian's single-root vault architecture is powerful, but it creates a fundamental friction: What do you do with files that live outside your vault?

Your massive Downloads folder. Your coding projects. Your shared network drives. Your WSL Linux distribution. Do you duplicate everything into your vault? (chaos) Do you create separate vaults? (fragmentation) Do you use symlinks? (fragile)

## The Solution

Folder Bridge lets you **mount** any external folder directly into your Obsidian vault as a seamless, native-feeling directory. The files stay exactly where they are on your filesystem, but Obsidian treats them like native vault files.

Full search support. Quick Switcher integration. Works with all your plugins. No copying. No duplicating. No fragile symlinks.

## Features

- **Zero Duplication** – Files are read and written directly from their real locations
- **Multi-Root Workspaces** – Work with files from multiple locations simultaneously
- **Sync Compatible** – Device-specific mount tagging ensures Obsidian Sync and Syncthing work perfectly
- **Per-Mount Ignore Lists** – Hide `node_modules`, `.git`, etc. from Obsidian to keep things fast
- **Read-Only Mounts** – Protect external folders from accidental edits
- **Windows Hardened** – Long paths (>260 chars), UNC paths, WSL direct mounting
- **Network Drive Support** – Full support for shared drives and network locations

## Install Now

Folder Bridge is currently pending official Obsidian community plugin review, but you can install it now using [BRAT](https://tfthacker.com/BRAT):

1. Install Obsidian42 - BRAT plugin
2. Open command palette → BRAT: Add a beta plugin for testing
3. Enter: `https://github.com/tescolopio/Obsidian_FolderBridge`

Or check out the source: https://github.com/tescolopio/Obsidian_FolderBridge

I'd love to hear your feedback, feature requests, and any bugs you run into!
```

---

### Discord (Obsidian Community Server)

**Channel:** #plugins or #plugin-announcements

```
🎉 **Folder Bridge** – New Plugin Alert!

An Obsidian plugin that solves the single-root vault problem by letting you mount external folders directly into your vault.

**Key Features:**
✅ Zero file duplication
✅ Multi-root workspaces
✅ Sync compatible (Obsidian Sync, Syncthing)
✅ Per-mount ignore lists
✅ Read-only mounts
✅ WSL & network drive support

**Install via BRAT now:**
1. Install Obsidian42 - BRAT
2. BRAT: Add a beta plugin → https://github.com/tescolopio/Obsidian_FolderBridge

**GitHub:** https://github.com/tescolopio/Obsidian_FolderBridge

Feedback & bug reports welcome! 🚀
```

---

### Blog Post / Dev.to

**Title:** Introducing Folder Bridge: Mount Your Filesystem into Obsidian

**Excerpt:**
```
Obsidian's single-root vault is powerful but restrictive. What do you do with files that live outside your vault? Folder Bridge solves this by letting you mount any external folder directly into your Obsidian vault as native-feeling directories.
```

**Section Outline:**
1. **The Problem** – Why single-root vaults are limiting
2. **The Solution** – How Folder Bridge works
3. **Technical Architecture** – Virtual filesystem adapter, how it intercepts I/O
4. **Feature Walkthrough** – Sync compatibility, ignore lists, read-only mounts, WSL support
5. **Real-World Use Cases** – Developers, researchers, knowledge workers
6. **Installation & Getting Started** – BRAT and GitHub links
7. **Future Roadmap** – What's coming next
8. **Contributing** – How to contribute, report bugs, suggest features

---

### Product Hunt

**Tagline:**
```
Mount external folders directly into Obsidian. No copying, no duplicating, no symlinks.
```

**Description:**
```
Folder Bridge is an Obsidian plugin that solves the fundamental limitation of Obsidian's single-root vault architecture.

Mount any external folder—project directories, shared network drives, Downloads folders, WSL Linux distributions—directly into your Obsidian vault. Files stay where they are on your filesystem, but Obsidian treats them like native vault files.

Zero duplication. Full search support. Multi-device sync compatible. Perfect for developers, researchers, and knowledge workers who need to bridge Obsidian with their actual file organization.

Features:
• Zero file duplication
• Multi-root workspaces
• Sync compatible (Obsidian Sync, Syncthing)
• Per-mount ignore lists (hide node_modules, .git, etc.)
• Read-only mounts for protection
• Direct WSL mounting for Windows users
• Full network drive support
```

**Positioning:** Productivity / Tools / Obsidian

---

## 🔑 Key Talking Points

1. **Solves a Real Problem** – Obsidian users have been asking for this for years
2. **No Lock-In** – Files stay on your filesystem, fully portable
3. **Production-Ready** – Fully tested with comprehensive security validation
4. **Cross-Platform** – Windows, macOS, Linux with WSL support
5. **Open Source** – Transparent, community-driven development
6. **Privacy-First** – No cloud, no tracking, everything local
7. **Developer-Friendly** – Perfect for technical users and programmers

---

## 📊 Hashtags by Platform

**Twitter/X:**
`#ObsidianMD #PKM #ProductivityTools #KnowledgeManagement #OpenSource #DeveloperTools`

**LinkedIn:**
`#Obsidian #PKM #ProductivityTools #KnowledgeManagement #OpenSource #DeveloperTools #TechTools`

**Reddit:**
`r/ObsidianMD` `r/productivity` `r/opensourcesoftware`

**Discord:**
`#plugins` `#announcements` `#obsidian`

---

## 🎨 Assets to Create

- [ ] Logo variants (16x16, 32x32, 256x256)
- [ ] GIF demo showing mount creation and file browsing
- [ ] Screenshot of settings interface
- [ ] Comparison diagram (before/after)
- [ ] Architecture diagram (how it works internally)

---

## 📅 Launch Timeline

**Week 1:** GitHub announcement + Obsidian Forums post
**Week 2:** LinkedIn + Twitter thread + Discord announcements
**Week 3:** Reddit post + Dev.to article
**Week 4:** Product Hunt launch + Product roadmap update
**Ongoing:** Community engagement, bug fixes, feature requests

---

## 📝 Notes

- Always link to the GitHub repository as the canonical source
- Mention BRAT installation for users who want to test before official release
- Emphasize that it's open source and community-driven
- Include feedback/contribution links in all materials
- Track engagement and iterate based on community feedback
