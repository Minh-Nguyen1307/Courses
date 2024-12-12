
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
  language: { type: String, default: 'English' },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  prerequisites: { type: String, default: 'None' },
  tags: [String],
  discount: { type: Number, default: 0 },
  enrollmentCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  requirements: [String],
  certification: { type: Boolean, default: false },
  faq: [
    { question: { type: String, required: true }, answer: { type: String, required: true } },
  ],
  support: { type: String, default: '' },
  published: { type: Boolean, default: false },
  lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  chapters: [
    { title: { type: String, required: true }, content: { type: String, required: true } },
  ],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reviewText: { type: String, required: true },
      rating: { type: Number, required: true },
      createdAt: { type: Date, default: Date.now },
    },
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