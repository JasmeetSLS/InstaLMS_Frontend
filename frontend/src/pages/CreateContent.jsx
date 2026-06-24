// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   ArrowLeft,
//   Bell,
//   UserCircle,
//   X,
//   Upload,
//   Plus,
//   Image as ImageIcon,
//   Video as VideoIcon,
//   FileText as FileTextIcon,
//   Link2,
//   Trash2,
//   Loader2,
//   Type,
// } from "lucide-react";
// import api from "../services/api";

// // --- PDF.js with Vite-compatible worker ---
// import * as pdfjsLib from "pdfjs-dist";
// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.mjs",
//   import.meta.url
// ).toString();

// // Helper to extract YouTube embed URL
// const getYouTubeEmbedUrl = (url) => {
//   if (!url) return null;
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   if (match && match[2] && match[2].length === 11) {
//     return `https://www.youtube.com/embed/${match[2]}`;
//   }
//   return null;
// };

// // Helper to convert hex to rgb
// const hexToRgb = (hex) => {
//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result ? {
//     r: parseInt(result[1], 16),
//     g: parseInt(result[2], 16),
//     b: parseInt(result[3], 16)
//   } : { r: 110, g: 110, b: 110 };
// };

// const CreateContent = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const sectionId = searchParams.get("sectionId");
//   const template = searchParams.get("template") || "Multiple Image Text";
//   const type = searchParams.get("type") || "content";

//   // Common fields
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isNumberedList, setIsNumberedList] = useState(false);
//   const [openInBrowser, setOpenInBrowser] = useState(false);

//   // Video fields
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [videoUrl, setVideoUrl] = useState("");

//   // Image-Text Side by Side fields
//   const [sideImageFile, setSideImageFile] = useState(null);
//   const [sideImagePreview, setSideImagePreview] = useState(null);
//   const [sideText, setSideText] = useState("");

//   // PDF fields
//   const [pdfFile, setPdfFile] = useState(null);
//   const [pdfName, setPdfName] = useState("");
//   const [pdfText, setPdfText] = useState("");
//   const [isExtracting, setIsExtracting] = useState(false);

//   // URL fields
//   const [sourceUrl, setSourceUrl] = useState("");

//   // --- Multiple slides – empty by default ---
//   const [slides, setSlides] = useState([]);

//   // Section/Stream details
//   const [sectionTitle, setSectionTitle] = useState("Section");
//   const [streamTitle, setStreamTitle] = useState("Stream");
//   const [loading, setLoading] = useState(false);

//   // --- Color picker states ---
//   const [bgColor, setBgColor] = useState("#ffffff");
//   const [particleColor, setParticleColor] = useState("#6e6e6e"); // rgb(110,110,110)

//   // ---------- Animated background inside phone preview ----------
//   const phoneInnerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);

//   useEffect(() => {
//     const container = phoneInnerRef.current;
//     const canvas = canvasRef.current;
//     if (!container || !canvas) return;

//     const resizeCanvas = () => {
//       const rect = container.getBoundingClientRect();
//       canvas.width = rect.width || 220;
//       canvas.height = rect.height || 400;
//     };
//     resizeCanvas();

//     const ctx = canvas.getContext("2d");
//     let w = canvas.width;
//     let h = canvas.height;

//     // We'll use the current color values from state, but since they are captured in closure,
//     // we need to use refs or re-run effect when colors change.
//     // To keep it simple, we'll re-create the animation objects each time colors change.
//     // That means we need to include bgColor and particleColor in dependencies.
//     // So we'll put this useEffect inside a function that depends on them.

//     // We'll re-define the animation objects inside the effect so they use the latest colors.

//     // Get RGB components for particle color
//     const rgb = hexToRgb(particleColor);
//     const particleR = rgb.r;
//     const particleG = rgb.g;
//     const particleB = rgb.b;

//     // --- Particles (using current particleColor) ---
//     const circles = Array.from({ length: 16 }, () => ({
//       x: Math.random() * w,
//       y: Math.random() * h,
//       r: 20 + Math.random() * 60,
//       dx: (Math.random() - 0.5) * 0.3,
//       dy: (Math.random() - 0.5) * 0.3,
//       alpha: 0.06 + Math.random() * 0.10,
//     }));

//     const threads = Array.from({ length: 10 }, (_, i) => ({
//       y: 30 + i * 50,
//       amp: 15 + Math.random() * 30,
//       freq: 0.007 + Math.random() * 0.008,
//       phase: Math.random() * Math.PI * 2,
//       speed: 0.005 + Math.random() * 0.007,
//       alpha: 0.08 + Math.random() * 0.12,
//       thick: 0.6 + Math.random() * 1.0,
//     }));

//     const dots = Array.from({ length: 25 }, () => ({
//       x: Math.random() * w,
//       y: Math.random() * h,
//       r: 2 + Math.random() * 3,
//       dx: (Math.random() - 0.5) * 0.2,
//       dy: (Math.random() - 0.5) * 0.2,
//       alpha: 0.12 + Math.random() * 0.18,
//       pulse: Math.random() * Math.PI * 2,
//       pulseSpeed: 0.018 + Math.random() * 0.022,
//     }));

//     const rings = Array.from({ length: 7 }, () => ({
//       x: Math.random() * w,
//       y: Math.random() * h,
//       r: 20 + Math.random() * 70,
//       dx: (Math.random() - 0.5) * 0.2,
//       dy: (Math.random() - 0.5) * 0.2,
//       alpha: 0.07 + Math.random() * 0.10,
//       lw: 0.6 + Math.random() * 1.2,
//     }));

//     const animate = () => {
//       w = canvas.width;
//       h = canvas.height;
//       if (w === 0 || h === 0) {
//         animationRef.current = requestAnimationFrame(animate);
//         return;
//       }

//       // Fill with selected background color
//       ctx.fillStyle = bgColor;
//       ctx.fillRect(0, 0, w, h);

//       // Helper to create rgba string with particle color
//       const particleRgba = (alpha) => `rgba(${particleR}, ${particleG}, ${particleB}, ${alpha})`;

//       // Threads
//       threads.forEach((th) => {
//         th.phase += th.speed;
//         ctx.beginPath();
//         ctx.strokeStyle = particleRgba(th.alpha);
//         ctx.lineWidth = th.thick;
//         ctx.lineCap = "round";
//         for (let x = 0; x <= w; x += 2) {
//           const y = th.y + Math.sin(x * th.freq + th.phase) * th.amp;
//           x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
//         }
//         ctx.stroke();
//       });

//       // Circles
//       circles.forEach((c) => {
//         c.x += c.dx;
//         c.y += c.dy;
//         if (c.x < -c.r) c.x = w + c.r;
//         if (c.x > w + c.r) c.x = -c.r;
//         if (c.y < -c.r) c.y = h + c.r;
//         if (c.y > h + c.r) c.y = -c.r;
//         const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
//         g.addColorStop(0, particleRgba(c.alpha));
//         g.addColorStop(1, particleRgba(0));
//         ctx.beginPath();
//         ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
//         ctx.fillStyle = g;
//         ctx.fill();
//       });

