import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FaImage, FaArrowUp } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const AdminProfile = () => {
  const [selectedTab, setSelectedTab] = useState("editProfile"); // "editProfile" or "changePassword"
  const { register, handleSubmit, setValue, watch } = useForm();
  const [previewImage, setPreviewImage] = useState(null); // Preview image URL
  const profilePicture = watch("profilePicture"); // Watch for profilePicture field changes
  const { auth } = useContext(AuthContext);
  console.log(auth);
  // Animation variants
  const animationVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  // Update the preview image when profilePicture changes
  React.useEffect(() => {
    if (profilePicture && profilePicture.length > 0) {
      const file = profilePicture[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [profilePicture]);

  // Handle profile form submission
  const handleProfileSubmit = (data) => {
    console.log("Profile Data:", data);

    // Create form data to send to backend
    const formData = new FormData();
    formData.append("profilePicture", data.profilePicture[0]); // Append the image file
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("address", data.address);

    console.log("FormData to Backend:", Object.fromEntries(formData.entries())); // Log FormData contents
  };

  // Handle password change form submission
  const handlePasswordSubmit = (data) => {
    console.log("Password Change Data:", data);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg w-[750px] mx-auto">
      <h1 className="text-2xl font-medium text-black">
        Admin Profile (Super Admin)
      </h1>

      {/* Admin Info Header */}
      <div className="mt-6 bg-[#8CAB91] rounded-lg p-6 text-white flex items-center space-x-4 justify-center">
        <div className="relative">
          {previewImage ? (
            // Render preview image
            <img
              src={previewImage}
              alt="Admin Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-white"
            />
          ) : (
            // Render placeholder icons if no image exists
            <div className="w-24 h-24 flex flex-col items-center justify-center text-white border-2 border-gray-300 rounded-full bg-gray-100">
              <FaImage className="text-3xl" />
            </div>
          )}
          {/* Upload Button */}
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full cursor-pointer"
          >
            <FaArrowUp />
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            {...register("profilePicture")}
            className="hidden"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {auth?.firstname} {auth?.lastname}
          </h2>
          <p>{auth?.role}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex border-b space-x-6 items-center justify-center">
        <button
          className={`pb-2 ${
            selectedTab === "editProfile"
              ? "border-b-2 border-[#8CAB91] text-[#8CAB91]"
              : ""
          }`}
          onClick={() => setSelectedTab("editProfile")}
        >
          Edit Profile
        </button>
        <button
          className={`pb-2 ${
            selectedTab === "changePassword"
              ? "border-b-2 border-[#8CAB91] text-[#8CAB91]"
              : ""
          }`}
          onClick={() => setSelectedTab("changePassword")}
        >
          Change Password
        </button>
      </div>

      {/* Form Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <AnimatePresence mode="wait">
          {selectedTab === "editProfile" && (
            <motion.div
              key="editProfile"
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <form
                className="px-20"
                onSubmit={handleSubmit(handleProfileSubmit)}
              >
                <h2 className="text-xl font-medium mb-4 text-center ">
                  Edit Your Profile
                </h2>
                <div className="mb-4">
                  <label className="block font-medium mb-1">User Name</label>
                  <input
                    type="text"
                    placeholder="Mr. John"
                    {...register("userName")}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    {...register("email")}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Contact No</label>
                  <input
                    type="text"
                    placeholder="+99007007007"
                    {...register("contact")}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="79/A Joker Vila, Gotham City"
                    {...register("address")}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg w-full"
                >
                  Save & Changes
                </button>
              </form>
            </motion.div>
          )}

          {selectedTab === "changePassword" && (
            <motion.div
              key="changePassword"
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <form
                className="px-20"
                onSubmit={handleSubmit(handlePasswordSubmit)}
              >
                <h2 className="text-xl font-medium mb-4 text-center">
                  Change Password
                </h2>
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...register("currentPassword")}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    {...register("newPassword")}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <div className=" flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-[#8CAB91] text-white rounded-lg  py-5 px-[10px]"
                  >
                    Save & Changes
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminProfile;
