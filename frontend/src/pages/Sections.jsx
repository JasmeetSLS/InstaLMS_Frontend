import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  UserCircle,
  PlusCircle,
  Pencil,
  Trash2,
  Share2,
  Image as ImageIcon,
  FileText,
  CheckCircle,
  X,
  Video as VideoIcon,
  File,
  Link as LinkIcon,
} from "lucide-react";
import api, { FILE_BASE_URL } from "../services/api";
import "./CreateContent.css";   // re‑use zoom animation and styling

// Helper to extract YouTube embed URL (copied from CreateContent)
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
};

const Sections = () => {
  const { streamId } = useParams();
  const navigate = useNavigate();

  // Section related
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  // Content (Cards)
  const [contents, setContents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  // Questions (replaces assessments)
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("cards");
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);

  // --- Add Section Modal ---
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionDescription, setNewSectionDescription] = useState("");
  const [sectionSubmitting, setSectionSubmitting] = useState(false);
  const [sectionError, setSectionError] = useState("");

  useEffect(() => {
    fetchSections();
  }, [streamId]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await api.getSectionsByStream(streamId);
      const sectionsData = response.data || [];
      setSections(sectionsData);
      if (sectionsData.length > 0) {
        setSelectedSection(sectionsData[0]);
        await fetchSectionData(sectionsData[0].id);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionData = async (sectionId) => {
    try {
      setLoadingContent(true);
      const [contentsRes, questionsRes] = await Promise.all([
        api.getContentsBySection(sectionId),
        api.getQuestionsBySection(sectionId),
      ]);
      const contentsData = contentsRes.data || [];
      const questionsData = questionsRes.data || [];
      setContents(contentsData);
      setQuestions(questionsData);
      setSelectedContent(null);
      setSelectedQuestion(null);
      setCurrentQuestionIndex(0);
      if (contentsData.length > 0) {
        setActiveTab("cards");
      } else if (questionsData.length > 0) {
        setActiveTab("questions");
      } else {
        setActiveTab("cards");
      }
    } catch (error) {
      console.error("Error fetching section data:", error);
    } finally {
      setLoadingContent(false);
    }
  };

  const handleSectionClick = async (section) => {
    setSelectedSection(section);
    await fetchSectionData(section.id);
  };

  const handleContentClick = async (content) => {
    setLoadingPreview(true);
    try {
      const response = await api.getContentById(content.id);
      setSelectedContent(response.data);
      setSelectedQuestion(null);
    } catch (error) {
      console.error("Error fetching content details:", error);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleQuestionClick = async (question) => {
    setLoadingPreview(true);
    try {
      const response = await api.getQuestionById(question.id);
      setSelectedQuestion(response.data);
      setSelectedContent(null);
      const idx = questions.findIndex(q => q.id === question.id);
      setCurrentQuestionIndex(idx >= 0 ? idx : 0);
    } catch (error) {
      console.error("Error fetching question details:", error);
    } finally {
      setLoadingPreview(false);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      const nextQuestion = questions[nextIdx];
      if (selectedQuestion?.id !== nextQuestion.id) {
        handleQuestionClick(nextQuestion);
      } else {
        setSelectedQuestion(nextQuestion);
      }
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      const prevQuestion = questions[prevIdx];
      if (selectedQuestion?.id !== prevQuestion.id) {
        handleQuestionClick(prevQuestion);
      } else {
        setSelectedQuestion(prevQuestion);
      }
    }
  };

  const handleAddNew = () => {
    const sectionId = selectedSection?.id;
    if (sectionId) {
      navigate(`/admin/add-content-question?sectionId=${sectionId}`);
    } else {
      console.warn("No section selected");
    }
  };

  // -------- Edit & Delete handlers --------
  const handleEditContent = (content) => {
    if (!selectedSection) return;
    navigate(`/admin/create-content?sectionId=${selectedSection.id}&contentId=${content.id}`);
  };

  const handleDeleteContent = async (content) => {
    if (!window.confirm(`Are you sure you want to delete "${content.title || 'this content'}"?`)) {
      return;
    }
    try {
      await api.deleteContent(content.id);
      // Refresh contents list
      if (selectedSection) {
        await fetchSectionData(selectedSection.id);
        // If the deleted content was selected, clear selection
        if (selectedContent?.id === content.id) {
          setSelectedContent(null);
        }
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

  // -------- PREVIEW RENDERERS --------
  const renderContentPreview = () => {
    if (!selectedContent) return null;
    const content = selectedContent;

    switch (content.content_type) {
      case "video":
        return (
          <>
            <h3 className="font-bold text-base leading-5">{content.title || "Video Content"}</h3>
            {content.media_url && (
              <video
                controls
                className="w-full h-32 object-cover mt-2 rounded"
                poster={
                  content.thumbnail_url ? `${FILE_BASE_URL}${content.thumbnail_url}` : undefined
                }
              >
                <source src={`${FILE_BASE_URL}${content.media_url}`} type="video/mp4" />
              </video>
            )}
            <div className="mt-3 text-sm leading-5">
              <p>{content.description || "No description available"}</p>
            </div>
          </>
        );

      case "pdf_extract":
        return (
          <>
            <h3 className="font-bold text-base leading-5">{content.title || "PDF Document"}</h3>
            {content.thumbnail_url && (
              <img
                src={`${FILE_BASE_URL}${content.thumbnail_url}`}
                alt="PDF Thumbnail"
                className="w-full h-28 object-cover mt-2 rounded"
              />
            )}
            <div className="mt-2 flex items-center gap-2 text-xs bg-gray-100 p-2 rounded">
              <File size={16} className="text-red-500" />
              <span className="truncate">{content.pdf_name || "document.pdf"}</span>
              {content.pdf_url && (
                <a
                  href={`${FILE_BASE_URL}${content.pdf_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-red-500 hover:underline"
                >
                  View PDF
                </a>
              )}
            </div>
            {content.pdf_text && (
              <div className="mt-3 text-xs max-h-40 overflow-y-auto text-gray-700 whitespace-pre-wrap border p-2 rounded bg-gray-50">
                {content.pdf_text.length > 500 ? content.pdf_text.substring(0, 500) + "..." : content.pdf_text}
              </div>
            )}
            <div className="mt-3 text-sm leading-5">
              <p>{content.description || "No description available"}</p>
            </div>
          </>
        );

      case "url_extract": {
        const youtubeEmbedUrl = getYouTubeEmbedUrl(content.source_url);
        return (
          <>
            <h3 className="font-bold text-base leading-5">{content.title || "URL Content"}</h3>
            {youtubeEmbedUrl ? (
              <div className="mt-2 w-full aspect-video">
                <iframe
                  src={youtubeEmbedUrl}
                  title="YouTube video"
                  className="w-full h-full rounded"
                  allowFullScreen
                />
              </div>
            ) : content.source_url ? (
              <a
                href={content.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-blue-500 hover:underline text-sm break-all"
              >
                <LinkIcon size={16} />
                {content.source_url}
              </a>
            ) : null}
            <div className="mt-3 text-sm leading-5">
              <p>{content.description || "No description available"}</p>
            </div>
          </>
        );
      }

      case "multiple_image_text": {
        const slides = content.slides || [];
        const lastImageSlide = [...slides]
          .reverse()
          .find((s) => s.type === "image" && s.content);

        return (
          <div className="relative w-full h-full overflow-hidden">
            {/* Background image – fixed, zooming, blurred */}
            {lastImageSlide && (
              <img
                src={`${FILE_BASE_URL}${lastImageSlide.content}`}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover bg-animated"
                style={{
                  filter: "blur(1px)",
                  willChange: "transform",
                }}
              />
            )}
            {/* Semi‑transparent blue overlay for readability */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#000000",
                opacity: 0.5,
              }}
            />
            {/* Content wrapper – scrollable */}
            <div className="relative z-10 h-full overflow-auto p-4 text-white">
              <h3 className="font-bold text-base leading-5">
                {content.title || "Slides"}
              </h3>
              <div className="mt-2 space-y-4">
                {slides.map((slide, idx) => (
                  <div key={idx}>
                    {slide.type === "image" && slide.content && (
                      <img
                        src={`${FILE_BASE_URL}${slide.content}`}
                        alt={`Slide ${idx + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    )}
                    {slide.type === "text" && slide.content && (
                      <div className="text-sm leading-5 p-2 border bg-opacity-30 rounded text-white">
                        {slide.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-sm leading-5">
                <p>{content.description || "No description available"}</p>
              </div>
            </div>
          </div>
        );
      }

      default:
        return (
          <>
            <h3 className="font-bold text-base leading-5">{content.title || "Content"}</h3>
            <div className="mt-3 text-sm leading-5">
              <p>{content.description || "No description available"}</p>
            </div>
          </>
        );
    }
  };

  const renderQuestionPreview = () => {
    if (!selectedQuestion) return null;
    const question = selectedQuestion;
    const total = questions.length;
    const currentIdx = currentQuestionIndex;

    const renderQuestionContent = () => {
      switch (question.question_type) {
        case "mcq":
        case "this_or_that":
        case "true_false":
          return (
            <div className="mt-3 space-y-2">
              {question.options &&
                question.options.map((opt, idx) => {
                  const isCorrect = opt.is_correct === 1;
                  const cleanText = opt.option_text.replace(/\s*\d+$/, "").trim();
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-sm p-1.5 rounded ${
                        isCorrect ? "bg-green-100 border border-green-300" : ""
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs font-medium">
                        {letter}
                      </span>
                      <span className="text-sm">{cleanText}</span>
                      {isCorrect && <CheckCircle size={16} className="text-green-600 ml-auto" />}
                    </div>
                  );
                })}
            </div>
          );

        case "match_following":
          return (
            <div className="mt-3 text-sm space-y-1.5">
              {question.matches &&
                question.matches.map((match, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-100 py-1.5">
                    <span className="font-medium text-sm">{match.left_text}</span>
                    <span className="text-gray-600 text-sm">→ {match.right_text}</span>
                  </div>
                ))}
            </div>
          );

        case "order_following":
          return (
            <div className="mt-3 text-sm space-y-1.5">
              {question.orders &&
                question.orders.map((order, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-1.5 border-b border-gray-100">
                    <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                      {order.correct_position}
                    </span>
                    <span className="text-sm">{order.item_text}</span>
                  </div>
                ))}
            </div>
          );

        case "fill_blank":
          return (
            <div className="mt-3 text-sm">
              <p className="font-medium text-green-600">
                Answer: <span className="text-gray-800">{question.answer || "N/A"}</span>
              </p>
              <p className="text-gray-400 mt-1 text-xs">(Fill in the blank question)</p>
            </div>
          );

        default:
          return <div className="text-gray-400 text-xs">Unsupported question type</div>;
      }
    };

    return (
      <div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>
            Question {currentIdx + 1} of {total}
          </span>
        </div>
        <p className="mt-2 text-base font-medium text-gray-800">{question.question_text}</p>
        {renderQuestionContent()}
        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={goToPrevQuestion}
            disabled={currentIdx === 0}
            className="text-sm px-3 py-1.5 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={goToNextQuestion}
            disabled={currentIdx === total - 1}
            className="text-sm px-3 py-1.5 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  // --- Add Section Modal handlers ---
  const handleOpenAddSection = () => {
    setShowAddSectionModal(true);
    setNewSectionTitle("");
    setNewSectionDescription("");
    setSectionError("");
  };

  const handleCloseAddSection = () => {
    setShowAddSectionModal(false);
    setNewSectionTitle("");
    setNewSectionDescription("");
    setSectionError("");
    setSectionSubmitting(false);
  };

  const handleAddSectionSubmit = async (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) {
      setSectionError("Title is required");
      return;
    }
    setSectionSubmitting(true);
    setSectionError("");
    try {
      await api.createSection({
        stream_id: parseInt(streamId),
        title: newSectionTitle.trim(),
        description: newSectionDescription.trim() || "",
      });
      handleCloseAddSection();
      await fetchSections();
    } catch (err) {
      setSectionError(err.message || "Failed to add section");
    } finally {
      setSectionSubmitting(false);
    }
  };

  // --- Loading / Error states ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex justify-center items-center">
        <div className="text-lg font-medium">Loading sections...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm font-medium text-gray-700">
            Sections for Stream
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Super Admin</span>
          <Bell size={16} className="text-red-500" />
          <UserCircle size={22} className="text-red-500" />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm">
        <span className="font-medium text-gray-700">Products</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="font-semibold text-gray-800">
          {selectedSection ? selectedSection.title : "Select a section"}
        </span>
        <span className="text-gray-400 ml-1">| English Global</span>
      </div>

      {/* Version Bar */}
      <div className="mx-3 bg-[#ececec] border border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="border-b-2 border-red-500 pb-2">
            <span className="text-red-500 text-lg">Version 1</span>
            <span className="text-orange-400 text-sm ml-1">(Editing)</span>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-red-300 text-red-500 rounded text-sm">
              Discard
            </button>
            <button className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
              Send for Approval
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3">
        <div className="grid grid-cols-[240px_1fr_320px] gap-3 h-[calc(100vh-170px)]">
          {/* LEFT PANEL - Sections */}
          <div className="bg-white border rounded overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-3 border-b">
              <h3 className="text-base font-medium">Section</h3>
              <PlusCircle
                size={22}
                className="text-red-500 cursor-pointer"
                onClick={handleOpenAddSection}
              />
            </div>
            <div className="overflow-y-auto p-3 space-y-3 flex-1">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`border rounded p-3 cursor-pointer transition ${
                    selectedSection?.id === section.id
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-transparent"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  onClick={() => handleSectionClick(section)}
                >
                  <h4 className="font-semibold text-sm leading-5">{section.title}</h4>
                  <p
                    className={`mt-3 text-xs ${
                      selectedSection?.id === section.id ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {section.description || "No description"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER PANEL - Cards / Questions */}
          <div className="bg-white border rounded flex flex-col overflow-hidden">
            <div className="flex items-center border-b bg-gray-50">
              <button
                className={`px-6 py-3 text-sm border-b-2 ${
                  activeTab === "cards"
                    ? "border-red-500 font-medium"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("cards");
                  setSelectedQuestion(null);
                }}
              >
                Cards ({contents.length})
              </button>
              <button
                className={`px-6 py-3 text-sm border-b-2 ${
                  activeTab === "questions"
                    ? "border-red-500 font-medium"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("questions");
                  setSelectedContent(null);
                }}
              >
                Questions ({questions.length})
              </button>
              <div className="ml-auto px-3">
                <PlusCircle
                  size={22}
                  className="text-red-500 cursor-pointer"
                  onClick={handleAddNew}
                />
              </div>
            </div>

            <div className="p-3 space-y-2 overflow-auto flex-1">
              {activeTab === "cards" ? (
                contents.length === 0 ? (
                  <div className="text-center text-gray-500 py-10 text-sm">
                    No cards available for this section
                  </div>
                ) : (
                  contents.map((content) => (
                    <div
                      key={content.id}
                      className={`border rounded p-2.5 flex items-center justify-between cursor-pointer ${
                        selectedContent?.id === content.id
                          ? "bg-red-50 border-red-300"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleContentClick(content)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full border border-red-300 flex items-center justify-center">
                          <ImageIcon size={14} className="text-red-400" />
                        </div>
                        <span className="text-sm text-gray-700">
                          {content.title || "Untitled Card"}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Share functionality - placeholder
                          }}
                        >
                          <Share2 size={11} className="text-white" />
                        </button>
                        <button
                          className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditContent(content);
                          }}
                        >
                          <Pencil size={11} className="text-white" />
                        </button>
                        <button
                          className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteContent(content);
                          }}
                        >
                          <Trash2 size={11} className="text-white" />
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                questions.length === 0 ? (
                  <div className="text-center text-gray-500 py-10 text-sm">
                    No questions available for this section
                  </div>
                ) : (
                  questions.map((question) => (
                    <div
                      key={question.id}
                      className={`border rounded p-2.5 flex items-center justify-between cursor-pointer ${
                        selectedQuestion?.id === question.id
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleQuestionClick(question)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full border border-blue-300 flex items-center justify-center">
                          <FileText size={14} className="text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-700 truncate max-w-[150px]">
                          {question.question_text || "Untitled Question"}
                        </span>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>

          {/* RIGHT PANEL - Preview */}
          <div className="bg-white border rounded overflow-hidden flex flex-col">
            <div className="flex border-b bg-gray-50">
              <button className="flex-1 py-3 text-sm border-b-2 border-red-500 font-medium">
                Preview
              </button>
              <button className="flex-1 py-3 text-sm text-gray-500">Activity Log</button>
            </div>
            <div className="flex justify-center py-3 overflow-auto flex-1">
              <div className="w-[260px] h-[500px] bg-[#20242c] rounded-[28px] p-3">
                <div
                  className={`rounded-[20px] h-full ${
                    activeTab === "cards" && selectedContent?.content_type === "multiple_image_text"
                      ? "overflow-hidden"
                      : "bg-white p-4 overflow-auto"
                  }`}
                >
                  {loadingPreview ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Loading...
                    </div>
                  ) : activeTab === "cards" && selectedContent ? (
                    renderContentPreview()
                  ) : activeTab === "questions" && selectedQuestion ? (
                    renderQuestionPreview()
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm p-2">
                      {activeTab === "cards" ? (
                        <>
                          <ImageIcon size={40} className="mb-3 text-gray-300" />
                          <span className="text-center break-words">Select a card to preview</span>
                        </>
                      ) : (
                        <>
                          <FileText size={40} className="mb-3 text-gray-300" />
                          <span className="text-center break-words">Select a question to preview</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Add Section Modal --- */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-[#000000d6] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Section</h2>
              <button
                onClick={handleCloseAddSection}
                className="text-gray-500 hover:text-gray-700"
                disabled={sectionSubmitting}
              >
                <X size={20} />
              </button>
            </div>

            {sectionError && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
                {sectionError}
              </div>
            )}

            <form onSubmit={handleAddSectionSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  required
                  disabled={sectionSubmitting}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newSectionDescription}
                  onChange={(e) => setNewSectionDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  disabled={sectionSubmitting}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseAddSection}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  disabled={sectionSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={sectionSubmitting}
                >
                  {sectionSubmitting ? "Adding..." : "Add Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sections;