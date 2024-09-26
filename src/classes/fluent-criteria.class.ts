import { IFluentCriteria } from "../interfaces/criteria.interface";
import { Recursivity } from "../types/recursivity.type";

export class FluentCriteria<T> {

    private criteriaSelf(operation: 'and' | 'or', criteria?: IFluentCriteria<T>, lastProperties: string[] = []) {
        return new Proxy({} as Recursivity<T>, {
            get: (_, property) => {

                if (typeof property !== 'string') {
                    return;
                }

                function getValue(object: unknown, properties: string[]) {
                    return properties.reduce((value, property) => {
                        return (value || {})[property as keyof object] || undefined;
                    }, object);
                }

                const and = {
                    equal: (value: unknown) => {
                        return this.andOr({
                            meet: (elements = []) => {
                                // If previous criteria, filter by it
                                const filtered = criteria?.meet(elements) || elements;
                                // Re filter new elements with new criteria
                                return filtered.filter((element) => getValue(element, lastProperties) === value);
                            }
                        });
                    },
                    defined: this.andOr({
                        meet: (elements = []) => {
                            // If previous criteria, filter by it
                            const filtered = criteria?.meet(elements) || elements;
                            // Re filter new elements with new criteria
                            return filtered.filter((element) => (getValue(element, lastProperties) ?? undefined) !== undefined)
                        }
                    }),
                    custom: (fn: (property: string[], element: T, value: unknown) => boolean) => {
                        return this.andOr({
                            meet: (elements = []) => {
                                // If previous criteria, filter by it
                                const filtered = criteria?.meet(elements) || elements;
                                // Re filter new elements with new criteria
                                return filtered.filter((element) => fn(lastProperties, element, getValue(element, lastProperties)))
                            }
                        });
                    }
                };

                const or = {
                    equal: (value: unknown) => {
                       return this.andOr({
                            meet: (elements = []) => {
                                const oneHand = criteria?.meet(elements) ?? [];
                                const otherHand = elements.filter((element) => getValue(element, lastProperties) === value);
                                
                                return [ ...new Set(oneHand.concat(otherHand)) ];
                            }
                        });
                    },
                    defined: this.andOr({
                        meet: (elements = []) => {
                            const oneHand = criteria?.meet(elements) ?? [];
                            const otherHand = elements.filter((element) => (getValue(element, lastProperties) ?? undefined) !== undefined);
                            
                            return [ ...new Set(oneHand.concat(otherHand)) ];
                        }
                    }),
                    custom: (fn: (property: string[], element: T, value: unknown) => boolean) => {
                        return this.andOr({
                            meet: (elements = []) => {
                                const oneHand = criteria?.meet(elements) ?? [];
                                const otherHand = elements.filter((element) => fn(lastProperties, element, getValue(element, lastProperties)))
                                return [ ...new Set(oneHand.concat(otherHand)) ];
                            }
                        });
                    }
                }

                let result;

                const operations = { and, or };
                if (property in and || property in or) {
                    result = operations[operation][property as keyof (typeof and & typeof or)];
                } else {
                    const properties: string[] = [...lastProperties, property];
                    result = this.criteriaSelf(operation, criteria, properties)
                }

                return result;
            }
        });
    }

    private andOr(criteria: IFluentCriteria<T>) {
        return {
            and: this.criteriaSelf('and', criteria),
            or: this.criteriaSelf('or', criteria),
            find: (elements: T[] = []) => {
                return criteria ? criteria.meet(elements) : elements
            }
        };
    }

    public search = this.criteriaSelf('and');
}