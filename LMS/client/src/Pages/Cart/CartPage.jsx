import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const CartPage = () => {
  const [cartCourses, setCartCourses] = useState([]);
  const [error, setError] = useState(null);

  const { userId } = useParams(); // Get userId from URL parameters

  // Fetch the user's cart
  const fetchCart = async () => {
    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/cart`
      );
      setCartCourses(response.data.cart); // Set the fetched courses to the state
    } catch (error) {
      setError("Error fetching cart. Please try again later.");
      console.error("Error fetching cart:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  return (
    <div className="mx-10">
      <div className="my-4">
        <p className="text-4xl font-medium">My Cart</p>
      </div>

      <div>
        <nav aria-label="breadcrumb" className="text-lg my-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Cart
            </li>
          </ol>
        </nav>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {cartCourses.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartCourses.map((course) => (
            <li key={course._id} className="mb-6 p-6 border-b rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between space-x-4">
              {/* Left Section: Course Details */}
              <div className="flex items-center space-x-4">
                <img
                  src={course.image}
                  alt={course.nameCourse}
                  className="w-32 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="text-xl font-semibold text-gray-900">{course.nameCourse}</p>
                  <p className="text-sm text-gray-600">By: <span className="font-medium">{course.author}</span></p>
                  <p className="text-sm text-gray-500">Level: <span className="font-medium">{course.level}</span></p>
                </div>
              </div>
          
              {/* Right Section: Price & Discount */}
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">${course.price}</p>
                <p className="text-sm text-gray-500">Discount: <span className="font-medium text-green-500">{course.discount}%</span></p>
              </div>
            </div>
          </li>
          
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
