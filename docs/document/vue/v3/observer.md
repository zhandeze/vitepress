---
title: observer
isTimeLine: true
date: 2022-03-02 15:20:23
---

### vue 的响应式

- 响应式就是收集依赖和触发依赖的过程

```js
const vm = new Vue({
  data() {
    return {
      a: 1
    }
  },
})
vm.$watch('a', () => {
  console.log('触发了')
})
vm.a = 2
```
- 为什么赋值后，会触发$watch回调函数？
- 因为vue使用了Object.defineProperty对data的数据做拦截
- $watch函数会去访问一下a属性，接着会触发getter拦截器，
- 在getter拦截器会把依赖（就是传入的回调函数）收集到一个依赖容器中
- vm.a = 2 这一行赋值后，会触发setter拦截器，从依赖容器中取出依赖并执行

```js
const data = {
  a: 1
}

function $watch(key, fn) {
  const dep = new Map() // 依赖收集容器
  let val = data[key]
  
  // 对属性做拦截
  Object.defineProperty(data, key, {
    get() {
      dep.set(key, fn) // 收集依赖
      return val
    },
    set(newVal) {
      if(val === newVal) return
      val = newVal
      const cb = dep.get(key)
      cb && cb()
    }
  })

  data[key] // 手动求值 触发getter拦截器收集依赖
}

$watch('a', () => {
  console.log('触发了')
})

data.a = 2 // 会触发setter拦截器，执行依赖

```


```js
const app = new Vue({
  data() {
    return {
      name: '小明',
      age: 18
    }
  },
  methods: {
    onClick() {
      this.name = '小白' // * 点击的时候能触发渲染
    }
  },
  render() {
    return h('div', { on: { click: this.onClick } }, this.name)
  }
})
app.$mount('#app')
```
- this.name = '小白' 这个一行会触发组件更新，也就是重新执行render函数
- 这是怎么做到的呢？
- 这是因为在初始化Vue的时候会去执行render函数渲染
- 对render函数内的属性进行了依赖收集，也是就是this.name这个属性
- 这里的依赖暂时可以理解为是render函数
- 所以在对this.name赋值的时候，会触发setter拦截器，从依赖容器取出依赖并执行
- 接下来我们用代码来实现一下

```js
// 新建一个vue.js
import { render, h } from '../render'

function Vue(options) {
  const vm = this
  const data = options.data()
  const methods = options.methods
  vm._render = () => { // 依赖
    const vnode = options.render.call(vm, h)
    render(vnode, vm.$el)
  }

  // 对data的每个属性做拦截
  for (const key in data) {
    const dep = new Map() // 依赖收集容器
    let val = data[key]
    Object.defineProperty(vm, key, {
      get() {
        dep.set(key, vm._render) // 收集依赖
        return val
      },
      set(newVal) {
        if (val === newVal) return
        val = newVal

        // 触发依赖
        const fn = dep.get(key)
        fn && fn()
      }
    })
  }

  // 处理methods
  for (const key in methods) {
    let val = methods[key].bind(vm)
    Object.defineProperty(vm, key, {
      get() {
        return val
      }
    })
  }
}
Vue.prototype.$mount = function (selector) {
  const vm = this;
  vm.$el = document.querySelector(selector)
  vm._render()
}
export default Vue

// index.js
import Vue from './vue'
import { h } from '../render'

const app = new Vue({
  data() {
    return {
      name: '小明',
      age: 18
    }
  },
  methods: {
    onClick() {
      this.name = '小白' // 点击后触发了setter 从依赖容器取出依赖并执行
    }
  },
  render(h) {
    return h('div', { onclick: this.onClick }, this.name)
  }
})

app.$mount('#app')
```
- 接下我们还要考虑一下对象嵌套的问题, 我们只对当前的第一层数据做了响应
```js
import Vue from './vue'
import { h } from '../render'

const app = new Vue({
  data() {
    return {
      name: '小明',
      age: 18,
      like: {
        spring: '春天',
        summer: '夏天'
      }
    }
  },
  methods: {
    onClick() {
      this.name = '小白' // 点击后触发了setter 从依赖容器取出依赖并执行
    }
  },
  render(h) {
    return h('div', { onclick: this.onClick }, this.name)
  }
})

app.$mount('#app')
```
- 接下来我们需要把data响应式逻辑给封装出去

