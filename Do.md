# 本地启动后端 + 数据库 + 跑通登录/注册（小白版，Windows + PostgreSQL）

> 前提：你已经在本机安装并启动了 PostgreSQL（非 Docker）。

## 0）准备
- 一个能执行 SQL 的工具：`pgAdmin`（推荐）或 `psql`
- 项目内后端目录：`server/`

---

## 1）确认 PostgreSQL 正在运行
### 方法A：Windows 服务
1. `Win + R` → 输入 `services.msc` → 回车
2. 找到 `postgresql-x64-xx`（版本号不同）
3. 状态应为“正在运行”；未运行则右键 → 启动

### 方法B：pgAdmin
打开 pgAdmin 能连上服务器即可。

---

## 2）创建数据库 `airbnb_auth`
### 方法A（推荐）：pgAdmin
1. pgAdmin 左侧 `Servers` → 你的 Postgres
2. 展开 `Databases` → 右键 `Create` → `Database...`
3. `Database` 填：`airbnb_auth` → Save

### 方法B：psql
1. PowerShell 执行（按实际用户名改）：`psql -U postgres`
2. 进入后执行：`CREATE DATABASE airbnb_auth;`

---

## 3）建表（两种方式任选其一）

### 方式A（最简单）：执行 SQL 文件 `server/prisma/init.sql`
#### pgAdmin
1. 选中数据库 `airbnb_auth` → 打开 `Query Tool`
2. 打开文件 `server/prisma/init.sql`（复制内容到 Query Tool）
3. 点击执行（闪电按钮）

#### psql
1. 切库：`\c airbnb_auth`
2. 执行脚本（路径不对就用绝对路径）：`\i server/prisma/init.sql`

> 成功后会有表：`users`、`refresh_tokens`

### 方式B：Prisma migrate（更规范）
1. 进入后端目录：`cd server`
2. 安装依赖：`yarn`（或 `npm i`）
3. 复制配置：`server/.env.example` → `server/.env`
4. 修改 `server/.env` 里的 `DATABASE_URL`
5. 执行：
   - `npx prisma migrate dev --name init`
   - `npx prisma generate`

---

## 4）配置后端环境变量 `server/.env`
1. 打开 `server/.env`（没有就从 `server/.env.example` 复制）
2. 重点修改这一行（按你本机账号密码来）：  
   - `DATABASE_URL="postgresql://用户名:密码@localhost:5432/airbnb_auth?schema=public"`
3. 其它默认即可：
   - `PORT=3001`
   - `JWT_ACCESS_SECRET=...`
   - `JWT_REFRESH_SECRET=...`

---

## 5）启动后端（Koa）
1. PowerShell（终端1）：`cd server`
2. 安装依赖（仅第一次需要）：`yarn`
3. 启动后端：`yarn dev`
4. 看到：`[server] listening on http://localhost:3001` 说明后端 OK

---

## 6）启动前端（React）
1. PowerShell（终端2）：回到项目根目录（有 `package.json` 的目录）
2. 启动：`yarn start`

> 前端默认请求 `http://localhost:3001/api/auth/...`（见 `src/services/modules/auth.js`）。

---

## 7）验证是否跑通
### A）浏览器验证
- 打开网站 → 注册 → 登录

### B）接口快速验证（PowerShell）
注册：
`Invoke-RestMethod -Method Post -Uri http://localhost:3001/api/auth/register -ContentType 'application/json' -Body '{\"email\":\"test@example.com\",\"username\":\"test\",\"password\":\"123456\"}'`

登录：
`Invoke-RestMethod -Method Post -Uri http://localhost:3001/api/auth/login -ContentType 'application/json' -Body '{\"account\":\"test@example.com\",\"password\":\"123456\"}'`

---

## 常见问题
- 数据库连不上：检查 PostgreSQL 服务是否启动、`DATABASE_URL` 的用户名/密码/端口是否正确
- 提示已存在：说明注册写入成功（正常）
- CORS：本项目后端已开启 CORS，通常无需额外配置




## 问题修改

后端错误信息改为更友好的中文，并统一返回结构 { code, message,  
    data }：server/src/routes/auth.js:1、server/src/utils/
    response.js:1、server/src/app.js:1
  - 基础安全：
      - 登录失败限流（同 IP 多次失败会短暂阻断）：server/src/      
        middleware/rateLimit.js:1、server/src/routes/auth.js:1     
      - 密码强度校验（≥8位且包含字母+数字），前端表单规则同步：    
        server/src/auth/validators.js:1、src/views/register/       
        index.jsx:1、src/i18n/index.js:1
  - 登录态自动恢复：页面启动会用 accessToken 调 /api/auth/me，失败 
    则尝试 /api/auth/refresh（cookie）续签：src/auth/index.js:1、  
    src/services/modules/auth.js:1、src/index.js:1
  - 新增“个人资料页”证明鉴权闭环：/profile 路由 + 展示当前用户     
    信息 + 退出登录：src/views/profile/index.jsx:1、src/router/    
    index.js:1、src/components/app-header/c-cpns/header-right/     
    index.jsx:1