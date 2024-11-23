import React, { useRef } from "react";
import JoditEditor from "jodit-react";

const FullScreenRichTextEditor = () => {
  const editor = useRef(null);
  const [content, setContent] = React.useState("");

  // Configuration for Jodit Editor
  const config = {
    readonly: false, // Enables editing
    toolbarSticky: false, // Toolbar won't stick to the top
    buttons: [
      "fontsize", // Font size dropdown
      "bold",     // Bold button
      "italic",   // Italic button
      "underline", // Underline button
      "align",    // Align options
    ],
    buttonsXS: [
      "fontsize",
      "bold",
      "italic",
      "underline",
      "align",
    ], // Toolbar for smaller screens
    showCharsCounter: false, // Disable character counter
    showWordsCounter: false, // Disable word counter
    showXPathInStatusbar: false, // Hide XPath in status bar
    toolbarInline: false, // Disable inline toolbar
    height: "100%", // Full height of the container
    width: "100%", // Full width of the container
    placeholder: "Start typing here...",
  };

  return (
    <div className="w-full h-full  bg-gray-50">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => setContent(newContent)} // Save content on blur
        onChange={(newContent) => {}}
        className="h-full w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
      />
    </div>
  );
};

export default FullScreenRichTextEditor;
