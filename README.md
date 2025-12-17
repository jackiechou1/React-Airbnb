# React Airbnb租房旅游项目

本项目包含：
- 前端：React + Ant Design + 主题/中英切换
- 后端：Koa2 + Prisma + PostgreSQL（注册/登录/鉴权）
- 线上：可部署到 Vercel（前端 + `/api/auth/*` Serverless Functions）

## 本地运行（Windows流程）

### 1）准备 PostgreSQL 数据库
1. 确认 PostgreSQL 服务已启动
2. 创建数据库：`airbnb_auth`
3. 建表：执行 `server/prisma/init.sql`

### 2）启动后端（Koa）
1. 进入后端目录：`cd server`
2. 安装依赖：`yarn`
3. 配置环境变量：复制 `server/.env.example` 为 `server/.env`，并修改 `DATABASE_URL`
4. 启动：`yarn dev`
5. 健康检查：打开 `http://localhost:3001/api/health`

### 3）启动前端（React）
1. 回到项目根目录
2. 安装依赖：`yarn`
3. 启动：`yarn start`

默认情况下，前端会请求本地后端：
- `POST http://localhost:3001/api/auth/register`
- `POST http://localhost:3001/api/auth/login`
- `GET  http://localhost:3001/api/auth/me`

## 线上部署到 Vercel（前端 + 后端函数 + 外部 Postgres）

### 1）准备托管 PostgreSQL
选择 Neon / Supabase / Railway 任意一种，创建数据库并拿到连接串 `DATABASE_URL`。

### 2）Vercel 环境变量
在 Vercel Project → Settings → Environment Variables 配置：
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- （可选）`COOKIE_SECURE=true`（线上建议 true）

### 3）部署
把仓库导入 Vercel 直接部署即可：
- 后端函数入口：`api/auth/[...path].js`
- 第三方房源接口仍通过：`api/proxy.js` + `vercel.json` rewrites

## 目录说明
- 后端：`server/`
- Vercel Auth 函数：`api/auth/[...path].js`
- 登录/注册页面：`src/views/login/`、`src/views/register/`
- 个人资料页：`src/views/profile/`

## 说明
- 浏览器通常会拦截“无用户交互的自动播放声音”，所以背景音乐需要用户点击播放按钮后才会播放。

