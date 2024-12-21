import CourseModel from "../Models/courseModel.js";
import UserModel from "../Models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
// Add a course to the cart
export const addToCart = async (req, res) => {
  const { userId } = req.params; // User ID from the route
  const { courseId } = req.body; // Course ID and quantity from the request body

  try {
    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course exists
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if the course is already in the cart
    const cartItem = user.cart.find(item => item.course.toString() === courseId);
    if (cartItem) {
      // If the course is already in the cart, do nothing or return an appropriate message
      return res.status(400).json({ message: "Course is already in the cart" });
    } else {
      // Add the course to the cart with a quantity of 1
      user.cart.push({ course: courseId, quantity: 1 });
    }
    

    await user.save();
    res.status(200).json({ message: "Course added to cart successfully", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove a course from the cart
export const removeFromCart = async (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;

  try {
    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the course from the cart
    user.cart = user.cart.filter(item => item.course.toString() !== courseId);

    await user.save();
    res.status(200).json({ message: "Course removed from cart successfully", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get the user's cart
// Controller to get the user's cart with course details
export const getCart = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the user and populate cart with course details
      const user = await UserModel.findById(userId).populate("cart.course");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Map through the cart to send back the courses
      const cartCourses = user.cart.map(item => item.course);
  
      res.status(200).json({ cart: cartCourses });
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Clear the cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear the cart
    user.cart = [];
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
