import axios from "axios";

const BASE_URL = "http://localhost:5001/api";


// Login User
export const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/user/admin/login`, { email, password });
  console.log(response)
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${BASE_URL}/user/forgot-password`, { email });
  return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
  const response = await axios.post(`${BASE_URL}/user/reset-password`, data);
  return response.data;
};

export const validateToken = (token) => {
    try {
      // Decode the token payload if needed
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { valid: true, user: payload }; // Assuming the token has user details encoded
    } catch (err) {
      return { valid: false };
    }
  };
  
