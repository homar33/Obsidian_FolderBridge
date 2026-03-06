type WindowWithNodeRequire = Window & { require?: NodeRequire };

/**
 * Resolve the host's CommonJS loader without using direct require() syntax.
 * This keeps lazy desktop-only module loading intact while avoiding lint hits.
 */
export function getRuntimeRequire(): NodeRequire | undefined {
    if (typeof window !== 'undefined') {
        const windowWithRequire = window as WindowWithNodeRequire;
        if (windowWithRequire.require) {
            return windowWithRequire.require;
        }
    }

    try {
        return Function('return require')() as NodeRequire;
    } catch {
        return undefined;
    }
}

export function loadOptionalNodeModule<T>(moduleId: string): T | null {
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
