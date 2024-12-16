import axios from "axios";

export const signInUser = async (email, password, navigate, setErrorLogIn) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/signin`, { email, password });

    if (response.data.token) {
      const { token, user } = response.data;

      // Save the token in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } else {
      setErrorLogIn("Invalid credentials. Please try again.");
    }
  } catch (error) {
    setErrorLogIn(error.response?.data?.message || "Something went wrong. Please try again.");
  }
};
