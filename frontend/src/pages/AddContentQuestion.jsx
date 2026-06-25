import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  UserCircle,
  Image,
  Images,
  Video,
  LayoutPanelLeft,
  FileText,
  Globe,
  Grid2x2,
  Equal,
  ListOrdered,
  CheckCircle2,
  ArrowLeftRight,
  BookOpen,
  FileQuestion,
} from "lucide-react";
import api from "../services/api";

// Content templates – "Image-Text Side by Side" has been removed
const contentTemplates = [
  { icon: Images, label: "Multiple Image Text" }, 
  { icon: Video, label: "Video" },
  { icon: FileText, label: "Extract from PDF" },
  { icon: Globe, label: "Extract from URL" },
];

// Question templates – map each to a backend question_type
const questionTemplates = [
  { icon: Grid2x2, label: "MCQ - Single", type: "mcq" },
  { icon: Grid2x2, label: "MCQ - Multiple", type: "mcq" }, // same type, but we can differentiate later
  { icon: Equal, label: "Fill Blanks", type: "fill_blank" },
  { icon: ListOrdered, label: "Order the following", type: "order_following" },
  { icon: CheckCircle2, label: "True or False", type: "true_false" },
  { icon: ArrowLeftRight, label: "This or That", type: "this_or_that" },
];

const TemplateCard = ({ icon: Icon, label, onClick }) => (
  <div
    className="flex flex-col items-center cursor-pointer group"
    onClick={onClick}
  >
    <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 group-hover:border-red-400">
      <Icon size={20} className="text-gray-400 group-hover:text-red-500" />
    </div>
    <span className="mt-2 text-xs text-center text-[#1d3557] leading-4">
      {label}
    </span>
  </div>
);

const AddContentQuestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sectionId = searchParams.get("sectionId");

  const [activeTab, setActiveTab] = useState("content");
  const [sectionTitle, setSectionTitle] = useState("Section");
  const [streamTitle, setStreamTitle] = useState("Stream");
  const [loading, setLoading] = useState(true);

  // Fetch section details to show in breadcrumb
  useEffect(() => {
    if (sectionId) {
      fetchSectionDetails();
    } else {
      setLoading(false);
    }
  }, [sectionId]);

  const fetchSectionDetails = async () => {
    try {
      setLoading(true);
      // You need an endpoint to get section by ID (if not already available)
      // Here we assume you have a getSectionById method – add it if missing.
      const response = await api.getSectionById(sectionId);
      const data = response.data;
      setSectionTitle(data.title || "Section");
      setStreamTitle(data.stream_title || "Stream");
    } catch (error) {
      console.error("Error fetching section details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleTemplateSelect = (label, type) => {
    if (type === "content") {
      navigate(
        `/admin/create-content?sectionId=${sectionId}&type=content&template=${encodeURIComponent(label)}`
      );
    } else {
      // For questions, only pass type and template – no questionType
      navigate(
        `/admin/create-question?sectionId=${sectionId}&type=question&template=${encodeURIComponent(label)}`
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

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
          <span className="text-sm text-gray-500">Add New</span>
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
        <span>{streamTitle}</span>
        <span className="text-gray-400 ml-1">| English Global</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span>{sectionTitle}</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="font-semibold">Create New</span>
      </div>

      {/* Step Header */}
      <div className="px-4">
        <div className="flex">
          <div className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white h-14 px-4">
            <span className="text-2xl font-bold mr-3">01</span>
            <span className="text-sm font-medium">
              Select type of {activeTab} you want to create
            </span>
          </div>
          <div className="w-16 bg-white border border-l-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-red-500">02</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-4 bg-white border border-[#df6545]">
        {/* Tab Selector */}
        <div className="flex border-b bg-gray-50">
          <button
            className={`flex items-center gap-2 px-6 py-3 text-sm border-b-2 ${
              activeTab === "content"
                ? "border-red-500 font-medium text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("content")}
          >
            <BookOpen size={16} />
            Content
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-3 text-sm border-b-2 ${
              activeTab === "question"
                ? "border-red-500 font-medium text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("question")}
          >
            <FileQuestion size={16} />
            Question
          </button>
        </div>

        <div className="grid lg:grid-cols-[1fr_245px]">
          {/* Left Section */}
          <div className="p-4">
            <h2 className="text-2xl font-medium text-gray-700 mb-6">
              {activeTab === "content" ? "Content Templates" : "Question Templates"}
            </h2>

            {activeTab === "content" ? (
              <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6">
                {contentTemplates.map((item) => (
                  <TemplateCard
                    key={item.label}
                    {...item}
                    onClick={() => handleTemplateSelect(item.label, "content")}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6">
                {questionTemplates.map((item) => (
                  <TemplateCard
                    key={item.label}
                    {...item}
                    onClick={() => handleTemplateSelect(item.label, "question", item.type)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Phone Preview */}
          <div className="flex justify-center items-center p-4 border-l">
            <div className="relative w-[215px] h-[435px] bg-[#1f232a] rounded-[28px]">
              <div className="absolute top-3 left-8 w-2.5 h-2.5 rounded-full bg-black" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-black rounded-full" />
              <div className="absolute top-3 right-8 w-2.5 h-2.5 rounded-full bg-black" />
              <div className="absolute inset-3 bg-white rounded-[20px] flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border border-gray-200 flex items-center justify-center">
                  <Image size={42} className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500" />
      </div>

      {/* Footer Button */}
      <div className="px-4 py-3">
        <button className="px-6 py-2 text-sm rounded bg-gradient-to-r from-red-500 to-orange-500 text-white">
          NEXT
        </button>
      </div>
    </div>
  );
};

export default AddContentQuestion;