

  ## A）上线方案

  - 前端：继续部署到 Vercel
  - 后端：也部署到 Vercel Functions（把 Koa 改成 app.callback()    导出 handler，不用 listen）
  - 数据库：用 Neon/Supabase 的 Postgres（把 DATABASE_URL 配到 
    Vercel env）
  - 上线后登录/注册、数据存储都是真实可用的


  - 把后端的错误信息做成更友好的中文（现在很多是英文短句）     
  - 登录态改成：前端用 accessToken，并在页面启动时调用 /api/   
    auth/me 做“自动登录恢复”
  - 增加基础安全：简单限流（同 IP 登录失败次数）、密码强度校   
    验、统一返回结构
  - 增加一个“个人资料页”（展示当前用户信息），证明鉴权链路闭环 
  - 把 server 和前端的启动/部署说明写成 1 页 README（老师最看重
    可复现）


## Todo
    
  在 Vercel 配置环境变量 DATABASE_URL、      
  JWT_ACCESS_SECRET、JWT_REFRESH_SECRET（指向 Neon/Supabase 的 
  Postgres），部署后就能真正在线注册/登录并写入数据
