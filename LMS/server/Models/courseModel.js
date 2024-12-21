import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  nameCourse: { type: String,required: true,  trim: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, trim: true },
  rating: { type: Number,required: true, default: 0 },
  numRatings: { type: Number,required: true, default: 0 },

  image: { type: String, required: true },
  author: { type: String, required: true },

  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  prerequisites: { type: String,required: true, default: "None" },
  introduction: {type: String, required: true},
  discount: { type: Number,required: true, default: 0 },
  enrollmentCount: { type: Number,required: true, default: 0 },
  certification: { type: Boolean,required: true, default: false },
  chapters: [
    {
      title: { type: String,required: true,  trim: true }, // Tiêu đề của chương
      content: { type: String, required: true }, // Nội dung của chương
      duration: { type: String, required: true },
      objectives: { type: String, required: true },
      resources: { type: String, required: true },
      video: { type: String, required: true },
      description: { type: String, required: true }, // Thời lượng của chương
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Cập nhật updatedAt mỗi khi chỉnh sửa dữ liệu
courseSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Tạo và export model
const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;
