import { AndOr } from "./and-or.type";

// O: Original
// N: Next
export type CriteriaFilter<O, N> = {
    equal: (value: unknown) => AndOr<O>;
    defined: AndOr<O>;
    custom: (fn: (properties: string[], element: N, value: unknown) => boolean) => AndOr<O>;
}