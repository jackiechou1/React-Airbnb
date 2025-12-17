# Koa2 + PostgreSQL + Vercel 登录/注册技术方案（可持久化）

## 目标
- 在 Vercel 部署后可正常注册/登录
- 用户数据持久化存储到 PostgreSQL
- 前端（React）通过 `/api/*` 调用后端
- 支持后续替换为真实业务接口/扩展用户体系

## 总体架构
- **前端**：React（当前项目），部署到 Vercel 静态站点
- **后端**：Vercel Serverless Functions（仓库根目录 `api/`）
  - 每个函数内部使用 **Koa2**（`app.callback()`）处理请求
  - 不使用 `app.listen()`（Serverless 无常驻端口）
- **数据库**：外部托管 **PostgreSQL**（Neon / Supabase / Railway 等）
  - Vercel 无法提供可长期持久化的本地文件 DB

## API 设计（最小可用）
- `POST /api/auth/register`
  - 入参：`email`, `username`, `password`
  - 逻辑：校验唯一性与密码强度；`bcrypt` 生成 `password_hash`；写入 `users`
  - 出参：`user`（脱敏字段）
- `POST /api/auth/login`
  - 入参：`account`（email 或 username）, `password`
  - 逻辑：查用户；`bcrypt.compare` 校验；签发 token
  - 出参：`user` + `accessToken`（或仅 cookie）
- `GET /api/auth/me`
  - 逻辑：校验 `Authorization: Bearer <accessToken>`；返回当前用户
- `POST /api/auth/logout`
  - 逻辑：作废 refresh token（若落库）；清 cookie

## 鉴权方案
- **密码存储**：只存 `password_hash`（bcrypt），绝不存明文
- **Token**：
  - `accessToken`：JWT（建议 15 分钟）
  - `refreshToken`：JWT 或随机串（建议 30 天）
- **refreshToken 存储**：
  - 推荐：**httpOnly cookie**（前端不可读，降低 XSS 风险）
  - 同域部署到 Vercel 时，通常不需要复杂 CORS
- **可撤销**（推荐）：refresh token 落库（存 hash，不存明文），便于退出/踢下线

## PostgreSQL 表结构
### `users`
- `id` uuid pk
- `email` text unique not null
- `username` text unique not null
- `password_hash` text not null
- `created_at` timestamptz not null default now()

### `refresh_tokens`
- `id` uuid pk
- `user_id` uuid fk(users.id)
- `token_hash` text not null
- `expires_at` timestamptz not null
- `created_at` timestamptz not null default now()

## 关键实现要点（Vercel + Serverless）
- **函数形式**：每个 `api/*.js` 导出默认 handler：
  - `export default async (req, res) => app.callback()(req, res)`
- **数据库连接**：
  - 使用 `pg.Pool` 并尽量“全局复用”（减少冷启动连接开销）
  - 托管 PG 通常要求 `ssl: { rejectUnauthorized: false }`（视提供商而定）
- **错误返回**：统一 JSON 错误结构（`code`, `message`），前端用 AntD `message` 提示

## 环境变量（Vercel Project Settings）
- `DATABASE_URL`：Postgres 连接串
- `JWT_ACCESS_SECRET`：access token 密钥
- `JWT_REFRESH_SECRET`：refresh token 密钥
- `NODE_ENV=production`
- `COOKIE_DOMAIN`、`COOKIE_SECURE=true`

## 前端接入
- `src/services/modules/auth.js`（建议新增）
  - `register(data)` -> `POST /api/auth/register`
  - `login(data)` -> `POST /api/auth/login`
  - `me()` -> `GET /api/auth/me`
- 登录成功后：保存 `accessToken`（若非 cookie 方案）更新 UI（Header 用户态）

## 数据需要如何拟定
- 最小字段：`email`、`username`、`password_hash` 即可跑通
- 后续扩展字段：`avatar_url`、`phone`、`role`、`status` 等

## 迁移/建表方式
- 轻量：提供 `sql/migrations/*.sql` 手工执行
- 规范：引入 Prisma/Knex 做迁移与 schema 管理

## 安全与上线注意事项
- 强制 HTTPS（Vercel 默认）
- Cookie：`httpOnly` + `secure` + `sameSite=Lax/Strict`
- 密码策略：最少长度 + 复杂度（按需）
- 限流/防爆破：Serverless 可加简单 IP 频控（或接入 Upstash/Redis）

- 选择 Postgres 托管方并提供 `DATABASE_URL`（开发/生产各一套）
- 在仓库添加：`api/auth/*.js`、DB schema/migration、前端 `auth` service 与登录态管理

## 登录/注册本地后端 + 数据库（PostgreSQL）技术方案

### 目标
- 本地启动一个后端服务并连接数据库，实现真正可用的注册/登录
- 注册信息持久化存储（用户表），登录可校验密码并返回登录态
- 前端（当前 React）通过 API 调用，登录后 Header 头像菜单能识别登录态

### 推荐技术选型（本地优先，后续可迁移部署）
- 后端：Koa2 + koa-router + koa-bodyparser
- 数据库：PostgreSQL
- ORM/SQL：Prisma（迁移/类型安全/开发效率高）或 Knex（更轻量）
- 认证：JWT access token + refresh token（httpOnly cookie）（推荐）
- 密码：bcrypt 哈希存储

### 数据模型（最小可用）
- users
  - id（uuid, pk）
  - email（unique）
  - username（unique）
  - password_hash
  - created_at
- refresh_tokens（推荐）
  - id（uuid, pk）
  - user_id（fk）
  - token_hash（不要明文存 refresh token）
  - expires_at
  - created_at

### 接口设计
- POST /auth/register
  - 入参：email, username, password
  - 校验：必填、邮箱格式、密码长度、email/username 唯一
  - 返回：user（脱敏字段）
- POST /auth/login
  - 入参：account（email 或 username）, password
  - 逻辑：查用户 → bcrypt 校验 → 签发 token
  - 返回：accessToken + user（并设置 refresh cookie）
- GET /auth/me
  - Header：Authorization: Bearer <accessToken>
  - 返回：当前用户信息
- POST /auth/logout
  - 清 refresh cookie（如落库则同时作废 refresh token）

### 前端改造点
- 新增 src/services/modules/auth.js：封装 register/login/me/logout
- 登录/注册页面改为真实请求：
  - 成功后保存 accessToken（内存或 localStorage）并更新 UI
  - 失败显示后端返回的错误信息
- Header 头像菜单：
  - isAuthed 不再用 demo_token，改用真实 token 或 /auth/me 结果

### 本地运行方式
- Postgres：本机 Docker 或本地安装
- 后端：server/ 目录单独 Node 服务（端口例如 3001）
- 前端代理：开发环境把 /api 代理到 http://localhost:3001（或后端直接挂 /api 前缀）

### 代码落地目录（本仓库）
- 后端项目：`server/`
  - Prisma schema：`server/prisma/schema.prisma`
  - SQL 建表脚本（可选）：`server/prisma/init.sql`
  - Koa 入口：`server/src/index.js`
  - Auth 路由：`server/src/routes/auth.js`（`/api/auth/*`）

### 安全与工程建议
- 统一错误码与响应格式：{ code, message, data }
- 登录限流/防爆破：本地可先不做，上线再加（或简单 IP 频控）
- CORS：同域代理下可不配；分离部署时再配 CORS + cookie sameSite