//       // Rings
//       rings.forEach((rg) => {
//         rg.x += rg.dx;
//         rg.y += rg.dy;
//         if (rg.x < -rg.r - 20) rg.x = w + rg.r;
//         if (rg.x > w + rg.r + 20) rg.x = -rg.r;
//         if (rg.y < -rg.r - 20) rg.y = h + rg.r;
//         if (rg.y > h + rg.r + 20) rg.y = -rg.r;
//         ctx.beginPath();
//         ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2);
//         ctx.strokeStyle = particleRgba(rg.alpha);
//         ctx.lineWidth = rg.lw;
//         ctx.stroke();
//       });

//       // Dots
//       dots.forEach((d) => {
//         d.x += d.dx;
//         d.y += d.dy;
//         d.pulse += d.pulseSpeed;
//         if (d.x < 0) d.x = w;
//         if (d.x > w) d.x = 0;
//         if (d.y < 0) d.y = h;
//         if (d.y > h) d.y = 0;
//         const a = Math.max(0, d.alpha + Math.sin(d.pulse) * 0.04);
//         ctx.beginPath();
//         ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
//         ctx.fillStyle = particleRgba(a);
//         ctx.fill();
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => {
//       if (animationRef.current) cancelAnimationFrame(animationRef.current);
//     };
//   }, [bgColor, particleColor]); // Re-run when colors change

//   // ---------- End canvas background ----------

//   useEffect(() => {
//     if (sectionId) {
//       fetchSectionDetails();
//     }
//   }, [sectionId]);

//   const fetchSectionDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await api.getSectionById(sectionId);
//       const data = response.data;
//       setSectionTitle(data.title || "Section");
//       setStreamTitle(data.stream_title || "Stream");
//     } catch (error) {
//       console.error("Error fetching section details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   // --- PDF Extraction ---
//   const extractTextFromPDF = async (file) => {
//     try {
//       setIsExtracting(true);
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//       let fullText = "";
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map((item) => item.str).join(" ");
//         fullText += pageText + "\n\n";
//       }
//       setPdfText(fullText.trim());
//       return fullText.trim();
//     } catch (error) {
//       console.error("Error extracting PDF text:", error);
//       setPdfText("Failed to extract text from PDF.");
//       return "";
//     } finally {
//       setIsExtracting(false);
//     }
//   };

//   // --- Handlers for other templates ---
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setVideoPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };
//   const removeVideo = () => {
//     setVideoFile(null);
//     setVideoPreview(null);
//     setVideoUrl("");
//   };

//   const handleSideImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSideImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setSideImagePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };
//   const removeSideImage = () => {
//     setSideImageFile(null);
//     setSideImagePreview(null);
//   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPdfFile(file);
//       setPdfName(file.name);
//       setPdfText("");
//       extractTextFromPDF(file);
//     }
//   };
//   const removePdf = () => {
//     setPdfFile(null);
//     setPdfName("");
//     setPdfText("");
//   };

//   // --- Slide handlers ---
//   const addSlide = (slideType) => {
//     const newSlide = slideType === 'image'
//       ? { type: 'image', imageFile: null, imagePreview: null, text: '' }
//       : { type: 'text', text: '' };
//     setSlides([...slides, newSlide]);
//   };

//   const removeSlide = (index) => {
//     setSlides(slides.filter((_, i) => i !== index));
//   };

//   const updateSlideImage = (index, file) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const updated = [...slides];
//       updated[index].imageFile = file;
//       updated[index].imagePreview = reader.result;
//       setSlides(updated);
//     };
//     reader.readAsDataURL(file);
//   };

//   const updateSlideText = (index, text) => {
//     const updated = [...slides];
//     updated[index].text = text;
//     setSlides(updated);
//   };

//   // --- Submit ---
//   const handleSubmit = () => {
//     const payload = {
//       sectionId,
//       template,
//       title,
//       description,
//       isNumberedList,
//       openInBrowser,
//       videoFile,
//       videoUrl,
//       sideImageFile,
//       sideText,
//       pdfFile,
//       pdfText,
//       sourceUrl,
//       slides,
//     };
//     console.log("Saving content:", payload);
//     alert("Content created successfully!");
//     navigate(-1);
//   };

//   // --- Render template-specific fields ---
//   const renderTemplateFields = () => {
//     switch (template) {
//       case "Video":
//         return (
//           <>
//             <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
//               {videoPreview ? (
//                 <>
//                   <button onClick={removeVideo} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">
//                     <X size={16} className="text-white" />
//                   </button>
//                   <video src={videoPreview} className="w-52 h-36 object-cover" controls />
//                 </>
//               ) : (
//                 <div className="text-center">
//                   <VideoIcon size={40} className="mx-auto text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">Click to upload video</p>
//                   <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="videoUpload" />
//                   <label htmlFor="videoUpload" className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300">
//                     Choose File
//                   </label>
//                 </div>
//               )}
//             </div>
//             <div className="mt-3">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (Optional)</label>
//               <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://example.com/video.mp4" className="w-full border rounded px-3 py-2 text-sm" />
//             </div>
//           </>
//         );

//       case "Image-Text Side by Side":
//         return (
//           <>
//             <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
//               {sideImagePreview ? (
//                 <>
//                   <button onClick={removeSideImage} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">
//                     <X size={16} className="text-white" />
//                   </button>
//                   <img src={sideImagePreview} alt="preview" className="w-52 h-36 object-cover" />
//                 </>
//               ) : (
//                 <div className="text-center">
//                   <ImageIcon size={40} className="mx-auto text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">Click to upload image</p>
//                   <input type="file" accept="image/*" onChange={handleSideImageChange} className="hidden" id="sideImageUpload" />
//                   <label htmlFor="sideImageUpload" className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300">
//                     Choose File
//                   </label>
//                 </div>
//               )}
//             </div>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Side Text</label>
//               <textarea rows={4} value={sideText} onChange={(e) => setSideText(e.target.value)} placeholder="Enter text that appears alongside the image" className="w-full border rounded px-3 py-2 text-sm resize-none" />
//             </div>
//           </>
//         );

//       case "Extract from PDF":
//         return (
//           <>
//             <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
//               {pdfFile ? (
//                 <div className="text-center">
//                   <FileTextIcon size={48} className="mx-auto text-red-500 mb-2" />
//                   <p className="text-sm font-medium">{pdfName}</p>
//                   {isExtracting ? (
//                     <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
//                       <Loader2 size={16} className="animate-spin" /> Extracting text...
//                     </div>
//                   ) : (
//                     <button onClick={removePdf} className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <FileTextIcon size={40} className="mx-auto text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">Click to upload PDF</p>
//                   <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdfUpload" />
//                   <label htmlFor="pdfUpload" className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300">
//                     Choose File
//                   </label>
//                 </div>
//               )}
//             </div>
//             <p className="text-xs text-gray-500 mt-2">* Upload PDF file (Max 10MB)</p>
//             {pdfText && (
//               <div className="mt-3 p-2 bg-gray-50 border rounded text-xs max-h-32 overflow-y-auto">
//                 <p className="font-medium text-gray-700">Extracted text preview:</p>
//                 <p className="text-gray-600 whitespace-pre-wrap">{pdfText.length > 300 ? `${pdfText.substring(0, 300)}...` : pdfText}</p>
//               </div>
//             )}
//           </>
//         );

