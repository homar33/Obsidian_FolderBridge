import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { App } from 'obsidian';
import { FileWatcher } from '../src/FileWatcher';
import { PathMapper } from '../src/PathMapper';
import type { MountPoint } from '../src/types';

// ── Chokidar mock ─────────────────────────────────────────────────────────────
// vi.hoisted ensures the variables are initialised before vi.mock hoists the factory.
const { mockWatcherOn, mockWatcherClose, mockWatcherInstance, mockChokidarWatch } = vi.hoisted(() => {
    const on = vi.fn();
    const close = vi.fn();
    const instance = { on, close } as unknown as import('chokidar').FSWatcher;
    on.mockReturnValue(instance); // make .on() chainable
    const watch = vi.fn(() => instance);
    return { mockWatcherOn: on, mockWatcherClose: close, mockWatcherInstance: instance, mockChokidarWatch: watch };
});

vi.mock('chokidar', () => ({ watch: mockChokidarWatch }));

// ── Helpers ───────────────────────────────────────────────────────────────────

function mkMount(id: string, virtualPath: string, realPath: string): MountPoint {
    return { id, virtualPath, realPath, enabled: true, readOnly: false };
}

function makeApp() {
    const mockOnChange = vi.fn().mockResolvedValue(undefined);
    const mockGetAbstractFileByPath = vi.fn(() => null as unknown);
    const mockStat = vi.fn().mockResolvedValue({ size: 100, ctime: 0, mtime: Date.now() });
    const app = {
        vault: {
            onChange: mockOnChange,
            getAbstractFileByPath: mockGetAbstractFileByPath,
            adapter: { stat: mockStat },
        },
    } as unknown as App;
    return { app, mockOnChange, mockGetAbstractFileByPath, mockStat };
}

function makeMapper(mount: MountPoint): PathMapper {
    const mapper = new PathMapper();
    mapper.update([mount], 'test-device');
    return mapper;
}

