import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import SignInForm from "../../Components/SignInComponents/SignInForm";
import { signInUser } from "../../Components/SignInComponents/authHelpers";


export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorLogIn, setErrorLogIn] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setErrorLogIn("");
    setLoading(true);

    try {
      await signInUser(formData.email, formData.password, navigate, setErrorLogIn);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row no-gutters">
      <div className="flex flex-col items-center sm:w-2/3 md:w-1/2">
        <h3 className="text-4xl font-semibold text-gray-800 mt-24 mb-10">Sign in to your account</h3>
        <SignInForm
          formData={formData}
          handleChange={handleChange}
          handleForm={handleForm}
          errorLogIn={errorLogIn}
          loading={loading}
        />
      </div>
      <div className="hidden sm:block sm:w-1/3 md:w-1/2 p-0">
        <img
          src="signup.png"
          alt="Sign Up"
          className="h-[900px] w-full object-cover"
        />
      </div>
    </div>
  );
}
