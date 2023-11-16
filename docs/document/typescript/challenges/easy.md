---
title: easy
isTimeLine: true
date: 2022-03-04 10:54:31
---

### Awaited

- 假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。
- 在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。
- 请你实现一个类型，可以获取这个类型。

```ts
// 1. 等于左边 T extends Promise<unknown> 是先校验传入的类型是否是 Promise
// 2. 使用 infer 来获取 Promise 内的类型
// 3. 获取 R 的类型后在通过 extends 判断是否是Promise类型 如果是则再进行递归调用 MyAwaited，
//    这样不管传入的是多少成 Promise 都能进行解析出来

type myAwaited<T extends Promise<unknown>> = T extends Promise<infer R>
  ? R extends Promise<unknown>
    ? myAwaited<R>
    : R
  : never;

type p = myAwaited<Promise<Promise<Promise<string>>>>; // string
```

### If

```ts
// 左边C是boolean类型
// 右边判断是否为true 是返回 T 否则返回F
type If<C extends boolean, T, F> = C extends true ? T : F;

type a = If<true, 'a', 'b'>; // 'a'
type b = If<false, 'a', 'b'>; // 'b'
```

### Concat

```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U];

type res = Concat<[1, 2], [3]>; // [1, 2, 3]
```

### Includes

- `Array.includes`

```ts
type Includes<T extends any[], U> = U extends T[number] ? true : false;

type l = Includes<[1, 'a'], 'a'>; // true
```

### Push

- `Array.push`

```ts
type Push<T extends any[], U> = [...T, U];
type l = Push<[1, 2], '3'>; // [1, 2, '3']
```

### Unshift

- `Array.unshift`

```ts
type Unshift<T extends any[], U> = [U, ...T];

type res = Unshift<[1, 2], 0>; // [0, 1, 2]
```

### Parameters

```ts
type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type T0 = Parameters<() => string>; // []

type T1 = Parameters<(a: string, b: number) => any>; // [a: string, b: number]

type T2 = Parameters<any>; // unknown[]

type T4 = Parameters<never>; // never
```

### ReturnType

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : never;

type Func = (x: unknown) => boolean;

type res1 = ReturnType<typeof fn>; // 1 | 2
type res2 = ReturnType<Func>; // boolean
```

### Omit

```ts
type User = {
  name: string
  age: number
  sex: string
}

type Exclude<T, U> = T extends U ? never : T

type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>] : T[P]
}



type Omit2<T extends Record<string, any>, K extends keyof T> = {
  [Key in keyof T as (Key extends K ? never : Key)]: T[Key]
}

type r = Omit<User, 'age'> // { name: string, sex: string }
type r2 = Omit2<User, 'age'> // { name: string, sex: string }
```

### Readonly2

- 实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。
- `K`指定应设置为`Readonly`的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

```ts
type User = {
  name: string;
  age: number;
  sex: string;
};

type Exclude<T, U> = T extends U ? never : T;

type Readonly<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
};

type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

type MyReadonly<
  T extends Record<string, any>,
  K extends keyof T = keyof T
> = Omit<T, K> & Readonly<T, K>;

// or
// type MyReadonly<
//   T extends Record<string, any>,
//   K extends keyof T = keyof T
// > = {
//   [P in keyof T as (P extends K ? never : P)]: T[P]
// } & {
//   readonly [P in K]: T[P]
// }

const user: MyReadonly<User, 'sex'> = {
  name: '小明',
  age: 18,
  sex: '男'
};

user.name = '小燕';

user.age = 20;
user.sex = '女'; // 无法分配到 "sex" ，因为它是只读属性。ts(2540)
```

### 深度 Readonly

```ts
type Primitive = string | number | bigint | boolean | symbol | null | undefined;

type _ReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

interface _ReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive
  ? T
  : T extends _ReadonlyArray<infer U>
  ? _ReadonlyArray<U>
  : T extends _ReadonlyObject<infer K>
  ? _ReadonlyObject<K>
  : T;
