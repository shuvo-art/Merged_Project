import React, { useState } from "react";
import login_image from "../../images/login/login_page_logo.png";
import { Link } from "react-router-dom";

const VerificationCode = () => {
  const [code, setCode] = useState(new Array(6).fill(""));

  const handleInputChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Allow only digits
    if (value) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // Move to next input field
      if (index < code.length - 1) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered code: ${code.join("")}`);
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
          <button className="absolute top-6 right-6 bg-green-100 text-green-700 rounded-full p-2">
            ✕
          </button>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Congratulations!
          </h2>
          <p className="text-gray-600 mb-6">Please enter your 6 digit code</p>
          <h2 className="text-5xl font-medium text-[#364636] mb-8 text-center">
          Verification Code
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Verification Code Inputs */}
            <div className="flex justify-center gap-4">
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
            <Link
              to={"/auth/reset-password"}
              className="w-[430px] h-12 py-4 px-8 bg-[#8CAB91] text-[#FAF1E6] hover:text-white rounded-3xl text-base flex items-center justify-center hover:scale-105 duration-200"
            >
              Verify
            </Link> 
            {/* <button
              type="submit"
              className="w-[430px] h-12 py-4 px-8 bg-[#8CAB91] text-[#FAF1E6] hover:text-white rounded-3xl text-base flex items-center justify-center hover:scale-105 duration-200"
            >
              Verify
            </button>  */}
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
