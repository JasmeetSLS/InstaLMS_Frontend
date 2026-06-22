import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  UserCircle,
  Plus,
  Trash2,
  CheckCircle,
} from "lucide-react";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sectionId = searchParams.get("sectionId");
  const template = searchParams.get("template") || "MCQ - Single";
  const questionType = searchParams.get("questionType") || "mcq";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [correctOption, setCorrectOption] = useState(0);
  const [passingPercentage, setPassingPercentage] = useState(70);

  const handleBack = () => {
    navigate(-1);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctOption >= index && correctOption > 0) {
        setCorrectOption(correctOption - 1);
      }
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    // TODO: Implement API call to create question
    console.log("Creating question:", {
      sectionId,
      questionType,
      template,
      title,
      description,
      questionText,
      options,
      correctOption,
      passingPercentage,
    });
    alert("Question created successfully!");
    navigate(-1);
  };

  // Determine if it's a fill-in-the-blank or other type
  const isFillBlank = template === "Fill Blanks";
  const isTrueFalse = template === "True or False";
  const isOrdering = template === "Order the following";

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="h-11 bg-white border-b flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Create Question</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Super Admin</span>
          <Bell size={18} className="text-red-500" />
          <UserCircle size={24} className="text-red-500" />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-5 py-3 text-sm text-[#1d3557] flex flex-wrap items-center">
        <span>Products</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span>UPVC Windows</span>
        <span className="text-gray-400 ml-1">| English Global</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span>Introduction to UPVC</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="font-semibold">Create Question</span>
        <span className="text-gray-400 ml-1">({template})</span>
      </div>

      {/* Main Content */}
      <div className="mx-4 bg-white border border-[#df6545]">
        <div className="grid lg:grid-cols-[1fr_280px]">
          {/* Left Section - Form */}
          <div className="p-5">
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              {template}
            </h2>

            {/* Question Title (optional) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter question title"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                rows="2"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Question Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Enter your question"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Options */}
            {!isFillBlank && !isOrdering && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options <span className="text-red-500">*</span>
                </label>
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(idx, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                      className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    {!isTrueFalse && (
                      <button
                        onClick={() => setCorrectOption(idx)}
                        className={`p-1 rounded-full ${
                          correctOption === idx
                            ? "text-green-600"
                            : "text-gray-300 hover:text-gray-500"
                        }`}
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {!isTrueFalse && options.length > 2 && (
                      <button
                        onClick={() => removeOption(idx)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {!isTrueFalse && (
                  <button
                    onClick={addOption}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 mt-1"
                  >
                    <Plus size={16} /> Add Option
                  </button>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Click the checkmark to mark the correct answer.
                </p>
              </div>
            )}

            {/* Fill Blank - Single Answer */}
            {isFillBlank && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correct Answer <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter the correct answer"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            )}

            {/* Ordering - List of items */}
            {isOrdering && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Items (in correct order)
                </label>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 w-8">{idx + 1}.</span>
                      <input
                        type="text"
                        placeholder={`Step ${idx + 1}`}
                        className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  List items in the correct order (1 = first step).
                </p>
              </div>
            )}

            {/* Passing Percentage – still relevant for MCQ? We keep it for now */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passing Percentage
              </label>
              <input
                type="number"
                value={passingPercentage}
                onChange={(e) => setPassingPercentage(Number(e.target.value))}
                min="0"
                max="100"
                className="w-32 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <span className="ml-2 text-sm text-gray-500">%</span>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex justify-center items-start p-5 border-l bg-gray-50">
            <div className="relative w-[215px] h-[435px] bg-[#1f232a] rounded-[28px]">
              <div className="absolute top-3 left-8 w-2.5 h-2.5 rounded-full bg-black" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-black rounded-full" />
              <div className="absolute top-3 right-8 w-2.5 h-2.5 rounded-full bg-black" />
              <div className="absolute inset-3 bg-white rounded-[20px] p-3 overflow-auto">
                <div className="flex justify-between text-[10px] text-gray-500">
                  <span>Question 1 of 1</span>
                  <span className="font-mono text-red-500">0:06:16</span>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {questionText || "Question Text"}
                </p>
                {!isFillBlank && !isOrdering && (
                  <div className="mt-2 space-y-1">
                    {options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-xs p-1 rounded ${
                          correctOption === idx
                            ? "bg-green-100 border border-green-300"
                            : ""
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt || `Option ${String.fromCharCode(65 + idx)}`}</span>
                        {correctOption === idx && <CheckCircle size={12} className="text-green-600 ml-auto" />}
                      </div>
                    ))}
                  </div>
                )}
                {isFillBlank && (
                  <div className="mt-2 text-xs">
                    <p className="text-gray-600">Answer: <span className="text-green-600 font-medium">[Correct Answer]</span></p>
                  </div>
                )}
                {isOrdering && (
                  <div className="mt-2 text-xs space-y-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div key={num} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold">{num}</span>
                        <span>Step {num}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500" />
      </div>

      {/* Footer Buttons */}
      <div className="px-4 py-3 flex gap-3">
        <button
          onClick={handleBack}
          className="px-6 py-2 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-sm rounded bg-gradient-to-r from-red-500 to-orange-500 text-white"
        >
          Save Question
        </button>
      </div>
    </div>
  );
};

export default CreateQuestion;