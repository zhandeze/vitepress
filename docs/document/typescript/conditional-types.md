---
title: 条件类型
isTimeLine: true
date: 2021-08-02 21:19:30
---

在大多数有用程序的核心，我们必须根据输入做出决策。JavaScript 程序也不例外，但考虑到值可以轻松自省，这些决定也基于输入的类型。 条件类型有助于描述输入和输出类型之间的关系。

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;
// type Example1 = number        

type Example2 = RegExp extends Animal ? number : string;
// type Example2 = string
```