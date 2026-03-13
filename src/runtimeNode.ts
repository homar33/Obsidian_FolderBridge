type WindowWithNodeRequire = Window & { require?: NodeRequire };

function loadBundledOptionalModule<T>(moduleId: string): T | null {
    try {
        switch (moduleId) {
            case 'chokidar':
                if (typeof require === 'function') return require('chokidar') as T;
                break;
            case '@aws-sdk/client-s3':
                if (typeof require === 'function') return require('@aws-sdk/client-s3') as T;
                break;
            case 'ssh2-sftp-client':
                if (typeof require === 'function') return require('ssh2-sftp-client') as T;
                break;
        }
    } catch {
        return null;
    }

    return null;
}

/**
 * Resolve the host's CommonJS loader without using eval/new Function.
 * Desktop Obsidian exposes `require`; mobile does not.
 */
export function getRuntimeRequire(): NodeRequire | undefined {
    if (typeof require === 'function') {
        return require;
    }

    if (typeof window !== 'undefined') {
        const windowWithRequire = window as WindowWithNodeRequire;
        if (windowWithRequire.require) {
            return windowWithRequire.require;
        }
    }

    return undefined;
}

export function loadOptionalNodeModule<T>(moduleId: string): T | null {
    const bundledModule = loadBundledOptionalModule<T>(moduleId);
    if (bundledModule) {
        return bundledModule;
    }

    const runtimeRequire = getRuntimeRequire();
    if (!runtimeRequire) {
        return null;
    }

    try {
        return runtimeRequire(moduleId) as T;
    } catch {
        return null;
    }
}
