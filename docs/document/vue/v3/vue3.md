---
title: vue3
isTimeLine: true
date: 2022-03-02 15:20:23
---

### vue3

### reactive
```vue
<template>
  <div>{{name}}</div>
  <div>{{age}}</div>
  <div>{{sex}}</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() { // 会在beforeCreate前执行
    // reactive 定义响应数据
    return reactive({
      name: '小明',
      age: 18,
      sex: '男'
    })
  }
})
</script>
```

```vue
<template>
  <div>{{data.name}}</div>
  <div>{{data.age}}</div>
  <div>{{data.sex}}</div>
  <button @click="onclick">按钮</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() { // 会在beforeCreate前执行
    // 定义响应数据
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
    return {
      data,
      onclick
    }
  }
})
</script>
```

### ref

```vue
<template>
  <div>{{count}}</div>
  <button @click="onclick">按钮</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() { // 会在beforeCreate前执行
    // 定义响应数据
    const count = ref(0)
    const onclick = () => {
      count.value++
    }
    return {
      count,
      onclick
    }
  }
})
</script>
```

### ref支持传入对象

```vue
<template>
  <div>{{user.name}}</div>
  <div>{{user.age}}</div>
  <button @click="onclick">按钮</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() { // 会在beforeCreate前执行
    // 定义响应数据
    const user = ref({
      name: '小明',
      age: 18
    })
    const onclick = () => {
      user.value.name = '小白'
      user.value.age = 20
    }
    return {
      user,
      onclick
    }
  }
})
</script>
```


