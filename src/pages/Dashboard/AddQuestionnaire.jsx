import React, { useState } from "react";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";

const initialSections = [
  { id: 1, name: "Childhood", questionsAdded: 5, totalQuestions: 10 },
  { id: 2, name: "Family", questionsAdded: 5, totalQuestions: 10 },
  { id: 3, name: "Love", questionsAdded: 5, totalQuestions: 10 },
  { id: 4, name: "Friends", questionsAdded: 5, totalQuestions: 10 },
  { id: 5, name: "Others", questionsAdded: 5, totalQuestions: 10 },
];

const Questionnaire = () => {
  const [sections, setSections] = useState(initialSections);

  const handleAddSection = () => {
    const newSection = {
      id: sections.length + 1,
      name: `New Section ${sections.length + 1}`,
      questionsAdded: 0,
      totalQuestions: 10,
    };
    setSections([...sections, newSection]);
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleEditSection = (id) => {
    const updatedSections = sections.map((section) =>
      section.id === id
        ? { ...section, name: `${section.name} (Edited)` }
        : section
    );
    setSections(updatedSections);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Questionnaire</h1>
        <button
          onClick={handleAddSection}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Add new Section
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow border border-green-300"
          >
            <div>
              <h2 className="font-semibold">{section.name}</h2>
              <p className="text-sm text-gray-500">
                {section.questionsAdded}/{section.totalQuestions} Question
                Added
              </p>
            </div>
            <div className="flex items-center space-x-4 text-green-500">
              <button className="hover:text-green-700">
                <FaEye />
              </button>
              <button
                className="hover:text-green-700"
                onClick={() => handleDeleteSection(section.id)}
              >
                <FaTrash />
              </button>
              <button
                className="hover:text-green-700"
                onClick={() => handleEditSection(section.id)}
              >
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;
