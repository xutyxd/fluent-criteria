
export interface IFluentCriteria<T> {
    meet(array: T[]): T[];
}