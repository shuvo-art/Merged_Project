import React, { useState } from "react";
import Modal from "../Modals/Modal";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { RiDeleteBinLine } from "react-icons/ri";

const MakeAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // For Make Admin Modal
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // For Delete Confirmation Modal
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState(null); // To track admin for deletion
  const [admins, setAdmins] = useState([
    {
      id: "#12333",
      name: "Ahmad Musa",
      email: "bockelboy@att.com",
      userType: "Admin",
    },
    {
      id: "#12334",
      name: "MD Sarwar",
      email: "bockelboy@att.com",
      userType: "Admin",
    },
    {
      id: "#12335",
      name: "TA Emon",
      email: "bockelboy@att.com",
      userType: "Admin",
    },
  ]);

  // Open Delete Confirmation Modal
  const handleDeleteClick = (admin) => {
    setCurrentAdmin(admin);
    setIsConfirmationOpen(true);
  };

  // Handle Admin Deletion
  const handleConfirmDelete = () => {
    setAdmins(admins.filter((admin) => admin.id !== currentAdmin.id));
    setIsConfirmationOpen(false);
  };

  // Handle Add New Admin
  const handleAddAdmin = () => {
    if (name && email && password) {
      const newAdmin = {
        id: `#${admins.length + 1}`,
        name,
        email,
        userType: "Admin",
      };
      setAdmins([...admins, newAdmin]);
      setIsModalOpen(false);
      resetFields();
    }
  };

  // Reset input fields
  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-medium text-black">Make Admin</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#8CAB91] text-[#FAF1E6] py-2 px-3 rounded-lg"
        >
          + Make Admin
        </button>
      </div>

      {/* Admin Table */}
      <div className="mt-6">
        <table className="w-full border-collapse border rounded-lg">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="px-4 py-2 text-left">S.ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">User Type</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b">
                <td className="px-4 py-2">{admin.id}</td>
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2 text-green-600">{admin.userType}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteClick(admin)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <RiDeleteBinLine className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Make Admin Modal */}
      <Modal
        title="Make Admin"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">User Type</label>
          <input
            type="text"
            value="Admin"
            disabled
            className="w-full border rounded px-4 py-2 bg-gray-100"
          />
        </div>
        <button
          onClick={handleAddAdmin}
          className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg w-full"
        >
          Publish
        </button>
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

export default MakeAdmin;
