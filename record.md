# 记录

## windows mysql 安装

mysql 下载地址：[https://dev.mysql.com/downloads/windows/][https://dev.mysql.com/downloads/windows/]  
参考地址： [https://blog.csdn.net/qq_22314145/article/details/80746622][https://blog.csdn.net/qq_22314145/article/details/80746622]  
新建 mysql 根目录下 新建 my.ini

```
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8 
[mysqld]
#设置3306端口
port = 3306 
# 设置mysql的安装目录
basedir=C:\Program Files\mysql-5.7.13-winx64
# 设置mysql数据库的数据的存放目录
datadir=C:\Program Files\mysql-5.7.13-winx64\data
# 允许最大连接数
max_connections=200
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

新建完 my.ini 后，需要在 MYSQL 的安装目录下，手动新建一个 data 文件夹。（见 my.ini 中第 10 行指定了设置 mysql 数据库的数据的存放目录）

```bash
C:Windows\system32>mysqld --romve  //删除mysql服务
C:Windows\system32>mysqld --install //安装mysql服务 
C:Windows\system32>mysqld --initialize //一定要初始化 
C:Windows\system32>net start mysql
```
