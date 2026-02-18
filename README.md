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