//       case "Extract from URL":
//         return (
//           <>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Source URL <span className="text-red-500">*</span></label>
//               <input type="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://example.com/article" className="w-full border rounded px-3 py-2 text-sm" />
//               <p className="text-xs text-gray-500 mt-1">Enter the URL from which content will be extracted.</p>
//             </div>
//           </>
//         );

//       // --- Multiple slides – NO empty state message ---
//       case "Multiple Image Text":
//         return (
//           <>
//             <div className="space-y-4">
//               {slides.map((slide, idx) => (
//                 <div key={idx} className="border p-3 rounded relative bg-gray-50">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xs font-medium text-gray-600">
//                       Slide {idx + 1} — {slide.type === 'image' ? '🖼️ Image' : '📝 Text'}
//                     </span>
//                     <button onClick={() => removeSlide(idx)} className="text-red-400 hover:text-red-600">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>

//                   {slide.type === 'image' ? (
//                     <div className="relative h-40 bg-white border flex items-center justify-center">
//                       {slide.imagePreview ? (
//                         <>
//                           <button
//                             onClick={() => {
//                               const updated = [...slides];
//                               updated[idx].imageFile = null;
//                               updated[idx].imagePreview = null;
//                               setSlides(updated);
//                             }}
//                             className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
//                           >
//                             <X size={14} className="text-white" />
//                           </button>
//                           <img src={slide.imagePreview} alt={`slide ${idx + 1}`} className="w-full h-full object-cover" />
//                         </>
//                       ) : (
//                         <div className="text-center">
//                           <Upload size={24} className="mx-auto text-gray-400 mb-1" />
//                           <p className="text-xs text-gray-500">Click to upload image</p>
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => {
//                               const file = e.target.files[0];
//                               if (file) updateSlideImage(idx, file);
//                             }}
//                             className="hidden"
//                             id={`slideImageUpload_${idx}`}
//                           />
//                           <label htmlFor={`slideImageUpload_${idx}`} className="inline-block mt-1 px-3 py-0.5 bg-gray-200 text-xs rounded cursor-pointer hover:bg-gray-300">
//                             Choose File
//                           </label>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <textarea
//                       rows={2}
//                       value={slide.text}
//                       onChange={(e) => updateSlideText(idx, e.target.value)}
//                       placeholder={`Enter text for slide ${idx + 1}`}
//                       className="w-full border rounded px-2 py-1 text-sm resize-none"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Two large buttons to add new slides */}
//             <div className="flex gap-4 mt-4">
//               <button
//                 onClick={() => addSlide('image')}
//                 className="flex-1 py-3 border-2 border-dashed border-red-300 rounded-lg text-red-500 hover:bg-red-50 transition flex items-center justify-center gap-2"
//               >
//                 <ImageIcon size={20} /> Add Image Slide
//               </button>
//               <button
//                 onClick={() => addSlide('text')}
//                 className="flex-1 py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-2"
//               >
//                 <Type size={20} /> Add Text Slide
//               </button>
//             </div>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   // --- Preview renderer (with transparent-ish backgrounds so canvas shows through) ---
//   const renderPreviewContent = () => {
//     switch (template) {
//       case "Video":
//         return (
//           <>
//             <h3 className="font-bold text-sm text-gray-800">{title || "Content Preview"}</h3>
//             {videoPreview && <video src={videoPreview} className="w-full h-32 object-cover mt-2 rounded" controls />}
//             {videoUrl && !videoPreview && <div className="w-full h-32 bg-gray-200/70 mt-2 rounded flex items-center justify-center text-xs text-gray-700">Video from URL</div>}
//             <div className="text-sm mt-3 text-gray-800">
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-500 text-xs">No description yet</p>}
//             </div>
//           </>
//         );

//       case "Image-Text Side by Side":
//         return (
//           <>
//             <h3 className="font-bold text-sm text-gray-800">{title || "Content Preview"}</h3>
//             <div className="mt-2 grid grid-cols-2 gap-2">
//               {sideImagePreview && <img src={sideImagePreview} alt="side" className="w-full h-20 object-cover rounded" />}
//               <div className="text-xs text-gray-800">
//                 {sideText ? <div dangerouslySetInnerHTML={{ __html: sideText.replace(/\n/g, "<br />") }} /> : <p className="text-gray-500">Side text</p>}
//               </div>
//             </div>
//             <div className="text-sm mt-3 text-gray-800">
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-500 text-xs">No description yet</p>}
//             </div>
//           </>
//         );

//       case "Extract from PDF":
//         return (
//           <>
//             <h3 className="font-bold text-sm text-gray-800">{title || "Content Preview"}</h3>
//             {pdfFile ? (
//               <>
//                 <div className="mt-2 p-2 bg-white/70 rounded flex items-center justify-center gap-2 text-xs">
//                   <FileTextIcon size={20} className="text-red-500" />
//                   <span className="truncate text-gray-800">{pdfName}</span>
//                 </div>
//                 {isExtracting ? (
//                   <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-700">
//                     <Loader2 size={16} className="animate-spin" /> Extracting text...
//                   </div>
//                 ) : pdfText ? (
//                   <div className="mt-3 text-xs max-h-40 overflow-y-auto text-gray-800 whitespace-pre-wrap border p-2 rounded bg-white/70">
//                     {pdfText.length > 500 ? pdfText.substring(0, 500) + "..." : pdfText}
//                   </div>
//                 ) : (
//                   <p className="mt-3 text-xs text-gray-600">No text extracted yet.</p>
//                 )}
//               </>
//             ) : (
//               <div className="mt-2 h-20 bg-white/70 rounded flex items-center justify-center text-xs text-gray-600">No PDF uploaded</div>
//             )}
//             <div className="text-sm mt-3 text-gray-800">
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-500 text-xs">No description yet</p>}
//             </div>
//           </>
//         );

//       case "Extract from URL": {
//         const youtubeEmbedUrl = getYouTubeEmbedUrl(sourceUrl);
//         return (
//           <>
//             <h3 className="font-bold text-sm text-gray-800">{title || "Content Preview"}</h3>
//             {youtubeEmbedUrl ? (
//               <div className="mt-2 w-full aspect-video">
//                 <iframe
//                   src={youtubeEmbedUrl}
//                   title="YouTube video"
//                   className="w-full h-full rounded"
//                   allowFullScreen
//                 />
//               </div>
//             ) : sourceUrl ? (
//               <div className="mt-2 p-2 bg-white/70 rounded text-xs break-all text-gray-800">
//                 <Link2 size={14} className="inline mr-1" />
//                 {sourceUrl}
//               </div>
//             ) : null}
//             <div className="text-sm mt-3 text-gray-800">
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-500 text-xs">No description yet</p>}
//             </div>
//           </>
//         );
//       }

//       case "Multiple Image Text":
//         return (
//           <>
//             <h3 className="font-bold text-sm text-gray-800">{title || "Content Preview"}</h3>
//             {slides.length === 0 ? (
//               <div className="text-gray-600 text-xs mt-4 text-center">No slides to preview</div>
//             ) : (
//               <div className="mt-2 space-y-3">
//                 {slides.map((slide, idx) => (
//                   <div key={idx} className="p-2 ">
//                     {slide.type === 'image' && slide.imagePreview && (
//                       <img src={slide.imagePreview} alt={`slide ${idx + 1}`} className="w-full h-24 object-cover rounded" />
//                     )}
//                     {slide.type === 'text' && slide.text && (
//                       <div className="text-xs text-gray-800">{slide.text}</div>
//                     )}
//                     {slide.type === 'image' && !slide.imagePreview && (
//                       <div className="text-xs text-gray-500">Empty image slide {idx + 1}</div>
//                     )}
//                     {slide.type === 'text' && !slide.text && (
//                       <div className="text-xs text-gray-500">Empty text slide {idx + 1}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="text-sm mt-3 text-gray-800">
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-500 text-xs">No description yet</p>}
//             </div>
//           </>
//         );

//       default:
//         return <p className="text-gray-600 text-xs">Preview not available</p>;
//     }
//   };

//   // --- Main render ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f4f4f4] flex justify-center items-center">
//         <div className="text-lg font-medium">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f4f4f4]">
//       {/* Header */}
//       <header className="h-12 bg-white border-b flex items-center justify-between px-5">
//         <div className="flex items-center gap-3">
//           <button onClick={handleBack} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
//             <ArrowLeft size={16} /> Back
//           </button>
//           <span className="text-gray-300">|</span>
//           <span className="text-sm text-gray-500">Create Content</span>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-sm text-gray-500">Super Admin</span>
//           <Bell size={18} className="text-red-500" />
//           <UserCircle size={24} className="text-red-500" />
//         </div>
//       </header>

//       {/* Breadcrumb */}
//       <div className="px-4 py-2 text-sm">
//         <span className="text-[#1d3557]">Products</span>
//         <span className="mx-2 text-gray-400">{">"}</span>
//         <span className="text-[#1d3557]">{streamTitle}</span>
//         <span className="text-gray-400 ml-1">| English Global</span>
//         <span className="mx-2 text-gray-400">{">"}</span>
//         <span className="font-medium text-[#1d3557]">{sectionTitle}</span>
//         <span className="mx-2 text-gray-400">{">"}</span>
//         <span className="font-medium text-[#1d3557]">Create Content</span>
//         <span className="text-gray-400 ml-1">({template})</span>
//       </div>

//       {/* Step Tabs */}
//       <div className="flex px-3">
//         <div className="w-16 h-14 bg-white border flex items-center justify-center text-red-500 text-xl font-bold">01</div>
//         <div className="h-14 px-6 bg-gradient-to-r from-red-500 to-orange-500 flex items-center text-white">
//           <span className="text-2xl font-bold mr-3">02</span>
//           <span className="font-medium">Enter / Edit the content</span>
//         </div>
//       </div>

//       {/* Main Area */}
//       <div className="mx-3 border border-[#df6545] bg-white">
//         <div className="grid lg:grid-cols-[1fr_1fr]">
//           {/* Content Column */}
//           <div className="border-r border-[#df6545] p-5">
//             <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">CONTENT</h2>

//             <div className="max-w-lg mx-auto">
//               {/* Title */}
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full border rounded px-4 py-2 text-base"
//                 placeholder="Enter title"
//               />
//               <p className="text-sm text-gray-500 mt-1">{86 - title.length} characters remaining.</p>

//               {/* Template-specific fields */}
//               {renderTemplateFields()}

//               {/* Description */}
//               <div className="mt-5">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   rows={8}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full border rounded p-3 text-sm resize-none"
//                   placeholder="Enter description..."
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3 mt-5">
//                 <button onClick={handleBack} className="px-5 py-2 border rounded bg-gray-100 text-sm hover:bg-gray-200">
//                   PREVIOUS
//                 </button>
//                 <button onClick={handleSubmit} className="px-5 py-2 rounded bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm hover:opacity-90">
//                   SAVE
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Preview Column with animated background and color pickers */}
//           <div className="p-5">
//             <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">PREVIEW</h2>

