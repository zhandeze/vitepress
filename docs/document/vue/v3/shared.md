---
title: shared
isTimeLine: true
date: 2022-03-02 15:20:23
---

```js
// shared.js
export const NOOP = () => {}

export const objectToString = Object.prototype.toString
export const toTypeString = value =>objectToString.call(value)

export const isPlainObject = val => toTypeString(val) === '[object Object]'

export const isObject = val => val !== null && typeof val === 'object'

export const isArray = Array.isArray

export const isFunction = val => typeof val === 'function'

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (val, key) => hasOwnProperty.call(val, key)

// 判断value oldValue是否发生了改变
export const hasChanged = (value, oldValue) => !Object.is(value, oldValue)
```