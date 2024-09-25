import { Recursivity } from "./recursivity.type";

export type AndOr<T> = {
    and: Recursivity<T>;
    or: Recursivity<T>;
    find: (elements?: T[]) => T[];
}