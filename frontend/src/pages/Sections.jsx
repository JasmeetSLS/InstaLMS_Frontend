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
} from "lucide-react";
import api from "../services/api";

const Sections = () => {
  const { streamId } = useParams();
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [contents, setContents] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [assessmentQuestions, setAssessmentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("cards");
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);

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
      const [contentsRes, assessmentsRes] = await Promise.all([
        api.getContentsBySection(sectionId),
        api.getAssessmentsBySection(sectionId),
      ]);
      const contentsData = contentsRes.data || [];
      const assessmentsData = assessmentsRes.data || [];
      setContents(contentsData);
      setAssessments(assessmentsData);
      setSelectedContent(null);
      setSelectedAssessment(null);
      setAssessmentQuestions([]);
      setCurrentQuestionIndex(0);
      if (contentsData.length > 0) {
        setActiveTab("cards");
      } else if (assessmentsData.length > 0) {
        setActiveTab("assessments");
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
      setSelectedAssessment(null);
      setAssessmentQuestions([]);
    } catch (error) {
      console.error("Error fetching content details:", error);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleAssessmentClick = async (assessment) => {
    setSelectedAssessment(assessment);
    setSelectedContent(null);
    setCurrentQuestionIndex(0);
    setLoadingPreview(true);
    try {
      const response = await api.getAssessmentQuestions(assessment.id);
      setAssessmentQuestions(response.data?.questions || []);
    } catch (error) {
      console.error("Error fetching assessment questions:", error);
      setAssessmentQuestions([]);
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleAddNew = () => {
  const sectionId = selectedSection?.id;
  if (sectionId) {
    navigate(`/admin/add-content-assessment?sectionId=${sectionId}`);
  } else {
    // Optionally show a toast or alert
    console.warn("No section selected");
  }
};


  const goToNextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const getContentImage = (content) => {
    if (!content) return null;
    if (content.media_url) {
      if (content.media_url.startsWith("http")) return content.media_url;
      return `http://localhost:5000${content.media_url}`;
    }
    return "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800";
  };

  const getContentDescription = (content) => {
    if (!content) return "";
    return content.description || "No description available";
  };

  // Renders the assessment preview inside the phone mockup
  const renderAssessmentPreview = () => {
    if (!selectedAssessment) return null;
    const qs = assessmentQuestions;
    if (qs.length === 0) {
      return <div className="text-gray-500 text-sm">No questions available</div>;
    }
    const question = qs[currentQuestionIndex];
    const total = qs.length;

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
                // Remove trailing "0" or any numbers from option text
                const cleanText = opt.option_text.replace(/\s*\d+$/, '').trim();
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
            Question {currentQuestionIndex + 1} of {total}
          </span>
        </div>
        <p className="mt-2 text-base font-medium text-gray-800">{question.question_text}</p>
        {renderQuestionContent()}
        <div className="flex justify-between mt-4 gap-2">
          <button
            onClick={goToPrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="text-sm px-3 py-1.5 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === total - 1}
            className="text-sm px-3 py-1.5 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

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
        {/* Increased right panel width to 320px */}
        <div className="grid grid-cols-[240px_1fr_320px] gap-3 h-[calc(100vh-170px)]">
          {/* LEFT PANEL - Sections */}
          <div className="bg-white border rounded overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-3 border-b">
              <h3 className="text-base font-medium">Section</h3>
              <PlusCircle size={22} className="text-red-500 cursor-pointer" />
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

          {/* CENTER PANEL - Cards / Assessments */}
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
                  setSelectedAssessment(null);
                  setAssessmentQuestions([]);
                }}
              >
                Cards ({contents.length})
              </button>
              <button
                className={`px-6 py-3 text-sm border-b-2 ${
                  activeTab === "assessments"
                    ? "border-red-500 font-medium"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab("assessments");
                  setSelectedContent(null);
                }}
              >
                Assessment Questions ({assessments.length})
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
                        <button className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <Share2 size={11} className="text-white" />
                        </button>
                        <button className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <Pencil size={11} className="text-white" />
                        </button>
                        <button className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                          <Trash2 size={11} className="text-white" />
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                assessments.length === 0 ? (
                  <div className="text-center text-gray-500 py-10 text-sm">
                    No assessments available for this section
                  </div>
                ) : (
                  assessments.map((assessment) => (
                    <div
                      key={assessment.id}
                      className={`border rounded p-2.5 flex items-center justify-between cursor-pointer ${
                        selectedAssessment?.id === assessment.id
                          ? "bg-blue-50 border-blue-300"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleAssessmentClick(assessment)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full border border-blue-300 flex items-center justify-center">
                          <FileText size={14} className="text-blue-400" />
                        </div>
                        <span className="text-sm text-gray-700">
                          {assessment.title || "Untitled Assessment"}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {assessment.assessment_type || "MCQ"}
                      </span>
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
              {/* Mobile mockup - width increased to 260px */}
              <div className="w-[260px] h-[500px] bg-[#20242c] rounded-[28px] p-3">
                <div className="bg-white rounded-[20px] h-full overflow-auto p-4">
                  {loadingPreview ? (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Loading...
                    </div>
                  ) : activeTab === "cards" && selectedContent ? (
                    <>
                      <h3 className="font-bold text-base leading-5">
                        {selectedContent.title || "Content Preview"}
                      </h3>
                      {selectedContent.media_url && (
                        <img
                          src={getContentImage(selectedContent)}
                          alt={selectedContent.title}
                          className="w-full h-28 object-cover mt-2 rounded"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800";
                          }}
                        />
                      )}
                      <div className="mt-3 text-sm leading-5">
                        <p className="mt-2">{getContentDescription(selectedContent)}</p>
                      </div>
                    </>
                  ) : activeTab === "assessments" && selectedAssessment ? (
                    renderAssessmentPreview()
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
                          <span className="text-center break-words">Select an assessment to preview</span>
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
    </div>
  );
};

export default Sections;