import assert from "node:assert";
import { describe, it } from "node:test";

import { FluentCriteria } from "./fluent-criteria.class";

describe('FluentCriteria class', () => {
    describe('FluentCriteria instance', () => {
        it('should instance', () => {
            const instance = new FluentCriteria();

            assert(instance instanceof FluentCriteria);
        });
    });

    describe('FluentCriteria basic search', () => {
        it('should search', () => {
            const instance = new FluentCriteria<{ name: string, age: number }>();

            const result = instance.search.name.equal('xutyxd').find([
                { name: 'xutyxd', age: 20 },
                { name: 'xutyxd', age: 30 },
                { name: 'nope', age: 25 }
            ]);

            assert.deepEqual(result, [
                { name: 'xutyxd', age: 20 },
                { name: 'xutyxd', age: 30 }
            ]);
        });
    });
});