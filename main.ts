import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface FolderBridgeSettings {
	mountPoints: Array<{
		virtualPath: string;
		realPath: string;
		enabled: boolean;
	}>;
}

const DEFAULT_SETTINGS: FolderBridgeSettings = {
	mountPoints: []
};

export default class FolderBridgePlugin extends Plugin {
	settings: FolderBridgeSettings;

	async onload() {
		await this.loadSettings();

		// Add ribbon icon for plugin
		const ribbonIconEl = this.addRibbonIcon('folder-plus', 'FolderBridge', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			console.log('FolderBridge: Ribbon icon clicked');
		});
		ribbonIconEl.addClass('folderbridge-ribbon-class');

		// Add status bar item
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('FolderBridge: Ready');

		// Add settings tab
		this.addSettingTab(new FolderBridgeSettingTab(this.app, this));

		console.log('FolderBridge plugin loaded');
	}

	onunload() {
		console.log('FolderBridge plugin unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class FolderBridgeSettingTab extends PluginSettingTab {
	plugin: FolderBridgePlugin;

	constructor(app: App, plugin: FolderBridgePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('FolderBridge Settings')
			.setDesc('Configure virtual folder mount points')
			.setHeading();

		// Section for adding mount points
		new Setting(containerEl)
			.setName('Mount Points')
			.setDesc('Virtual folders that map to real filesystem paths')
			.addButton(button => button
				.setButtonText('Add Mount Point')
				.setCta()
				.onClick(async () => {
					// Placeholder for adding mount points
					console.log('Add mount point clicked');
				}));

		// Display existing mount points
		this.plugin.settings.mountPoints.forEach((mountPoint, index) => {
			new Setting(containerEl)
				.setName(`${mountPoint.virtualPath} → ${mountPoint.realPath}`)
				.addToggle(toggle => toggle
					.setValue(mountPoint.enabled)
					.onChange(async (value) => {
						this.plugin.settings.mountPoints[index].enabled = value;
						await this.plugin.saveSettings();
					}))
				.addButton(button => button
					.setButtonText('Remove')
					.onClick(async () => {
						this.plugin.settings.mountPoints.splice(index, 1);
						await this.plugin.saveSettings();
						this.display(); // Refresh the settings display
					}));
		});
	}
}
