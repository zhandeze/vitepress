---
title: ubuntu设置代理
isTimeLine: true
date: 2021-12-24 11:14:39
---

### ubuntu设置代理
- 新建~/.proxyrc文件

```sh
#!/bin/bash
on="on"
if [ "$1" == "$on" ]; then
        export ALL_PROXY="http://10.10.0.215:10809"
        echo "代理设置成功"
else
        unset ALL_PROXY
        echo "取消代理设置成功"
fi
```


```sh
source ~/.proxyrc on # 设置代理
source ~/.proxyrc off # 取消代理
```