//             {/* Color picker controls */}
//             <div className="flex justify-center gap-6 mb-4">
//               <div className="flex items-center gap-2">
//                 <label className="text-xs font-medium text-gray-600">Background</label>
//                 <input
//                   type="color"
//                   value={bgColor}
//                   onChange={(e) => setBgColor(e.target.value)}
//                   className="w-8 h-8 p-0 border rounded cursor-pointer"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="text-xs font-medium text-gray-600">Particles</label>
//                 <input
//                   type="color"
//                   value={particleColor}
//                   onChange={(e) => setParticleColor(e.target.value)}
//                   className="w-8 h-8 p-0 border rounded cursor-pointer"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <div className="w-[220px] h-[460px] bg-[#20242c] rounded-[30px] p-3">
//                 {/* Inner container with canvas background */}
//                 <div
//                   ref={phoneInnerRef}
//                   className="rounded-[20px] h-full overflow-y-auto p-3 relative"
//                   style={{ backgroundColor: 'transparent' }}
//                 >
//                   {/* Canvas background */}
//                   <canvas
//                     ref={canvasRef}
//                     className="absolute inset-0 w-full h-full rounded-[20px]"
//                     style={{ pointerEvents: 'none' }}
//                   />
//                   {/* Preview content on top */}
//                   <div className="relative z-10">
//                     {renderPreviewContent()}
//                     <p className="italic text-center mt-4 text-xs">Swipe on!</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateContent;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   ArrowLeft,
//   Bell,
//   UserCircle,
//   X,
//   Upload,
//   Image as ImageIcon,
//   Video as VideoIcon,
//   FileText as FileTextIcon,
//   Link2,
//   Trash2,
//   Loader2,
//   Type,
// } from "lucide-react";
// import api from "../services/api";

// // --- PDF.js with Vite-compatible worker ---
// import * as pdfjsLib from "pdfjs-dist";
// pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.mjs",
//   import.meta.url
// ).toString();

// // Helper to extract YouTube embed URL
// const getYouTubeEmbedUrl = (url) => {
//   if (!url) return null;
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//   const match = url.match(regExp);
//   if (match && match[2] && match[2].length === 11) {
//     return `https://www.youtube.com/embed/${match[2]}`;
//   }
//   return null;
// };

// // Helper: returns "#000000" or "#ffffff" based on luminance
// const getContrastColor = (hex) => {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//   return luminance > 0.5 ? "#000000" : "#ffffff";
// };

// // --- Extract dominant color from an image (average color) ---
// const getAverageColorFromImage = (file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         const ctx = canvas.getContext("2d");
//         ctx.drawImage(img, 0, 0);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const data = imageData.data;
//         let r = 0, g = 0, b = 0;
//         for (let i = 0; i < data.length; i += 4) {
//           r += data[i];
//           g += data[i + 1];
//           b += data[i + 2];
//         }
//         const pixelCount = data.length / 4;
//         r = Math.round(r / pixelCount);
//         g = Math.round(g / pixelCount);
//         b = Math.round(b / pixelCount);
//         const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
//         resolve(hex);
//       };
//       img.src = e.target.result;
//     };
//     reader.readAsDataURL(file);
//   });
// };

// const CreateContent = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const sectionId = searchParams.get("sectionId");
//   const template = searchParams.get("template") || "Multiple Image Text";
//   const type = searchParams.get("type") || "content";

//   // Common fields
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isNumberedList, setIsNumberedList] = useState(false);
//   const [openInBrowser, setOpenInBrowser] = useState(false);