```

### Chainable Options

```ts
// Exclude<K, keyof T> 这句是排除重复的key
// 例如 config.option('foo', 123).option('foo', 456)
// 会报 类型“string”的参数不能赋给类型“never”的参数。
type Chainable<T extends Record<string, unknown> = {}> = {
  option<K extends string, V = unknown>(
    key: Exclude<K, keyof T>,
    value: V
  ): Chainable<T & Record<K, V>>;
  get(): T;
};

declare const config: Chainable;

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// result 的类型是：
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

### Last of Array

- 返回数组最后一个元素

```ts
type arr1 = ['a', 'b', 'c'];
type arr2 = [3, 2, 1];

type Last1<T extends unknown[]> = T extends [...unknown[], infer R] ? R : never;
type Last2<T extends unknown[]> = T extends [...(infer Rest), infer R]
  ? R
  : never;
```

### Array 的操作

```ts
type arr1 = ['a', 'b', 'c'];

// 取第一个元素
type First<T extends unknown[]> = T[0];
type v1 = First<arr1>;

// 取最后一个元素
type Last<T extends unknown[]> = T extends [...(infer Rest), infer R]
  ? R
  : never;
type v2 = Last<arr1>; // ['c']

// 返回没有第一个元素的数组
type Shift<T extends unknown[]> = T extends [infer R, ...(infer Rest)]
  ? Rest
  : never;
type v3 = Shift<arr1>; // ['b', 'c']

// 返回没有最后一个元素的数组
type Pop<T extends unknown[]> = T extends [...(infer Rest), infer R]
  ? Rest
  : never;
type v4 = Pop<arr1>; // ['a', 'b']

// 向数组前面添加元素
type Unshift<T extends unknown[], V = unknown> = [V, ...T];
type v5 = Unshift<arr1, 'A'>; // ['A', 'a', 'b', 'c']

// 向数组后面添加元素
type Push<T extends unknown[], V = unknown> = [...T, V];
type v6 = Push<arr1, 'd'>; // ['a', 'b', 'c', 'd']
```

### LookUp

```ts
interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

interface Thing {
  type: string;
  [key: string]: any;
}

type LookUp<T extends Thing, K extends string> = T extends T
  ? T['type'] extends K
    ? T
    : never
  : never;

type MyDog = LookUp<Cat | Dog, 'dog'>; // expected to be `Dog`
type MyCat = LookUp<Cat | Dog, 'cat'>; // expected to be `Cat`
```

### Trim

```ts
type Space = ' '| '\n' | '\t'

type TrimLeft<S extends string> = S extends `${Space}${infer Rest}`
  ? TrimLeft<Rest>
  : S


type TrimRight<S extends string> = S extends `${infer Rest}${Space}`
  ? TrimRight<Rest>
  : S

type Trim<T extends string> = TrimRight<TrimLeft<T>>

type NoSpace<S extends string> = S extends `${infer Left}${Space}${infer Right}`
? NoSpace<`${Left}${Right}`>
: S

type str = '   Hello World  '
type trimedLeft = TrimLeft<str> // 'Hello World  '
type trimedRight = TrimRight<str>  // '  Hello World'
type trimed = Trim<str> // 'Hello World'
type no = NoSpace<str>// 'HelloWorld'
```

### Replace

```ts
type Replace<S extends string, From extends string, To extends string> =
  From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S

type replaced = Replace<'types are fun!', 'fun', 'awesome'> // types are awesome!
```

### ReplaceAll

```ts
// 1. 性能应该会好一点 from github
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer F}${From}${infer E}`
  ? `${F}${To}${ReplaceAll<E, From, To>}`
  : S

// 2.
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ''
  ? S
  : S extends `${infer L}${From}${infer R}`
  ? ReplaceAll<`${L}${To}${R}`, From, To>
  : S
```

### Append Argument

- 实现一个范型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```ts
type Fn = (a: number, b: string) => number;

type AppendArgument<
  Fn extends (...args: any[]) => unknown,
  A = unknown
> = Fn extends (...args: infer P) => infer R
  ? (...args: [...P, A]) => R
  : never;

