<<<<<<< copilot/setup-obsidian-plugin-template
# Obsidian FolderBridge

Adds external folders to your Obsidian vault as seamless, native-feeling directories. It creates virtual mount points that map real filesystem paths into the vault, enabling multi-root workspaces without moving or duplicating files.

## Features

- 🗂️ **Virtual Mount Points**: Map real filesystem paths into your vault without copying files
- 🔄 **Multi-Root Workspaces**: Work with files from multiple locations simultaneously
- 🚀 **Seamless Integration**: External folders appear as native directories in Obsidian
- 💾 **Zero Duplication**: Files stay in their original locations

## Development Setup

### Prerequisites

- Node.js (LTS version 20.x or higher)
- npm or pnpm package manager
- Obsidian (with Developer Mode enabled)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/tescolopio/Obsidian_FolderBridge.git
   cd Obsidian_FolderBridge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

### Development Workflow

1. **Enable Developer Mode** in Obsidian:
   - Open Obsidian Settings → Community Plugins
   - Enable "Developer Mode"

2. **Link the plugin folder** to your vault:
   ```bash
   # Create a symbolic link from your vault's plugins directory to this project
   # Replace YOUR_VAULT_PATH with your actual vault path
   ln -s "$(pwd)" "YOUR_VAULT_PATH/.obsidian/plugins/obsidian-folderbridge"
   ```

3. **Start development build** with hot-reload:
   ```bash
   npm run dev
   ```

   This will:
   - Watch for file changes
   - Automatically rebuild on save
   - Enable hot-reload in Obsidian (requires Hot Reload plugin)

4. **Reload the plugin** in Obsidian:
   - Open Command Palette (Ctrl/Cmd + P)
   - Run "Reload app without saving"
   - Or use the Hot Reload plugin for automatic reloading

### Build Scripts

- `npm run dev` - Start development build with watch mode and hot-reload
- `npm run build` - Create production build with type checking
- `npm run version` - Bump version in manifest.json and versions.json

### Project Structure

```
.
├── main.ts              # Main plugin entry point
├── manifest.json        # Plugin metadata
├── package.json         # Node.js dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── esbuild.config.mjs   # Build configuration
├── version-bump.mjs     # Version management script
└── .hotreload           # Hot-reload marker file
```

### TypeScript Configuration

The project uses TypeScript with strict type checking enabled. Configuration includes:
- ES6+ target compilation
- Source maps for debugging
- Strict null checks
- Import helpers from tslib

## Virtual Filesystem Architecture

This plugin provides a foundation for implementing a virtual filesystem adapter that:
- Intercepts file system operations in Obsidian
- Routes requests to the appropriate real filesystem path
- Maintains a mapping between virtual paths and real paths
- Ensures seamless integration with Obsidian's internal file handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
=======
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
>>>>>>> main
