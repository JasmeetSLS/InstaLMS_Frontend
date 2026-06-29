import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  UserCircle,
  Plus,
  Trash2,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sectionId = searchParams.get("sectionId");
  const questionId = searchParams.get("questionId");
  const templateParam = searchParams.get("template") || "MCQ";

  // ---- Common state ----
  const [questionText, setQuestionText] = useState("");
  const [marks, setMarks] = useState(1);
  const [sortOrder, setSortOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [template, setTemplate] = useState(templateParam);

  // ---- Type‑specific state ----
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [fillAnswer, setFillAnswer] = useState("");
  const [matches, setMatches] = useState([{ left: "", right: "" }]);
  const [orders, setOrders] = useState([""]);

  // Map template to backend type
  const typeMap = {
    "MCQ": "mcq",
    "Fill Blanks": "fill_blank",
    "Order the following": "order_following",
    "True or False": "true_false",
    "This or That": "this_or_that",
    "Match the following": "match_following",
  };
  const questionType = typeMap[template] || "mcq";

  // Determine UI flags
  const isTrueFalse = questionType === "true_false";
  const isThisOrThat = questionType === "this_or_that";
  const isMCQ = questionType === "mcq";
  const showAddOption = isMCQ;
  const showRemoveOption = isMCQ;
  const defaultOptionCount = isTrueFalse || isThisOrThat ? 2 : 4;

  // ---- Init / Edit ----
  useEffect(() => {
    if (questionId) {
      setIsEditMode(true);
      fetchQuestion(questionId);
    } else {
      resetForm();
    }
  }, [questionId]);

  const resetForm = () => {
    setQuestionText("");
    setMarks(1);
    setSortOrder(0);
    const count = defaultOptionCount;
    if (isTrueFalse) {
      setOptions(["True", "False"]);
      setCorrectOptionIndex(0);
    } else {
      setOptions(Array(count).fill(""));
      setCorrectOptionIndex(0);
    }
    setFillAnswer("");
    setMatches([{ left: "", right: "" }]);
    setOrders([""]);
  };

  const fetchQuestion = async (id) => {
    try {
      setFetching(true);
      const response = await api.getQuestionById(id);
      const data = response.data;

      // Set template label
      const typeToTemplate = {
        mcq: "MCQ",
        fill_blank: "Fill Blanks",
        order_following: "Order the following",
        true_false: "True or False",
        this_or_that: "This or That",
        match_following: "Match the following",
      };
      setTemplate(typeToTemplate[data.question_type] || templateParam);

      // Common
      setQuestionText(data.question_text || "");
      setMarks(data.marks || 1);
      setSortOrder(data.sort_order || 0);

      // Type-specific
      switch (data.question_type) {
        case "mcq":
        case "true_false":
        case "this_or_that":
          if (data.options && data.options.length) {
            const opts = data.options.map(o => o.option_text);
            setOptions(opts);
            const correctIdx = data.options.findIndex(o => o.is_correct === 1);
            setCorrectOptionIndex(correctIdx >= 0 ? correctIdx : 0);
          }
          break;
        case "fill_blank":
          setFillAnswer(data.answer || "");
          break;
        case "match_following":
          if (data.matches && data.matches.length) {
            setMatches(data.matches.map(m => ({ left: m.left_text, right: m.right_text })));
          } else {
            setMatches([{ left: "", right: "" }]);
          }
          break;
        case "order_following":
          if (data.orders && data.orders.length) {
            const sorted = [...data.orders].sort((a, b) => a.correct_position - b.correct_position);
            setOrders(sorted.map(o => o.item_text));
          } else {
            setOrders([""]);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      alert("Failed to load question data.");
    } finally {
      setFetching(false);
    }
  };

  // ---- Handlers ----
  const addOption = () => {
    if (isMCQ) setOptions([...options, ""]);
  };
  const removeOption = (index) => {
    if (isMCQ && options.length > 2) {
      const newOpts = options.filter((_, i) => i !== index);
      setOptions(newOpts);
      if (correctOptionIndex >= index && correctOptionIndex > 0) {
        setCorrectOptionIndex(correctOptionIndex - 1);
      }
    }
  };
  const updateOption = (index, value) => {
    const newOpts = [...options];
    newOpts[index] = value;
    setOptions(newOpts);
  };

  const addMatch = () => setMatches([...matches, { left: "", right: "" }]);
  const removeMatch = (index) => {
    if (matches.length > 1) {
      setMatches(matches.filter((_, i) => i !== index));
    }
  };
  const updateMatch = (index, field, value) => {
    const newMatches = [...matches];
    newMatches[index][field] = value;
    setMatches(newMatches);
  };

  const addOrder = () => setOrders([...orders, ""]);
  const removeOrder = (index) => {
    if (orders.length > 1) {
      setOrders(orders.filter((_, i) => i !== index));
    }
  };
  const updateOrder = (index, value) => {
    const newOrders = [...orders];
    newOrders[index] = value;
    setOrders(newOrders);
  };

  // ---- Submit ----
  const handleSubmit = async () => {
    if (!questionText.trim()) {
      alert("Question text is required.");
      return;
    }

    const payload = {
      sectionId: parseInt(sectionId),
      question_text: questionText.trim(),
      question_type: questionType,
      marks,
      sort_order: sortOrder,
    };

    // Add type‑specific data
    if (["mcq", "true_false", "this_or_that"].includes(questionType)) {
      payload.options = options.map((opt, idx) => ({
        option_text: opt,
        is_correct: idx === correctOptionIndex,
        sort_order: idx,
      }));
    } else if (questionType === "fill_blank") {
      payload.answer = fillAnswer.trim();
    } else if (questionType === "match_following") {
      payload.matches = matches.map((m, idx) => ({
        left_text: m.left.trim(),
        right_text: m.right.trim(),
        sort_order: idx,
      }));
    } else if (questionType === "order_following") {
      payload.orders = orders.map((item, idx) => ({
        item_text: item.trim(),
        correct_position: idx + 1,
      }));
    }

    try {
      setLoading(true);
      let response;
      if (isEditMode) {
        response = await api.updateQuestion(questionId, payload);
        alert("Question updated successfully!");
      } else {
        response = await api.createQuestion(payload);
        alert("Question created successfully!");
      }
      console.log("Response:", response);
      navigate(-1);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Render type-specific fields ----
  const renderTypeFields = () => {
    switch (questionType) {
      case "mcq":
      case "true_false":
      case "this_or_that":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options <span className="text-red-500">*</span>
            </label>
            {options.map((opt, idx) => {
              const label = String.fromCharCode(65 + idx);
              const isReadOnly = isTrueFalse && (idx === 0 || idx === 1) &&
                options[0] === "True" && options[1] === "False";
              return (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500 w-6">{label}.</span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(idx, e.target.value)}
                    placeholder={`Option ${label}`}
                    className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    readOnly={isReadOnly}
                  />
                  {(isMCQ || isTrueFalse || isThisOrThat) && (
                    <button
                      onClick={() => setCorrectOptionIndex(idx)}
                      className={`p-1 rounded-full ${
                        correctOptionIndex === idx
                          ? "text-green-600"
                          : "text-gray-300 hover:text-gray-500"
                      }`}
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  {showRemoveOption && options.length > 2 && (
                    <button
                      onClick={() => removeOption(idx)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              );
            })}
            {showAddOption && (
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
        );

      case "fill_blank":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correct Answer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              placeholder="Enter the correct answer"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
        );

      case "match_following":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Match Pairs <span className="text-red-500">*</span>
            </label>
            {matches.map((match, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500 w-6">{idx + 1}.</span>
                <input
                  type="text"
                  value={match.left}
                  onChange={(e) => updateMatch(idx, "left", e.target.value)}
                  placeholder="Left side"
                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="text"
                  value={match.right}
                  onChange={(e) => updateMatch(idx, "right", e.target.value)}
                  placeholder="Right side"
                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {matches.length > 1 && (
                  <button
                    onClick={() => removeMatch(idx)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addMatch}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 mt-1"
            >
              <Plus size={16} /> Add Pair
            </button>
          </div>
        );

      case "order_following":
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordered Items <span className="text-red-500">*</span>
            </label>
            {orders.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500 w-8">{idx + 1}.</span>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateOrder(idx, e.target.value)}
                  placeholder={`Step ${idx + 1}`}
                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {orders.length > 1 && (
                  <button
                    onClick={() => removeOrder(idx)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addOrder}
              className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 mt-1"
            >
              <Plus size={16} /> Add Item
            </button>
            <p className="text-xs text-gray-400 mt-1">
              List items in the correct order (1 = first step).
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // ---- Render ----
  if (fetching) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div className="text-lg font-medium">Loading question...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="h-11 bg-white border-b flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">
            {isEditMode ? "Edit Question" : "Create Question"}
          </span>
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
        <span className="font-semibold">
          {isEditMode ? "Edit Question" : "Create Question"}
        </span>
        <span className="text-gray-400 ml-1">({template})</span>
      </div>

      {/* Main Content */}
      <div className="mx-4 bg-white border border-[#df6545]">
        <div className="grid lg:grid-cols-[1fr_280px]">
          {/* Left Section - Form */}
          <div className="p-5">
            <h2 className="text-xl font-medium text-gray-700 mb-4">{template}</h2>

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

            {renderTypeFields()}

            {/* Marks */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks</label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                min="1"
                className="w-24 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            {/* Sort Order */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                min="0"
                className="w-24 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
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
                {["mcq", "true_false", "this_or_that"].includes(questionType) && (
                  <div className="mt-2 space-y-1">
                    {options.map((opt, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 text-xs p-1 rounded ${
                          correctOptionIndex === idx
                            ? "bg-green-100 border border-green-300"
                            : ""
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[8px]">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt || `Option ${String.fromCharCode(65 + idx)}`}</span>
                        {correctOptionIndex === idx && (
                          <CheckCircle size={12} className="text-green-600 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {questionType === "fill_blank" && (
                  <div className="mt-2 text-xs">
                    <p className="text-gray-600">
                      Answer:{" "}
                      <span className="text-green-600 font-medium">
                        {fillAnswer || "[Correct Answer]"}
                      </span>
                    </p>
                  </div>
                )}
                {questionType === "match_following" && (
                  <div className="mt-2 text-xs space-y-1">
                    {matches.map((m, idx) => (
                      <div key={idx} className="flex justify-between border-b pb-1">
                        <span>{m.left || "—"}</span>
                        <span className="text-gray-400">→</span>
                        <span>{m.right || "—"}</span>
                      </div>
                    ))}
                  </div>
                )}
                {questionType === "order_following" && (
                  <div className="mt-2 text-xs space-y-1">
                    {orders.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold">
                          {idx + 1}
                        </span>
                        <span>{item || `Step ${idx + 1}`}</span>
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
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 text-sm rounded bg-gradient-to-r from-red-500 to-orange-500 text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditMode ? "Update Question" : "Save Question"}
        </button>
      </div>
    </div>
  );
};

export default CreateQuestion;