//   // Video fields
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [videoUrl, setVideoUrl] = useState("");

//   // Image-Text Side by Side fields
//   const [sideImageFile, setSideImageFile] = useState(null);
//   const [sideImagePreview, setSideImagePreview] = useState(null);
//   const [sideText, setSideText] = useState("");

//   // PDF fields
//   const [pdfFile, setPdfFile] = useState(null);
//   const [pdfName, setPdfName] = useState("");
//   const [pdfText, setPdfText] = useState("");
//   const [isExtracting, setIsExtracting] = useState(false);

//   // URL fields
//   const [sourceUrl, setSourceUrl] = useState("");

//   // --- Multiple slides – empty by default ---
//   const [slides, setSlides] = useState([]);

//   // Section/Stream details
//   const [sectionTitle, setSectionTitle] = useState("Section");
//   const [streamTitle, setStreamTitle] = useState("Stream");
//   const [loading, setLoading] = useState(false);

//   // Background color – auto‑updated from the first uploaded image
//   const [backgroundColor, setBackgroundColor] = useState("#ffffff");

//   useEffect(() => {
//     if (sectionId) {
//       fetchSectionDetails();
//     }
//   }, [sectionId]);

//   const fetchSectionDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await api.getSectionById(sectionId);
//       const data = response.data;
//       setSectionTitle(data.title || "Section");
//       setStreamTitle(data.stream_title || "Stream");
//     } catch (error) {
//       console.error("Error fetching section details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   // --- PDF Extraction ---
//   const extractTextFromPDF = async (file) => {
//     try {
//       setIsExtracting(true);
//       const arrayBuffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//       let fullText = "";
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map((item) => item.str).join(" ");
//         fullText += pageText + "\n\n";
//       }
//       setPdfText(fullText.trim());
//       return fullText.trim();
//     } catch (error) {
//       console.error("Error extracting PDF text:", error);
//       setPdfText("Failed to extract text from PDF.");
//       return "";
//     } finally {
//       setIsExtracting(false);
//     }
//   };

//   // --- Handlers for other templates ---
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setVideoPreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };
//   const removeVideo = () => {
//     setVideoFile(null);
//     setVideoPreview(null);
//     setVideoUrl("");
//   };

//   const handleSideImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSideImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => setSideImagePreview(reader.result);
//       reader.readAsDataURL(file);
//       // Auto‑set background from this image
//       const color = await getAverageColorFromImage(file);
//       setBackgroundColor(color);
//     }
//   };
//   const removeSideImage = () => {
//     setSideImageFile(null);
//     setSideImagePreview(null);
//     // Reset background to white if no other images exist
//     if (slides.every(s => !s.imageFile)) {
//       setBackgroundColor("#ffffff");
//     }
//   };

//   const handlePdfChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setPdfFile(file);
//       setPdfName(file.name);
//       setPdfText("");
//       extractTextFromPDF(file);
//     }
//   };
//   const removePdf = () => {
//     setPdfFile(null);
//     setPdfName("");
//     setPdfText("");
//   };

//   // --- Slide handlers ---
//   const addSlide = (slideType) => {
//     const newSlide = slideType === 'image'
//       ? { type: 'image', imageFile: null, imagePreview: null, text: '' }
//       : { type: 'text', text: '' };
//     setSlides([...slides, newSlide]);
//   };

//   const removeSlide = (index) => {
//     setSlides(slides.filter((_, i) => i !== index));
//     // If no slides remain, reset background to white
//     if (slides.length === 1) {
//       setBackgroundColor("#ffffff");
//     }
//   };

//   const updateSlideImage = async (index, file) => {
//     const reader = new FileReader();
//     reader.onloadend = async () => {
//       const updated = [...slides];
//       updated[index].imageFile = file;
//       updated[index].imagePreview = reader.result;
//       setSlides(updated);
//       // Auto‑set background from this image (if first image in slides)
//       const color = await getAverageColorFromImage(file);
//       setBackgroundColor(color);
//     };
//     reader.readAsDataURL(file);
//   };

//   const updateSlideText = (index, text) => {
//     const updated = [...slides];
//     updated[index].text = text;
//     setSlides(updated);
//   };

//   // --- Submit ---
//   const handleSubmit = () => {
//     const payload = {
//       sectionId,
//       template,
//       title,
//       description,
//       isNumberedList,
//       openInBrowser,
//       videoFile,
//       videoUrl,
//       sideImageFile,
//       sideText,
//       pdfFile,
//       pdfText,
//       sourceUrl,
//       slides,
//     };
//     console.log("Saving content:", payload);
//     alert("Content created successfully!");
//     navigate(-1);
//   };

//   // --- Render template-specific fields ---
//   const renderTemplateFields = () => {
//     switch (template) {
//       case "Video":
//         return (
//           <>
//             <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
//               {videoPreview ? (
//                 <>
//                   <button onClick={removeVideo} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">
//                     <X size={16} className="text-white" />
//                   </button>
//                   <video src={videoPreview} className="w-52 h-36 object-cover" controls />
//                 </>
//               ) : (
//                 <div className="text-center">
//                   <VideoIcon size={40} className="mx-auto text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">Click to upload video</p>
//                   <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="videoUpload" />
//                   <label htmlFor="videoUpload" className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300">
//                     Choose File
//                   </label>
//                 </div>
//               )}
//             </div>
//             <div className="mt-3">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (Optional)</label>
//               <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://example.com/video.mp4" className="w-full border rounded px-3 py-2 text-sm" />
//             </div>
//           </>
//         );

//       case "Image-Text Side by Side":
//         return (
//           <>
//             <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
//               {sideImagePreview ? (
//                 <>
//                   <button onClick={removeSideImage} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600">
//                     <X size={16} className="text-white" />
//                   </button>
//                   <img src={sideImagePreview} alt="preview" className="w-52 h-36 object-cover" />
//                 </>
//               ) : (
//                 <div className="text-center">
//                   <ImageIcon size={40} className="mx-auto text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">Click to upload image</p>
//                   <input type="file" accept="image/*" onChange={handleSideImageChange} className="hidden" id="sideImageUpload" />
//                   <label htmlFor="sideImageUpload" className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300">
//                     Choose File
//                   </label>
//                 </div>
//               )}
//             </div>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Side Text</label>
//               <textarea rows={4} value={sideText} onChange={(e) => setSideText(e.target.value)} placeholder="Enter text that appears alongside the image" className="w-full border rounded px-3 py-2 text-sm resize-none" />
//             </div>
//           </>
//         );

