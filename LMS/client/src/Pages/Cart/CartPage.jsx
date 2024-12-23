import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const [cartCourses, setCartCourses] = useState([]);
  const [error, setError] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const { userId } = useParams();

  // Fetch Cart Data
  const fetchCart = async () => {
    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/cart`
      );
      setCartCourses(response.data.cart);
      setDiscountedPrice(response.data.totalPrice || 0); // Update total price
    } catch (error) {
      setError("Error fetching cart. Please try again later.");
      console.error("Error fetching cart:", error.message);
    }
  };

  // Remove Course from Cart
  const removeFromCart = async (courseId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/cart`,
        { data: { courseId } }
      );
      setCartCourses(response.data.cart); // Update cart state after removal
      setDiscountedPrice(response.data.totalPrice); // Update total price
    } catch (error) {
      setError("Error removing course from cart. Please try again.");
      console.error("Error removing course:", error.message);
    }
  };

  // Effect Hook to Fetch Cart Data
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
              <Link to={`/${userId}`}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              My Cart
            </li>
          </ol>
        </nav>
      </div>

      <div className="w-full flex justify-between mb-5">
        <div className="w-2/3 pr-4">
          {error && <p className="text-red-600">{error}</p>}

          {cartCourses.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartCourses.map((course, index) => (
                <li
                  key={course._id}
                  className="mb-2 p-6 border-b rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-2/3"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4 w-full">
                      <p className="text-lg text-gray-500">
                        <span className="font-semibold">{index + 1}</span>
                      </p>
                      <img
                        src={course.image}
                        alt={course.nameCourse}
                        className="w-32 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-xl font-semibold text-gray-900">
                          {course.nameCourse}
                        </p>
                        <p className="text-sm text-gray-600">
                          By: <span className="font-medium">{course.author}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Level: <span className="font-medium">{course.level}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right w-2/3">
                      <button
                        className="text-red-600 hover:text-red-800 ml-2 mb-2"
                        onClick={() => removeFromCart(course._id)}
                      >
                        <FontAwesomeIcon icon={faTimes} className="h-5" />
                      </button>
                      <p className="text-2xl font-bold text-gray-800">
                        ${course.PriceAfterDiscount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-1/3 pl-4 mr-40 mb-20">
          <h1 className="text-3xl font-bold mb-5">Order Details</h1>
          <div>
            <table className="table w-full border-none">
              <tbody>
                <tr>
                  <th scope="row">Items</th>
                  <td>{cartCourses.length}</td>
                </tr>
                <tr>
                  <th scope="row">Price</th>
                  <td>
                    ${cartCourses
                      .reduce(
                        (total, item) => total + parseFloat(item.PriceAfterDiscount),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="!text-green-600 text-lg">
                    Discount
                  </th>
                  <td className="!text-green-800 font-semibold text-lg">
                    ${cartCourses
                      .reduce(
                        (total, item) =>
                          total + (parseFloat(item.PriceAfterDiscount) * item.discount) / 100,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-2xl !text-red-600">
                    Total
                  </th>
                  <td className="!text-red-700 font-bold text-xl">
                    ${discountedPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Link
            to={{
              pathname: `/${userId}/cart/checkout`,
              state: { cartCourses, discountedPrice },
            }}
          >
            <button className="btn btn-dark w-2/3 mt-5" type="submit">
              Check out{" "}
              <FontAwesomeIcon icon={faArrowRight} className="h-4 mx-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