type Result = AppendArgument<Fn, boolean>; // (args_0: number, args_1: string, args_2: boolean) => number
```

### Permutation

```ts
type Permutation<T, U = T> = [T] extends [never]
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : [];

// U = 'A' | 'B' | 'C'
// T extends U 进入循环 T = 'A'
// [T, Permutation<Exclude<U, T>>]
// Exclude<U, T> 排除A后 相当于 Permutation<'B' | 'C'>
// Permutation<'B' | 'C'> 进入递归 会返回两次
// 第一次返回 'B' 'C' => ['A', 'B', 'C']
// 第二次返回 'C' 'B' => ['A', 'C', 'B']
// 接着下一次循环 T = 'B' 如此反复
// =======
// [T] extends [never]
// 当进入最后一次递归时，也就是Exclude<'C', 'C'> => never
// 也就是Permutation<never>
// 此时 [T] extends [never] 条件是成立的 返回[]

type perm = Permutation2<'A' | 'B' | 'C'>;
// 输出 ["A", "B", "C"] | ["A", "C", "B"] | ["B", "A", "C"] |
//     ["B", "C", "A"] | ["C", "A", "B"] | ["C", "B", "A"]
```

### StringLength

```ts

type StringLength<
  S extends string,
  Arr extends string[] = []
> = S extends `${infer First}${infer Rest}`
  ? StringLength<Rest, [First, ...Arr]>
  : Arr['length']


type Len = StringLength<'abcdef'> // 6
```

### Flatten

- 数据扁平化

```ts
type Flatten<T> = T extends [infer First, ...(infer Rest)]
  ? [...Flatten<First>, ...Flatten<Rest>]
  : T extends any[]
  ? T
  : [T];
```

### AppendToObject

```ts
namespace Good {
  type Key = string | symbol | number;
  type AppendToObject<T extends Record<Key, any>, U extends Key, V> = {
    [K in keyof T | U]: K extends U ? V : T[K];
  };
  type Result = AppendToObject<{ id: '1' }, 'value', 4>;
  // 输出 { id: '1', value: 4 }
}
namespace Bad {
  type Key = string | symbol | number;
  type AppendToObject<
    T extends Record<Key, any>,
    U extends Key,
    V extends any
  > = T & { [P in U]: V };

  type Result = AppendToObject<{ id: '1' }, 'value', 4>;
  // 输出 { id: '1' } & { value: 4 }
}
```

### Absolute

- 将 string | number | bigint 转成正整数字符串

```ts
// bigint 长这样 1n -1n 就是整型数字后面n
// bigint 转字符串后，n就去掉，例如：1n => 1, -1n => -1

// 这是github 的答案
type Absolute<T extends string | number | bigint>= `${T}` extends `-${infer R}` ? R : `${T}`

type R1 = Absolute<'-1'> // "1"
type R2 = Absolute<'1'> // "1"
type R3 = Absolute<'-1n'> // "1"
type R4 = Absolute<'1n'> // "1"
type R5 = Absolute<-1_000_000n> // "1000000"
type R6 = Absolute<1_000_000n> // "1000000"

// 刚开始不知道bigint转string 会自动去掉n
// 所以写成了下面这样，复杂了点，但结果是相同的
type Absolute<T extends string | number | bigint, U extends string = ''> = T extends ''
  ? U
  : T extends number | bigint
  ? Absolute<`${T}`>
  : T extends `${infer First}${infer Rest}`
  ? First extends '-' | 'n' | '_'
    ? Absolute<Rest, U>
    : Absolute<Rest, `${U}${First}`>
  : never

type R1 = Absolute<'-1'> // "1"
type R2 = Absolute<'1'> // "1"
type R3 = Absolute<'-1n'> // "1"
type R4 = Absolute<'1n'> // "1"
type R5 = Absolute<-1_000_000n> // "1000000"
type R6 = Absolute<1_000_000n> // "1000000"

```

### StringToUnion

```ts
type StringToUnion<T extends string, U extends string[] = []> = T extends `${infer First}${infer Rest}` ? StringToUnion<Rest, [...U, First]> : U[number]

