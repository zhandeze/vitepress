---
title: 将el-table的横向滚动条 始终保持在可视区
isTimeLine: true
date: 2021-09-23 09:52:48
---

```scss
.table-box {
  flex: 1;
  flex-shrink: 0;
  overflow: auto;
  position: relative;
  /deep/.el-table {
    position: absolute;
    width: auto;
    min-width: 100%;
    max-width: none;
  }
}
```