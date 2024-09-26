import assert from "node:assert";
import { describe, it, beforeEach } from "node:test";

import { IUser, users } from "../mocks/users.dataset";

import { FluentCriteria } from "./fluent-criteria.class";


describe('FluentCriteria class', () => {

    let dataset: IUser[];
    let toCompare: IUser[];

    beforeEach(() => {
        dataset = structuredClone(users);
        toCompare = structuredClone(users);
    });

    describe('FluentCriteria instance', () => {
        it('should instance', () => {
            const instance = new FluentCriteria();

            assert(instance instanceof FluentCriteria);
        });
    });

    describe('FluentCriteria basic search', () => {
        it('should search with equal', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search.description.equal('user description').find(dataset);

            assert.deepEqual(result, [ toCompare[0], toCompare[9] ]);
        });

        it('should search with defined', () => {
            const instance = new FluentCriteria<{ name?: string, age: number }>();

            const result = instance.search.name.defined.find([
                { name: 'xutyxd', age: 20 },
                { name: 'xutyxd', age: 30 },
                { age: 25 }
            ]);

            assert.deepEqual(result, [
                { name: 'xutyxd', age: 20 },
                { name: 'xutyxd', age: 30 }
            ]);
        });

        it.only('should search with custom', () => {
            const instance = new FluentCriteria<{ name: string, age: number }>();

            const result = instance.search.age.custom((property, element, value) => (value as number) % 10 === 0).find([
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