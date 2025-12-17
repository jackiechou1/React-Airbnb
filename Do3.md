# 使用 Supabase PostgreSQL + 配置 Vercel 环境变量（第二部分，小白版）

## A）创建 Supabase 项目（Postgres）
1. 打开 `https://supabase.com` → 注册/登录
2. `New project` → 填项目名、设置数据库密码、选地区 → 创建项目
3. 进入项目后：左侧 `Project Settings` → `Database` → 找到连接信息
4. 复制 Postgres 连接串（`DATABASE_URL`）
   - 示例格式：  
     `postgresql://postgres:<你的密码>@db.<project-ref>.supabase.co:5432/postgres`

## B）在 Supabase 建表（必须）
1. 左侧 `SQL Editor` → `New query`
2. 打开并复制你项目里的 `server/prisma/init.sql` 内容
3. 粘贴到 SQL Editor → 执行（Run）
4. 执行成功后应有表：`users`、`refresh_tokens`

## C）在 Vercel 配置环境变量
1. 回到 Vercel → 进入你的 Project
2. `Settings` → `Environment Variables`
3. 添加（Production / Preview / Development 建议都勾选）
   - `DATABASE_URL`：填 Supabase 的 Postgres 连接串
   - `JWT_ACCESS_SECRET`：设置一个较长的随机字符串（建议 32 位以上）
   - `JWT_REFRESH_SECRET`：设置另一个不同的随机字符串（建议 32 位以上）

（可选）
- `COOKIE_SECURE=true`（线上建议 true）

## D）重新部署让变量生效
- Vercel 项目 → `Deployments` → `Redeploy`（或 push 一次代码触发重新部署）

## E）验证是否成功
1. 打开你 Vercel 的线上地址
2. 去注册/登录
3. 在 Supabase 的 `Table Editor` 查看 `users` 表是否新增记录