type r = StringToUnion<'abcde2'> // "a" | "b" | "c" | "d" | "e" | "2"
```

### Merge

- 将两种类型合并成一种类型，第二种类型的键值覆盖第一种类型的键值

```ts
interface Dog {
  name: string;
  age: number;
}

interface Dog2 {
  color: string;
  varieties: string;
  age: boolean;
}

type Merge<F extends Record<string, any>, S extends Record<string, any>> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

type r = Merge<Dog, Dog2>;
// 输出
// {
//   name: string;
//   age: boolean;
//   color: string;
//   varieties: string;
// }
```

### CamelCase

- 驼峰

```ts
type CamelCase<S extends string> = S extends `${infer L}-${infer T}${infer R}`
  ? T extends Uppercase<T>
    ? `${L}-${CamelCase<`${T}${R}`>}`
    : `${L}${Capitalize<T>}${CamelCase<R>}`
  : S

type r1  = CamelCase<'foo-bar-baz'> // 'fooBarBaz'
type r2  = CamelCase<'foo-Bar-Baz'> // 'foo-Bar-Baz'
type r3  = CamelCase<'foo-Bar-baz'> // 'foo-BarBaz'
type r4  = CamelCase<'foo-bar'> // 'fooBar'
type r5  = CamelCase<'foo_bar'> // 'foo_bar'
type r6  = CamelCase<'foo--bar----baz'> // 'foo-Bar---Baz'
type r7  = CamelCase<'a-b-c'> // 'aBC'
type r8  = CamelCase<'a-b-c-'> // 'aBC-'
type r9  = CamelCase<'ABC'> // 'ABC'
type r10 = CamelCase<'-'> // '-'
type r11 = CamelCase<''> // ''
type r12 = CamelCase<'😎'> // '😎'
```

### KebabCase
```ts
type KebabCase<S extends string> = S extends `${infer L}${infer R}`
    ? R extends Uncapitalize<R>
      ? `${Lowercase<L>}${KebabCase<R>}`
      : `${Lowercase<L>}-${KebabCase<R>}`
    : S

type r1 = KebabCase<'FooBarBaz'> // 'foo-bar-baz'
type r2 = KebabCase<'fooBarBaz'> // 'foo-bar-baz'
type r3 = KebabCase<'foo-bar'> // 'foo-bar'
type r4 = KebabCase<'foo_bar'> // 'foo_bar'
type r5 = KebabCase<'Foo-Bar'> // 'foo--bar'
type r6 = KebabCase<'ABC'> // 'a-b-c'
type r7 = KebabCase<'-'> // '-'
type r8 = KebabCase<''> // ''
type r9 = KebabCase<'😎'> // '😎'
```

### Diff
```ts
type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}

namespace one {
  type Diff<O, O1> = {
    [K in
      | Exclude<keyof O, keyof O1>
      | Exclude<keyof O1, keyof O>]: K extends keyof O
      ? O[K]
      : K extends keyof O1
      ? O1[K]
      : never
  }
  type r1 = Diff<Foo, Bar> // { gender: number }
  type r2 = Diff<Bar, Foo> // { gender: number }
}

namespace two {
  type Diff<O, O1> = {
    [K in (keyof O | keyof O1) as K extends keyof O & keyof O1
      ? never
      : K]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K] : never
  }
  type r1 = Diff<Foo, Bar> // { gender: number }
  type r2 = Diff<Bar, Foo> // { gender: number }
}
```

### IsUnion

```ts
namespace one {
  type isUnion<T, U = T> = T extends T ? [U] extends [T] ? false : true : false

  type r1 = isUnion<string | boolean> // true
  type r2= isUnion<[string | boolean]> // false
  // A extends A 导致A被分发，所以在[B] extends [A] 这里，B 是联合类型，而A 是分发类型，二者如果不等，那么表示A就是联合类型
}
namespace two {
  type isUnion1<T> = T extends T ? { a: T } : never
  type r1 = isUnion1<string | number> // { a: string } | { a: number }

  type isUnion2<T, U = T> = T extends T ? { a: T, b: U } : never

  type r2 = isUnion2<string | number> // { a: string, b: string | number } | { a: number, b: string | number }
}
```