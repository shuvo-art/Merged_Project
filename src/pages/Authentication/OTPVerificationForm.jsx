import React, { useContext, useState } from "react";
import login_image from "../../images/login/login_page_logo.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const VerificationCode = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const { otpEmail } = useContext(AuthContext); // Get email from context
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // For button loading state

  // Handle input change
  const handleInputChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Allow only digits
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input field if a digit is entered
    if (value && index < code.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  // Handle backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index] === "") {
        // If the current input is empty, move to the previous input
        if (index > 0) {
          document.getElementById(`code-${index - 1}`).focus();
        }
      } else {
        // Clear the current input
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6); // Take only the first 6 digits
    const newCode = [...code];

    pastedData.split("").forEach((char, i) => {
      if (i < newCode.length) {
        newCode[i] = char;
      }
    });

    setCode(newCode);

    // Move focus to the last filled input
    const lastFilledIndex = pastedData.length - 1;
    if (lastFilledIndex >= 0 && lastFilledIndex < newCode.length) {
      document.getElementById(`code-${lastFilledIndex}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = code.join(""); // Combine the OTP array into a single string
    if (!otp) {
      toast.error("Please enter the OTP code.");
      return;
    }
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit code.");
      return;
    }

    try {
      setIsLoading(true); // Start loading state
      // API call to verify OTP
      const response = await axios.post(
        "http://localhost:5001/api/user/verify-code",
        { email: otpEmail, code: otp } // Send both email and OTP
      );
      // Success: Redirect to reset-password route
      toast.success(response?.data?.message);
      navigate("/auth/reset-password");
    } catch (err) {
      // Error: Show error message
      const errorMessage =
        err.response?.data?.message || "Invalid OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false); // End loading state
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

        {/* Verification Code Section */}
        <div className="flex-1 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Congratulations!
          </h2>
          <p className="text-gray-600 mb-6">Please enter your 6-digit code</p>
          <h2 className="text-5xl font-medium text-[#364636] mb-8 text-center">
            Verification Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Verification Code Inputs */}
            <div
              className="flex justify-center gap-4"
              onPaste={handlePaste} // Add paste event to the parent div
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`code-${index}`}
                  value={digit}
                  onChange={(e) => handleInputChange(e.target, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-medium border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CAB91] bg-[#E2E9E3]"
                />
              ))}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-[430px] h-12 py-4 px-8 ${
                isLoading ? "bg-gray-400" : "bg-[#8CAB91]"
              } text-[#FAF1E6] hover:text-white rounded-3xl text-base flex items-center justify-center hover:scale-105 duration-200`}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>

          <p className="text-sm text-gray-700 mt-4">
            You have not received the email?{" "}
            <button className="text-red-500 hover:underline">Resend</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
