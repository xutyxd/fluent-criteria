import { AndOr } from "./and-or.type";

// O: Original
// N: Next
export type CriteriaFilter<O, N> = {
    equal: (value: unknown) => AndOr<O>;
    defined: AndOr<O>;
    custom: (fn: (property: keyof N, element: N) => boolean) => AndOr<O>;
}