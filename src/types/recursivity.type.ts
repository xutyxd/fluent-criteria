
import { notBuiltIn } from "./not-built-in.type";
import { CriteriaFilter } from "./criteria-filter.type";
// V1
// type Recursivity<T> = {
//     [K in keyof notBuiltIn<T>]:
//         // Define criteria methods
//         Criteria<Recursivity<T>> &
//         // Define child properties that not are built-in types with criteria methods and
//         {
//             [Y in keyof notBuiltIn<T[K]>]: Criteria<Recursivity<T>>;
//         };
// }

// // V2
// type Recursivity<T> = {
//     [K in keyof notBuiltIn<T>]:
//         // Define criteria methods
//         Criteria<Recursivity<T>>
//         & Recursivity<T[K]>
// }

// V3 not support for custom criteria
// type Recursivity<T, O> = {
//     [K in keyof notBuiltIn<T>]:
//         // Define criteria methods
//         Criteria<Recursivity<O, O>>
//         & Recursivity<T[K] extends object ? T[K] : O, O>
// }

// V4 half support for custom criteria
// type Recursivity<T, O> = {
//     [K in keyof notBuiltIn<T>]:
//         // Define criteria methods
//         Criteria<Recursivity<O, O>, T[K] extends object ? T[K] : O>
//         & Recursivity<T[K] extends object ? T[K] : O, O>
// }

// V5 support for custom criteria
// T: Type
// O: Original
export type Recursivity<T, O = T> = {
    [K in keyof notBuiltIn<T>]:
        // Define criteria methods
        CriteriaFilter<O, T[K]>
        & Recursivity<T[K] extends notBuiltIn<object> ? notBuiltIn<T[K]> : notBuiltIn<O>, O>
}