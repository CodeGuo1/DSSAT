# DSSAT OA Demo

这是一个可运行的 Java + 前端 OA 系统示例，包含登录、审批、公告和看板统计功能。

## 技术栈

- 后端：Java 17、Spring Boot 3（REST API）
- 前端：React + TypeScript + Vite

## 目录结构

- `backend/`：Spring Boot 服务
- `frontend/`：React 前端

## 运行方式

### 1) 启动后端

```bash
cd backend
mvn spring-boot:run
```

默认端口：`http://localhost:8080`

### 2) 启动前端

```bash
cd frontend
npm install
npm run dev
```

默认地址：`http://localhost:5173`

## 内置功能

- 登录：`POST /api/auth/login`
- 看板：`GET /api/dashboard`
- 审批：`GET /api/approvals`、`POST /api/approvals`
- 公告：`GET /api/announcements`、`POST /api/announcements`

> 说明：当前版本使用内存数据存储，重启后数据会重置，适合作为 OA 项目脚手架基础。
