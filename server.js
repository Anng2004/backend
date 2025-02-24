
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();

const prisma = new PrismaClient();

// Middleware để parse JSON request body
app.use(express.json());

// Endpoint mẫu: Lấy danh sách tất cả người dùng (dựa trên model User trong schema Prisma)
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
  }
});

// Endpoint mẫu: Tạo một người dùng mới
app.post('/users', async (req, res) => {
  try {
    const { username, password, role, name, email } = req.body;
    const user = await prisma.user.create({
      data: {
        username,
        password, // Lưu ý: Trong thực tế, bạn nên mã hóa mật khẩu bằng bcrypt hoặc thư viện tương tự
        role,
        name,
        email,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi tạo người dùng' });
  }
});

// Chạy server trên cổng do Railway cung cấp hoặc cổng mặc định 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server đang chạy trên cổng ${port}`);
});