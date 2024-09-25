import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";

import { FluentCriteria } from "../../src/classes/fluent-criteria.class";

describe('FluentCriteria class', () => {
    describe('FluentCriteria instance', () => {
        it('should instance', () => {
            const instance = new FluentCriteria();

            assert.equal(instance, FluentCriteria);
        });
    })
});