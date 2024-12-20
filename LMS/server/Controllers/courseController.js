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
      introduction,
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
      introduction,
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
    const { category, level, rating, certification, search, sortBy, page = 1, limit = 10 } = req.query;
    
    let filter = {};

    // Filters
    if (category) filter.category = category;
    if (level) filter.level = level;
    if (rating) filter.rating = { $gte: Number(rating) }; // Rating greater than or equal to specified value
    if (certification) filter.certification = certification === "true"; // Boolean filter for certification
    if (search) filter.nameCourse = { $regex: search, $options: "i" }; // Case-insensitive search

    let query = CourseModel.find(filter);

    // Sorting
    if (sortBy) {
      const sortOptions = {
        price: { price: 1 }, // Ascending by price
        "-price": { price: -1 }, // Descending by price
        level: { level: 1 }, // Ascending by level
        "-level": { level: -1 }, // Descending by level
        rating: { rating: -1 }, // Descending by rating
        numRatings: { numRatings: -1 }, // Descending by number of ratings
        discount: { discount: -1 }, // Descending by discount
        new: { updatedAt: -1 }, // Descending by most recently updated
      };
      query = query.sort(sortOptions[sortBy] || {}); // Default to no sorting if sortBy is invalid
    }

    // Pagination
    const skip = (page - 1) * limit; // Calculate how many courses to skip based on the page number
    query = query.skip(skip).limit(Number(limit)); // Apply pagination

    const courses = await query.exec();

    // Get total number of courses for pagination
    const totalCourses = await CourseModel.countDocuments(filter);

    // Send response with courses and pagination details
    res.status(200).json({
      courses,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
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

// Get 4 courses
export const getTopCoursesByEnrollment = async (req, res) => {
  try {
    const courses = await CourseModel.find()
      .sort({ enrollmentCount: -1 })  // Sort by enrollmentCount in descending order
      .limit(5);  // Limit to 4 courses with highest enrollmentCount
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
