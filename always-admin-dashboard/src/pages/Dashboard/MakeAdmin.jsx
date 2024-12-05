import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "../Modals/Modal";
import ConfirmationModal from "../Modals/ConfirmationModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const MakeAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // For Make Admin Modal
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // For Delete Confirmation Modal
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState(""); // New last name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState(null); // To track admin for deletion
  const [admins, setAdmins] = useState([]); // Store all admins
  const { auth } = useContext(AuthContext);

  const token = auth?.token; // Replace with actual token

  // Fetch all admins on component mount
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/user/get-all-admins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdmins(response.data.admins);
      } catch (error) {
        toast.error("Failed to fetch admins");
        console.error(error);
      }
    };

    fetchAdmins();
  }, [token]);

  // Handle Add New Admin
  const handleAddAdmin = async () => {
    if (!name || !lastName || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/user/make-admin",
        {
          name,
          lastname: lastName, // Include last name in the payload
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Admin added successfully!");
      setAdmins([...admins, response.data.user]); // Add the new admin to the list
      setIsModalOpen(false);
      resetFields();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add new admin"
      );
      console.error(error);
    }
  };

  // Handle Admin Deletion
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5001/api/user/delete-admin/${currentAdmin._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Admin deleted successfully!");
      setAdmins(admins.filter((admin) => admin._id !== currentAdmin._id));
      setIsConfirmationOpen(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete admin"
      );
      console.error(error);
    }
  };

  // Reset input fields
  const resetFields = () => {
    setName("");
    setLastName(""); // Reset last name
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
      <div className="mt-6 bg-white">
        <table className="w-full border-collapse border rounded-lg">
          <thead>
            <tr className="bg-white border-b">
              <th className="px-4 py-2 text-left">S.ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">User Type</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{admin.firstname}</td>
                <td className="px-4 py-2">{admin.lastname}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2 text-green-600">{admin.role}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setCurrentAdmin(admin);
                      setIsConfirmationOpen(true);
                    }}
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
          <label className="block font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Type here"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
