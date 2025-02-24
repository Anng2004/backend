const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();

const prisma = new PrismaClient();

// Middleware parse JSON
app.use(express.json());

// =======================
// CHỈ GIỮ LẠI PHẦN NÀY
// =======================

// POST /users (có log chi tiết)
app.post('/users', async (req, res) => {
  try {
    console.log("POST /users body:", req.body);

    const { username, password, role, name, email } = req.body;
    const user = await prisma.user.create({
      data: { username, password, role, name, email },
    });

    console.log("Created user:", user);
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Lỗi khi tạo người dùng' });
  }
});

// GET /users (có log danh sách)
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log("GET /users result:", users);
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
  }
});

// Chạy server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});
