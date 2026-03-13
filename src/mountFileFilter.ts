import { MountPoint } from './types';

export const MARKDOWN_EXTENSIONS: ReadonlySet<string> = new Set(['.md', '.canvas', '.mdx']);
export const PDF_EXTENSIONS: ReadonlySet<string> = new Set(['.pdf']);

function getLowercaseExtension(filePath: string): string {
    const leaf = filePath.split('/').pop() ?? filePath;
    const dotIndex = leaf.lastIndexOf('.');
    return dotIndex > 0 ? leaf.slice(dotIndex).toLowerCase() : '';
}

export function isVisibleFileInMount(filePath: string, mount: Pick<MountPoint, 'visibleFileFilter'>): boolean {
    const filter = mount.visibleFileFilter ?? 'all';
    if (filter === 'all') return true;

    const extension = getLowercaseExtension(filePath);
    if (!extension) return false;

    if (filter === 'markdown-only') {
        return MARKDOWN_EXTENSIONS.has(extension);
    }

    if (filter === 'pdf-only') {
        return PDF_EXTENSIONS.has(extension);
    }

    return true;
}
