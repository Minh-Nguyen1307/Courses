import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function SignInForm({
  formData,
  handleChange,
  handleForm,
  errorLogIn,
  loading,
}) {
  return (
    <form onSubmit={handleForm} className="w-full max-w-md space-y-6">
      <div>
        <label htmlFor="email" className="text-gray-950 font-medium text-xl my-4">
          Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email ID"
          className="border rounded-md w-full pl-4 h-9"
          onChange={handleChange}
          name="email"
          value={formData.email}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="text-gray-950 font-medium text-xl my-4">
          Password <span className="text-red-600">*</span>
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          className="border rounded-md w-full pl-4 h-9"
          onChange={handleChange}
          name="password"
          value={formData.password}
          required
        />
      </div>

      {errorLogIn && <p className="text-red-500 text-sm">{errorLogIn}</p>}

      <button type="submit" className="btn btn-dark mt-4 text-xl my-4 w-full">
        {loading ? "Signing In..." : "Sign In"} <FontAwesomeIcon icon={faArrowRight} className="h-4 mx-2" />
      </button>

      <div className="text-center">
        <a href="/forgot-password" className="text-blue-500">Forgot Password?</a>
      </div>

      <div className="mt-4">
        <button className="bg-gray-200 p-2 rounded w-full hover:bg-gray-300 flex items-center justify-center space-x-2">
          <span>Sign in with</span>
          <img src="1.png" alt="Signup with" className="w-24" />
        </button>
      </div>
    </form>
  );
}
