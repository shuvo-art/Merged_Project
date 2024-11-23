import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import Modal from "../Modals/Modal";
import ConfirmationModal from "../Modals/ConfirmationModal";
import Banner from "../../components/Banner";

// Initial Coupons Data
const initialCoupons = [
  {
    id: 1,
    name: "Order Hard Copy",
    code: "Give50",
    discount: "20%",
    startDate: "08/11/24",
    endDate: "08/11/24",
  },
  {
    id: 2,
    name: "Standard Discount",
    code: "Save20",
    discount: "10%",
    startDate: "08/12/24",
    endDate: "08/12/24",
  },
];

const CouponTable = () => {
  const [coupons, setCoupons] = useState(initialCoupons); // Coupon List State
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal Visibility
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // Delete Confirmation Modal
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [currentCoupon, setCurrentCoupon] = useState(null); // Currently Selected Coupon
  const [couponToDelete, setCouponToDelete] = useState(null); // Coupon to delete

  // Form handling with React Hook Form
  const { register, handleSubmit, reset, setValue } = useForm();

  // Open Modal to Add Coupon
  const openAddModal = () => {
    setModalType("add");
    reset(); // Reset form fields
    setIsModalOpen(true);
  };

  // Open Modal to Edit Coupon
  const openEditModal = (coupon) => {
    setModalType("edit");
    setCurrentCoupon(coupon);
    setValue("name", coupon.name);
    setValue("code", coupon.code);
    setValue("discount", coupon.discount);
    setValue("startDate", coupon.startDate);
    setValue("endDate", coupon.endDate);
    setIsModalOpen(true);
  };

  // Open Delete Confirmation Modal
  const openDeleteConfirmation = (coupon) => {
    setCouponToDelete(coupon);
    setIsConfirmationOpen(true);
  };

  // Confirm Coupon Deletion
  const confirmDelete = () => {
    setCoupons(coupons.filter((coupon) => coupon.id !== couponToDelete.id));
    setIsConfirmationOpen(false);
  };

  // Handle Form Submission for Add/Edit
  const onSubmit = (data) => {
    if (modalType === "add") {
      // Add new coupon
      const newCoupon = {
        id: coupons.length + 1,
        ...data,
      };
      setCoupons([...coupons, newCoupon]);
    } else if (modalType === "edit") {
      // Update existing coupon
      const updatedCoupons = coupons.map((coupon) =>
        coupon.id === currentCoupon.id ? { ...coupon, ...data } : coupon
      );
      setCoupons(updatedCoupons);
    }
    setIsModalOpen(false); // Close modal
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-medium text-black">Coupons</h1>
        <button
          onClick={openAddModal}
          className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Add
        </button>
      </div>

      {/* Coupon Table */}
      <table className="w-full border-collapse border rounded-lg">
        <thead>
          <tr className="bg-gray-200 border-b">
            <th className="px-4 py-2 text-left">S.ID</th>
            <th className="px-4 py-2 text-left">Coupon Code</th>
            <th className="px-4 py-2 text-left">Coupon Name</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="border-b">
              <td className="px-4 py-2">#{coupon.id}</td>
              <td className="px-4 py-2">{coupon.code}</td>
              <td className="px-4 py-2">{coupon.name}</td>
              <td className="px-4 py-2 flex space-x-4">
                <button onClick={() => openEditModal(coupon)}>
                  <FaRegEdit className="text-green-500 text-2xl" />
                </button>
                <button onClick={() => openDeleteConfirmation(coupon)}>
                  <AiOutlineDelete className="text-red-500 text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Banner />
          {/* Coupon Name Input */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Coupon Name</label>
            <input
              {...register("name")}
              type="text"
              placeholder="Type here"
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {/* Coupon Code Input */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Coupon Code</label>
            <input
              {...register("code")}
              type="text"
              placeholder="Type here"
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {/* Discount Input */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Discount</label>
            <input
              {...register("discount")}
              type="text"
              placeholder="e.g. 20%"
              className="w-full border rounded px-4 py-2"
            />
          </div>

          {/* Start Date and End Date Inputs */}
          <div className="mb-4 flex space-x-4">
            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <input
                {...register("startDate")}
                type="date"
                className="w-full border rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                {...register("endDate")}
                type="date"
                className="w-full border rounded px-4 py-2"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg w-full"
          >
            {modalType === "add" ? "Create" : "Update"}
          </button>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default CouponTable;
