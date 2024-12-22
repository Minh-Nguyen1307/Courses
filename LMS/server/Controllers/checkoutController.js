// import CourseModel from "../Models/courseModel.js";
// import UserModel from "../Models/userModel.js";
// import dotenv from "dotenv";
// dotenv.config();

// export const checkout = async (req, res) => {
//     const { userId } = req.body;
  
//     try {
//       const user = await UserModel.findById(userId).populate("cart.items.course");
//       if (!user) return res.status(404).json({ message: "User not found." });
  
//       if (user.cart.items.length === 0) return res.status(400).json({ message: "Cart is empty." });
  
//       // Add cart items to purchasedCourses
//       const purchasedCourses = user.cart.items.map(item => item.course._id);
//       user.purchasedCourses.push(...purchasedCourses);
  
//       // Add to transaction history
//       user.transactionHistory.push({
//         amount: user.cart.totalPrice,
//         date: new Date(),
//         course: purchasedCourses,
//       });
  
//       // Clear cart
//       user.cart.items = [];
//       user.cart.totalPrice = 0;
  
//       await user.save();
//       res.status(200).json({ message: "Checkout successful.", purchasedCourses: user.purchasedCourses });
//     } catch (error) {
//       res.status(500).json({ message: "Server error.", error });
//     }
//   };
  