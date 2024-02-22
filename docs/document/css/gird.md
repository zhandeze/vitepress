---
title: gird note
isTimeLine: true
date: 2021-12-24 11:14:39
---

# `auto-fill`用尽可能多的列填充行。因此，只要新列可以容纳，它就会创建隐式列，因为它试图用尽可能多的列填充行。
- 例如屏幕宽度为1200px 会创建2个隐式列
- 总结：需要保持固定宽度使用它

```html
<style>
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
</style>
<div class="box">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div class="item">9</div>
  <div class="item">10</div>
</div>
```

# `auto-fit`通过展开 CURRENTLY AVAILABLE 列以占用任何可用空间，使它们适合空间。浏览器在用额外的列填充多余的空间（如 auto-fill ）然后折叠空的列后执行此操作。
- 总结：始终填充剩于空间

```html
<style>
  .box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
</style>
<div class="box">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div class="item">9</div>
  <div class="item">10</div>
</div>
```