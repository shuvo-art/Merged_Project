import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { initialSections } from "../../../database/Questionnarie";
import Modal from "../../../pages/Modals/Modal";
import { IoMdArrowRoundBack } from "react-icons/io";

const PreviewQuestions = () => {
  const { sectionId } = useParams(); // Extract sectionId from the route
  const id = parseFloat(sectionId); // Convert sectionId to number
  const navigate = useNavigate();

  // Find the corresponding section
  const section = initialSections.find((sec) => sec.id === id);

  // State variables
  const [questions, setQuestions] = useState(section?.questions || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newQuestions, setNewQuestions] = useState([""]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [editedQuestionText, setEditedQuestionText] = useState("");

  // Add a new question modal
  const openAddModal = () => {
    setNewQuestions([""]);
    setIsAddModalOpen(true);
  };

  // Edit question modal
  const openEditModal = (question) => {
    setCurrentQuestion(question);
    setEditedQuestionText(question.text);
    setIsEditModalOpen(true);
  };

  // Handle adding questions
  const handleAddQuestion = () => {
    const validQuestions = newQuestions.filter((q) => q.trim() !== "");
    const addedQuestions = validQuestions.map((text, index) => ({
      id: questions.length + index + 1,
      text,
    }));
    setQuestions([...questions, ...addedQuestions]);
    setIsAddModalOpen(false);
  };

  // Handle editing a question
  const handleEditQuestion = () => {
    const updatedQuestions = questions.map((q) =>
      q.id === currentQuestion.id ? { ...q, text: editedQuestionText } : q
    );
    setQuestions(updatedQuestions);
    setIsEditModalOpen(false);
  };

  // Delete a question with confirmation
  const handleDeleteQuestion = (question) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete this question?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setQuestions(questions.filter((q) => q.id !== question.id));
        Swal.fire("Deleted!", "The question has been deleted.", "success");
      }
    });
  };

  // Add more question inputs
  const addMoreQuestionInput = () => {
    setNewQuestions([...newQuestions, ""]);
  };

  // Handle question input change
  const handleQuestionInputChange = (index, value) => {
    const updatedQuestions = [...newQuestions];
    updatedQuestions[index] = value;
    setNewQuestions(updatedQuestions);
  };

  // Navigate back
  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleBack}
            className="text-lg bg-[#8CAB91] p-2 rounded-full"
          >
            <IoMdArrowRoundBack className="text-white text-2xl" />
          </button>
          <h1 className="text-2xl font-medium text-black">{section?.name}</h1>
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#8CAB91] text-[#FAF1E6] px-4 py-2 rounded-lg"
        >
          + Add New Question
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="flex items-center justify-between bg-[#FAF1E6] p-4 rounded-xl shadow border border-[#8CAB91]"
          >
            <p className="text-black text-2xl font-medium ">
              {index + 1}. {question.text}
            </p>
            <div className="flex items-center space-x-4 text-[#212121]">
              <button onClick={() => openEditModal(question)}>
                <FaRegEdit className="text-2xl" />
              </button>
              <button onClick={() => handleDeleteQuestion(question)}>
                <AiOutlineDelete className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Modal */}
      <Modal
        title="Add New Question"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      >
        <div className="space-y-4">
          {newQuestions.map((q, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type question here"
                value={q}
                onChange={(e) =>
                  handleQuestionInputChange(index, e.target.value)
                }
                className="w-full border rounded px-4 py-2"
              />
              {index === newQuestions.length - 1 && (
                <button
                  onClick={addMoreQuestionInput}
                  className="bg-[#8CAB91] text-white px-2 py-1 rounded"
                >
                  +
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddQuestion}
          className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg w-full mt-4"
        >
          Publish
        </button>
      </Modal>

      {/* Edit Question Modal */}
      <Modal
        title="Edit Question"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="mb-4">
          <label className="block font-medium mb-1">Question</label>
          <input
            type="text"
            placeholder="Edit question here"
            value={editedQuestionText}
            onChange={(e) => setEditedQuestionText(e.target.value)}
            className="w-full border rounded px-4 py-2"
          />
        </div>
        <button
          onClick={handleEditQuestion}
          className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg w-full"
        >
          Publish
        </button>
      </Modal>
    </div>
  );
};

export default PreviewQuestions;
