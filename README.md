# 📦 Product Ratings & Review API

A full-stack application for managing **products, ratings, reviews, and bulk imports via CSV/Excel** using a modern TypeScript stack.

---

# 🧰 Tech Stack

## Frontend
- React 18+
- Vite
- TypeScript
- Axios
- Material UI (MUI)
- XLSX (Excel parsing)

## Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Multer
- CSV Parser / PapaParse

---

# 📁 Project Structure

```txt
project-root/
│
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# ⚙️ Backend Setup

## 1. Navigate to Backend

```bash
cd backend
```

## 2. Initialize Project

```bash
npm init -y
```

## 3. Install Dependencies

```bash
npm install express cors dotenv @prisma/client multer csv-parser papaparse xlsx
```

## 4. Install Dev Dependencies

```bash
npm install -D typescript ts-node-dev @types/node @types/express @types/cors @types/multer prisma
```

## 5. Initialize TypeScript

```bash
npx tsc --init
```

## 6. Initialize Prisma

```bash
npx prisma init
```

## 7. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
DATABASE_URL="postgresql://app_user:password@localhost:5432/myapp"
PORT=5000
```

## 8. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 9. Start Backend Server

```bash
npm run dev
```

---

# 💻 Frontend Setup

## 1. Navigate to Frontend

```bash
cd dashboard
```

## 2. Install Dependencies

```bash
npm install axios @mui/material @mui/icons-material @emotion/react @emotion/styled xlsx
```

## 3. Start Frontend Server

```bash
npm run dev
```

---

# 🚀 Features

- 📦 Product Management
- ⭐ Product Ratings
- 📝 Product Reviews
- 📂 CSV/Excel Bulk Upload
- 🔍 Search & Filter Support
- 📊 Data Table Rendering
- ⚡ REST API Integration
- 🎨 Responsive UI with Material UI

---

# 🗄️ Database

This project uses PostgreSQL with Prisma ORM.

Example connection:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

---

# 📡 API Stack

- Express REST APIs
- Prisma ORM Queries
- File Upload Handling with Multer
- CSV Parsing with csv-parser / PapaParse
- Excel Parsing with XLSX
