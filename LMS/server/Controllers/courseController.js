// Import the Course model
import dotenv from "dotenv";
import CourseModel from "../Models/courseModel.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// Create a new course
export const createCourse = async (req, res) => {
  try {
    const {
      nameCourse,
      price,
      category,
      rating,
      numRatings,
      author,
      level,
      prerequisites,
      tags,
      discount,
      enrollmentCount,
      certification,
      chapters,
    } = req.body;

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(
      req.files.image[0].path,
      {
        folder: "course_images", // Optional folder for organization
        allowed_formats: ["jpg", "png", "jpeg"],
      }
    );

    // Upload video to Cloudinary
    // const videoUpload = await cloudinary.uploader.upload(req.files.video[0].path, {
    //   resource_type: 'video', // Specify the resource type for videos
    //   folder: 'course_videos',
    // });

    // Create a new course object
    const course = new CourseModel({
      nameCourse,
      price,
      category,
      rating,
      numRatings,
      author,
      level,
      prerequisites,
      tags,
      discount,
      enrollmentCount,
      certification,
      chapters: JSON.parse(chapters), // Parse chapters if sent as a JSON string
      image: imageUpload.secure_url, // Use the secure Cloudinary URL
    });

    // Save the course to the database
    const savedCourse = await course.save();

    // Delete uploaded files from the server
    if (req.files.image) fs.unlinkSync(req.files.image[0].path);
    // if (req.files.video) fs.unlinkSync(req.files.video[0].path);

    // Return the saved course
    res.status(200).json({
      message: "Course uploaded successfully",
      courseId: savedCourse._id,
      savedCourse,
    });
  } catch (err) {
    res.status(500).json({ message: "Error uploading course", error: err });
  }
};

// Get all courses with optional filters
export const getCourses = async (req, res) => {
  try {
    const { category, level, search, sortBy, limit } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (level) filter.level = level;
    if (search) filter.nameCourse = { $regex: search, $options: "i" }; // Case-insensitive search

    let query = CourseModel.find(filter);

    // Sorting
    if (sortBy) {
      const sortOptions = sortBy === "price" ? { price: 1 } : { price: -1 }; // Example: price ascending or descending
      query = query.sort(sortOptions);
    }

    // Limiting the results
    if (limit) query = query.limit(Number(limit));

    const courses = await query.exec();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id).populate(
      "reviews.user",
      "name email"
    );
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a review to a course
export const addReview = async (req, res) => {
  try {
    const { reviewText, rating } = req.body;
    const course = await CourseModel.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const review = {
      user: req.user.id, // Assuming user ID is stored in req.user
      reviewText,
      rating,
    };

    course.reviews.push(review);
    course.numRatings += 1;
    course.rating =
      course.reviews.reduce((sum, review) => sum + review.rating, 0) /
      course.numRatings;

    await course.save();
    res.status(200).json({ message: "Review added successfully", course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get featured courses
export const getFeaturedCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({ isFeatured: true }).limit(5);
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
