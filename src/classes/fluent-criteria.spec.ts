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

            const result = instance.search
                .description.equal('user description')
                .find(dataset);

            assert.deepEqual(result, [ toCompare[0], toCompare[8] ]);
        });

        it('should search with defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .profile.thumbnail.resolution.defined
                .find(dataset);

            assert.deepEqual(result, [ toCompare[0], toCompare[3], toCompare[6] ]);
        });

        it('should search with custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .id.custom((property, element, value) => Number(value) % 2 === 0)
                .find(dataset);

            assert.deepEqual(result, [
                toCompare[0],
                toCompare[2],
                toCompare[4],
                toCompare[6],
                toCompare[8]
            ]);
        });
    });

    describe('FluentCriteria mixed search with AND', () => {

        it('should search with equal AND equal', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .description.equal('user description').and
                .phone.equal('+12345678901')
                .find(dataset);

            assert.deepEqual(result, [ toCompare[0] ]);
        });

        it('should search with defined AND equal', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .profile.thumbnail.resolution.defined.and
                .description.equal('user description')
                .find(dataset);

            assert.deepEqual(result, [ toCompare[0] ]);
        });

        it('should search with custom AND equal', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .id.custom((property, element, value) => Number(value) % 2 === 0).and
                .role.equal('user')
                .find(dataset);

            assert.deepEqual(result, [
                toCompare[2],
                toCompare[4],
                toCompare[6],
                toCompare[8]
            ]);
        });

        it('should search with equal AND defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .description.equal('user description').and
                .profile.thumbnail.resolution.defined
                .find(dataset);

            assert.deepEqual(result, [ toCompare[0] ]);
        });

        it('should search with defined AND defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .profile.thumbnail.resolution.defined.and
                .email.defined
                .find(dataset);

            assert.deepEqual(result,[
                toCompare[0],
                toCompare[3]
             ]);
        });

        it('should search with custom AND defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .id.custom((property, element, value) => Number(value) % 2 === 0).and
                .email.defined
                .find(dataset);

            assert.deepEqual(result,[
                toCompare[0],
                toCompare[2],
                toCompare[8]
            ]);
        });

        it('should search with equal AND custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .role.equal('admin').and
                .id.custom((property, element, value) => Number(value) % 2 === 0)
                .find(dataset);

            assert.deepEqual(result,[
                toCompare[0]
            ]);
        });

        it('should search with defined AND custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .profile.thumbnail.resolution.defined.and
                .id.custom((property, element, value) => Number(value) % 2 === 0).find(dataset);

            assert.deepEqual(result,[
                toCompare[0],
                toCompare[6]
            ]);
        });

        it('should search with custom AND custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .id.custom((property, element, value) => Number(value) > 5).and
                .id.custom((property, element, value) => Number(value) < 7)
                .find(dataset);

            assert.deepEqual(result,[
                toCompare[6]
            ]);
        });
    });

    describe('FluentCriteria mixed search with OR', () => {

        it('should search with equal OR equal', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .description.equal('user description').or
                .phone.equal('+12345678901')
                .find(dataset);

            assert.deepEqual(result, [
                toCompare[0],
                toCompare[8]
            ]);
        });

        it('should search with defined OR equal', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .profile.thumbnail.resolution.defined.or
                .description.equal('user description')
                .find(dataset);

            assert.deepEqual(result, [
                toCompare[0],
                toCompare[3],
                toCompare[6],
                toCompare[8]
            ]);
        });

        it('should search with custom OR equal', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .id.custom((property, element, value) => Number(value) % 2 === 0).or
                .role.equal('user')
                .find(dataset);

            assert.deepEqual(result, [
                toCompare[0],
                toCompare[2],
                toCompare[4],
                toCompare[6],
                toCompare[8],
                toCompare[1],
                toCompare[3],
                toCompare[5],
                toCompare[7],
                toCompare[9]
            ]);
        });

        it('should search with equal OR defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .description.equal('user description').or
                .email.defined
                .find(dataset);

            assert.deepEqual(result, [
                toCompare[0],
                toCompare[8],
                toCompare[2],
                toCompare[3],
                toCompare[5],
                toCompare[9],
            ]);
        });

        it('should search with defined OR defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .profile.thumbnail.resolution.defined.or
                .email.defined
                .find(dataset);

            assert.deepEqual(result,[
                toCompare[0],
                toCompare[3],
                toCompare[6],
                toCompare[2],
                toCompare[5],
                toCompare[8],
                toCompare[9]
            ]);
        });

        it('should search with custom OR defined', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .id.custom((property, element, value) => Number(value) % 2 === 0).or
                .email.defined
                .find(dataset);

            assert.deepEqual(result,[
                toCompare[0],
                toCompare[2],
                toCompare[4],
                toCompare[6],
                toCompare[8],
                toCompare[3],
                toCompare[5],
                toCompare[9]
            ]);
        });

        it('should search with equal OR custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .role.equal('admin').or
                .id.custom((property, element, value) => Number(value) % 2 === 0)
                .find(dataset);

            assert.deepEqual(result, [
                toCompare[0],
                toCompare[2],
                toCompare[4],
                toCompare[6],
                toCompare[8],
            ]);
        });

        it('should search with defined OR custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .profile.thumbnail.resolution.defined.or
                .id.custom((property, element, value) => Number(value) % 2 === 0).find(dataset);

            assert.deepEqual(result,[
                toCompare[0],
                toCompare[3],
                toCompare[6],
                toCompare[2],
                toCompare[4],
                toCompare[8]
            ]);
        });

        it('should search with custom OR custom', () => {
            const instance = new FluentCriteria<IUser>();

            const result = instance.search
                .id.custom((property, element, value) => Number(value) < 1 ).or
                .id.custom((property, element, value) => Number(value) > 8)
                .find(dataset);

            assert.deepEqual(result,[
                toCompare[0],
                toCompare[9]
            ]);
        });
    });
});