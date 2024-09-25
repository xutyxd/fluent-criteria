"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const node_test_1 = require("node:test");
const fluent_criteria_class_1 = require("../../src/classes/fluent-criteria.class");
(0, node_test_1.describe)('FluentCriteria class', () => {
    (0, node_test_1.describe)('FluentCriteria instance', () => {
        (0, node_test_1.it)('should instance', () => {
            const instance = new fluent_criteria_class_1.FluentCriteria();
            node_assert_1.default.equal(instance, fluent_criteria_class_1.FluentCriteria);
        });
    });
});
