import { App, Modal, Setting } from 'obsidian';

export class MountRootDeleteModal extends Modal {
    private resolve: (value: 'unmount' | 'delete' | 'unmount-always' | 'delete-always' | 'cancel') => void;
    private dontAskAgain = false;
    private resolved = false;

    constructor(app: App, private mountPath: string, resolve: (value: 'unmount' | 'delete' | 'unmount-always' | 'delete-always' | 'cancel') => void) {
        super(app);
        this.resolve = resolve;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        contentEl.createEl('h2', { text: 'Delete Mounted Folder' });

        contentEl.createEl('p', {
            text: `You are attempting to delete the mounted folder root "${this.mountPath}".`
        });

        contentEl.createEl('p', {
            text: `Do you want to permanently delete the real folder on your hard drive, or just unmount it from Obsidian?`
        });

        new Setting(contentEl)
            .setName("Don't ask again")
            .setDesc("Save this choice in settings")
            .addToggle(toggle => toggle
                .setValue(this.dontAskAgain)
                .onChange(value => {
                    this.dontAskAgain = value;
                })
            );

        const buttonContainer = contentEl.createDiv({ cls: 'modal-button-container' });
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'flex-end';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '20px';

        const btnCancel = buttonContainer.createEl('button', { text: 'Cancel' });
        btnCancel.onclick = () => {
            if (!this.resolved) {
                this.resolved = true;
                this.resolve('cancel');
                this.close();
            }
        };

        const btnUnmount = buttonContainer.createEl('button', { text: 'Unmount Only' });
        btnUnmount.onclick = () => {
            if (!this.resolved) {
                this.resolved = true;
                this.resolve(this.dontAskAgain ? 'unmount-always' : 'unmount');
                this.close();
            }
        };

        const btnDelete = buttonContainer.createEl('button', { text: 'Delete Permanently', cls: 'mod-warning' });
        btnDelete.onclick = () => {
            if (!this.resolved) {
                this.resolved = true;
                this.resolve(this.dontAskAgain ? 'delete-always' : 'delete');
                this.close();
            }
        };
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
        if (!this.resolved) {
            this.resolved = true;
            this.resolve('cancel');
        }
    }
}
