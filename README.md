## 服务配置

整个服务的配置文件在config/configuation.ts中统一维护，全局导入configModule，通过configService获取配置信息。

## 日志系统

使用log4js搭建日志系统

## 数据库搭建

npx prisma init --datasource-provider mysql
配置.env环境连接数据库

Prisma 架构中对数据库进行建模
1、npx prisma migrate dev --name init

同步远程数据库表
1、npx prisma db pull
2、prisma generate

npx prisma studio
