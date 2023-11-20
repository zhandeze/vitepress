---
title: Dockerfile 中 COPY 和 ADD 命令的区别
isTimeLine: true
date: 2022-04-13 19:07:31
---

### 删除所有容器
```cmd
docker rm $(docker ps -a -q)  
```