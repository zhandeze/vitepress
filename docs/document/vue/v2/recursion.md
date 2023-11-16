---
title: el-submenu递归组件
isTimeLine: true
date: 2021-08-19 09:36:29
---

```vue
<!-- index.vue -->
<template>
  <div>
    <el-menu :default-active="activeIndex" unique-opened :collapse="false">
      <Submenu v-for="(parent, index) of list" :key="index" :parent="parent" :index="`${index}`" />
    </el-menu>
  </div>
</template>

<script>
import Submenu from './submenu'
export default {
  components: { Submenu },
  data() {
    return {
      activeIndex: '0',
      list: [
        {
          name: '水果',
          children: [
            {
              name: '苹果',
              children: [
                {
                  name: '红苹果'
                },
                {
                  name: '绿苹果'
                }
              ]
            },
            {
              name: '雪梨',
              children: [
                {
                  name: '蓝雪梨'
                },
                {
                  name: '青雪梨'
                }
              ]
            }
          ]
        },
        {
          name: '蔬菜',
          children: [
            {
              name: '上海青',
              children: [
                {
                  name: '小青'
                },
                {
                  name: '大青'
                }
              ]
            },
            {
              name: '白菜',
              children: [
                {
                  name: '小白'
                },
                {
                  name: '大白'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
```

```vue
<!-- Submenu.vue -->
<template>
  <el-submenu :index="index">
    <template slot="title">{{ parent.name }}</template>
    <template v-for="(item, idx) of parent.children">
      <el-menu-item 
        v-if="!item.children" 
        :key="idx" 
        :index="`${index}-${idx}`"
      >
        {{ item.name }}
      </el-menu-item>
      <Submenu v-else :key="idx" :parent="item" :index="`${index}-${idx}`" />
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'Submenu', //递归组件要声明name
  props: {
    index: String,
    parent: Object
  }
}
</script>

```
