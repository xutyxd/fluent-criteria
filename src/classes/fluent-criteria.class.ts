import { IFluentCriteria } from "../interfaces/criteria.interface";
import { Recursivity } from "../types/recursivity.type";

export class FluentCriteria<T> {

    private createProxy(operation: 'and' | 'or', criteria?: IFluentCriteria<T>, lastProperties: string[] = []) {
        return new Proxy({} as Recursivity<T>, {
            get: (target, property, receiver) => {

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
                        return this.createAndOrProxy({
                            meet: (elements = []) => {
                                return elements.filter((element) => getValue(element, []) === value);
                            }
                        });
                    },
                    defined: this.createAndOrProxy({
                        meet: (elements = []) => {
                            return elements.filter((element) => (getValue(element, []) ?? undefined) !== undefined)
                        }
                    }),
                    custom: (fn: (property: string, element: T) => boolean) => {
                        return this.createAndOrProxy({
                            meet: (elements = []) => {
                                return elements.filter((element) => fn(property, element))
                            }
                        });
                    }
                };

                const or ={
                    equal: (value: unknown) => {
                       return this.createAndOrProxy({
                            meet: (elements = []) => {
                                const oneHand = criteria?.meet(elements) ?? [];
                                const otherHand = elements.filter((element) => getValue(element, []) === value);
                                
                                return [ ...new Set(oneHand.concat(otherHand)) ];
                            }
                        });
                    },
                    defined: this.createAndOrProxy({
                        meet: (elements = []) => {
                            const oneHand = criteria?.meet(elements) ?? [];
                            const otherHand = elements.filter((element) => (getValue(element, []) ?? undefined) !== undefined);
                            
                            return [ ...new Set(oneHand.concat(otherHand)) ];
                        }
                    }),
                    custom: (fn: (property: string, element: T) => boolean) => {
                        return this.createAndOrProxy({
                            meet: (elements = []) => {
                                const oneHand = criteria?.meet(elements) ?? [];
                                const otherHand = elements.filter((element) => fn(property, element));
                                
                                return [ ...new Set(oneHand.concat(otherHand)) ];
                            }
                        });
                    }
                }

                let result;

                if (property in and || property in or) {
                    result = and[property as keyof typeof and] || or[property as keyof typeof or];
                } else {
                    const properties: string[] = [...lastProperties, property];
                    result = this.createProxy(operation, criteria, properties)
                }

                return result;
            }
        });
    }

    private createAndOrProxy(criteria: IFluentCriteria<T>) {
        return {
            and: this.createProxy('and', criteria),
            or: this.createProxy('or', criteria),
            find: (elements: T[] = []) => {
                return criteria ? criteria.meet(elements) : elements
            }
        };
    }

    public search = this.createProxy('and');
}