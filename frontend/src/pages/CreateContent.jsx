import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  UserCircle,
  X,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText as FileTextIcon,
  Link2,
  Trash2,
  Loader2,
  Type,
} from "lucide-react";
import api from "../services/api";
import "./CreateContent.css";

// --- PDF.js with Vite-compatible worker ---
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

// Helper to extract YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
};

const CreateContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sectionId = searchParams.get("sectionId");
  const template = searchParams.get("template") || "Multiple Image Text";
  const type = searchParams.get("type") || "content";

  // Common fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [openInBrowser, setOpenInBrowser] = useState(false);

  // Video fields
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  // PDF fields
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  // URL fields
  const [sourceUrl, setSourceUrl] = useState("");

  // --- Multiple slides – empty by default ---
  const [slides, setSlides] = useState([]);

  // Section/Stream details
  const [sectionTitle, setSectionTitle] = useState("Section");
  const [streamTitle, setStreamTitle] = useState("Stream");
  const [loading, setLoading] = useState(false);

  // --- background image state (used for Multiple Image Text preview) ---
  const [backgroundImage, setBackgroundImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sectionId) {
      fetchSectionDetails();
    }
  }, [sectionId]);

  const fetchSectionDetails = async () => {
    try {
      setLoading(true);
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

  // --- PDF Extraction ---
  const extractTextFromPDF = async (file) => {
    try {
      setIsExtracting(true);
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n\n";
      }
      setPdfText(fullText.trim());
      return fullText.trim();
    } catch (error) {
      console.error("Error extracting PDF text:", error);
      setPdfText("Failed to extract text from PDF.");
      return "";
    } finally {
      setIsExtracting(false);
    }
  };

  // --- Handlers for other templates ---
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setVideoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoUrl("");
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
      setPdfName(file.name);
      setPdfText("");
      extractTextFromPDF(file);
    }
  };
  const removePdf = () => {
    setPdfFile(null);
    setPdfName("");
    setPdfText("");
  };

  // --- Slide handlers ---
  const addSlide = (slideType) => {
    const newSlide =
      slideType === "image"
        ? { type: "image", imageFile: null, imagePreview: null, text: "" }
        : { type: "text", text: "" };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    // If no slides remain, reset background
    if (updatedSlides.length === 0) {
      setBackgroundImage(null);
    } else {
      // If no slide has an image, clear background image
      const hasImage = updatedSlides.some((s) => s.type === "image" && s.imageFile);
      if (!hasImage) {
        setBackgroundImage(null);
      }
    }
  };

  const updateSlideImage = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      const updated = [...slides];
      updated[index].imageFile = file;
      updated[index].imagePreview = dataUrl;
      setSlides(updated);
      // Set as background image
      setBackgroundImage(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const updateSlideText = (index, text) => {
    const updated = [...slides];
    updated[index].text = text;
    setSlides(updated);
  };

  // --- Submit ---
const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('sectionId', sectionId);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('template', template);
  formData.append('isNumberedList', isNumberedList ? 'true' : 'false');
  formData.append('openInBrowser', openInBrowser ? 'true' : 'false');

  // Template-specific fields
  if (template === 'Video') {
    if (videoFile) {
      formData.append('videoFile', videoFile);
    } else if (videoUrl) {
      formData.append('videoUrl', videoUrl);
    }
  } else if (template === 'Extract from PDF') {
    if (pdfFile) {
      formData.append('pdfFile', pdfFile);
    }
    formData.append('pdfText', pdfText);
  } else if (template === 'Extract from URL') {
    formData.append('sourceUrl', sourceUrl);
  } else if (template === 'Multiple Image Text') {
    // Append slide count
    formData.append('slideCount', slides.length);
    slides.forEach((slide, index) => {
      formData.append(`slideType_${index}`, slide.type);
      if (slide.type === 'image') {
        if (slide.imageFile) {
          formData.append(`slideImage_${index}`, slide.imageFile);
        }
      } else {
        formData.append(`slideText_${index}`, slide.text || '');
      }
    });
  }

  try {
    setSubmitting(true);
    const response = await api.createContent(formData); // we'll add this API method
    console.log('Content created:', response);
    alert('Content created successfully!');
    navigate(-1);
  } catch (error) {
    console.error('Error creating content:', error);
    alert('Failed to create content: ' + error.message);
  } finally {
    setSubmitting(false);
  }
};

  // --- Render template-specific fields ---
  const renderTemplateFields = () => {
    switch (template) {
      case "Video":
        return (
          <>
            <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
              {videoPreview ? (
                <>
                  <button
                    onClick={removeVideo}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X size={16} className="text-white" />
                  </button>
                  <video src={videoPreview} className="w-52 h-36 object-cover" controls />
                </>
              ) : (
                <div className="text-center">
                  <VideoIcon size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload video</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                    id="videoUpload"
                  />
                  <label
                    htmlFor="videoUpload"
                    className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL (Optional)
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/video.mp4"
                className="w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          </>
        );

      case "Extract from PDF":
        return (
          <>
            <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
              {pdfFile ? (
                <div className="text-center">
                  <FileTextIcon size={48} className="mx-auto text-red-500 mb-2" />
                  <p className="text-sm font-medium">{pdfName}</p>
                  {isExtracting ? (
                    <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
                      <Loader2 size={16} className="animate-spin" /> Extracting text...
                    </div>
                  ) : (
                    <button onClick={removePdf} className="mt-2 text-xs text-red-500 hover:underline">
                      Remove
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <FileTextIcon size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload PDF</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="hidden"
                    id="pdfUpload"
                  />
                  <label
                    htmlFor="pdfUpload"
                    className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">* Upload PDF file (Max 10MB)</p>
            {pdfText && (
              <div className="mt-3 p-2 bg-gray-50 border rounded text-xs max-h-32 overflow-y-auto">
                <p className="font-medium text-gray-700">Extracted text preview:</p>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {pdfText.length > 300 ? `${pdfText.substring(0, 300)}...` : pdfText}
                </p>
              </div>
            )}
          </>
        );

      case "Extract from URL":
        return (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the URL from which content will be extracted.
              </p>
            </div>
          </>
        );

      // --- Multiple slides ---
      case "Multiple Image Text":
        return (
          <>
            <div className="space-y-4">
              {slides.map((slide, idx) => (
                <div key={idx} className="border p-3 rounded relative bg-gray-50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">
                      Slide {idx + 1} — {slide.type === "image" ? "🖼️ Image" : "📝 Text"}
                    </span>
                    <button onClick={() => removeSlide(idx)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {slide.type === "image" ? (
                    <div className="relative h-40 bg-white border flex items-center justify-center">
                      {slide.imagePreview ? (
                        <>
                          <button
                            onClick={() => {
                              const updated = [...slides];
                              updated[idx].imageFile = null;
                              updated[idx].imagePreview = null;
                              setSlides(updated);
                              // If no other image slides, reset background
                              if (!updated.some((s) => s.type === "image" && s.imageFile)) {
                                setBackgroundImage(null);
                              }
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <X size={14} className="text-white" />
                          </button>
                          <img
                            src={slide.imagePreview}
                            alt={`slide ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </>
                      ) : (
                        <div className="text-center">
                          <Upload size={24} className="mx-auto text-gray-400 mb-1" />
                          <p className="text-xs text-gray-500">Click to upload image</p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) updateSlideImage(idx, file);
                            }}
                            className="hidden"
                            id={`slideImageUpload_${idx}`}
                          />
                          <label
                            htmlFor={`slideImageUpload_${idx}`}
                            className="inline-block mt-1 px-3 py-0.5 bg-gray-200 text-xs rounded cursor-pointer hover:bg-gray-300"
                          >
                            Choose File
                          </label>
                        </div>
                      )}
                    </div>
                  ) : (
                    <textarea
                      rows={2}
                      value={slide.text}
                      onChange={(e) => updateSlideText(idx, e.target.value)}
                      placeholder={`Enter text for slide ${idx + 1}`}
                      className="w-full border rounded px-2 py-1 text-sm resize-none"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => addSlide("image")}
                className="flex-1 py-3 border-2 border-dashed border-red-300 rounded-lg text-red-500 hover:bg-red-50 transition flex items-center justify-center gap-2"
              >
                <ImageIcon size={20} /> Add Image Slide
              </button>
              <button
                onClick={() => addSlide("text")}
                className="flex-1 py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <Type size={20} /> Add Text Slide
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // --- Preview renderer ---
  const renderPreviewContent = () => {
    switch (template) {
      case "Video":
        return (
          <>
            <h3 className="font-bold text-base">{title || "Content Preview"}</h3>
            {videoPreview && (
              <video src={videoPreview} className="w-full h-32 object-cover mt-2 rounded" controls />
            )}
            {videoUrl && !videoPreview && (
              <div className="w-full h-32 bg-gray-200 mt-2 rounded flex items-center justify-center text-xs text-gray-500">
                Video from URL
              </div>
            )}
            <div className="text-sm mt-3">
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      case "Extract from PDF":
        return (
          <>
            <h3 className="font-bold text-base">{title || "Content Preview"}</h3>
            {pdfFile ? (
              <>
                <div className="mt-2 p-2 bg-gray-100 rounded flex items-center justify-center gap-2 text-xs">
                  <FileTextIcon size={20} className="text-red-500" />
                  <span className="truncate">{pdfName}</span>
                </div>
                {isExtracting ? (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Loader2 size={16} className="animate-spin" /> Extracting text...
                  </div>
                ) : pdfText ? (
                  <div className="mt-3 text-xs max-h-40 overflow-y-auto text-gray-700 whitespace-pre-wrap border p-2 rounded bg-gray-50">
                    {pdfText.length > 500 ? pdfText.substring(0, 500) + "..." : pdfText}
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-gray-400">No text extracted yet.</p>
                )}
              </>
            ) : (
              <div className="mt-2 h-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                No PDF uploaded
              </div>
            )}
            <div className="text-sm mt-3">
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      case "Extract from URL": {
        const youtubeEmbedUrl = getYouTubeEmbedUrl(sourceUrl);
        return (
          <>
            <h3 className="font-bold text-base">{title || "Content Preview"}</h3>
            {youtubeEmbedUrl ? (
              <div className="mt-2 w-full aspect-video">
                <iframe
                  src={youtubeEmbedUrl}
                  title="YouTube video"
                  className="w-full h-full rounded"
                  allowFullScreen
                />
              </div>
            ) : sourceUrl ? (
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs break-all">
                <Link2 size={14} className="inline mr-1" />
                {sourceUrl}
              </div>
            ) : null}
            <div className="text-sm mt-3">
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );
      }

      case "Multiple Image Text":
        return (
          <>
            <h3 className="font-bold text-base text-white">{title || "Content Preview"}</h3>
            {slides.length === 0 ? (
              <div className="text-xs mt-4 text-center">No slides to preview</div>
            ) : (
              <div className="mt-2 space-y-3">
                {slides.map((slide, idx) => (
                  <div key={idx} className="p-2">
                    {slide.type === "image" && slide.imagePreview && (
                      <img
                        src={slide.imagePreview}
                        alt={`slide ${idx + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                    )}
                    {slide.type === "text" && slide.text && (
                      <div className="text-xs border p-2 text-white rounded">
                        {slide.text}
                      </div>
                    )}
                    {slide.type === "image" && !slide.imagePreview && (
                      <div className="text-xs text-gray-300">Empty image slide {idx + 1}</div>
                    )}
                    {slide.type === "text" && !slide.text && (
                      <div className="text-xs text-gray-300">Empty text slide {idx + 1}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm mt-3 text-white">
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      default:
        return (
          <p className="text-gray-400 text-xs">Preview not available</p>
        );
    }
  };

  // --- Main render ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex justify-center items-center">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  const isMultipleImageText = template === "Multiple Image Text";

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="h-12 bg-white border-b flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} /> Back
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500">Create Content</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Super Admin</span>
          <Bell size={18} className="text-red-500" />
          <UserCircle size={24} className="text-red-500" />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm">
        <span className="text-[#1d3557]">Products</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="text-[#1d3557]">{streamTitle}</span>
        <span className="text-gray-400 ml-1">| English Global</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="font-medium text-[#1d3557]">{sectionTitle}</span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="font-medium text-[#1d3557]">Create Content</span>
        <span className="text-gray-400 ml-1">({template})</span>
      </div>

      {/* Step Tabs */}
      <div className="flex px-3">
        <div className="w-16 h-14 bg-white border flex items-center justify-center text-red-500 text-xl font-bold">
          01
        </div>
        <div className="h-14 px-6 bg-gradient-to-r from-red-500 to-orange-500 flex items-center text-white">
          <span className="text-2xl font-bold mr-3">02</span>
          <span className="font-medium">Enter / Edit the content</span>
        </div>
      </div>

      {/* Main Area */}
      <div className="mx-3 border border-[#df6545] bg-white">
        <div className="grid lg:grid-cols-[1fr_1fr]">
          {/* Content Column */}
          <div className="border-r border-[#df6545] p-5">
            <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">CONTENT</h2>

            <div className="max-w-lg mx-auto">
              {/* Title */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-4 py-2 text-base"
                placeholder="Enter title"
              />
              <p className="text-sm text-gray-500 mt-1">{86 - title.length} characters remaining.</p>

              {/* Template-specific fields */}
              {renderTemplateFields()}

              {/* Description */}
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded p-3 text-sm resize-none"
                  placeholder="Enter description..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={handleBack}
                  className="px-5 py-2 border rounded bg-gray-100 text-sm hover:bg-gray-200"
                >
                  PREVIOUS
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm hover:opacity-90"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="p-5">
            <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">PREVIEW</h2>

            <div className="flex justify-center">
              <div className="w-[260px] h-[500px] bg-[#20242c] rounded-[28px] p-3">
                {isMultipleImageText ? (
                  // Multiple Image Text: exactly as in Sections
                  <div className="rounded-[20px] h-full overflow-hidden relative">
                    {backgroundImage && (
                      <img
                        src={backgroundImage}
                        alt="Background"
                        className="absolute inset-0 w-full h-full object-cover bg-animated"
                        style={{ filter: "blur(1px)" }}
                      />
                    )}
                    <div
                      className="absolute inset-0 rounded-[20px]"
                      style={{ backgroundColor: "#000000", opacity: 0.5 }}
                    />
                    <div className="relative z-10 h-full overflow-auto p-4 text-white">
                      {renderPreviewContent()}
                      <p className="italic text-center mt-4 text-xs">Swipe on!</p>
                    </div>
                  </div>
                ) : (
                  // Other templates: white background
                  <div className="rounded-[20px] h-full bg-white p-4 overflow-auto">
                    {renderPreviewContent()}
                    <p className="italic text-center mt-4 text-xs text-gray-400">Swipe on!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;