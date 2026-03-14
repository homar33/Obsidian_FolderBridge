import { describe, expect, it } from 'vitest';
import { SubmitStateController } from '../src/ui/SubmitStateController';

describe('SubmitStateController', () => {
    it('starts idle and exposes the idle label', () => {
        const controller = new SubmitStateController('Validate and add', 'Adding...');

        expect(controller.isBusy()).toBe(false);
        expect(controller.currentLabel()).toBe('Validate and add');
    });

    it('allows only one in-flight submission at a time', () => {
        const controller = new SubmitStateController('Validate and add', 'Adding...');

        expect(controller.tryBegin()).toBe(true);
        expect(controller.isBusy()).toBe(true);
        expect(controller.currentLabel()).toBe('Adding...');
        expect(controller.tryBegin()).toBe(false);
    });

    it('can be reset after a submission finishes', () => {
        const controller = new SubmitStateController('Save changes', 'Saving...');

        expect(controller.tryBegin()).toBe(true);
        controller.finish();

        expect(controller.isBusy()).toBe(false);
        expect(controller.currentLabel()).toBe('Save changes');
        expect(controller.tryBegin()).toBe(true);
    });
});
