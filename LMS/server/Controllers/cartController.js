import CourseModel from "../Models/courseModel.js";
import UserModel from "../Models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
// Add a course to the cart
// Backend: Add Course to Cart
export const addToCart = async (req, res) => {
  const { userId } = req.params; // User ID from URL parameter
  const { courseId } = req.body; // Course ID from request body

  try {
    // Ensure the courseId is provided
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Find the user by their ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize cart if it doesn't exist
    if (!Array.isArray(user.cart)) {
      user.cart = []; // Ensure cart is initialized as an array
    }

    // Find the course by its ID
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the course is already in the user's cart
    const existingCartItem = user.cart.find(
      (cartItem) => cartItem.courseId && cartItem.courseId.toString() === course._id.toString()
    );

    if (existingCartItem) {
      return res.status(400).json({ message: "The course is already in the cart" });
    }

    // Calculate prices for a new course being added
    const priceBeforeDiscount = course.price;
    const priceDiscount = course.price * (course.discount / 100);
    const priceAfterDiscount = priceBeforeDiscount - priceDiscount;

    // Add course to the cart with quantity 1
    user.cart.push({
      courseId: course._id,
      quantity: 1,
      PriceBeforeDiscount: priceBeforeDiscount,
      PriceDiscount: priceDiscount,
      PriceAfterDiscount: priceAfterDiscount,
      addedAt: new Date(),
    });

    user.totalPrice = user.cart.reduce((total, item) => total + item.PriceAfterDiscount, 0); // Calculate total price

    // Save the updated user document
    await user.save();

    // Return a success response with the updated cart
    res.status(200).json({
      message: "Course added to cart successfully",
      cart: user.cart, // Send back the updated cart
      totalPrice: user.totalPrice, // Send the total price of the cart
    });
  } catch (error) {
    console.error("Error adding course to cart:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};




// Remove a course from the cart


// Controller to get the user's cart with course details
export const getCart = async (req, res) => {
  const { userId } = req.params; // User ID from URL parameter

  try {
    // Find the user by their ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure the cart exists, if not initialize it as an empty array
    if (!Array.isArray(user.cart)) {
      user.cart = [];
    }
    user.totalPrice = user.cart.reduce((total, item) => total + item.PriceAfterDiscount, 0);
    // Return the cart along with the total price
    res.status(200).json({
      message: "Cart retrieved successfully",
      cart: user.cart,
      totalPrice: user.totalPrice || 0, // Send totalPrice if it exists
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error retrieving cart:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

  

export const removeFromCart = async (req, res) => {
  const { userId } = req.params; // User ID from URL parameter
  const { courseId } = req.body; // Course ID from request body

  try {
    // Ensure the courseId is provided
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Find the user by their ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize cart if it doesn't exist
    if (!Array.isArray(user.cart)) {
      user.cart = []; // Ensure cart is initialized as an array
    }

    // Find the course in the cart
    const courseIndex = user.cart.findIndex(
      (cartItem) => cartItem.courseId.toString() === courseId.toString()
    );

    if (courseIndex === -1) {
      return res.status(404).json({ message: "Course not found in cart" });
    }

    // Remove the course from the cart
    user.cart.splice(courseIndex, 1);

    // Recalculate total price after removal
    user.totalPrice = user.cart.reduce(
      (total, item) => total + item.PriceAfterDiscount,
      0
    );

    // Save the updated user document
    await user.save();

    // Return a success response with the updated cart
    res.status(200).json({
      message: "Course removed from cart successfully",
      cart: user.cart, // Send back the updated cart
      totalPrice: user.totalPrice, // Send the total price of the cart
    });
  } catch (error) {
    console.error("Error removing course from cart:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

