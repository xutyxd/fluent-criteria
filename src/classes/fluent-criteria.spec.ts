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

            assert.deepEqual(result, [ toCompare[0], toCompare[8] ]);
        });

        it('should search with defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search.profile.thumbnail.resolution.defined.find(dataset);

            assert.deepEqual(result, [ toCompare[0], toCompare[3], toCompare[6] ]);
        });

        it('should search with custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search.id.custom((property, element, value) => (value as number) % 2 === 0).find(dataset);

            assert.deepEqual(result, [
                toCompare[0],
                toCompare[2],
                toCompare[4],
                toCompare[6],
                toCompare[8]
            ]);
        });
    });
});