//       case "Extract from PDF":
//         return (
//           <>
//             <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
//               {pdfFile ? (
//                 <div className="text-center">
//                   <FileTextIcon size={48} className="mx-auto text-red-500 mb-2" />
//                   <p className="text-sm font-medium">{pdfName}</p>
//                   {isExtracting ? (
//                     <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
//                       <Loader2 size={16} className="animate-spin" /> Extracting text...
//                     </div>
//                   ) : (
//                     <button onClick={removePdf} className="mt-2 text-xs text-red-500 hover:underline">Remove</button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="text-center">
//                   <FileTextIcon size={40} className="mx-auto text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-500">Click to upload PDF</p>
//                   <input type="file" accept=".pdf" onChange={handlePdfChange} className="hidden" id="pdfUpload" />
//                   <label htmlFor="pdfUpload" className="inline-block mt-2 px-4 py-1 bg-gray-200 text-sm rounded cursor-pointer hover:bg-gray-300">
//                     Choose File
//                   </label>
//                 </div>
//               )}
//             </div>
//             <p className="text-xs text-gray-500 mt-2">* Upload PDF file (Max 10MB)</p>
//             {pdfText && (
//               <div className="mt-3 p-2 bg-gray-50 border rounded text-xs max-h-32 overflow-y-auto">
//                 <p className="font-medium text-gray-700">Extracted text preview:</p>
//                 <p className="text-gray-600 whitespace-pre-wrap">{pdfText.length > 300 ? `${pdfText.substring(0, 300)}...` : pdfText}</p>
//               </div>
//             )}
//           </>
//         );

//       case "Extract from URL":
//         return (
//           <>
//             <div className="mt-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Source URL <span className="text-red-500">*</span></label>
//               <input type="url" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="https://example.com/article" className="w-full border rounded px-3 py-2 text-sm" />
//               <p className="text-xs text-gray-500 mt-1">Enter the URL from which content will be extracted.</p>
//             </div>
//           </>
//         );

//       // --- Multiple slides ---
//       case "Multiple Image Text":
//         return (
//           <>
//             <div className="space-y-4">
//               {slides.map((slide, idx) => (
//                 <div key={idx} className="border p-3 rounded relative bg-gray-50">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xs font-medium text-gray-600">
//                       Slide {idx + 1} — {slide.type === 'image' ? '🖼️ Image' : '📝 Text'}
//                     </span>
//                     <button onClick={() => removeSlide(idx)} className="text-red-400 hover:text-red-600">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>

//                   {slide.type === 'image' ? (
//                     <div className="relative h-40 bg-white border flex items-center justify-center">
//                       {slide.imagePreview ? (
//                         <>
//                           <button
//                             onClick={() => {
//                               const updated = [...slides];
//                               updated[idx].imageFile = null;
//                               updated[idx].imagePreview = null;
//                               setSlides(updated);
//                               // If no other image slides, reset background
//                               if (!updated.some(s => s.type === 'image' && s.imageFile)) {
//                                 setBackgroundColor("#ffffff");
//                               }
//                             }}
//                             className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
//                           >
//                             <X size={14} className="text-white" />
//                           </button>
//                           <img src={slide.imagePreview} alt={`slide ${idx + 1}`} className="w-full h-full object-cover" />
//                         </>
//                       ) : (
//                         <div className="text-center">
//                           <Upload size={24} className="mx-auto text-gray-400 mb-1" />
//                           <p className="text-xs text-gray-500">Click to upload image</p>
//                           <input
//                             type="file"
//                             accept="image/*"
//                             onChange={(e) => {
//                               const file = e.target.files[0];
//                               if (file) updateSlideImage(idx, file);
//                             }}
//                             className="hidden"
//                             id={`slideImageUpload_${idx}`}
//                           />
//                           <label htmlFor={`slideImageUpload_${idx}`} className="inline-block mt-1 px-3 py-0.5 bg-gray-200 text-xs rounded cursor-pointer hover:bg-gray-300">
//                             Choose File
//                           </label>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <textarea
//                       rows={2}
//                       value={slide.text}
//                       onChange={(e) => updateSlideText(idx, e.target.value)}
//                       placeholder={`Enter text for slide ${idx + 1}`}
//                       className="w-full border rounded px-2 py-1 text-sm resize-none"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex gap-4 mt-4">
//               <button
//                 onClick={() => addSlide('image')}
//                 className="flex-1 py-3 border-2 border-dashed border-red-300 rounded-lg text-red-500 hover:bg-red-50 transition flex items-center justify-center gap-2"
//               >
//                 <ImageIcon size={20} /> Add Image Slide
//               </button>
//               <button
//                 onClick={() => addSlide('text')}
//                 className="flex-1 py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-500 hover:bg-blue-50 transition flex items-center justify-center gap-2"
//               >
//                 <Type size={20} /> Add Text Slide
//               </button>
//             </div>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   // --- Preview renderer (with contrast color) ---
//   const renderPreviewContent = () => {
//     const contrastColor = getContrastColor(backgroundColor);

//     switch (template) {
//       case "Video":
//         return (
//           <>
//             <h3 className="font-bold text-sm" style={{ color: contrastColor }}>{title || "Content Preview"}</h3>
//             {videoPreview && <video src={videoPreview} className="w-full h-32 object-cover mt-2 rounded" controls />}
//             {videoUrl && !videoPreview && <div className="w-full h-32 bg-gray-200 mt-2 rounded flex items-center justify-center text-xs text-gray-500">Video from URL</div>}
//             <div className="text-sm mt-3" style={{ color: contrastColor }}>
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>No description yet</p>}
//             </div>
//           </>
//         );

//       case "Image-Text Side by Side":
//         return (
//           <>
//             <h3 className="font-bold text-sm" style={{ color: contrastColor }}>{title || "Content Preview"}</h3>
//             <div className="mt-2 grid grid-cols-2 gap-2">
//               {sideImagePreview && <img src={sideImagePreview} alt="side" className="w-full h-20 object-cover rounded" />}
//               <div className="text-xs" style={{ color: contrastColor }}>
//                 {sideText ? <div dangerouslySetInnerHTML={{ __html: sideText.replace(/\n/g, "<br />") }} /> : <p className="text-gray-400" style={{ color: contrastColor }}>Side text</p>}
//               </div>
//             </div>
//             <div className="text-sm mt-3" style={{ color: contrastColor }}>
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>No description yet</p>}
//             </div>
//           </>
//         );

//       case "Extract from PDF":
//         return (
//           <>
//             <h3 className="font-bold text-sm" style={{ color: contrastColor }}>{title || "Content Preview"}</h3>
//             {pdfFile ? (
//               <>
//                 <div className="mt-2 p-2 bg-gray-100 rounded flex items-center justify-center gap-2 text-xs">
//                   <FileTextIcon size={20} className="text-red-500" />
//                   <span className="truncate">{pdfName}</span>
//                 </div>
//                 {isExtracting ? (
//                   <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
//                     <Loader2 size={16} className="animate-spin" /> Extracting text...
//                   </div>
//                 ) : pdfText ? (
//                   <div className="mt-3 text-xs max-h-40 overflow-y-auto text-gray-700 whitespace-pre-wrap border p-2 rounded bg-gray-50" style={{ color: contrastColor }}>
//                     {pdfText.length > 500 ? pdfText.substring(0, 500) + "..." : pdfText}
//                   </div>
//                 ) : (
//                   <p className="mt-3 text-xs text-gray-400" style={{ color: contrastColor }}>No text extracted yet.</p>
//                 )}
//               </>
//             ) : (
//               <div className="mt-2 h-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400" style={{ color: contrastColor }}>No PDF uploaded</div>
//             )}
//             <div className="text-sm mt-3" style={{ color: contrastColor }}>
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>No description yet</p>}
//             </div>
//           </>
//         );

