---
title: v-longpress长按指令
isTimeLine: true
date: 2021-09-15 11:06:41
---


```js
/**
 * @description 长按指令
 * @example
 * <button v-longpress="onLongpress"></button> 默认长按2000ms会执行
 * <button v-longpress:5000="onLongpress"></button> 长按5000ms会执行
 */
Vue.directive('longpress', {
  bind(el, binding, vnode) {
    let startX, startY, timer;
    const MAX_MOVE_X = 10
    const MAX_MOVE_Y = 10
    const time = Number(binding.arg) || 2000

    if(process.env.NODE_ENV !== 'production') {
      if(binding.arg && !Number(binding.arg)) {
        console.error(
          `v-longpress指令参数必须一个number类型，` +
          `你传入了${binding.arg}`
        )
      }
      if(typeof binding.value !== 'function') {
        return console.error('v-longpress指令的值必须一个函数')
      }
    }

    const cancel = () => {
      clearTimeout(timer)
    }
    const getTouch = (e) => {
      return e.changedTouches ? e.changedTouches[0] : e
    }
    const start = (e) => {
      e.preventDefault()
      const touch = getTouch(e)
      startX = touch.clientX
      startY = touch.clientY
      cancel()
      timer = setTimeout(() => {
        binding.value.call(vnode.context)
      }, time)
    }
    const move = (e) => {
      const touch = getTouch(e)
      const x = Math.abs(touch.clientX - startX)
      const y = Math.abs(touch.clientY - startY)
      //纵向或横向移动超过10px取消长按
      if(x > MAX_MOVE_X || y > MAX_MOVE_Y) {
        cancel()
      }
    }
    const stop = (e) => {
      e.preventDefault()
    }
    el.addEventListener('touchstart', start)
    el.addEventListener('touchmove', move)
    el.addEventListener('touchend', cancel)
    el.addEventListener('click', cancel)
    el.addEventListener('contextmenu', stop)
  }
})
```