```js
// 新建 reactive.js
export function reactive(data, vm) {
  const dep = new Map()
  for (const key in data) {
    let val = data[key]
    if(Object.prototype.toString.call(val) === '[object Object]') {
      reactive(val, vm)
    }
    Object.defineProperty(data, key, {
      get() {
        dep.set(key, vm._render)
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        const fn = dep.get(key)
        fn && fn()
      }
    })
  }
}
// vue.js
import { render } from '../render'
import { reactive } from './reactive'
function Vue(options) {
  const vm = this
  const data = vm._data = options.data()
  const methods = options.methods
  vm._render = () => {
    const vnode = options.render.call(vm)
    render(vnode, vm.$el)
  }

  for (const key in data) {
    Object.defineProperty(vm, key, {
      get() {
        // 当使用this.xxx 会触发此getter拦截器
        // 接着执行vm._data[key] 触发reactive的getter拦截器
        return vm._data[key]
      },
      set(newVal) {
        vm._data[key] = newVal
      }
    })
  }

  reactive(data, vm) // 响应式

  // 处理methods
  for (const key in methods) {
    let val = methods[key].bind(vm)
    Object.defineProperty(vm, key, {
      get() {
        return val
      }
    })
  }
}
Vue.prototype.$mount = function (selector) {
  const vm = this;
  vm.$el = document.querySelector(selector)
  vm._render()
}
export default Vue

// index.js
import Vue from './vue'
import { h } from '../render'
const app = new Vue({
  data() {
    return {
      name: '小明',
      age: 18,
      like: {
        spring: '春天',
        summer: '夏天'
      }
    }
  },
  methods: {
    onClick() {
      this.like.spring = '春天来了' 
    }
  },
  render() {
    return h('div', { onclick: this.onClick }, this.like.spring)
  }
})

app.$mount('#app')
```
- 我们之前讲过Map是强引用，然而现在收集的依赖都收集在了Map中，无法释放内存
- 接下来我们来处理一下
- [targetMap](https://www.processon.com/diagraming/621b19040791293390cf5b33)
```js
// 新建effect.js

// 这里也要将依赖函数包装一下
// 确定是在执行依赖函数时，才去收集依赖
// 优化性能
let activeEffect
export function effect(fn) {
  function _effect() {
    try {
      activeEffect = _effect
      return fn()
    } finally {
      activeEffect = undefined
    }
  }
  return _effect
}

const targetMap = new WeakMap() // 弱引用，不会阻止垃圾回收机制回收

export function track(target, key) {
  // 如果activeEffect是undefined
  // 不用收集依赖，直接返回即可
  if(!activeEffect) {
    return
  }

  let depsMap = targetMap.get(target)
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if(!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if(depsMap) {
    const deps = [...depsMap.get(key)]
    deps.forEach(fn => fn())
  }
}

// reactive.js
import { track, trigger } from './effect'

export function reactive(data) {
  for (const key in data) {
    let val = data[key]
    if(Object.prototype.toString.call(val) === '[object Object]') {
      reactive(val)
    }
    Object.defineProperty(data, key, {
      get() {
        track(data, key)
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        trigger(data, key)
      }
    })
  }
  return data
}

// vue.js
import { render } from '../render'
import { reactive } from './reactive'
import { effect } from './effect'
function Vue(options) {
  const vm = this
  const data = vm._data = options.data()
  const methods = options.methods
  
  vm._render = effect(() => {
    const vnode = options.render.call(vm)
    render(vnode, vm.$el)
  })

  for (const key in data) {
    Object.defineProperty(vm, key, {
      get() {
        return vm._data[key]
      },
      set(newVal) {
        vm._data[key] = newVal
      }
    })
  }

  reactive(data)

  // 处理methods
  for (const key in methods) {
    let val = methods[key].bind(vm)
    Object.defineProperty(vm, key, {
      get() {
        return val
      }
    })
  }
}
Vue.prototype.$mount = function (selector) {
  const vm = this;
  vm.$el = document.querySelector(selector)
  vm._render()
}
export default Vue
```

### vue3

```js
// 新建apiCreateApp.js
import { render, h } from '../render'
import { effect } from './effect'

function componentInstance(vnode) {
  const instance = {}
  const component = vnode.tag
  const { setup } = component
  if(setup) {
    const res = setup()
    if(typeof res === 'function') {
      instance.render = res
    } else {
      instance.setupState = res
    }
  }
  return instance
}

export function createApp(rootComponent) {
  const app = {
    mount(selector) {
      const rootVode = h(rootComponent)
      const instance = componentInstance(rootVode)
      const container = document.querySelector(selector)
      instance._update = effect(() => {
        const vnode = instance.render(instance.setupState)
        render(vnode, container)
      })
      instance._update()
    }
  }
  return app
}

// index.js
const app = createApp({
  setup() {
    const data = reactive({
      name: '小明',
      age: 18,
      sex: '男'
    })
    const onclick = () => {
      data.name = '小燕'
      data.age = 20
      data.sex = '女'
      // data是响应式的
    }
    return () => (
      h('div', [
        h('div', data.name),
        h('div', data.age),
        h('div', data.sex),
        h('button', { onclick }, '按钮')
      ])
    )
  }
})
app.mount('#app')
```

- 我们知道vue3已经不用Object.defineProperty来做响应式了
- 因为它只可以定义getter/setter拦截，新增、删除属性无法感知
- 所以vue2才用this.$set()、this.$delete 来弥补
- vue3改用了es6的Proxy来做响应，前面讲过Proxy基本任何操作
- 都是可以拦截的

```js
import Vue from 'vue'

const app = new Vue({
  data() {
    return {
      user: {
        name: '小明',
        age: 18
      }
    }
  },
  methods: {
    onclick() {
      delete this.user.name
      console.log('已经删除', this.user)
      // this.user.sex = '男'
      // console.log('已经增加', this.user)
      // this.$delete(this.user, 'name') // 删除成功
      // this.$set(this.user, 'sex', '男') // 增加成功
    }
  },
  render(h) {
    const { user, onclick } = this
    const keys = Object.keys(user)
    const children = keys.map(key => {
      return h('div', `${key}：${this.user[key]}`)
    })
    return h('div', [
      ...children,
      h('button', { on: { click: onclick } }, '按钮')
    ])
  }
})
app.$mount('#app')
```
### reactive 
- 接下来我们看下vue3的，不过在这之前我们要用Proxy替换Object.defineProperty
- [查看targetMap流程和](https://www.processon.com/diagraming/621b19040791293390cf5b33)

```js

// effect.js
export const ITERATE_KEY = Symbol('iterate') // 使用symbol，保持唯一性

let activeEffect
export function effect(fn) {
  function _effect() {
    try {
      activeEffect = _effect
      return fn()
    } finally {
      activeEffect = undefined
    }
  }
  return _effect
}

const targetMap = new WeakMap()

export function track(target, key) {
  if(!activeEffect) {
    return
  }
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if(!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

export function trigger(target, type, key) {
  const depsMap = targetMap.get(target)
  if(depsMap) {
    const deps = []
    const effects = []
    deps.push(depsMap.get(key))

    switch(type) {
      // 在依赖函数中使用一个对象中不存在的属性 或
      // 循环一个对象，后面操作对其增加属性
      // 前者会收集依赖 key => effect
      // 后者会触发proxy的ownKeys收集依赖 ITERATE_KEY => effect
      // 所以对象增加属性操作，要从depsMap中获取ITERATE_KEY依赖
      case 'add':
      
      // 如果在依赖（effect）函数中，取对象中的keys，例如Object.keys()
      // 这个时候只会触发proxy的ownKeys收集依赖 ITERATE_KEY => effect
      // 不会对属性做依赖收集, 所以对象的增删无法感知 要从depsMap中获取ITERATE_KEY依赖
      // 上述问题add操作同样存在
      case 'delete':
        deps.push(depsMap.get(ITERATE_KEY))
        break;  
    }
    
    deps.forEach(dep => {
      // 对一个响应对象不存在的属性赋值，dep是undefined
      // const data = reactive({}); data.a = 2;
      dep && effects.push(...dep)
    })
    effects.forEach(effect => effect())
  }
}

// reactive.js
import { track, trigger, ITERATE_KEY } from './effect'
import { isObject, hasOwn, hasChanged } from './shared'

const proxyMap = new WeakMap()

export function reactive(target) {
  if(!isObject(target)) {
    console.warn('传入的值不能被响应')
    return target
  }
  const exstingProxy = proxyMap.get(target)
  if(exstingProxy) {
    return exstingProxy
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      const res = Reflect.get(target, key, receiver)

      // 如果是一个对象，将它变成响应式并返回
      if(isObject(res)) {
        return reactive(res)
      }
      return res
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const hadKey = hasOwn(target, key)

      const result = Reflect.set(target, key, value, receiver)
      
      if (!hadKey) {
        trigger(target, 'add', key)
      } else if (hasChanged(value, oldValue)) {
        trigger(target, 'set', key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)

      if(result && hadKey) {
        trigger(target, 'delete', key)
      }
      return result
    },
    ownKeys(target) {
      track(target, ITERATE_KEY)
      return Reflect.ownKeys(target)
    }
  })
  proxyMap.set(target, proxy)
  return proxy
}

// index.js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { reactive } from './reactive'

const app = createApp({
  setup() {
    const user = reactive({
      name: '小明',
      age: 18
    })
    const onclick = () =>  {
      delete user.name
      // user.sex = '男'
    }
    return () => {
      const keys = Object.keys(user)
      const children = keys.map(key => {
        return h('div', `${key}：${user[key]}`)
      })
      return h('div', [
        ...children,
        h('button', { onclick } , '按钮')
      ])
    }
  }
})
app.mount('#app')

```
- 只取对象key的例子

```js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { reactive } from './reactive'

const app = createApp({
  setup() {
    const user = reactive({
      name: '小明',
      age: 18
    })
    const onclick = () =>  {
      delete user.name
      // user.sex = '男'
    }
    return () => {
      const keys = Object.keys(user)
      const children = keys.map(key => {
        return h('div', `${key}`)
      })
      return h('div', [
        ...children,
        h('button', { onclick } , '按钮')
      ])
    }
  }
})
app.mount('#app')

```
- api isReactive
```js
// reactive.js
import { track, trigger, ITERATE_KEY } from './effect'
import { isObject, hasOwn, hasChanged } from './shared'

const ReactiveFlags = {
  IS_REACTIVE: '__v_isReactive'
}

const proxyMap = new WeakMap()

export function reactive(target) {
  ...
  const proxy = new Proxy(target, {
    get(target, key, receiver) {

      if(key === ReactiveFlags.IS_REACTIVE) {
        return true
      }
      ...
      return res
    },
    ...
}

export function isReactive(value) {
  return Boolean(value && value[ReactiveFlags.IS_REACTIVE])
}
```

- api toRaw

```js
import { track, trigger, ITERATE_KEY } from './effect'
import { isObject, hasOwn, hasChanged } from './shared'

const ReactiveFlags = {
  IS_REACTIVE: '__v_isReactive',
  RAW: '__v_raw'
}


export function reactive(target) {
 ...
  const proxy = new Proxy(target, {
    get(target, key, receiver) {

      if(key === ReactiveFlags.IS_REACTIVE) {
        return true
      } else if (key === ReactiveFlags.RAW) {
        return target
      }

      ...
    },
    ...
  })
  return proxy
}

export function toRaw(observed) {
  const raw = observed && observed[ReactiveFlags.RAW]
  return raw ? raw : observed 
}

```

### ref

```js
// effect.js
...
export function trigger(target, type, key) {
  const depsMap = targetMap.get(target)
  if(depsMap) {
    const deps = []
    deps.push(depsMap.get(key))

    switch(type) {
      // 在依赖函数中使用一个对象中不存在的属性 或
      // 循环一个对象，后面操作对其增加属性
      // 前者会收集依赖 key => effect
      // 后者会触发proxy的ownKeys收集依赖 ITERATE_KEY => effect
      // 所以对象增加属性操作，要从depsMap中获取ITERATE_KEY依赖
      case 'add':
      
      // 如果在依赖（effect）函数中，取对象中的key，例如Object.keys()
      // 这个时候只会触发proxy的ownKeys收集依赖 ITERATE_KEY => effect
      // 不会对属性做依赖收集, 所以对象的增删无法感知 要从depsMap中获取ITERATE_KEY依赖
      // 上述问题add操作同样存在
      case 'delete':
        deps.push(depsMap.get(ITERATE_KEY))
        break;  
    }
    triggerEffects(deps)
  }
}

// 这里将触发effects的逻辑提出来了
export function triggerEffects(deps) {
  const effects = []
  deps.forEach(dep => {
    dep && effects.push(...dep)
  })
  effects.forEach(effect => effect())
}

export function trackRefValue(ref) {
  if(!activeEffect) {
    return
  }
  if(!ref.dep) {
    ref.dep = new Set()
  }
  ref.dep.add(activeEffect)
}

export function triggerRefValue(ref) {
  if(ref.dep) {
    triggerEffects([ref.dep])
  }
}

// 新建 ref.js
import { trackRefValue, triggerRefValue } from './effect'
import { hasChanged } from './shared'

class Ref {
  constructor(value) {
    // 标记是ref
    this.__v_isRef = true

    this._value = value

    // 依赖收集容器稍候在收集依赖(trackRefValue)的时候
    // 会为他赋值
    this.dep = undefined
  }
  get value() {
    trackRefValue(this) // 收集依赖
    return this._value
  }
  set value(newVal) {
    const oldValue = this._value
    if(hasChanged(newVal, oldValue)) {
      this._value = newVal
      triggerRefValue(this) // 触发依赖
    }
  }
}

export function ref(value) {
  return isRef(value) ? value : new Ref(value)
}

export function isRef(ref) {
  return Boolean(ref && ref.__v_isRef)
}

// index.js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { ref } from './ref'

const app = createApp({
  setup() {
    // 定义响应数据
    const count = ref(0)
    const onclick = () => {
      count.value++
    }
    
    return () => (
      h('div', [
        h('div', count.value),
        h('button', { onclick }, '增加')
      ])
    )
  }
})
app.mount('#app')
```

- ref支持传入对象
```js
// ref.js
class Ref {
  constructor(value) {
    // 标记是ref
    this.__v_isRef = true

    // 这里要再定义_rawValue来保存原始值
    // 因为在set的时候要用来比较
    // 在setter拦截器不好比较
    // 如果传进来是一个reactive过的对象
    // 例如：ref(reactive({})) 
    // 所以这里使用toRaw(value)
    // 拿到原始对象 
    this._rawValue = toRaw(value)

    this._value = isObject(value) ? reactive(value) : value

    // 依赖收集容器稍候在收集依赖(trackRefValue)的时候
    // 会为他赋值
    this.dep = undefined
  }
  get value() {
    trackRefValue(this)
    return this._value
  }
  set value(newVal) {
    // 如 ref.value = reactive({})
    // 要使用toRaw(newVal) 获取原始对象 
    newVal = toRaw(newVal)
    
    const oldValue = this._rawValue
    if(hasChanged(newVal, oldValue)) {
      this._value = isObject(newVal) ? reactive(newVal) : newVal
      triggerRefValue(this)
    }
  }
}

export function ref(value) {
  return isRef(value) ? value : new Ref(value)
}

export function isRef(ref) {
  return Boolean(ref && ref.__v_isRef)
}

```

### computed

```js
// effect.js
let activeEffect
export function effect(fn, options = {}) {
  function _effect() {
    try {
      activeEffect = _effect
      return fn()
    } finally {
      activeEffect = undefined
    }
  }
  _effect.options = options
  return _effect
}
...
export function triggerEffects(deps) {
  const effects = []
  deps.forEach(dep => {
    dep && effects.push(...dep)
  })
  effects.forEach(effect => {
    const { scheduler } = effect.options
    scheduler ? scheduler() : effect();
  })
}
...

// computed.js
import { effect, trackRefValue, triggerRefValue } from './effect'
import { isFunction, NOOP } from './shared'
class Computed {
  constructor(getter, setter) {
    
    // 使用_dirty来标记computed的值是否有变化
    // 只有使用了computed计算属性才会进行求值, 反之则不会
    // 例如：我定义一个 const fullName = computed(() => { 可能是很复杂的计算逻辑 return xxx })
    // 我在render函数中使用它，所以会等到执行render函数时才会去求值（即传入的getter即this.effect）
    // 这种技术叫脏检查技术
    // 是一种不关心你如何以及何时改变的数据，只关心在特定的检查阶段数据是否改变的数据监听技术.
    this._dirty = true

    // computed也是computed.value形式, 所以这里也要标记__v_isRef为true
    this.__v_isRef = true

    this.dep = undefined
    this.setter = setter
    this.effect = effect(getter, {
      scheduler: () => {
        this._dirty = true
        triggerRefValue(this)
      }
    })
  }
  get value() {
    trackRefValue(this)
    if(this._dirty) {
      this._dirty = false
      this._value = this.effect()
    }
    return this._value
  }

  set value(newVal) {
    this.setter(newVal)
  }
}

export function computed(getterOrOptions) {
  let getter
  let setter
  
  if(isFunction(getterOrOptions)) {
    getter = getterOrOptions
    setter = NOOP
  } else {
    getter = getterOrOptions.get
    setter = getterOrOptions.set
  }

  return new Computed(getter, setter)
}

// index.js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { ref } from './ref'
import { computed } from './computed'

const app = createApp({
  setup() {
    // 定义响应数据
    const firstName = ref('宇智波')
    const lastName = ref('斑')
    const fullName = computed(() => {
      // 在render函数中取值时会触发该函数
      // 触发改函数前computed收集了render effect
      // firstName 和 lastName 依赖收集的时computed的(effect)
      // 所以在click事件中lastName.value的值改变后
      // 先触发computed的scheduler将_dirty改true
      // 接着触发render effect fullName.value再次求值
      // 执行computed的effect 返回宇智波止水
      return firstName.value + lastName.value
    })
    const onclick = () => {
      lastName.value = '止水'
    }
    return () => (
      h('div', [
        h('div', fullName.value),
        h('button', { onclick }, '按钮')
      ])
    )
  }
})
app.mount('#app')
```

- 用了computed后 ref reactive不起作用了
```js
// index.js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { ref } from './ref'
import { computed } from './computed'

const app = createApp({
  setup() {
    // 定义响应数据
    const count = ref(0)
    const firstName = ref('宇智波')
    const lastName = ref('斑')
    const fullName = computed(() => {
      // 在render函数中取值时会触发该函数
      // 触发改函数前computed收集了render effect
      // firstName 和 lastName 依赖收集的时computed的(effect)
      // 所以在click事件中lastName.value的值改变后
      // 先触发computed的scheduler将_dirty改true
      // 接着触发render effect fullName.value再次求值
      // 执行computed的effect 返回宇智波止水
      return firstName.value + lastName.value
    })
    const onclick = () => {
      // lastName.value = '止水'
      count.value++
    }
    return () => (
      h('div', [
        h('div', fullName.value), // 如果注释它，就正常了
        h('div', count.value),
        h('button', { onclick }, '按钮')
      ])
    )
  }
})
app.mount('#app')
```
- 这是什么原因导致的呢？
- [查看嵌套effect流程图](https://www.processon.com/diagraming/621edbb5e0b34d5c4ef5ec1f)
```js
// effect.js
let activeEffect
export function effect(fn, options = {}) {
  function _effect() {
    try {
      activeEffect = _effect
      return fn()
    } finally {
      activeEffect = undefined
    }
  }
  _effect.options = options
  return _effect
}
```
- 解决办法
- 定义一个effectStack栈来维护activeEffect

```js
const effectStack = []
let activeEffect
export function effect(fn, options = {}) {
  function _effect() {
    try {
      effectStack.push(_effect) // 入栈
      activeEffect = _effect
      return fn()
    } finally {
      effectStack.pop() // 出栈

      // 从栈中取出上一个_effect赋值给activeEffect
      activeEffect = effectStack[effectStack.length - 1]
    }
  }
  _effect.options = options
  return _effect
}
```
- 这样就可以完美解决嵌套effect的问题

```js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { reactive } from './reactive'
import { computed } from './computed'

const app = createApp({
  setup() {
    // 定义响应数据
    const user = reactive({
      name: '小明',
      age: 18,
      sex: '男'
    })
    const onclick = () => {
      user.name = '小燕'
      user.age = 20
      user.sex = '女'
    }
    return () => {
      console.log('执行了render函数')
      return h('div', [
        h('div', user.name),
        h('div', user.age),
        h('div', user.sex),
        h('button', { onclick }, '按钮')
      ])
    }
  }
})
app.mount('#app')
```
- 上面例子当点击onclick时，执行了3次render函数
- 这无疑是非常消耗性能的
- 我们想要的效果是无论赋值多少次都只触发一次render函数

### event loop
- [浏览器进程](https://www.processon.com/diagraming/6217461ee0b34d075bafd74b)
- [Render进程](https://www.processon.com/diagraming/621ee2131efad4073261e5ac)
- [event loop](https://www.processon.com/diagraming/62188ee7079129079ae384f6)

```js
// apiCreateApp.js
import { render, h } from '../render'
import { effect } from './effect'
import { queueJob } from './scheduler'

export function createApp(rootComponent) {
  const app = {
    mount(selector) {
      const rootVode = h(rootComponent)
      const instance = componentInstance(rootVode)
      const container = document.querySelector(selector)
      instance._update = effect(
        () => {
          const vnode = instance.render(instance.setupState)
          render(vnode, container)
        },
        {
          // 将更新函数添加进微任务队列 
          // 等待同步执行完成(此时响应式状态已经更新完毕)
          // 再执行， 执行完微任务 => GUI渲染 => 下一个宏任务
          scheduler: () => queueJob(instance._update)
        }
      )
      instance._update()
    }
  }
  return app
}
// scheduler.js
const queueCbs = []
let resolvedPromise = Promise.resolve()
let currentFlushPromise = null
let pending = false

export function nextTick(fn) {
  const promise = currentFlushPromise || resolvedPromise
  return fn ? promise.then(fn) : promise
}

export function queueJob(fn) {
  if (queueCbs.includes(fn)) return

  queueCbs.push(fn)

  if (!pending) {
    pending = true
    currentFlushPromise = resolvedPromise.then(flushJob)
  }
}

function flushJob() {
  pending = false
  const queue = queueCbs.slice()
  queueCbs.length = 0

  queue.forEach(fn => fn())

  currentFlushPromise = null
  
  if(queueCbs.length) {
    // debugger
    console.log('队列执行完毕，发现还有继续执行')
    flushJob()
  }
}
```

```js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { reactive } from './reactive'
import { computed } from './computed'
import { queueJob, nextTick } from './scheduler'

const app = createApp({
  setup() {
    // 定义响应数据
    const user = reactive({
      name: '小明',
      age: 18,
      sex: '男'
    })
    const onclick = () => {
      user.name = '小燕'
      user.age = 20
      user.sex = '女'
      // await nextTick()
      // const root = document.querySelector('#app')
      // console.warn(root.innerHTML) 
      nextTick(() => {
        const root = document.querySelector('#app')
        console.warn(root.innerHTML) 
      })
    }
    return () => {
      console.log('执行了render函数')
      return h('div', [
        h('div', user.name),
        h('div', user.age),
        h('div', user.sex),
        h('button', { onclick }, '按钮')
      ])
    }
  }
})
app.mount('#app')
```

- computed的scheduler函数中还有一点问题
- 我们来看一下

```js
// index.js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { ref } from './ref'
import { computed } from './computed'

const app = createApp({
  setup() {
    // 定义响应数据
    const firstName = ref('宇智波')
    const lastName = ref('斑')
    const fullName = computed(() => {
      return firstName.value + lastName.value
    })
    const onclick = () => {
      // 这里赋值后触发computed的scheduler _dirty为true
      // 接着触发computed.dep收集的effect 通常是render effect
      firstName.value = '木叶'

      // 这里赋值后又触发computed的scheduler，重复执行了上面描述操作
      // 所以需对其做一层判断
      lastName.value = '止水'
    }
    return () => (
      h('div', [
        h('div', fullName.value),
        h('button', { onclick }, '按钮')
      ])
    )
  }
})
app.mount('#app')

// computed.js
class Computed {
  constructor(getter, setter) {
    this._dirty = true
    this.__v_isRef = true
    this.dep = undefined
    this.setter = setter
    this.effect = effect(getter, {
      scheduler: () => {
        // getter函数包裹的响应式数据改变
        // 触发一次就行。
        if(!this._dirty) {
          this._dirty = true
          triggerRefValue(this)
        }
      }
    })
  }
  ...
}
```

### watch

```js
// watch.js
import { isReactive } from './reactive'
import { isRef } from './ref'
import { effect as createEffect } from './effect'
import { NOOP, isArray, isPlainObject, isFunction, hasChanged } from './shared'

/**
 * vue3的watch
 * const foo = ref('foo')
 * const bar = ref('bar')
 * const person = reactive({
 *   name: 'black',
 *   age: 18
 * })
 *
 * watchEffect(() => {
 *   console.log(foo.value)
 * })
 *
 * watchEffect(() => {}, { flush: 'post' })
 *
 * watchEffect(() => {}, { flush: 'sync'})
 *
 * watch(foo, () => {})
 *
 * watch(person, () => {}, { flush: 'sync' })
 *
 * watch([foo, bar], () => {}, { flush: 'post' })
 *
 * watch(() => foo.value, () => {})
 *
 * watch(() => person.age, () => {})
 *
 * 这是我们要实现的
 * watch(foo, () => {})
 * watch(person, () => {})
 * watch(() => foo.value, () => {})
 * watch(() => person.age, () => {})
 */
export function watch(source, cb, options = {}) {
  let oldValue
  let getter
  if (isRef(source)) {
    
    getter = () => source.value
  } else if (isReactive(source)) {
    getter = () => traverse(source)
    options.deep = true
  } else if(isFunction(source)) {
    getter = source
  } else {
    getter = NOOP
  }

  const scheduler = () => {
    const newValue = effect()
    if (options.deep || hasChanged(newValue, oldValue)) {
      try {
        cb(newValue, oldValue)
      } catch (error) {
        console.error(error)
      }
      oldValue = newValue
    }
  }

  const effect = createEffect(getter, { scheduler })

  oldValue = effect() // 执行effect，收集依赖
}

// 递归遍历触发getter
export function traverse(value) {
  if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key])
    }
  }
  return value
}

// index.js
import { ref } from './ref'
import { reactive } from './reactive'
import { watch } from './watch'

const count = ref(0)
const user = reactive({
  name: '小明',
  age: 18
})

watch(count, (newVal, oldVal) => {
  console.log('新值', newVal, '旧值', oldVal)
})
setInterval(() => {
  count.value++
}, 1000)

 
// watch(() => count.value, (newVal, oldVal) => {
//   console.log('新值', newVal, '旧值', oldVal)
// })
// setInterval(() => {
//   count.value++
// }, 1000)

// watch(user, (newVal, oldVal) => {
//   console.log('新值', newVal, '旧值', oldVal)
// })
// user.name = '小燕'

// watch(() => user.name, (newVal, oldVal) => {
//   console.log('新值', newVal, '旧值', oldVal)
// })
// user.name = '小燕'
```

- 在组件中使用
```js
import { h } from '../render'
import { createApp } from './apiCreateApp'
import { ref } from './ref'
import { reactive } from './reactive'
import { watch } from './watch'

const app = createApp({
  setup() {
    // 定义响应数据
    const count = ref(0)
    watch(count, (newVal, oldVal) => {
      console.log('新值', newVal, '旧值', oldVal)
    })
    const onclick = () => {
      count.value++
    }
    return () => (
      h('div', [
        h('div', count.value),
        h('button', { onclick }, '按钮')
      ])
    )
  }
})
app.mount('#app')
```

- traverse这个遍历还有点问题，遇到相同的对象时
- 会重复收集依赖

```js
// index.js
import { reactive } from './reactive'
import { watch } from './watch'

const xiaoming = {
  name: 'xiaoming',
  age: 18,
  sex: '男'
}

const rawData = {
  user1: xiaoming,
  user2: xiaoming
}

const data = reactive(rawData)

watch(data, () => {
  console.log('触发了')
})

data.user1.name = '小燕'
```

- 我们来解决下这个问题
```js
// watch.js

// 递归遍历触发getter
export function traverse(value, seen) {
  // 不是object类型直接返回
  if(!isObject(value)) {
    return
  }

  // 如value存在seen中
  // 则表示已经触发getter
  // 直接return即可
  seen = seen || new Set()
  if(seen.has(value)) {
    return
  }
  seen.add(value)

  for (const key in value) {
    traverse(value[key], seen)
  }
  return value
}
// 逻辑后，就不会重复收集依赖了
```
- 现在的watch只支持同步执行，还不支持异步
- 提问怎么解决

```js
// index.js
import { reactive } from './reactive'
import { watch } from './watch'

const user = reactive({
  name: '小明',
  age: 18,
  sex: '男'
})

watch(user, () => {
  console.log('触发了')
})
debugger
user.name = '小燕'
user.age = 20
user.sex = '女'
```

- 解决方法也很简单，只要将effect添加queueJob队列即可
```js
// watch.js
import { isReactive } from './reactive'
import { isRef } from './ref'
import { effect as createEffect } from './effect'
import { NOOP, isArray, isObject, isPlainObject, isFunction, hasChanged } from './shared'
import { queueJob } from './scheduler'

export function watch(source, cb, options = {}) {
  ...

  const job = () => {
    const newValue = effect()
    if (options.deep || hasChanged(newValue, oldValue)) {
      try {
        cb(newValue, oldValue)
      } catch (error) {
        console.error(error)
      }
      oldValue = newValue
    }
  }

  const scheduler = options.sync ? job : () => queueJob(job)

  const effect = createEffect(getter, { scheduler })

  oldValue = effect() // 执行effect，收集依赖
}
```

