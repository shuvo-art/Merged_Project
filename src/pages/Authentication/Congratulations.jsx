import React from "react";
import login_image from "../../images/login/login_page_logo.png";
import { Link } from "react-router-dom";

const Congratulations = () => {
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
          <p className="text-[#364636] mb-8 text-xl font-medium text-center">
            Your password has been updated, please change your password
            regularly to avoid this happening
          </p>
          <h2 className="text-5xl font-medium my-14 text-#364636 text-center">
          Congratulations
          </h2>
          <Link
          to={"/auth/signin"}
            className="w-[430px] h-12 py-4 px-8 bg-[#8CAB91] text-[#FAF1E6] hover:text-white rounded-3xl text-base flex items-center justify-center hover:scale-105 duration-200 uppercase"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
