import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Modal from "../Modals/Modal";
import Swal from "sweetalert2";

const initialSections = [
  { id: 1, name: "Childhood", questionsAdded: 5, totalQuestions: 10 },
  { id: 2, name: "Family", questionsAdded: 5, totalQuestions: 10 },
  { id: 3, name: "Love", questionsAdded: 5, totalQuestions: 10 },
  { id: 4, name: "Friends", questionsAdded: 5, totalQuestions: 10 },
  { id: 5, name: "Others", questionsAdded: 5, totalQuestions: 10 },
];

const Questionnaire = () => {
  const [sections, setSections] = useState(initialSections);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentSection, setCurrentSection] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [sectionQuestions, setSectionQuestions] = useState("");

  const openAddModal = () => {
    setModalType("add");
    setSectionName("");
    setSectionQuestions("");
    setShowModal(true);
  };

  const openEditModal = (section) => {
    setModalType("edit");
    setCurrentSection(section);
    setSectionName(section.name);
    setSectionQuestions(section.totalQuestions.toString());
    setShowModal(true);
  };

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      name: sectionName || `New Section ${sections.length + 1}`,
      questionsAdded: 0,
      totalQuestions: parseInt(sectionQuestions, 10) || 10,
    };
    setSections([...sections, newSection]);
    setShowModal(false);
  };

  const handleEditSection = () => {
    const updatedSections = sections.map((section) =>
      section.id === currentSection.id
        ? { ...section, name: sectionName, totalQuestions: parseInt(sectionQuestions, 10) }
        : section
    );
    setSections(updatedSections);
    setShowModal(false);
  };

  const handleDeleteSection = (section) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete the section "${section.name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSections(sections.filter((s) => s.id !== section.id));
        Swal.fire("Deleted!", `The section "${section.name}" has been deleted.`, "success");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-medium text-black">Questionnaire</h1>
        <button
          onClick={openAddModal}
          className="bg-[#8CAB91] text-[#FAF1E6] px-4 py-2 rounded-lg"
        >
          + Add new Section
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between bg-[#FFFDFA] p-4 rounded-lg shadow border border-[#8CAB91]"
          >
            <div>
              <h2 className="text-2xl font-medium text-black">{section.name}</h2>
              <p className="text-sm text-[#8CAB91]">
                {section.questionsAdded}/{section.totalQuestions} Question Added
              </p>
            </div>
            <div className="flex items-center space-x-4 text-[#8CAB91]">
              <button>
                <IoEyeOutline className="text-2xl" />
              </button>
              <button onClick={() => handleDeleteSection(section)}>
                <AiOutlineDelete className="text-2xl" />
              </button>
              <button onClick={() => openEditModal(section)}>
                <FaRegEdit className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reusable Add/Edit Modal */}
      <Modal
        title={modalType === "add" ? "Add New Section" : "Edit Section"}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Section Name</label>
          <input
            type="text"
            placeholder="Type here"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Number of questions</label>
          <input
            type="number"
            placeholder="Type here"
            value={sectionQuestions}
            onChange={(e) => setSectionQuestions(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <button
          onClick={modalType === "add" ? handleAddSection : handleEditSection}
          className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg w-full"
        >
          {modalType === "add" ? "Publish" : "Save Changes"}
        </button>
      </Modal>
    </div>
  );
};

export default Questionnaire;
