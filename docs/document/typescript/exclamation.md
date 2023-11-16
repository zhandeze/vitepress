---
title: \!和?的用法 
isTimeLine: true
date: 2021-08-16 11:39:53
---

### `！` 使null和undefined类型可以赋值给其他类型并通过编译

```ts
namespace F {
  
  let val: number

  val = null // 编译不通过
  val = null! // 编译通过

  val = undefined // 编译不通过
  val = undefined! //编译通过
}
```

### `?` 当使用A对象属性A.B时，如果无法确定A是否为空，则需要用A?.B，表示当A有值的时候才去访问B属性，没有值的时候就不去访问，如果不使用?则会报错

```ts
namespace F {
  interface P {
    x: number
  }

  function demo(params?: P) {
    params.x // 编译不通过 params是可选的
    params?.x // 编译通过
    
    let val: number = params?.x // 编译不通过 x可能为undefined
    let val2: number = params?.x! //编译通过
  }
  
}
```
### `!.` 非空断言运算符
```ts
namespace F {
  interface P {
    x: number
  }
  function validate(val: any) {
    return !!val
  }
  function demo(params?: P) {
    if(validate(params)) {
      params!.x //断言 params 非空且访问名称
    }
  }
}
```