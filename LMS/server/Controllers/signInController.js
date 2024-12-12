import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../Models/userModel.js";


export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra đầu vào
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Tìm người dùng qua email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Tạo JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    // Phản hồi đăng nhập thành công
    res.status(200).json({
      message: "Sign-in successful!",
      user: {
        userId: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      token,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