//       case "Extract from URL": {
//         const youtubeEmbedUrl = getYouTubeEmbedUrl(sourceUrl);
//         return (
//           <>
//             <h3 className="font-bold text-sm" style={{ color: contrastColor }}>{title || "Content Preview"}</h3>
//             {youtubeEmbedUrl ? (
//               <div className="mt-2 w-full aspect-video">
//                 <iframe
//                   src={youtubeEmbedUrl}
//                   title="YouTube video"
//                   className="w-full h-full rounded"
//                   allowFullScreen
//                 />
//               </div>
//             ) : sourceUrl ? (
//               <div className="mt-2 p-2 bg-gray-100 rounded text-xs break-all" style={{ color: contrastColor }}>
//                 <Link2 size={14} className="inline mr-1" />
//                 {sourceUrl}
//               </div>
//             ) : null}
//             <div className="text-sm mt-3" style={{ color: contrastColor }}>
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>No description yet</p>}
//             </div>
//           </>
//         );
//       }

//       case "Multiple Image Text":
//         return (
//           <>
//             <h3 className="font-bold text-sm" style={{ color: contrastColor }}>{title || "Content Preview"}</h3>
//             {slides.length === 0 ? (
//               <div className="text-gray-400 text-xs mt-4 text-center" style={{ color: contrastColor }}>No slides to preview</div>
//             ) : (
//               <div className="mt-2 space-y-3">
//                 {slides.map((slide, idx) => (
//                   <div key={idx} className="p-2">
//                     {slide.type === 'image' && slide.imagePreview && (
//                       <img src={slide.imagePreview} alt={`slide ${idx + 1}`} className="w-full h-24 object-cover rounded" />
//                     )}
//                     {slide.type === 'text' && slide.text && (
//                       <div className="text-xs" style={{ color: contrastColor }}>{slide.text}</div>
//                     )}
//                     {slide.type === 'image' && !slide.imagePreview && (
//                       <div className="text-xs text-gray-400" style={{ color: contrastColor }}>Empty image slide {idx + 1}</div>
//                     )}
//                     {slide.type === 'text' && !slide.text && (
//                       <div className="text-xs text-gray-400" style={{ color: contrastColor }}>Empty text slide {idx + 1}</div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//             <div className="text-sm mt-3" style={{ color: contrastColor }}>
//               {description ? <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} /> : <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>No description yet</p>}
//             </div>
//           </>
//         );

//       default:
//         return <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>Preview not available</p>;
//     }
//   };

//   // --- Main render ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f4f4f4] flex justify-center items-center">
//         <div className="text-lg font-medium">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f4f4f4]">
//       {/* Header */}
//       <header className="h-12 bg-white border-b flex items-center justify-between px-5">
//         <div className="flex items-center gap-3">
//           <button onClick={handleBack} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
//             <ArrowLeft size={16} /> Back
//           </button>
//           <span className="text-gray-300">|</span>
//           <span className="text-sm text-gray-500">Create Content</span>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-sm text-gray-500">Super Admin</span>
//           <Bell size={18} className="text-red-500" />
//           <UserCircle size={24} className="text-red-500" />
//         </div>
//       </header>

//       {/* Breadcrumb */}
//       <div className="px-4 py-2 text-sm">
//         <span className="text-[#1d3557]">Products</span>
//         <span className="mx-2 text-gray-400">{">"}</span>
//         <span className="text-[#1d3557]">{streamTitle}</span>
//         <span className="text-gray-400 ml-1">| English Global</span>
//         <span className="mx-2 text-gray-400">{">"}</span>
//         <span className="font-medium text-[#1d3557]">{sectionTitle}</span>
//         <span className="mx-2 text-gray-400">{">"}</span>
//         <span className="font-medium text-[#1d3557]">Create Content</span>
//         <span className="text-gray-400 ml-1">({template})</span>
//       </div>

//       {/* Step Tabs */}
//       <div className="flex px-3">
//         <div className="w-16 h-14 bg-white border flex items-center justify-center text-red-500 text-xl font-bold">01</div>
//         <div className="h-14 px-6 bg-gradient-to-r from-red-500 to-orange-500 flex items-center text-white">
//           <span className="text-2xl font-bold mr-3">02</span>
//           <span className="font-medium">Enter / Edit the content</span>
//         </div>
//       </div>

//       {/* Main Area */}
//       <div className="mx-3 border border-[#df6545] bg-white">
//         <div className="grid lg:grid-cols-[1fr_1fr]">
//           {/* Content Column */}
//           <div className="border-r border-[#df6545] p-5">
//             <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">CONTENT</h2>

//             <div className="max-w-lg mx-auto">
//               {/* Title */}
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full border rounded px-4 py-2 text-base"
//                 placeholder="Enter title"
//               />
//               <p className="text-sm text-gray-500 mt-1">{86 - title.length} characters remaining.</p>

//               {/* Template-specific fields (no color picker) */}
//               {renderTemplateFields()}

//               {/* Description */}
//               <div className="mt-5">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   rows={8}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full border rounded p-3 text-sm resize-none"
//                   placeholder="Enter description..."
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3 mt-5">
//                 <button onClick={handleBack} className="px-5 py-2 border rounded bg-gray-100 text-sm hover:bg-gray-200">
//                   PREVIOUS
//                 </button>
//                 <button onClick={handleSubmit} className="px-5 py-2 rounded bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm hover:opacity-90">
//                   SAVE
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Preview Column */}
//           <div className="p-5">
//             <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">PREVIEW</h2>

//             <div className="flex justify-center">
//               <div className="w-[220px] h-[460px] bg-[#20242c] rounded-[30px] p-3">
//                 <div
//                   className="rounded-[20px] h-full overflow-y-auto p-3"
//                   style={{
//                     backgroundColor: backgroundColor,
//                     color: getContrastColor(backgroundColor)
//                   }}
//                 >
//                   {renderPreviewContent()}
//                   <p className="italic text-center mt-4 text-xs">Swipe on!</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateContent;


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
import "./CreateContent.css";   // or the path to your CSS file

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

// Helper: returns "#000000" or "#ffffff" based on luminance
const getContrastColor = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

