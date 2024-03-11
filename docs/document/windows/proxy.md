---
title: powershell设置代理
isTimeLine: true
date: 2021-12-24 11:14:39
---

### powershell设置代理
- 新建~/proxy.ps1文件

```sh
param(
  [Parameter(Mandatory=$false)]
  [switch]$off
)

if ($off) {
  $env:HTTPS_PROXY = $null 
  Write-Host "取消设置代理成功"
} else { 
  $env:HTTPS_PROXY = "http://127.0.0.1:10809"
  Write-Host "设置代理成功"
}
```


```sh
> ~\proxy.ps1 # 设置代理成功
> ~\proxy.ps1 -off # 取消设置代理成功
```
