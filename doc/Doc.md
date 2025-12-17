# 本地登录/注册后端（默认配置）

## 默认约定
- ORM：`Prisma`
- 后端端口：`3001`
- 前端调用前缀：`/api`（开发环境代理到 `http://localhost:3001`）
- 登录态：
  - `accessToken`：前端存 `localStorage`
  - `refreshToken`：后端通过 `httpOnly cookie` 下发（用于续签/保持登录，后续实现）

## PostgreSQL 默认连接信息（本机安装，非 Docker）
> 如与你本机实际不一致，后续以 `.env` 为准覆盖。

- `host`: `localhost`
- `port`: `5432`
- `database`: `airbnb_auth`
- `user`: `postgres`
- `password`: `postgres`

## 需要的环境变量（建议）
- `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/airbnb_auth`
- `JWT_ACCESS_SECRET=change_me_access`
- `JWT_REFRESH_SECRET=change_me_refresh`
- `PORT=3001`


## 本机数据库准备（手动）
1. 确保 PostgreSQL 服务已启动
2. 创建数据库（示例）：
   - `CREATE DATABASE airbnb_auth;`
3. 确保用户具备该库权限（示例）：
   - `GRANT ALL PRIVILEGES ON DATABASE airbnb_auth TO postgres;`

## 后端启动与建表
1. 安装后端依赖：在 `server/` 目录执行 `yarn` 或 `npm i`
2. 复制环境变量：`server/.env.example` → `server/.env` 并按本机情况修改 `DATABASE_URL`
3. 建表（二选一）：
   - Prisma 方式：`cd server` 后执行 `npx prisma migrate dev --name init`，再执行 `npx prisma generate`
   - SQL 方式：把 `server/prisma/init.sql` 在你的 PostgreSQL 上执行一次
4. 启动后端：`cd server` 后执行 `yarn dev`（或 `yarn start`）

## API（本地）
- `POST http://localhost:3001/api/auth/register`
- `POST http://localhost:3001/api/auth/login`
- `GET  http://localhost:3001/api/auth/me`（Bearer token）
- `POST http://localhost:3001/api/auth/refresh`（cookie refresh token）
- `POST http://localhost:3001/api/auth/logout`
- `GET  http://localhost:3001/api/health`




  - 后端服务（Koa2）：server/src/index.js:1、     
    server/src/app.js:1
  - Prisma schema + SQL 建表脚本：server/prisma/  
    schema.prisma:1、server/prisma/init.sql:1     
  - Auth API（注册/登录/me/refresh/logout）：     
    server/src/routes/auth.js:1（前缀 /api/auth） 
  - 默认配置与启动说明写入：Doc.md:1，并在        
    MD1.md:1 补充了代码目录说明
  - 前端已改为调用真实接口：
      - src/services/modules/auth.js:1
      - 登录：src/views/login/index.jsx:1
      - 注册：src/views/register/index.jsx:1      
      - 退出登录会调用后端 logout（同时清本地     
        token）：src/components/app-header/c-cpns/        header-right/index.jsx:1



## 后端服务启动如下：

  - 在本机 PostgreSQL 创建库 airbnb_auth，执行    
    server/prisma/init.sql（或用 Prisma migrate） 
  - cd server → 安装依赖 → 配置 server/.env →     
    yarn dev
  - 前端再启动即可进行真实注册/登录