// --- Extract dominant color from an image (average color) ---
const getAverageColorFromImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        const pixelCount = data.length / 4;
        r = Math.round(r / pixelCount);
        g = Math.round(g / pixelCount);
        b = Math.round(b / pixelCount);
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        resolve(hex);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
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

  // --- Multiple slides – empty by default ---
  const [slides, setSlides] = useState([]);

  // Section/Stream details
  const [sectionTitle, setSectionTitle] = useState("Section");
  const [streamTitle, setStreamTitle] = useState("Stream");
  const [loading, setLoading] = useState(false);

  // Background color – auto‑updated from the first uploaded image
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  // --- NEW: background image state and load status ---
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [bgLoaded, setBgLoaded] = useState(false);

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

  // --- UPDATED: handle side image upload – set background image ---
  const handleSideImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSideImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setSideImagePreview(dataUrl);
        // Set as background image
        setBackgroundImage(dataUrl);
        setBgLoaded(false);
        // Preload image to trigger fade
        const img = new Image();
        img.onload = () => setBgLoaded(true);
        img.src = dataUrl;
        // Auto‑set background color (for overlay tint)
        getAverageColorFromImage(file).then((color) => {
          setBackgroundColor(color);
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const removeSideImage = () => {
    setSideImageFile(null);
    setSideImagePreview(null);
    setBackgroundImage(null);   // clear background
    setBgLoaded(false);
    // Reset background to white if no other images exist
    if (slides.every((s) => !s.imageFile)) {
      setBackgroundColor("#ffffff");
    }
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
      setBgLoaded(false);
      setBackgroundColor("#ffffff");
    } else {
      // If no slide has an image, clear background image but keep color
      const hasImage = updatedSlides.some((s) => s.type === "image" && s.imageFile);
      if (!hasImage) {
        setBackgroundImage(null);
        setBgLoaded(false);
      }
    }
  };

  // --- UPDATED: slide image upload – set background image ---
  const updateSlideImage = async (index, file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const dataUrl = reader.result;
      const updated = [...slides];
      updated[index].imageFile = file;
      updated[index].imagePreview = dataUrl;
      setSlides(updated);
      // Set as background image
      setBackgroundImage(dataUrl);
      setBgLoaded(false);
      const img = new Image();
      img.onload = () => setBgLoaded(true);
      img.src = dataUrl;
      // Auto‑set background color (for overlay tint)
      const color = await getAverageColorFromImage(file);
      setBackgroundColor(color);
    };
    reader.readAsDataURL(file);
  };

  const updateSlideText = (index, text) => {
    const updated = [...slides];
    updated[index].text = text;
    setSlides(updated);
  };

  // --- Submit ---
  const handleSubmit = () => {
    const payload = {
      sectionId,
      template,
      title,
      description,
      isNumberedList,
      openInBrowser,
      videoFile,
      videoUrl,
      sideImageFile,
      sideText,
      pdfFile,
      pdfText,
      sourceUrl,
      slides,
    };
    console.log("Saving content:", payload);
    alert("Content created successfully!");
    navigate(-1);
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
                  <img src={sideImagePreview} alt="preview" className="w-52 h-36 object-cover" />
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
                                setBgLoaded(false);
                                setBackgroundColor("#ffffff");
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

  // --- Preview renderer (with contrast color) ---
  const renderPreviewContent = () => {
    const contrastColor = getContrastColor(backgroundColor);

    switch (template) {
      case "Video":
        return (
          <>
            <h3 className="font-bold text-sm" style={{ color: contrastColor }}>
              {title || "Content Preview"}
            </h3>
            {videoPreview && (
              <video src={videoPreview} className="w-full h-32 object-cover mt-2 rounded" controls />
            )}
            {videoUrl && !videoPreview && (
              <div className="w-full h-32 bg-gray-200 mt-2 rounded flex items-center justify-center text-xs text-gray-500">
                Video from URL
              </div>
            )}
            <div className="text-sm mt-3" style={{ color: contrastColor }}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>
                  No description yet
                </p>
              )}
            </div>
          </>
        );

      case "Image-Text Side by Side":
        return (
          <>
            <h3 className="font-bold text-sm" style={{ color: contrastColor }}>
              {title || "Content Preview"}
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {sideImagePreview && (
                <img src={sideImagePreview} alt="side" className="w-full h-20 object-cover rounded" />
              )}
              <div className="text-xs" style={{ color: contrastColor }}>
                {sideText ? (
                  <div dangerouslySetInnerHTML={{ __html: sideText.replace(/\n/g, "<br />") }} />
                ) : (
                  <p className="text-gray-400" style={{ color: contrastColor }}>
                    Side text
                  </p>
                )}
              </div>
            </div>
            <div className="text-sm mt-3" style={{ color: contrastColor }}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>
                  No description yet
                </p>
              )}
            </div>
          </>
        );

      case "Extract from PDF":
        return (
          <>
            <h3 className="font-bold text-sm" style={{ color: contrastColor }}>
              {title || "Content Preview"}
            </h3>
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
                  <div
                    className="mt-3 text-xs max-h-40 overflow-y-auto text-gray-700 whitespace-pre-wrap border p-2 rounded bg-gray-50"
                    style={{ color: contrastColor }}
                  >
                    {pdfText.length > 500 ? pdfText.substring(0, 500) + "..." : pdfText}
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-gray-400" style={{ color: contrastColor }}>
                    No text extracted yet.
                  </p>
                )}
              </>
            ) : (
              <div
                className="mt-2 h-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400"
                style={{ color: contrastColor }}
              >
                No PDF uploaded
              </div>
            )}
            <div className="text-sm mt-3" style={{ color: contrastColor }}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>
                  No description yet
                </p>
              )}
            </div>
          </>
        );

      case "Extract from URL": {
        const youtubeEmbedUrl = getYouTubeEmbedUrl(sourceUrl);
        return (
          <>
            <h3 className="font-bold text-sm" style={{ color: contrastColor }}>
              {title || "Content Preview"}
            </h3>
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
              <div className="mt-2 p-2 bg-gray-100 rounded text-xs break-all" style={{ color: contrastColor }}>
                <Link2 size={14} className="inline mr-1" />
                {sourceUrl}
              </div>
            ) : null}
            <div className="text-sm mt-3" style={{ color: contrastColor }}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>
                  No description yet
                </p>
              )}
            </div>
          </>
        );
      }

      case "Multiple Image Text":
        return (
          <>
            <h3 className="font-bold text-sm" style={{ color: contrastColor }}>
              {title || "Content Preview"}
            </h3>
            {slides.length === 0 ? (
              <div className="text-gray-400 text-xs mt-4 text-center" style={{ color: contrastColor }}>
                No slides to preview
              </div>
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
                      <div className="text-xs" style={{ color: contrastColor }}>
                        {slide.text}
                      </div>
                    )}
                    {slide.type === "image" && !slide.imagePreview && (
                      <div className="text-xs text-gray-400" style={{ color: contrastColor }}>
                        Empty image slide {idx + 1}
                      </div>
                    )}
                    {slide.type === "text" && !slide.text && (
                      <div className="text-xs text-gray-400" style={{ color: contrastColor }}>
                        Empty text slide {idx + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="text-sm mt-3" style={{ color: contrastColor }}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, "<br />") }} />
              ) : (
                <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>
                  No description yet
                </p>
              )}
            </div>
          </>
        );

      default:
        return (
          <p className="text-gray-400 text-xs" style={{ color: contrastColor }}>
            Preview not available
          </p>
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

              {/* Template-specific fields (no color picker) */}
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
              <div className="w-[220px] h-[460px] bg-[#20242c] rounded-[30px] p-3">
          <div
  className="rounded-[20px] h-full overflow-hidden p-3 relative"
  style={{
    backgroundColor: backgroundColor,
    color: getContrastColor(backgroundColor),
  }}
>
  {/* Background image with animation */}
  {backgroundImage && (
    <img
      src={backgroundImage}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover rounded-[20px] transition-opacity duration-700 bg-animated"
      style={{
        opacity: bgLoaded ? 1 : 0,
      }}
    />
  )}

  {/* Overlay tint */}
  <div
    className="absolute inset-0 rounded-[20px]"
    style={{
      backgroundColor: backgroundColor,
      opacity: 0.6,
      transition: "background-color 0.5s ease",
    }}
  />

  {/* Content on top */}
  <div className="relative z-10">
    {renderPreviewContent()}
    <p className="italic text-center mt-4 text-xs">Swipe on!</p>
  </div>
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