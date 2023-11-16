---
title: inheritAttrs
isTimeLine: true
date: 2021-09-13 13:55:07
---
### inheritAttrs 默认为true 继承根节点的attrs

```js
import { createApp } from 'vue'

createApp({
  inheritAttrs: true,
  template: `<div class="box"></div>`
}, { rootAttr: '根节点属性'} ).mount('#app')
// 输出: <div class="box" rootattr="根节点属性"></div>


createApp({
  inheritAttrs: false, //不继承根元素的attribute
  template: `<div class="box"></div>`
}, { rootAttr: '根节点属性'} ).mount('#app')
// 输出: <div class="box"></div>


createApp({
  inheritAttrs: false,
  template: `<div class="box"><input v-bind="$attrs"/></div>`
}, { rootAttr: '根节点属性'} ).mount('#app')
// 输出：<div class="box"><input rootattr="根节点属性"/></div>


const Hello = defineComponent({
  inheritAttrs: true,
  template: `<span></span>`
})
createApp({
  inheritAttrs: false,
  components: { Hello },
  template: `<div class="box"><Hello v-bind="$attrs"/></div>`
}, { rootAttr: '根节点属性'} ).mount('#app')
// 输出：<div class="box"><span rootattr="根节点属性"></span></div>

const Hello = defineComponent({
  inheritAttrs: false,
  template: `<span></span>`
})
createApp({
  inheritAttrs: false,
  components: { Hello },
  template: `<div class="box"><Hello v-bind="$attrs"/></div>`
}, { rootAttr: '根节点属性'} ).mount('#app')
// 输出：<div class="box"><span></span></div>
```



```js

```