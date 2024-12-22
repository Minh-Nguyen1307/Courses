import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function CheckoutPage() {
  const [cartCoursesCount, setCartCoursesCount] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  // Fetch cartCoursesCount and discountedPrice from backend
  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}/cart/checkout`);
        const { cartCoursesCount, discountedPrice } = response.data;
        setCartCoursesCount(cartCoursesCount);
        setDiscountedPrice(discountedPrice);
      } catch (error) {
        console.error("Error fetching checkout details", error);
      }
    };

    if (userId) {
      fetchCheckoutDetails();
    }
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment logic here
    alert("Payment submitted!");
  };

  return (
    <div className="mx-10 my-8">
      {/* Page Title */}
      <div className="my-4">
        <p className="text-4xl font-medium">Course Detail</p>
      </div>

      {/* Breadcrumb Navigation */}
      <div>
        <nav aria-label="breadcrumb" className="text-lg my-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={`/${userId}`}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/${userId}/cart`}>My Cart</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Checkout
            </li>
          </ol>
        </nav>
      </div>

      {/* Layout */}
      <div className="flex justify-between gap-10 flex-wrap">
        {/* Payment Section */}
        <div className="w-full lg:w-1/2 mb-5 border p-6 bg-stone-100 rounded-md shadow-md">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <img src="/image.png" alt="Credit Card Logos" className="h-12" />
          </div>
          <div className="flex justify-between mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="creditDebitCard"
                defaultChecked
              />
              <label
                className="form-check-label font-bold text-xl"
                htmlFor="creditDebitCard"
              >
                Credit/Debit Card
              </label>
            </div>
          </div>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="cardName"
                className="form-label font-semibold text-lg"
              >
                Name on Card
              </label>
              <input
                type="text"
                className="form-control w-full p-2 rounded-md border"
                id="cardName"
                placeholder="Name on card"
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="cardNumber"
                className="form-label font-semibold text-lg"
              >
                Card Number
              </label>
              <input
                type="text"
                className="form-control w-full p-2 rounded-md border"
                id="cardNumber"
                placeholder="Card Number"
                required
              />
              <div className="invalid-tooltip">
                Please provide a valid card number.
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mb-3 w-1/2 mr-2">
                <label
                  htmlFor="expiryDate"
                  className="form-label font-semibold text-lg"
                >
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="form-control w-full p-2 rounded-md border"
                  id="expiryDate"
                  placeholder="MM/YYYY"
                  pattern="^(0[1-9]|1[0-2])/([0-9]{4})$"
                  required
                />
                <div className="invalid-tooltip">
                  Please provide a valid expiry date (MM/YYYY).
                </div>
              </div>
              <div className="mb-3 w-1/2 ml-2">
                <label
                  htmlFor="cvc"
                  className="form-label font-semibold text-lg"
                >
                  CVC/CVV
                </label>
                <input
                  type="text"
                  className="form-control w-full p-2 rounded-md border"
                  id="cvc"
                  placeholder="CVC"
                  required
                />
                <div className="invalid-tooltip">
                  Please provide a valid CVC/CVV code.
                </div>
              </div>
            </div>
            <div className="flex justify-center p-2">
              <button
                className="btn btn-dark w-1/2 bg-black text-white p-2 rounded-md"
                type="submit"
              >
                Pay now <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary Section */}
        <div className="w-1/5 mr-36">
          <div className="bg-white shadow-md p-6 rounded-md">
            <h1 className="text-2xl font-bold mb-5">Order Summary</h1>

            {/* Items */}
            <div className="flex justify-between text-lg w-1/2 mb-4">
              <div className="text-left">Items</div>
              <div className="text-right">{cartCoursesCount}</div>
            </div>

            {/* Total */}
            <div className="flex justify-between w-1/2 text-xl">
              <div className="text-left">Total</div>
              <div className="text-right font-bold">${discountedPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