/** Return the callback registered on the mock watcher for a given chokidar event. */
function getCallback(eventName: string): ((...args: unknown[]) => Promise<void>) {
    const call = mockWatcherOn.mock.calls.find(c => c[0] === eventName);
    if (!call) throw new Error(`No chokidar handler for '${eventName}'`);
    return call[1] as ((...args: unknown[]) => Promise<void>);
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('FileWatcher', () => {
    const mount = mkMount('m1', 'mounts/docs', 'C:/Users/test/Documents');

    beforeEach(() => {
        mockChokidarWatch.mockClear();
        mockWatcherOn.mockClear();
        mockWatcherClose.mockClear();
        mockWatcherOn.mockReturnValue(mockWatcherInstance); // re-establish chaining
    });

    // ── startWatching ──────────────────────────────────────────────────────────

    describe('startWatching', () => {
        it('calls chokidar.watch with the mount real path and required options', () => {
            const { app } = makeApp();
            const fw = new FileWatcher(app, makeMapper(mount), () => false);

            fw.startWatching(mount);

            expect(mockChokidarWatch).toHaveBeenCalledWith(
                'C:/Users/test/Documents',
                expect.objectContaining({
                    followSymlinks: false,
                    ignoreInitial: true,
                    persistent: true,
                })
            );
        });

        it('registers add, change, unlink, addDir, unlinkDir and error handlers', () => {
            const { app } = makeApp();
            const fw = new FileWatcher(app, makeMapper(mount), () => false);

            fw.startWatching(mount);

            const events = mockWatcherOn.mock.calls.map(c => c[0]);
            expect(events).toContain('add');
            expect(events).toContain('change');
            expect(events).toContain('unlink');
            expect(events).toContain('addDir');
            expect(events).toContain('unlinkDir');
            expect(events).toContain('error');
        });

        it('stops the existing watcher before starting a new one for the same mount', () => {
            const { app } = makeApp();
            const fw = new FileWatcher(app, makeMapper(mount), () => false);

            fw.startWatching(mount);
            fw.startWatching(mount); // second call should close the first

            expect(mockWatcherClose).toHaveBeenCalledTimes(1);
            expect(mockChokidarWatch).toHaveBeenCalledTimes(2);
        });
    });

    // ── stopWatching ───────────────────────────────────────────────────────────

    describe('stopWatching', () => {
        it('closes the watcher for the given mount', () => {
            const { app } = makeApp();
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            fw.stopWatching(mount);

            expect(mockWatcherClose).toHaveBeenCalledTimes(1);
        });

        it('is a no-op if the mount is not being watched', () => {
            const { app } = makeApp();
            const fw = new FileWatcher(app, makeMapper(mount), () => false);

            fw.stopWatching(mount);

            expect(mockWatcherClose).not.toHaveBeenCalled();
        });
    });

    // ── stopAll ────────────────────────────────────────────────────────────────

    describe('stopAll', () => {
        it('closes all active watchers', () => {
            const mount2 = mkMount('m2', 'mounts/photos', 'C:/Users/test/Photos');
            const { app } = makeApp();
            const mapper = new PathMapper();
            mapper.update([mount, mount2], 'test-device');
            const fw = new FileWatcher(app, mapper, () => false);

            fw.startWatching(mount);
            fw.startWatching(mount2);
            mockWatcherClose.mockClear();

            fw.stopAll();

            expect(mockWatcherClose).toHaveBeenCalledTimes(2);
        });
    });

    // ── ignored callback ───────────────────────────────────────────────────────

    describe('ignored callback', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function getIgnored(): (p: string) => boolean {
            const { app } = makeApp();
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const options = (mockChokidarWatch.mock.calls as any)[0][1] as Record<string, unknown>;
            return options.ignored as (p: string) => boolean;
        }

        it('ignores hidden files (name starts with .)', () => {
            const ignored = getIgnored();
            expect(ignored('C:/Users/test/Documents/.git')).toBe(true);
            expect(ignored('C:/Users/test/Documents/.DS_Store')).toBe(true);
        });

        it('ignores node_modules', () => {
            const ignored = getIgnored();
            expect(ignored('C:/Users/test/Documents/node_modules')).toBe(true);
        });

        it('does not ignore regular files', () => {
            const ignored = getIgnored();
            expect(ignored('C:/Users/test/Documents/readme.md')).toBe(false);
            expect(ignored('C:/Users/test/Documents/images/photo.jpg')).toBe(false);
        });

        it('applies user-defined ignore rules via isIgnored callback', () => {
            const { app } = makeApp();
            const isIgnored = vi.fn((name: string) => name === 'secret.md');
            const fw = new FileWatcher(app, makeMapper(mount), isIgnored);
            fw.startWatching(mount);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const options = (mockChokidarWatch.mock.calls as any)[0][1] as Record<string, unknown>;
            const ignored = options.ignored as (p: string) => boolean;

            expect(ignored('C:/Users/test/Documents/secret.md')).toBe(true);
            expect(ignored('C:/Users/test/Documents/notes.md')).toBe(false);
        });
    });

    // ── handleEvent (via chokidar callbacks) ──────────────────────────────────

    describe('handleEvent via chokidar callbacks', () => {
        it('file-created: calls vault.onChange with stat when file is new', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue(null);
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('add')('C:/Users/test/Documents/note.md');

            expect(mockOnChange).toHaveBeenCalledWith('file-created', 'mounts/docs/note.md', null, expect.any(Object));
        });

        it('file-created: skips when file already exists in vault', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue({ path: 'mounts/docs/note.md' });
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('add')('C:/Users/test/Documents/note.md');

            expect(mockOnChange).not.toHaveBeenCalled();
        });

        it('file-changed: calls vault.onChange with stat then raw', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue({ path: 'mounts/docs/note.md' });
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('change')('C:/Users/test/Documents/note.md');

            expect(mockOnChange).toHaveBeenCalledWith('file-changed', 'mounts/docs/note.md', null, expect.any(Object));
            expect(mockOnChange).toHaveBeenCalledWith('raw', 'mounts/docs/note.md', null, null);
        });

        it('file-changed: skips when file is not in vault', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue(null);
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('change')('C:/Users/test/Documents/note.md');

            expect(mockOnChange).not.toHaveBeenCalled();
        });

        it('file-removed: calls vault.onChange without stat', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue({ path: 'mounts/docs/note.md' });
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('unlink')('C:/Users/test/Documents/note.md');

            expect(mockOnChange).toHaveBeenCalledWith('file-removed', 'mounts/docs/note.md', null, null);
        });

        it('file-removed: skips when file is not in vault', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue(null);
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('unlink')('C:/Users/test/Documents/note.md');

            expect(mockOnChange).not.toHaveBeenCalled();
        });

        it('folder-created: calls vault.onChange without stat', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue(null);
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('addDir')('C:/Users/test/Documents/subfolder');

            expect(mockOnChange).toHaveBeenCalledWith('folder-created', 'mounts/docs/subfolder', null, null);
        });

        it('folder-removed: calls vault.onChange without stat', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue({ path: 'mounts/docs/subfolder' });
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('unlinkDir')('C:/Users/test/Documents/subfolder');

            expect(mockOnChange).toHaveBeenCalledWith('folder-removed', 'mounts/docs/subfolder', null, null);
        });

        it('file-created: skips vault.onChange when stat() returns null', async () => {
            const { app, mockOnChange, mockGetAbstractFileByPath, mockStat } = makeApp();
            mockGetAbstractFileByPath.mockReturnValue(null);
            mockStat.mockResolvedValue(null);
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await getCallback('add')('C:/Users/test/Documents/note.md');

            expect(mockOnChange).not.toHaveBeenCalled();
        });

        it('does not throw when vault.onChange is not a function', async () => {
            const app = {
                vault: {
                    onChange: null,
                    getAbstractFileByPath: vi.fn(() => null),
                    adapter: { stat: vi.fn().mockResolvedValue({ size: 0, ctime: 0, mtime: 0 }) },
                },
            } as unknown as App;
            const fw = new FileWatcher(app, makeMapper(mount), () => false);
            fw.startWatching(mount);

            await expect(getCallback('add')('C:/Users/test/Documents/note.md')).resolves.toBeUndefined();
        });
    });});