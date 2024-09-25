
type notString<T> = Omit<T, keyof string>;
type notNumber<T> = Omit<T, keyof number>;
type notBoolean<T> = Omit<T, keyof boolean>;
type notUndefined<T> = { [P in keyof T]-?: notUndefined<NonNullable<T[P]>> };

export type notBuiltIn<T> = notUndefined<notBoolean<notNumber<notString<T>>>>;