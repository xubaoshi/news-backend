## 开发

#### 安装

install mysql
start mysql
import testdb.sql to mysql

```
npm install
```
#### 使用说明

run npm to start server

```
npm run dev
```

前端开发地址：  http://localhost:8080
后端开发地址：  http://localhost:7001

也可以使用：

npm run dev_static 开发前端react+antd的页面

npm run server 开发后端服务器的逻辑

npm run dev 同时开发前后端的业务



## Distribute

```bash
$ npm run build
$ npm run pro
```

npm run build 构建前端代码，前端代码会自动复制到后端目录里面

npm run pro 在服务器启动egg服务，部署上线

访问地址： 
http://serverIP:7001