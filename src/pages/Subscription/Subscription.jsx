import React, { useState } from "react";
import Modal from "../Modals/Modal";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Banner from "../../components/Banner";

const initialSubscriptions = [
  {
    id: 1,
    name: "Normal",
    price: "$30",
    discount: "10%",
    startDate: "08/11/24",
    endDate: "08/11/24",
    offers: ["Access Full Book", "Downloadable soft copy Pdf book"],
  },
  {
    id: 2,
    name: "Premium",
    price: "$50",
    discount: "20%",
    startDate: "08/12/24",
    endDate: "08/12/24",
    offers: ["Unlimited chat with the AI Chat Bot", "Access Full Book"],
  },
];

const availableOffers = [
  "Unlimited chat with the AI Chat Bot",
  "Access Full Book",
  "200 images in Book",
  "Downloadable soft copy Pdf book",
  "$10 off on physical book",
];

const packageOptions = ["Normal", "Standard", "Premium", "Golden"];

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [selectedOffers, setSelectedOffers] = useState([]);
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const selectedPackage = watch("name");

  // Open Add Modal
  const openAddModal = () => {
    setModalType("add");
    reset();
    setSelectedOffers([]);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (subscription) => {
    setModalType("edit");
    setCurrentSubscription(subscription);
    setValue("name", subscription.name);
    setValue("price", subscription.price);
    setValue("discount", subscription.discount);
    setValue("startDate", subscription.startDate);
    setValue("endDate", subscription.endDate);
    setSelectedOffers(subscription.offers || []);
    setIsModalOpen(true);
  };

  // Open Delete Confirmation Modal
  const openDeleteConfirmation = (subscription) => {
    setCurrentSubscription(subscription);
    setIsConfirmationOpen(true);
  };

  // Handle Delete Subscription
  const handleConfirmDelete = () => {
    setSubscriptions(
      subscriptions.filter((sub) => sub.id !== currentSubscription.id)
    );
    setIsConfirmationOpen(false);
  };

  // Handle Add/Edit Submission
  const onSubmit = (data) => {
    const newData = {
      ...data,
      offers: selectedOffers,
    };

    if (modalType === "add") {
      const newSubscription = {
        id: subscriptions.length + 1,
        ...newData,
      };
      setSubscriptions([...subscriptions, newSubscription]);
    } else if (modalType === "edit") {
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === currentSubscription.id ? { ...sub, ...newData } : sub
      );
      setSubscriptions(updatedSubscriptions);
    }
    console.log(newData);
    setIsModalOpen(false);
  };

  // Handle Offer Checkbox Changes
  const handleOfferChange = (offer) => {
    if (selectedOffers.includes(offer)) {
      setSelectedOffers(selectedOffers.filter((o) => o !== offer));
    } else {
      setSelectedOffers([...selectedOffers, offer]);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-medium text-black">Subscriptions</h1>
        <button
          onClick={openAddModal}
          className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Add
        </button>
      </div>

      {/* Subscription Table */}
      <table className="w-full border-collapse border rounded-lg">
        <thead>
          <tr className="bg-gray-200 border-b">
            <th className="px-4 py-2 text-left">S.ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id} className="border-b">
              <td className="px-4 py-2">#{subscription.id}</td>
              <td className="px-4 py-2">{subscription.name}</td>
              <td className="px-4 py-2 flex space-x-4">
                <button onClick={() => openEditModal(subscription)}>
                  <FaRegEdit className="text-green-500 text-2xl" />
                </button>
                <button onClick={() => openDeleteConfirmation(subscription)}>
                  <AiOutlineDelete className="text-red-500 text-2xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Banner />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex items-center justify-between space-x-4">
            <div className="flex-grow">
              <label className="block font-medium mb-1 w-full">
                Package Name
              </label>
              <select
                {...register("name")}
                className="w-full border rounded px-4 py-2"
              >
                {packageOptions.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow">
              <label className="block font-medium mb-1 w-full">
                Package Price
              </label>
              <input
                {...register("price")}
                type="text"
                placeholder="$30"
                className="w-full border rounded px-4 py-2"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Discount</label>
            <input
              {...register("discount")}
              type="text"
              placeholder="e.g. 20%"
              className="w-full border rounded px-4 py-2"
            />
          </div>
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
          <div className="mb-4">
            <label className="block font-medium mb-1">Package Offers</label>
            <div className="grid grid-cols-2 gap-2">
              {availableOffers.map((offer) => (
                <label key={offer} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedOffers.includes(offer)}
                    onChange={() => handleOfferChange(offer)}
                    className="form-checkbox"
                  />
                  <span>{offer}</span>
                </label>
              ))}
            </div>
          </div>
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
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SubscriptionPage;
