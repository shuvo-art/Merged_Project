import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import login_image from "../../images/login/login_page_logo.png";
const ForgetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/admin/login",
        {
          email,
        }
      );

      const { _id, email: userEmail, role, token } = response.data;

      // Save user data in context and localStorage
      login({ id: _id, email: userEmail, role, token });
      navigate("/"); // Redirect to dashboard
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDFA]">
      <div className="flex flex-col md:flex-row items-center rounded-lg p-8 w-full h-[500px] max-w-7xl">
        {/* Logo Section */}
        <div className="flex-1 flex flex-col items-center justify-center mb-8 md:mb-0">
          <img
            src={login_image}
            alt="Logo"
            className="w-[483px] h-[280px] mb-4"
          />
        </div>

        {/* Login Form Section */}
        <div className="flex-1 w-full max-w-md ">
          <h2 className="text-5xl font-medium mb-4 text-#364636 text-center">
           Forget Password
          </h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                className="w-full p-3 border-2 border-[#8CAB91] bg-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>


            {/* Submit Button */}
            {/* For Testing purpose */}
            <Link 
              to={"/auth/verifyOTP"}
              className="w-[430px] h-12 py-4 px-8 bg-[#8CAB91] text-[#FAF1E6] hover:text-white rounded-3xl text-base flex items-center justify-center hover:scale-105 duration-200"
            >
              Confirm
            </Link>
            {/* the actual code */}
            {/* <button
              type="submit"
              className="w-[430px] h-12 py-4 px-8 bg-[#8CAB91] text-[#FAF1E6] hover:text-white rounded-3xl text-base flex items-center justify-center hover:scale-105 duration-200"
            >
              Confirm
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
