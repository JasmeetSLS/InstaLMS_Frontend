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
  const [activeTab, setActiveTab] = useState("cards"); // "cards" or "assessments"
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState(false);

  // Fetch sections
  useEffect(() => {
    fetchSections();
  }, [streamId]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await api.getSectionsByStream(streamId);
      const sectionsData = response.data || [];
      setSections(sectionsData);
      // Auto-select first section
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
      // Fetch contents and assessments for the selected section
      const [contentsRes, assessmentsRes] = await Promise.all([
        api.getContentsBySection(sectionId),
        api.getAssessmentsBySection(sectionId),
      ]);
      const contentsData = contentsRes.data || [];
      const assessmentsData = assessmentsRes.data || [];
      setContents(contentsData);
      setAssessments(assessmentsData);
      // Auto-select first content for preview
      if (contentsData.length > 0) {
        setSelectedContent(contentsData[0]);
      } else {
        setSelectedContent(null);
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

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  // Get image URL for content preview
  const getContentImage = (content) => {
    if (!content) return null;
    if (content.media_url) {
      if (content.media_url.startsWith("http")) return content.media_url;
      return `http://localhost:5000${content.media_url}`;
    }
    // Fallback default image
    return "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800";
  };

  // Get content description text (might be from description or content field)
  const getContentDescription = (content) => {
    if (!content) return "";
    // If content has description, use it; otherwise, could be from other fields
    return content.description || "No description available";
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
          <span className="text-sm text-gray-500">Stream ID: {streamId}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">Vijay Gaikwad</span>
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
        <div className="grid grid-cols-[240px_1fr_260px] gap-3 h-[calc(100vh-170px)]">
          {/* LEFT PANEL - Sections List */}
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

          {/* CENTER PANEL - Contents / Assessments */}
          <div className="bg-white border rounded flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b bg-gray-50">
              <button
                className={`px-6 py-3 text-sm border-b-2 ${
                  activeTab === "cards"
                    ? "border-red-500 font-medium"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("cards")}
              >
                Cards ({contents.length})
              </button>
              <button
                className={`px-6 py-3 text-sm border-b-2 ${
                  activeTab === "assessments"
                    ? "border-red-500 font-medium"
                    : "border-transparent text-gray-500"
                }`}
                onClick={() => setActiveTab("assessments")}
              >
                Assessment Questions ({assessments.length})
              </button>
              <div className="ml-auto px-3">
                <PlusCircle size={22} className="text-red-500 cursor-pointer" />
              </div>
            </div>

            {/* Content List */}
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
                          : "bg-white"
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
                      className="border rounded p-2.5 flex items-center justify-between bg-white"
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
              {selectedContent ? (
                <div className="w-[220px] h-[500px] bg-[#20242c] rounded-[28px] p-3">
                  <div className="bg-white rounded-[20px] h-full overflow-auto">
                    <div className="p-3">
                      <h3 className="font-bold text-sm leading-5">
                        {selectedContent.title || "Content Preview"}
                      </h3>
                      {selectedContent.media_url && (
                        <img
                          src={getContentImage(selectedContent)}
                          alt={selectedContent.title}
                          className="w-full h-24 object-cover mt-2 rounded"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800";
                          }}
                        />
                      )}
                      <div className="mt-2 text-[11px] leading-5">
                        {/* Render description with line breaks and bullet points if needed */}
                        <p className="text-blue-600 font-semibold">Welcome!</p>
                        <p className="mt-2">{getContentDescription(selectedContent)}</p>
                        {/* If content has description with bullet points, we can parse */}
                        {/* For now, show plain text */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm flex items-center justify-center h-full">
                  Select a card to preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sections;