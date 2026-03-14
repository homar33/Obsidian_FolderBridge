export class SubmitStateController {
    private busy = false;

    constructor(
        private readonly idleLabel: string,
        private readonly busyLabel: string,
    ) { }

    tryBegin(): boolean {
        if (this.busy) return false;
        this.busy = true;
        return true;
    }

    finish(): void {
        this.busy = false;
    }

    isBusy(): boolean {
        return this.busy;
    }

    currentLabel(): string {
        return this.busy ? this.busyLabel : this.idleLabel;
    }
}
