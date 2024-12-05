import React, { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import login_image from "../../images/login/login_page_logo.png";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { otpEmail } = useContext(AuthContext);
  const navigate = useNavigate();

  // Validation states
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    const specialCharRegex = /[~`!@#$%^&*()\-_+={}|\\/:,.?]/;
    const newValidations = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: specialCharRegex.test(password),
    };
    setValidations(newValidations);
    return Object.values(newValidations).every((valid) => valid);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      toast.error(
        "Password does not meet all the requirements. Please fix the issues."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/admin/set-new-password",
        { email: otpEmail, newPassword }
      );

      toast.success(response.data.message || "Password updated successfully.");
      navigate("/auth/congratulations");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update password. Try again.";
      toast.error(errorMessage);
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

        {/* Set New Password Form */}
        <div className="flex-1 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Create a new password
          </h2>
          <p className="text-gray-600 mb-6">
            Ensure it differs from your previous one.
          </p>

          <h2 className="text-5xl font-medium text-[#364636] mb-8 text-center">
            Set new Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Input */}
            <div className="relative">
              <label
                htmlFor="NewPassword"
                className="block text-base font-medium text-[#364636] mb-2 text-left"
              >
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="********"
                className="w-full p-3 border-2 border-[#8CAB91] bg-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-14 transform -translate-y-1/2 right-4 text-gray-500"
              >
                {showNewPassword ? <FaRegEye /> : <IoEyeOffOutline />}
              </button>
              {/* Dynamic Validation Messages */}
              <div className="mt-2 text-sm text-left">
                {!validations.length && (
                  <p className="text-red-500">- At least 8 characters</p>
                )}
                {!validations.uppercase && (
                  <p className="text-red-500">
                    - At least one uppercase letter
                  </p>
                )}
                {!validations.lowercase && (
                  <p className="text-red-500">
                    - At least one lowercase letter
                  </p>
                )}
                {!validations.number && (
                  <p className="text-red-500">- At least one number</p>
                )}
                {!validations.specialChar && (
                  <p className="text-red-500">
                    - At least one special character (~`!@#$%^&*()\-_+={}
                    |\\/:,.?)
                  </p>
                )}
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label
                htmlFor="ConfirmPassword"
                className="block text-base font-medium text-[#364636] mb-2 text-left"
              >
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className="w-full p-3 border-2 border-[#8CAB91] bg-none rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-14 transform -translate-y-1/2 right-4 text-gray-500"
              >
                {showConfirmPassword ? <FaRegEye /> : <IoEyeOffOutline />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[430px] h-12 py-4 px-8 bg-[#8CAB91] text-[#FAF1E6] hover:text-white rounded-3xl text-base flex items-center justify-center hover:scale-105 duration-200"
            >
              CONFIRM PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
