import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Bell,
  UserCircle,
  X,
  Upload,
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
  FileText as FileTextIcon,
  Link2,
  Trash2,
  Loader2,
} from "lucide-react";
import api from "../services/api";

// --- PDF.js with Vite-compatible worker ---
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

const CreateContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sectionId = searchParams.get("sectionId");
  const template = searchParams.get("template") || "Image Text";
  const type = searchParams.get("type") || "content";

  // Common fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [openInBrowser, setOpenInBrowser] = useState(false);

  // Image Text fields
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Multi-Image fields
  const [images, setImages] = useState([]);

  // Video fields
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  // Image-Text Side by Side fields
  const [sideImageFile, setSideImageFile] = useState(null);
  const [sideImagePreview, setSideImagePreview] = useState(null);
  const [sideText, setSideText] = useState("");

  // PDF fields
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  // URL fields
  const [sourceUrl, setSourceUrl] = useState("");

  // Section/Stream details
  const [sectionTitle, setSectionTitle] = useState("Section");
  const [streamTitle, setStreamTitle] = useState("Stream");
  const [loading, setLoading] = useState(false);

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

  // --- Handlers ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleMultiImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];
    for (let file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({ file, preview: reader.result });
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const removeMultiImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const addMultiImage = () => {
    document.getElementById("multiImageUpload").click();
  };

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

  const handleSideImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSideImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSideImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const removeSideImage = () => {
    setSideImageFile(null);
    setSideImagePreview(null);
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

  const handleSubmit = () => {
    const payload = {
      sectionId,
      template,
      title,
      description,
      isNumberedList,
      openInBrowser,
      imageFile,
      images,
      videoFile,
      videoUrl,
      sideImageFile,
      sideText,
      pdfFile,
      pdfText,
      sourceUrl,
    };
    console.log("Saving content:", payload);
    alert("Content created successfully!");
    navigate(-1);
  };

  // --- Render template-specific fields ---
  const renderTemplateFields = () => {
    switch (template) {
      case "Image Text":
        return (
          <>
            <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
              {imagePreview ? (
                <>
                  <button
                    onClick={removeImage}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X size={16} className="text-white" />
                  </button>
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-52 h-36 object-cover"
                  />
                </>
              ) : (
                <div className="text-center">
                  <Upload size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500 mt-3 space-y-1">
              <p>* File formats: jpg, jpeg, webp, png, gif (Max 2MB)</p>
            </div>
            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isNumberedList}
                  onChange={(e) => setIsNumberedList(e.target.checked)}
                />
                Add style to numbered list
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={openInBrowser}
                  onChange={(e) => setOpenInBrowser(e.target.checked)}
                />
                Open link in browser
              </label>
            </div>
          </>
        );

      case "Multi-Image":
        return (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative border rounded p-1">
                    <img
                      src={img.preview}
                      alt={`Image ${idx + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                    <button
                      onClick={() => removeMultiImage(idx)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  </div>
                ))}
                <div
                  onClick={addMultiImage}
                  className="border-2 border-dashed border-gray-300 rounded flex items-center justify-center h-20 cursor-pointer hover:border-red-400"
                >
                  <Plus size={24} className="text-gray-400" />
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultiImageChange}
                className="hidden"
                id="multiImageUpload"
              />
              <p className="text-xs text-gray-500 mt-2">
                * Add multiple images (jpg, jpeg, webp, png, gif)
              </p>
            </div>
          </>
        );

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
                  <video
                    src={videoPreview}
                    className="w-52 h-36 object-cover"
                    controls
                  />
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

      case "Image-Text Side by Side":
        return (
          <>
            <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
              {sideImagePreview ? (
                <>
                  <button
                    onClick={removeSideImage}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X size={16} className="text-white" />
                  </button>
                  <img
                    src={sideImagePreview}
                    alt="preview"
                    className="w-52 h-36 object-cover"
                  />
                </>
              ) : (
                <div className="text-center">
                  <ImageIcon size={40} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSideImageChange}
                    className="hidden"
                    id="sideImageUpload"
                  />
                  <label
                    htmlFor="sideImageUpload"
                    className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Side Text
              </label>
              <textarea
                rows={4}
                value={sideText}
                onChange={(e) => setSideText(e.target.value)}
                placeholder="Enter text that appears alongside the image"
                className="w-full border rounded px-3 py-2 text-sm resize-none"
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
                      <Loader2 size={16} className="animate-spin" />
                      Extracting text...
                    </div>
                  ) : (
                    <button
                      onClick={removePdf}
                      className="mt-2 text-xs text-red-500 hover:underline"
                    >
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

      default:
        return null;
    }
  };

  // --- Preview renderer ---
  const renderPreviewContent = () => {
    switch (template) {
      case "Image Text":
        return (
          <>
            <h3 className="font-bold text-sm">{title || "Content Preview"}</h3>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-32 object-cover mt-2"
              />
            )}
            <div className="text-sm mt-3">
              {description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      case "Multi-Image":
        return (
          <>
            <h3 className="font-bold text-sm">{title || "Content Preview"}</h3>
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-1">
                {images.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img.preview}
                    alt={`img ${idx}`}
                    className="w-full h-16 object-cover rounded"
                  />
                ))}
                {images.length > 4 && (
                  <div className="flex items-center justify-center bg-gray-100 rounded h-16 text-xs text-gray-500">
                    +{images.length - 4} more
                  </div>
                )}
              </div>
            )}
            <div className="text-sm mt-3">
              {description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      case "Video":
        return (
          <>
            <h3 className="font-bold text-sm">{title || "Content Preview"}</h3>
            {videoPreview && (
              <video
                src={videoPreview}
                className="w-full h-32 object-cover mt-2 rounded"
                controls
              />
            )}
            {videoUrl && !videoPreview && (
              <div className="w-full h-32 bg-gray-200 mt-2 rounded flex items-center justify-center text-xs text-gray-500">
                Video from URL
              </div>
            )}
            <div className="text-sm mt-3">
              {description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      case "Image-Text Side by Side":
        return (
          <>
            <h3 className="font-bold text-sm">{title || "Content Preview"}</h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {sideImagePreview && (
                <img
                  src={sideImagePreview}
                  alt="side"
                  className="w-full h-20 object-cover rounded"
                />
              )}
              <div className="text-xs">
                {sideText ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sideText.replace(/\n/g, "<br />"),
                    }}
                  />
                ) : (
                  <p className="text-gray-400">Side text</p>
                )}
              </div>
            </div>
            <div className="text-sm mt-3">
              {description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      case "Extract from PDF":
        return (
          <>
            <h3 className="font-bold text-sm">{title || "Content Preview"}</h3>
            {pdfFile ? (
              <>
                <div className="mt-2 p-2 bg-gray-100 rounded flex items-center justify-center gap-2 text-xs">
                  <FileTextIcon size={20} className="text-red-500" />
                  <span className="truncate">{pdfName}</span>
                </div>
                {isExtracting ? (
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                    <Loader2 size={16} className="animate-spin" />
                    Extracting text...
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      case "Extract from URL":
        return (
          <>
            <h3 className="font-bold text-sm">{title || "Content Preview"}</h3>
            {sourceUrl && (
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs break-all">
                <Link2 size={14} className="inline mr-1" />
                {sourceUrl}
              </div>
            )}
            <div className="text-sm mt-3">
              {description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p className="text-gray-400 text-xs">No description yet</p>
              )}
            </div>
          </>
        );

      default:
        return <p className="text-gray-400 text-xs">Preview not available</p>;
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

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="h-12 bg-white border-b flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
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
            <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">
              CONTENT
            </h2>

            <div className="max-w-lg mx-auto">
              {/* Title */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-4 py-2 text-base"
                placeholder="Enter title"
              />
              <p className="text-sm text-gray-500 mt-1">
                {86 - title.length} characters remaining.
              </p>

              {/* Template-specific fields */}
              {renderTemplateFields()}

              {/* Description */}
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
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
            <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">
              PREVIEW
            </h2>

            <div className="flex justify-center">
              <div className="w-[220px] h-[460px] bg-[#20242c] rounded-[30px] p-3">
                <div className="bg-white rounded-[20px] h-full overflow-y-auto p-3">
                  {renderPreviewContent()}
                  <p className="italic text-center mt-4 text-gray-500 text-xs">
                    Swipe on!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContent;