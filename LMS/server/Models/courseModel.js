
import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
  nameCourse: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  rating: { type: Number, default: 0 },
  numRatings: { type: Number, default: 0 },
  video: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  prerequisites: { type: String, default: 'None' },
  tags: [String],
  discount: { type: Number, default: 0 },
  enrollmentCount: { type: Number, default: 0 },
  certification: { type: Boolean, default: false },
  chapters: [
    {
      title: { type: String, required: true, trim: true }, // Tiêu đề của chương
      content: { type: String, required: true }, // Nội dung của chương
      duration: { type: String, required: true } // Thời lượng của chương
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Cập nhật updatedAt mỗi khi chỉnh sửa dữ liệu
courseSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Tạo và export model
const CourseModel = mongoose.model('Course', courseSchema);
export default CourseModel;