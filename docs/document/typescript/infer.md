---
title: infer
isTimeLine: true
date: 2021-08-02 22:25:37
---

- 仅条件类型的 `extends` 子句中才允许 `infer` 声明

```ts
namespace Infer1 {
  type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

  type Num = Flatten<number[]>
  //type Num = number

  type Str = Flatten<string[]>
  //type Num = string

  type bool = Flatten<boolean>
  // type bool = boolean
}
```

```ts
namespace Infer2 {
  type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

  type Num = GetReturnType<() => number>;
  // type Num = number

  type Str = GetReturnType<(x: string) => string>;
  // type Str = string

  type Nev = GetReturnType<boolean>;
  // type Nev = never
}
```

```ts
namespace Infer3 {
  type GetReturnType<Type> = Type extends (...args: number[]) => infer Return
  ? Return
  : never;

  type Num = GetReturnType<(x: number) => number>
  //type Num = number

  type Nev = GetReturnType<(x: string) => string>
  //type Nev = never
}
```

```ts
namespace Infer4 {
  type ParamType<T> = T extends (...args: infer P) => any ? P : T;

  type Num = ParamType<() => number>
  //这里传了() => number进行 没有传参数，...args就是数组，所以infer P 推荐出来就是[]
  //type Num = []

  type Str = ParamType<(x: string, y: number) => string>
  //这里传了两个参数 所以 inter P就是[x: string, y: number] 
  //type Str = [x: string, y: number]

  type bool = ParamType<boolean>
  //type bool = boolean
}
```