export type Diff<T, U> = T extends U ? never : T;
// Remove types from T that are not assignable to U
export type Filter<T, U> = T extends U ? T : never;

export type Undefinable<T> = T | undefined;
export type NonUndefinable<T> = Diff<T, undefined>;

export type Nullable<T> = T | null | undefined;
export type NonNullable<T> = Diff<T, null | undefined>;
