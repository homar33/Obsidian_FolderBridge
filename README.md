# Obsidian Folder Bridge

Obsidian Folder Bridge extends Obsidian’s single‑root vault model by allowing users to mount external folders as if they were native vault directories. It introduces a virtual filesystem layer that maps real paths on disk into the vault, enabling multi‑root workspaces without moving or duplicating files.

This plugin is designed for users who maintain large archives, multi‑device setups, or structured file systems outside their vault but want seamless access to those resources inside Obsidian.

---

Features (Planned)

- Create mount points inside your vault that map to external folders  
- Browse, read, and edit files stored outside the vault  
- Treat external folders as native vault directories  
- Support for multiple filesystem roots  
- Configurable path mappings with a simple UI  
- Safe permission prompts and allowlists  
- Plugin‑level virtual filesystem adapter  
- Future adapters (network shares, cloud storage, etc.)

---

How It Works

Obsidian_FolderBridge introduces a lightweight virtual filesystem layer that intercepts Obsidian’s file operations and routes them to the correct underlying path. This allows external directories to appear in the File Explorer and behave like part of the vault, without modifying the user’s actual folder structure.

---

Development Setup

To begin developing Obsidian_FolderBridge:

1. Install Node.js (LTS) and either pnpm or npm.  
2. Clone the Obsidian sample plugin template or this repository.  
3. Install dependencies and enable Developer Mode in Obsidian.  
4. Link the plugin folder into your vault’s .obsidian/plugins/ directory.  
5. Use the provided build scripts for hot‑reload and TypeScript compilation.

This environment provides a clean foundation for implementing the virtual filesystem adapter and UI components.

---

Project Status

This project is in early development. The initial goal is to implement a minimal virtual adapter capable of reading and listing external directories, followed by write operations, UI integration, and mount configuration.
