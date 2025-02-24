
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();

const prisma = new PrismaClient();

// Middleware để parse JSON request body
app.use(express.json());

// Endpoint mẫu: Lấy danh sách tất cả người dùng (dựa trên model User trong schema Prisma)
//app.get('/users', async (req, res) => {
//  try {
//    const users = await prisma.user.findMany();
//    res.json(users);
//  } catch (error) {
//    res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
//  }
//});
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
app.post('/users', async (req, res) => {
  try {
    // Trước khi thao tác, log dữ liệu nhận được
    console.log("POST /users body:", req.body);

    const { username, password, role, name, email } = req.body;

    // Gọi prisma.user.create()
    const user = await prisma.user.create({
      data: { username, password, role, name, email },
    });

    // Sau khi tạo xong, in user để xem có thực sự được tạo hay không
    console.log("Created user:", user);

    // Gửi response
    res.json(user);
  } catch (error) {
    // Log lỗi chi tiết
    console.error("Error creating user:", error);
    res.status(500).json({ error: 'Lỗi khi tạo người dùng' });
  }
});
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    // Log danh sách user
    console.log("GET /users result:", users);
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
  }
});
