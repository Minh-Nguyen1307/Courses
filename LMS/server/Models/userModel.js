// Import cần thiết
import mongoose from "mongoose";

// Định nghĩa mô hình userModel
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  avatar: { type: String, default: '' },
  phoneNumber: { type: String, trim: true },
  lastLogin: { type: Date, default: null },
  paymentMethods: [
    {
      type: { type: String, required: true },
      details: { type: String, required: true },
    },
  ],
  transactionHistory: [
    {
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    },
  ],
  notifications: [
    {
      message: { type: String, required: true },
      isRead: { type: Boolean, default: false },
      date: { type: Date, default: Date.now },
    },
  ],
  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
  ],
  cart: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
      quantity: { type: Number, default: 1 },
      addedAt: { type: Date, default: Date.now },
      PriceBeforeDiscount: { type: Number, default:0},
      PriceDiscount: { type: Number, default:0},
      PriceAfterDiscount: { type: Number, default:0},
    },
    {totalPrice: { type: Number, default:0}}],
  purchasedCourses: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
  ],
  
    

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Cập nhật updatedAt mỗi khi chỉnh sửa dữ liệu
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Tạo và export model
const UserModel = mongoose.model('User', userSchema);
export default UserModel;
