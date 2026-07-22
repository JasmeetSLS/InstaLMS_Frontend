// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   BarChart3,
//   Smile,
//   Mic,
//   Heart,
//   MessageCircle,
//   Star,
//   Type as TypeIcon,
//   FileText,
//   BookOpen,
//   Key,
//   User,
//   ClipboardList,
//   ClipboardCheck,
//   Video,
//   X,
//   CheckCircle2,
//   XCircle,
//   Lightbulb,
//   Target,
//   PenLine,
//   MessageSquareText,
// } from "lucide-react";
// import api, { FILE_BASE_URL } from "../services/api";
// import HighchartsReactOfficial from "highcharts-react-official";

// // Highcharts is expected to be on window if loaded via script tags.
// // If you use npm imports, import Highcharts as well.
// const Highcharts = window.Highcharts;
// const HighchartsReact = HighchartsReactOfficial.default || HighchartsReactOfficial;

// /* -------------------------------------------------------------------------
//  * Design tokens — bright, colour-coded "ribbon report" theme
//  * ---------------------------------------------------------------------- */
// const T = {
//   page: "#F4F6FB",
//   card: "#FFFFFF",
//   text: "#232838",
//   textDim: "#7A8096",
//   border: "#E7E9F3",
//   red1: "#C31432",
//   red2: "#E63950",
//   purple1: "#7C4DFF",
//   purple2: "#6236C9",
//   teal1: "#14B8A6",
//   teal2: "#0891A8",
//   indigo1: "#4C5FD9",
//   indigo2: "#3730A3",
//   face1: "#F7A93B",
//   face2: "#E8871A",
//   voice1: "#4A5568",
//   voice2: "#2D3748",
//   emo1: "#E5384F",
//   emo2: "#C81E3A",
//   green: "#22C55E",
//   greenBg: "#DCFCE7",
//   greenText: "#15803D",
//   roseBg: "#FCE7F3",
//   roseText: "#BE185D",
// };

// const GlobalStyle = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

//     .rr-root { background: ${T.page}; font-family: 'Inter', sans-serif; color: ${T.text}; }
//     .rr-display { font-family: 'Poppins', sans-serif; }

//     @keyframes rr-fade-up {
//       from { opacity: 0; transform: translateY(14px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//     .rr-reveal { opacity: 0; animation: rr-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }

//     @keyframes rr-shine {
//       0% { transform: translateX(-60%) skewX(-20deg); }
//       100% { transform: translateX(220%) skewX(-20deg); }
//     }
//     .rr-shine::after {
//       content: '';
//       position: absolute;
//       top: 0; bottom: 0; left: 0;
//       width: 26%;
//       background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
//       animation: rr-shine 3.2s ease-in-out infinite;
//     }

//     .rr-card {
//       background: ${T.card};
//       border: 1px solid ${T.border};
//       border-radius: 20px;
//       box-shadow: 0 10px 30px -18px rgba(35,40,56,0.18);
//       transition: transform 0.25s ease, box-shadow 0.25s ease;
//     }
//     .rr-card:hover { transform: translateY(-3px); box-shadow: 0 18px 36px -16px rgba(35,40,56,0.24); }

//     .rr-chip { transition: transform 0.15s ease; }
//     .rr-chip:hover { transform: translateY(-2px); }

//     .rr-video-btn { position: relative; }
//     @keyframes rr-pulse { 0% { box-shadow: 0 0 0 0 rgba(230,57,80,0.35); } 100% { box-shadow: 0 0 0 12px rgba(230,57,80,0); } }
//     .rr-video-btn::after {
//       content: ''; position: absolute; inset: -6px; border-radius: 999px;
//       border: 1px solid ${T.red2}; animation: rr-pulse 2s infinite;
//     }

//     ::-webkit-scrollbar { width: 10px; }
//     ::-webkit-scrollbar-track { background: #EEF0F8; }
//     ::-webkit-scrollbar-thumb { background: #C9CEE6; border-radius: 8px; }

//     @media (prefers-reduced-motion: reduce) {
//       .rr-reveal, .rr-shine::after, .rr-video-btn::after { animation: none !important; }
//       .rr-card { transition: none !important; }
//     }
//   `}</style>
// );

// /* -------------------------------------------------------------------------
//  * Ribbon — colour-coded pill banner
//  * ---------------------------------------------------------------------- */
// const Ribbon = ({ icon: Icon, children, from, to, className = "" }) => (
//   <div
//     className={`rr-shine relative overflow-hidden rounded-full flex items-center justify-center gap-2 px-6 py-3 mb-5 ${className}`}
//     style={{ background: `linear-gradient(100deg, ${from}, ${to})`, boxShadow: `0 10px 24px -10px ${from}99` }}
//   >
//     {Icon && (
//       <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center shrink-0">
//         <Icon size={15} className="text-white" />
//       </span>
//     )}
//     <h2 className="rr-display text-white font-bold text-sm md:text-base tracking-wide text-center uppercase">
//       {children}
//     </h2>
//   </div>
// );

// /* -------------------------------------------------------------------------
//  * AnimatedNumber — counts up on mount
//  * ---------------------------------------------------------------------- */
// const AnimatedNumber = ({ value = 0, decimals = 0, suffix = "", duration = 1100, delay = 0 }) => {
//   const [display, setDisplay] = useState(0);
//   useEffect(() => {
//     let raf, start;
//     const target = Number(value) || 0;
//     const timeout = setTimeout(() => {
//       const tick = (ts) => {
//         if (!start) start = ts;
//         const progress = Math.min((ts - start) / duration, 1);
//         const eased = 1 - Math.pow(1 - progress, 3);
//         setDisplay(target * eased);
//         if (progress < 1) raf = requestAnimationFrame(tick);
//       };
//       raf = requestAnimationFrame(tick);
//     }, delay);
//     return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
//   }, [value, duration, delay]);
//   return <span>{display.toFixed(decimals)}{suffix}</span>;
// };

// /* -------------------------------------------------------------------------
//  * ProgressBar — thin animated fill
//  * ---------------------------------------------------------------------- */
// const ProgressBar = ({ value = 0, color = T.red2, delay = 0 }) => {
//   const [w, setW] = useState(0);
//   useEffect(() => {
//     const t = setTimeout(() => setW(Math.min(Math.max(value, 0), 100)), delay + 100);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return (
//     <div style={{ height: 8, borderRadius: 999, background: "#EEF0F8", overflow: "hidden" }}>
//       <div
//         style={{
//           height: "100%",
//           width: `${w}%`,
//           borderRadius: 999,
//           background: `linear-gradient(90deg, ${color}, ${color}CC)`,
//           transition: "width 1.1s cubic-bezier(0.16,1,0.3,1)",
//         }}
//       />
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------
//  * CylinderChart — uses Highcharts cylinder (3D) if available,
//  * otherwise falls back to a standard 3D column chart.
//  * ---------------------------------------------------------------------- */
// const getCylinderOptions = (data) => ({
//   chart: {
//     type: "cylinder",
//     backgroundColor: "transparent",
//     options3d: {
//       enabled: true,
//       alpha: 0,
//       beta: 0,
//       depth: 60,
//       viewDistance: 25,
//       frame: { visible: false },   // removes 3D frame edges
//     },
//   },
//   title: { text: "" },
//   credits: { enabled: false },
//   exporting: { enabled: false },
//   xAxis: {
//     categories: data.map((d) => d.label),
//     labels: {
//       style: { color: T.textDim, fontFamily: "Inter", fontWeight: 600, fontSize: "13px" },
//     },
//     lineWidth: 0,      // removes x-axis baseline
//     tickWidth: 0,      // removes ticks
//     tickLength: 0,
//   },
//   yAxis: {
//     min: 0,
//     max: 100,
//     title: { text: "" },              // <-- removes "Score (%)"
//     labels: { enabled: false },       // <-- removes 0, 20, 40, ... 100
//     gridLineWidth: 0,                 // removes horizontal grid lines
//     lineWidth: 0,                     // removes y-axis line
//     tickWidth: 0,                     // removes y-axis ticks (if any)
//   },
//   legend: { enabled: false },
//   plotOptions: {
//     series: {
//       depth: 60,
//       colorByPoint: true,
//       borderWidth: 0,                 // removes cylinder outlines
//       dataLabels: {
//         enabled: true,
//         format: "{y}%",
//         style: {
//           fontWeight: "bold",
//           color: T.text,
//           textOutline: "none",
//           fontFamily: "Poppins",
//         },
//       },
//     },
//   },
//   series: [
//     {
//       name: "Score",
//       data: data.map((d) => ({ y: Number(d.value) || 0, color: d.from })),
//     },
//   ],
// });

// const getColumnOptions = (data) => ({
//   chart: {
//     type: "column",
//     backgroundColor: "transparent",
//     options3d: {
//       enabled: true,
//       alpha: 10,
//       beta: 18,
//       depth: 60,
//       viewDistance: 25,
//     },
//   },
//   title: { text: "" },
//   credits: { enabled: false },
//   exporting: { enabled: false },
//   xAxis: {
//     categories: data.map((d) => d.label),
//     labels: { style: { color: T.textDim, fontFamily: "Inter", fontWeight: 600, fontSize: "13px" } },
//     lineColor: T.border,
//   },
//   yAxis: {
//     min: 0,
//     max: 100,
//     title: { text: "Score (%)", style: { color: T.textDim } },
//     labels: { style: { color: T.textDim } },
//     gridLineColor: "#EEF0F8",
//   },
//   legend: { enabled: false },
//   plotOptions: {
//     column: {
//       depth: 60,
//       colorByPoint: true,
//       dataLabels: {
//         enabled: true,
//         format: "{y}%",
//         style: { fontWeight: "bold", color: T.text, textOutline: "none", fontFamily: "Poppins" },
//       },
//     },
//   },
//   series: [
//     {
//       name: "Score",
//       data: data.map((d) => ({ y: Number(d.value) || 0, color: d.from })),
//     },
//   ],
// });

// const SVGBarChart = ({ data }) => {
//   const [values, setValues] = React.useState(data.map(() => 0));

//   React.useEffect(() => {
//     const start = performance.now();
//     const duration = 1200;

//     const animate = (time) => {
//       const p = Math.min((time - start) / duration, 1);
//       const e = 1 - Math.pow(1 - p, 3);
//       setValues(data.map((d) => d.value * e));
//       if (p < 1) requestAnimationFrame(animate);
//     };
//     requestAnimationFrame(animate);
//   }, [data]);

//   const BAR_W = 100;
//   const DEPTH = 28;
//   const MAX_H = 360;
//   const BASE_Y = 420;
//   const GAP = 100;
//   const VIEWBOX_WIDTH = 800;
//   const VIEWBOX_HEIGHT = 500;

//   // Calculate total width of bars + gaps + depth to center them
//   const totalWidth = data.length * BAR_W + (data.length - 1) * GAP + DEPTH;
//   const xOffset = (VIEWBOX_WIDTH - totalWidth) / 2;

//   const darkenColor = (hex, amount = 40) => {
//     let r = parseInt(hex.slice(1, 3), 16);
//     let g = parseInt(hex.slice(3, 5), 16);
//     let b = parseInt(hex.slice(5, 7), 16);
//     r = Math.max(0, r - amount);
//     g = Math.max(0, g - amount);
//     b = Math.max(0, b - amount);
//     return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
//   };

//   const lightenColor = (hex, amount = 40) => {
//     let r = parseInt(hex.slice(1, 3), 16);
//     let g = parseInt(hex.slice(3, 5), 16);
//     let b = parseInt(hex.slice(5, 7), 16);
//     r = Math.min(255, r + amount);
//     g = Math.min(255, g + amount);
//     b = Math.min(255, b + amount);
//     return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//       <svg
//         viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
//         width="92%"
//         style={{ maxWidth: '680px', height: 'auto', display: 'block' }}
//       >
//         <defs>
//           {data.map((d, i) => {
//             const mainColor = d.to || d.from || "#4A5568";
//             const darkColor = darkenColor(mainColor, 50);
//             const lightColor = lightenColor(mainColor, 40);
//             return (
//               <React.Fragment key={i}>
//                 <linearGradient id={`left-${i}`} x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor={darkColor} />
//                   <stop offset="100%" stopColor={darkenColor(darkColor, 30)} />
//                 </linearGradient>
//                 <linearGradient id={`right-${i}`} x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor={lightColor} />
//                   <stop offset="100%" stopColor={darkColor} />
//                 </linearGradient>
//                 <linearGradient id={`top-${i}`} x1="0" y1="0" x2="1" y2="1">
//                   <stop offset="0%" stopColor={lightenColor(lightColor, 30)} />
//                   <stop offset="100%" stopColor={lightColor} />
//                 </linearGradient>
//                 <filter id={`glow-${i}`} x="-20%" y="-20%" width="140%" height="140%">
//                   <feGaussianBlur stdDeviation="6" result="blur" />
//                   <feMerge>
//                     <feMergeNode in="blur" />
//                     <feMergeNode in="SourceGraphic" />
//                   </feMerge>
//                 </filter>
//               </React.Fragment>
//             );
//           })}
//         </defs>

//         {data.map((d, i) => {
//           const x = xOffset + i * (BAR_W + GAP);
//           const h = (values[i] / 100) * MAX_H;
//           const y = BASE_Y - h;

//           return (
//             <g key={i}>
//               {/* Left face (shadow) */}
//               <polygon
//                 points={`
//                   ${x},${y}
//                   ${x - DEPTH},${y - DEPTH}
//                   ${x - DEPTH},${BASE_Y - DEPTH}
//                   ${x},${BASE_Y}
//                 `}
//                 fill={`url(#left-${i})`}
//               />
//               {/* Front/Right face (main) */}
//               <polygon
//                 points={`
//                   ${x},${y}
//                   ${x + BAR_W},${y}
//                   ${x + BAR_W},${BASE_Y}
//                   ${x},${BASE_Y}
//                 `}
//                 fill={`url(#right-${i})`}
//               />
//               {/* Top face (highlight) */}
//               <polygon
//                 points={`
//                   ${x},${y}
//                   ${x + BAR_W},${y}
//                   ${x + BAR_W - DEPTH},${y - DEPTH}
//                   ${x - DEPTH},${y - DEPTH}
//                 `}
//                 fill={`url(#top-${i})`}
//               />
//               {/* Subtle glow overlay on front face */}
//               <polygon
//                 points={`
//                   ${x},${y}
//                   ${x + BAR_W},${y}
//                   ${x + BAR_W},${BASE_Y}
//                   ${x},${BASE_Y}
//                 `}
//                 fill={`url(#glow-${i})`}
//                 opacity="0.15"
//               />
//               {/* Value label */}
//               <text
//                 x={x + BAR_W / 2 - 10}
//                 y={y - DEPTH - 12}
//                 textAnchor="middle"
//                 fontWeight="700"
//                 fontSize="22"
//                 fill="#232838"
//               >
//                 {values[i].toFixed(0)}%
//               </text>
//               {/* Category label */}
//               {/* <text
//                 x={x + BAR_W / 2 - 10}
//                 y={BASE_Y + 38}
//                 textAnchor="middle"
//                 fontWeight="600"
//                 fontSize="18"
//                 fill="#7A8096"
//               >
//                 {d.label}
//               </text> */}
//             </g>
//           );
//         })}
//       </svg>
//     </div>
//   );
// };
// /* -------------------------------------------------------------------------
//  * MetricTile — icon block + animated progress bar
//  * ---------------------------------------------------------------------- */
// const MetricTile = ({ label, icon: Icon, value, from, to, delay = 0 }) => (
//   <div className="rr-card overflow-hidden rr-reveal" style={{ animationDelay: `${delay}s` }}>
//     <div
//       className="text-center font-bold py-3 text-lg tracking-wide text-white rr-display"
//       style={{ background: `linear-gradient(100deg, ${from}, ${to})` }}
//     >
//       {label}
//     </div>
//     <div className="p-5 flex items-center gap-4">
//       <div
//         className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
//         style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 8px 16px -6px ${to}88` }}
//       >
//         <Icon size={26} className="text-white" />
//       </div>
//       <div className="flex-1">
//         <div className="rr-display font-bold text-2xl mb-2" style={{ color: T.text }}>
//           <AnimatedNumber value={value} decimals={2} suffix="%" delay={delay * 1000} />
//         </div>
//         <ProgressBar value={value} color={from} delay={delay * 1000} />
//       </div>
//     </div>
//   </div>
// );

// /* -------------------------------------------------------------------------
//  * KeywordChips — pill chips with "+N more" overflow badge
//  * ---------------------------------------------------------------------- */
// const MAX_CHIPS = 12;
// const KeywordChips = ({ items, bg, color, border }) => {
//   if (!items.length) return <span className="text-sm" style={{ color: T.textDim }}>None found</span>;
//   const shown = items.slice(0, MAX_CHIPS);
//   const extra = items.length - shown.length;
//   return (
//     <div className="flex flex-wrap gap-2">
//       {shown.map((kw, i) => (
//         <span
//           key={i}
//           className="rr-chip text-xs font-medium px-3 py-1 rounded-full"
//           style={{ background: bg, color, border: `1px solid ${border}` }}
//         >
//           {kw}
//         </span>
//       ))}
//       {extra > 0 && (
//         <span
//           className="text-xs font-bold px-3 py-1 rounded-full"
//           style={{ background: T.text, color: "#fff" }}
//         >
//           +{extra} more
//         </span>
//       )}
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------
//  * Main Component: VideoAnalysisReport
//  * ---------------------------------------------------------------------- */
// const VideoAnalysisReport = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [reportData, setReportData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     fetchReport();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userId]);

//   const fetchReport = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.getVideoAnalysisReport(userId);
//       if (response.success) setReportData(response);
//       else setError("Failed to load report");
//     } catch (err) {
//       console.error("Error fetching report:", err);
//       setError(err.message || "Failed to load report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center rr-root">
//         <GlobalStyle />
//         <div
//           style={{
//             width: 56, height: 56, borderRadius: "50%",
//             border: `4px solid ${T.border}`, borderTopColor: T.red2,
//             animation: "spin 0.9s linear infinite", marginBottom: 18,
//           }}
//         />
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//         <div className="text-lg font-medium" style={{ color: T.textDim }}>Loading report…</div>
//       </div>
//     );
//   }

//   if (error || !reportData) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center rr-root">
//         <GlobalStyle />
//         <p className="text-lg mb-4" style={{ color: T.red2 }}>{error || "Report not found"}</p>
//         <button
//           onClick={() => navigate("/admin/video-analysis")}
//           className="px-4 py-2 rounded-full rr-card hover:brightness-95 transition"
//         >
//           Go Back to Users
//         </button>
//       </div>
//     );
//   }

//   const { assessment, user, questions } = reportData;

//   const parseKeywords = (str) => {
//     if (!str) return [];
//     try {
//       const parsed = JSON.parse(str);
//       return Array.isArray(parsed) ? parsed : [];
//     } catch (e) {
//       return str.split(",").map((s) => s.trim()).filter(Boolean);
//     }
//   };

//   const getDonutOptions = (data) => ({
//     chart: { type: "pie", backgroundColor: "transparent", height: 190 },
//     title: { text: "" },
//     credits: { enabled: false },
//     exporting: { enabled: false },
//     tooltip: { pointFormat: "<b>{point.y}%</b>", backgroundColor: "#fff", style: { color: T.text } },
//     plotOptions: {
//       pie: { innerSize: "60%", dataLabels: { enabled: false }, borderWidth: 3, borderColor: "#fff" },
//     },
//     series: [{ data }],
//   });

//   const overallBars = [
//     { label: "Face", value: assessment.overall?.face || 0, from: T.face1, to: T.face2 },
//     { label: "Voice", value: assessment.overall?.voice || 0, from: T.voice1, to: T.voice2 },
//     { label: "Emotion", value: assessment.overall?.emotion || 0, from: T.emo1, to: T.emo2 },
//   ];

//   return (
//     <div className="min-h-screen rr-root py-6 px-3">
//       <GlobalStyle />
//       <div className="w-full space-y-6">
//         {/* Back button */}
//         <button
//           onClick={() => navigate("/admin/video-analysis")}
//           className="flex items-center gap-2 transition rr-reveal"
//           style={{ color: T.textDim }}
//           onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
//           onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
//         >
//           <ArrowLeft size={20} />
//           <span className="text-sm font-medium">Back to Users</span>
//         </button>

//         {/* Page title banner */}
//         <div
//           className="rr-shine relative overflow-hidden rounded-3xl py-7 px-6 text-center rr-reveal"
//           style={{ background: `linear-gradient(100deg, ${T.red1}, ${T.red2})`, animationDelay: "0.05s" }}
//         >
//           <h1 className="rr-display text-white text-2xl md:text-3xl font-extrabold tracking-wide">Assessment Report</h1>
//           <div className="w-14 h-1 rounded-full bg-white/50 mx-auto mt-3" />
//         </div>

//         {/* User + Assessment cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//           <div className="rr-card p-5 flex items-start gap-4 rr-reveal" style={{ animationDelay: "0.1s" }}>
//             <div
//               className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
//               style={{ background: `linear-gradient(135deg, ${T.red1}, ${T.red2})`, boxShadow: `0 8px 16px -6px ${T.red2}66` }}
//             >
//               <User size={26} className="text-white" />
//             </div>
//             <div>
//               <h4 className="rr-display font-bold text-base mb-2" style={{ color: T.text }}>User Details</h4>
//               <div className="space-y-1 text-sm" style={{ color: T.textDim }}>
//                 <p><strong style={{ color: T.text }}>Name:</strong> {user.name}</p>
//                 <p><strong style={{ color: T.text }}>Designation:</strong> {user.designation}</p>
//                 <p><strong style={{ color: T.text }}>User ID:</strong> {user.userid}</p>
//               </div>
//             </div>
//           </div>

//           <div className="rr-card p-5 flex items-start gap-4 rr-reveal" style={{ animationDelay: "0.15s" }}>
//             <div
//               className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
//               style={{ background: `linear-gradient(135deg, ${T.red1}, ${T.red2})`, boxShadow: `0 8px 16px -6px ${T.red2}66` }}
//             >
//               <ClipboardList size={26} className="text-white" />
//             </div>
//             <div>
//               <h4 className="rr-display font-bold text-base mb-2" style={{ color: T.text }}>Assessment Details</h4>
//               <div className="space-y-1 text-sm" style={{ color: T.textDim }}>
//                 <p><strong style={{ color: T.text }}>Name:</strong> {assessment.title}</p>
//                 <p><strong style={{ color: T.text }}>Total Questions:</strong> {questions?.length || 0}</p>
//                 <p><strong style={{ color: T.text }}>Date:</strong> {assessment.attempted_date}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Overall Score Summary */}
//         <div className="rr-card p-6 rr-reveal" style={{ animationDelay: "0.2s" }}>
//           <Ribbon icon={BarChart3} from={T.red1} to={T.red2}>Overall Score Summary</Ribbon>
//          <SVGBarChart data={overallBars} />
//           <div className="flex justify-center gap-6 mt-2 flex-wrap">
//             {overallBars.map((d) => (
//               <div className="flex items-center gap-2" key={d.label}>
//                 <span className="w-3 h-3 rounded-full inline-block" style={{ background: d.from }} />
//                 <span className="text-sm font-medium" style={{ color: T.textDim }}>{d.label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Metric tiles */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//           <MetricTile label="FACE" icon={Smile} value={assessment.overall?.face || 0} from={T.face1} to={T.face2} delay={0.3} />
//           <MetricTile label="VOICE" icon={Mic} value={assessment.overall?.voice || 0} from={T.voice1} to={T.voice2} delay={0.38} />
//           <MetricTile label="EMOTION" icon={Heart} value={assessment.overall?.emotion || 0} from={T.emo1} to={T.emo2} delay={0.46} />
//         </div>

//         {/* Question Wise Summary banner */}
//         <Ribbon icon={ClipboardList} from={T.purple1} to={T.purple2} className="rr-reveal">
//           Question Wise Summary
//         </Ribbon>

//         {questions && questions.length > 0 ? (
//           questions.map((q, idx) => {
//             const matchedKeywords = parseKeywords(q.word?.matched_keywords);
//             const missingKeywords = parseKeywords(q.word?.missing_keywords);

//             const faceData = [
//               { name: "Confidence", y: q.face?.Confidence || 0, color: T.face1 },
//               { name: "Attention", y: q.face?.Attention || 0, color: T.voice1 },
//               { name: "Doubt", y: q.face?.Doubt || 0, color: T.emo1 },
//               { name: "Anxiety", y: q.face?.Anxiety || 0, color: T.green },
//             ];
//             const voiceData = [
//               { name: "Confidence", y: q.voice?.Confidence || 0, color: T.face1 },
//               { name: "Attention", y: q.voice?.Attention || 0, color: T.voice1 },
//               { name: "Doubt", y: q.voice?.Doubt || 0, color: T.emo1 },
//               { name: "Anxiety", y: q.voice?.Anxiety || 0, color: T.green },
//             ];
//             const emotionData = [
//               { name: "Happy", y: q.emotion?.Happy || 0, color: T.face1 },
//               { name: "Neutral", y: q.emotion?.Neutral || 0, color: T.voice1 },
//               { name: "Fear", y: q.emotion?.Fear || 0, color: T.emo1 },
//               { name: "Confusion", y: q.emotion?.Confusion || 0, color: T.green },
//             ];

//             const videoUrl = q.video ? `${FILE_BASE_URL}/${q.video}` : null;

//             return (
//               <div key={idx} className="rr-card p-6 rr-reveal" style={{ animationDelay: `${0.08 * (idx % 4)}s` }}>
//                 {/* Question header */}
//                 <div
//                   className="flex justify-between items-center rounded-2xl px-4 py-3 mb-5"
//                   style={{ background: "#F4F6FB" }}
//                 >
//                   <span className="font-semibold text-sm md:text-base" style={{ color: T.text }}>
//                     Question {idx + 1}: {q.question}
//                   </span>
//                   <div className="flex items-center gap-3 shrink-0 ml-3">
                    
//                     {videoUrl && (
//                       <button
//                         onClick={() => setSelectedVideo(videoUrl)}
//                         className="rr-video-btn rounded-full p-1"
//                         style={{ color: T.red2 }}
//                         title="Play video"
//                       >
//                         <Video size={20} />
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Donut charts */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
//                   {[
//                     { title: "Face Expression Score", data: faceData, from: T.face1, to: T.face2 },
//                     { title: "Voice Expression Score", data: voiceData, from: T.voice1, to: T.voice2 },
//                     { title: "Emotion Expression Score", data: emotionData, from: T.emo1, to: T.emo2 },
//                   ].map((block) => (
//                     <div key={block.title} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
//                       <div
//                         className="text-center font-bold py-3 text-xs tracking-wide text-white uppercase rr-display"
//                         style={{ background: `linear-gradient(100deg, ${block.from}, ${block.to})` }}
//                       >
//                         {block.title}
//                       </div>
//                       <div className="p-4 flex flex-col items-center">
//                         {Highcharts && <HighchartsReact highcharts={Highcharts} options={getDonutOptions(block.data)} />}
//                         <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 w-full">
//                           {block.data.map((d) => (
//                             <div className="flex items-center gap-2 text-xs" key={d.name}>
//                               <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
//                               <span className="font-medium" style={{ color: T.textDim }}>
//                                 {d.name}: {d.y?.toFixed(2) || 0}%
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Word Power Analysis */}
//                 <Ribbon icon={TypeIcon} from={T.purple1} to={T.purple2} className="!mb-4">
//                   Word Power Analysis
//                 </Ribbon>

//                 <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//                   {[
//                     { label: "Text Emotion", icon: MessageCircle, content: q.sentiment || "Neutral", color: T.green, capitalize: true },
//                     { label: "Score", icon: Star, content: `${q.score}/70`, color: T.face1 },
//                     { label: "Grammar Mistakes", icon: TypeIcon, content: q.grammar_mistakes, color: T.purple1 },
//                     { label: "Total Words", icon: FileText, content: q.word?.total_words || 0, color: T.voice1 },
//                     { label: "Unique Words", icon: BookOpen, content: q.word?.keyword_count || 0, color: T.emo1 },
//                   ].map((card) => (
//                     <div key={card.label} className="rr-chip rounded-2xl p-4 text-center" style={{ border: `1px solid ${T.border}` }}>
//                       <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: T.textDim }}>
//                         {card.label}
//                       </div>
//                       <div
//                         className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
//                         style={{ background: `${card.color}1A` }}
//                       >
//                         <card.icon size={20} color={card.color} />
//                       </div>
//                       <p className={`font-bold text-base ${card.capitalize ? "capitalize" : ""}`} style={{ color: T.text }}>
//                         {card.content}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Answer Analysis */}
//                 <Ribbon icon={ClipboardCheck} from={T.teal1} to={T.teal2} className="!mb-4">
//                   Answer Analysis
//                 </Ribbon>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
//                   <div className="rounded-2xl p-4" style={{ background: T.greenBg + "55", border: `1px solid ${T.greenBg}` }}>
//                     <div className="flex items-center gap-2 mb-3">
//                       <CheckCircle2 size={18} color={T.greenText} />
//                       <h4 className="font-semibold" style={{ color: T.text }}>Matched Keywords</h4>
//                       <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: T.greenText, color: "#fff" }}>
//                         {matchedKeywords.length}
//                       </span>
//                     </div>
//                     <KeywordChips items={matchedKeywords} bg={T.greenBg} color={T.greenText} border="#BBF7D0" />
//                   </div>
//                   <div className="rounded-2xl p-4" style={{ background: T.roseBg + "55", border: `1px solid ${T.roseBg}` }}>
//                     <div className="flex items-center gap-2 mb-3">
//                       <XCircle size={18} color={T.roseText} />
//                       <h4 className="font-semibold" style={{ color: T.text }}>Missing Keywords</h4>
//                       <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: T.roseText, color: "#fff" }}>
//                         {missingKeywords.length}
//                       </span>
//                     </div>
//                     <KeywordChips items={missingKeywords} bg={T.roseBg} color={T.roseText} border="#FBCFE8" />
//                   </div>
//                 </div>

//                 {/* Correctness */}
//                 <Ribbon icon={ClipboardCheck} from={T.indigo1} to={T.indigo2} className="!mb-4">
//                   Correctness
//                 </Ribbon>
//                 <div className="rounded-2xl overflow-hidden mb-6" style={{ border: `1px solid ${T.border}` }}>
//                   {[
//                     { label: "Correctness", icon: CheckCircle2, color: T.greenText, value: q.correctness?.Correctness },
//                     { label: "Understanding", icon: Lightbulb, color: T.purple1, value: q.correctness?.Understanding },
//                     { label: "Depth & Clarity", icon: Target, color: T.face2, value: q.correctness?.["Depth and Clarity"] },
//                     { label: "Explanation", icon: PenLine, color: T.roseText, value: q.correctness?.Explanation },
//                   ].map((row, i) => (
//                     <div
//                       key={row.label}
//                       className="flex flex-wrap md:flex-nowrap"
//                       style={{ background: i % 2 === 0 ? "#FAFBFF" : "#fff", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}
//                     >
//                       <div className="w-full md:w-56 shrink-0 flex items-center gap-2 px-5 py-4">
//                         <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${row.color}1A` }}>
//                           <row.icon size={16} color={row.color} />
//                         </div>
//                         <span className="font-semibold text-sm" style={{ color: T.text }}>{row.label}</span>
//                       </div>
//                       <div className="flex-1 px-5 py-4 text-sm leading-relaxed" style={{ color: T.textDim, borderLeft: `1px solid ${T.border}` }}>
//                         {row.value || "Not evaluated"}
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Transcript */}
//                 {q.transcript && (
//                   <>
//                     <Ribbon icon={FileText} from={T.purple1} to={T.purple2} className="!mb-4">
//                       Transcript
//                     </Ribbon>
//                     <div className="rounded-2xl p-5 text-sm leading-relaxed" style={{ background: "#F4F6FB", color: T.text }}>
//                       {q.transcript}
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-center" style={{ color: T.textDim }}>No questions found.</p>
//         )}
//       </div>

//       {/* Video Modal */}
//       {selectedVideo && (
//         <div
//           className="fixed inset-0 flex items-center justify-center z-50 p-4"
//           style={{ background: "rgba(20,20,30,0.75)", backdropFilter: "blur(4px)" }}
//           onClick={() => setSelectedVideo(null)}
//         >
//           <div className="rr-card p-4 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="font-bold rr-display" style={{ color: T.text }}>Video</h3>
//               <button onClick={() => setSelectedVideo(null)} style={{ color: T.textDim }}>
//                 <X size={24} />
//               </button>
//             </div>
//             <video src={selectedVideo} controls className="w-full rounded-xl" autoPlay />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoAnalysisReport;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  ClipboardList,
  Smile,
  Mic,
  MessageCircle,
  Star,
  Type as TypeIcon,
  FileText,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Target,
  PenLine,
  Video,
  X,
  Download,
  Award,
  Sparkles,
} from "lucide-react";
import api, { FILE_BASE_URL } from "../services/api";

/* -------------------------------------------------------------------------
 * Theme — face / voice / emotion colour families (mirrors reference)
 * ---------------------------------------------------------------------- */
const FAMILY = {
  face: { a: "#ffa51f", b: "#ff7900", bar1: "#ffb328", bar2: "#ef8505", top: "#ffd05a", side: "#a84a00" },
  voice: { a: "#3388ff", b: "#185dff", bar1: "#38a8ff", bar2: "#1457df", top: "#75c8ff", side: "#0b3e9d" },
  emotion: { a: "#ff3e7d", b: "#ff145d", bar1: "#ff4b82", bar2: "#d31754", top: "#ff7fac", side: "#8d123a" },
};

const rating = (v) => {
  if (v >= 75) return { label: "Excellent", color: "#3fea7a" };
  if (v >= 50) return { label: "Good", color: "#ffb84d" };
  return { label: "Needs Improvement", color: "#ff5c7a" };
};

const parseKeywords = (str) => {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return String(str).split(",").map((s) => s.trim()).filter(Boolean);
  }
};

const darkenColor = (hex, amount = 40) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const lightenColor = (hex, amount = 40) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.min(255, r + amount);
  g = Math.min(255, g + amount);
  b = Math.min(255, b + amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

/* -------------------------------------------------------------------------
 * SVGBarChart — true SVG 3D bar chart (extruded polygon faces + glow)
 * ---------------------------------------------------------------------- */
const SVGBarChart = ({ data, labelColor = "#ffffff" }) => {
  const [values, setValues] = useState(data.map(() => 0));

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1200;
    const animate = (time) => {
      const p = Math.min((time - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValues(data.map((d) => d.value * e));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.map((d) => d.value).join(",")]);

  const BAR_W = 90;
  const DEPTH = 24;
  const MAX_H = 210;
  const BASE_Y = 260;
  const GAP = 70;
  const VIEWBOX_WIDTH = data.length * BAR_W + (data.length - 1) * GAP + DEPTH + 60;
  const VIEWBOX_HEIGHT = 320;

  const totalWidth = data.length * BAR_W + (data.length - 1) * GAP + DEPTH;
  const xOffset = (VIEWBOX_WIDTH - totalWidth) / 2;

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} width="100%" style={{ maxWidth: 460, height: "auto", display: "block" }}>
        <defs>
          {data.map((d, i) => {
            const mainColor = d.to || d.from || "#4A5568";
            const darkColor = darkenColor(mainColor, 50);
            const lightColor = lightenColor(mainColor, 40);
            return (
              <React.Fragment key={i}>
                <linearGradient id={`left-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={darkColor} />
                  <stop offset="100%" stopColor={darkenColor(darkColor, 30)} />
                </linearGradient>
                <linearGradient id={`right-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={lightColor} />
                  <stop offset="100%" stopColor={darkColor} />
                </linearGradient>
                <linearGradient id={`top-${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={lightenColor(lightColor, 30)} />
                  <stop offset="100%" stopColor={lightColor} />
                </linearGradient>
                <filter id={`glow-${i}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </React.Fragment>
            );
          })}
        </defs>

        {data.map((d, i) => {
          const x = xOffset + i * (BAR_W + GAP);
          const h = (values[i] / 100) * MAX_H;
          const y = BASE_Y - h;

          return (
            <g key={i}>
              <polygon points={`${x},${y} ${x - DEPTH},${y - DEPTH} ${x - DEPTH},${BASE_Y - DEPTH} ${x},${BASE_Y}`} fill={`url(#left-${i})`} />
              <polygon points={`${x},${y} ${x + BAR_W},${y} ${x + BAR_W},${BASE_Y} ${x},${BASE_Y}`} fill={`url(#right-${i})`} />
              <polygon points={`${x},${y} ${x + BAR_W},${y} ${x + BAR_W - DEPTH},${y - DEPTH} ${x - DEPTH},${y - DEPTH}`} fill={`url(#top-${i})`} />
              <polygon points={`${x},${y} ${x + BAR_W},${y} ${x + BAR_W},${BASE_Y} ${x},${BASE_Y}`} fill={`url(#glow-${i})`} opacity="0.15" />
              <text x={x + BAR_W / 2 - 10} y={y - DEPTH - 12} textAnchor="middle" fontWeight="700" fontSize="20" fill={labelColor} style={{ textShadow: "0 3px 5px rgba(0,0,0,0.6)" }}>
                {values[i].toFixed(0)}%
              </text>
              <text x={x + BAR_W / 2 - 10} y={BASE_Y + 32} textAnchor="middle" fontWeight="700" fontSize="16" fill={labelColor} opacity="0.85">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* -------------------------------------------------------------------------
 * SVGDonutChart — true SVG ring/pie chart built from stroked arcs
 * ---------------------------------------------------------------------- */
const SVGDonutChart = ({ data, size = 100, strokeWidth = 15, filterId }) => {
  const [progress, setProgress] = useState(0);
  const gid = filterId || `donut-glow-${Math.random().toString(36).slice(2, 8)}`;

  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1000;
    const animate = (time) => {
      const p = Math.min((time - start) / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.map((d) => d.value).join(",")]);

  const total = data.reduce((s, d) => s + (Number(d.value) || 0), 0) || 1;
  const CX = 55;
  const CY = 55;
  const R = 42;
  const CIRC = 2 * Math.PI * R;

  let cumulative = 0;

  return (
    <svg viewBox="0 0 110 110" width={size} height={size} className="shrink-0">
      <defs>
        <filter id={gid} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={strokeWidth} />
      <g transform={`rotate(-90 ${CX} ${CY})`}>
        {data.map((d, i) => {
          const frac = (Number(d.value) || 0) / total;
          const len = frac * CIRC * progress;
          const offset = -cumulative * CIRC;
          cumulative += frac;
          if (len <= 0) return null;
          return (
            <circle
              key={i}
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke={d.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${len} ${CIRC - len}`}
              strokeDashoffset={offset}
              filter={`url(#${gid})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

/* -------------------------------------------------------------------------
 * SVGScoreGauge — single-value SVG ring gauge with centered readout
 * ---------------------------------------------------------------------- */
const SVGScoreGauge = ({ value, size = 210, label = "" }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1200;
    const animate = (time) => {
      const p = Math.min((time - start) / duration, 1);
      setProgress((1 - Math.pow(1 - p, 3)) * value);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const CX = 105;
  const CY = 105;
  const R = 88;
  const STROKE = 24;
  const CIRC = 2 * Math.PI * R;
  const len = (Math.min(Math.max(progress, 0), 100) / 100) * CIRC;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 210 210" width={size} height={size}>
        <defs>
          <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a89cff" />
            <stop offset="100%" stopColor="#665bff" />
          </linearGradient>
          <filter id="score-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#1c2536" strokeWidth={STROKE} />
        <g transform={`rotate(-90 ${CX} ${CY})`}>
          <circle
            cx={CX} cy={CY} r={R} fill="none" stroke="url(#score-grad)" strokeWidth={STROKE}
            strokeDasharray={`${len} ${CIRC - len}`} strokeLinecap="round" filter="url(#score-glow)"
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div>
          <strong className="ar-display block text-white text-[36px] font-black " style={{ textShadow: "0 5px 8px rgba(0,0,0,0.7)" }}>
            {Math.round(progress)}%
          </strong>
          <span className="block mt-2 text-[#42ff7f] font-black text-[12px] leading-tight">{label}</span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------
 * Scoped styles — gradients / pseudo-elements Tailwind can't express
 * ---------------------------------------------------------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');

    .ar-root { font-family: 'Inter', sans-serif; }
    .ar-display { font-family: 'Poppins', sans-serif; }

    @keyframes ar-fade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    .ar-reveal { opacity: 0; animation: ar-fade 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }

    .ar-panel {
      position: relative;
      overflow: hidden;
      border-radius: 18px;
      border: 1px solid rgba(150, 185, 245, 0.35);
      background: linear-gradient(145deg, rgba(43,58,80,0.88), rgba(12,19,31,0.94));
      box-shadow: 0 18px 35px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .ar-panel:hover { transform: translateY(-2px); box-shadow: 0 22px 42px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1); }
    .ar-panel::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background:
        linear-gradient(135deg, rgba(255,255,255,0.11), transparent 38%),
        radial-gradient(450px 180px at 25% 0%, rgba(139,174,255,0.14), transparent 70%);
    }
    .ar-panel > * { position: relative; z-index: 1; }

    .ar-progress { width: 100%; height: 9px; border-radius: 999px; background: rgba(255,255,255,0.16); box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); overflow: hidden; }
    .ar-progress span { display: block; height: 100%; border-radius: inherit; transition: width 1.1s cubic-bezier(0.16,1,0.3,1); }

    .ar-medal { position: relative; filter: drop-shadow(0 12px 12px rgba(0,0,0,0.55)); }
    .ar-ribbon { position: absolute; bottom: 0; width: 22px; height: 36px; background: linear-gradient(180deg, #875bff, #4d27de); clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 74%, 0 100%); }
    .ar-seal {
      position: absolute; top: 0; left: 6px; width: 60px; height: 60px; display: grid; place-items: center;
      background: conic-gradient(from 0deg, #7139ff, #2c66ff, #9f6bff, #3d31dd, #7139ff);
      clip-path: polygon(50% 0%, 61% 11%, 78% 7%, 86% 23%, 100% 31%, 92% 50%, 100% 69%, 84% 77%, 78% 94%, 60% 89%, 50% 100%, 39% 89%, 22% 94%, 15% 77%, 0% 69%, 8% 50%, 0% 31%, 14% 23%, 22% 7%, 39% 11%);
    }
    .ar-seal::before { content: ''; position: absolute; inset: 9px; border-radius: 14px; background: radial-gradient(circle at 35% 25%, #8ccaff, #2f6dff 65%, #1a2ca5); box-shadow: inset 0 0 0 3px rgba(255,255,255,0.3); }

    .ar-hero {
      position: relative;
      border: 1px solid rgba(180,210,255,0.45);
      background:
        radial-gradient(900px 360px at 18% -30%, rgba(90,130,190,0.35), transparent 70%),
        radial-gradient(650px 260px at 54% -30%, rgba(126,55,255,0.75), transparent 62%),
        linear-gradient(135deg, #101b2a 0%, #111827 46%, #070b12 100%);
      box-shadow: 0 35px 80px rgba(0,0,0,0.45);
      isolation: isolate;
    }

    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #10161f; }
    ::-webkit-scrollbar-thumb { background: #33415c; border-radius: 8px; }

    @media (prefers-reduced-motion: reduce) {
      .ar-reveal { animation: none !important; }
      .ar-panel { transition: none !important; }
    }
  `}</style>
);

/* -------------------------------------------------------------------------
 * Small building blocks
 * ---------------------------------------------------------------------- */
const SectionTitle = ({ icon: Icon, children, tint = "#6e60ff" }) => (
  <div className="flex items-center gap-3 mb-4">
    <span
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg"
      style={{ background: `linear-gradient(145deg, ${tint}, #243cc6)` }}
    >
      <Icon size={16} className="text-white" />
    </span>
    <h2 className="ar-display text-white text-base md:text-lg font-black uppercase tracking-wide" style={{ textShadow: "0 3px 4px rgba(0,0,0,0.45)" }}>
      {children}
    </h2>
  </div>
);

const InfoCard = ({ 
  icon: Icon, 
  title, 
  rows, 
  tint = "linear-gradient(145deg, rgba(43,58,80,0.88), rgba(12,19,31,0.94))", 
  iconTint = "linear-gradient(145deg, #65a3ff, #1548e4)" 
}) => (
  <section 
    className="ar-panel p-6 grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[76px_minmax(0,1fr)] gap-5 items-start" 
    style={{ background: tint }}
  >
    <div
      className="w-16 h-16 md:w-[76px] md:h-[76px] rounded-xl flex items-center justify-center shadow-lg shrink-0"
      style={{ background: iconTint, border: "1px solid rgba(147,193,255,0.75)" }}
    >
      <Icon size={30} className="text-white" />
    </div>
    <div className="min-w-0">
      <h3 className="ar-display text-white text-sm font-black uppercase tracking-wide" style={{ textShadow: "0 3px 4px rgba(0,0,0,0.45)" }}>
        {title}
      </h3>
      {/* 👇 Updated grid: single column, all rows full width */}
      <div className="grid grid-cols-1 gap-y-2 mt-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-baseline gap-2">
            <span className="text-[12px] font-semibold text-[#d9e6f8] whitespace-nowrap">{r.label}:</span>
            <span className="text-sm font-medium text-white break-words">{r.value ?? "—"}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MetricCard = ({ label, icon: Icon, value, family, delay = 0 }) => {
  const [w, setW] = useState(0);
  const r = rating(value);
  useEffect(() => {
    const t = setTimeout(() => setW(Math.min(Math.max(value, 0), 100)), delay + 150);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <section
      className="ar-panel ar-reveal p-5 flex flex-col justify-between gap-4"
      style={{ animationDelay: `${delay / 1000}s`, borderColor: `${family.a}99`, background: `linear-gradient(145deg, ${family.b}22, rgba(15,18,25,0.95))` }}
    >
      <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 items-center">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg shrink-0"
          style={{ background: `linear-gradient(145deg, ${family.a}, ${family.b})`, border: "1px solid rgba(255,255,255,0.32)" }}
        >
          <Icon size={28} className="text-white" />
        </div>
        <div className="min-w-0">
          <div className="text-white text-[13px] font-black mb-2 tracking-wide">{label}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <strong className="ar-display text-white text-2xl font-black tracking-tight">{value.toFixed(2)}%</strong>
            <em
              className="not-italic text-[10px] font-semibold text-white px-2.5 py-1.5 rounded-xl whitespace-nowrap shrink-0"
              style={{ background: `${family.a}30`, border: `1px solid ${family.a}90` }}
            >
              {r.label}
            </em>
          </div>
        </div>
      </div>
      <div className="ar-progress">
        <span style={{ width: `${w}%`, background: `linear-gradient(90deg, ${family.a}, ${family.b})`, boxShadow: `0 0 14px ${family.a}` }} />
      </div>
    </section>
  );
};

const OverallPanel = ({ overall }) => {
  const avg = ((Number(overall.face) || 0) + (Number(overall.voice) || 0) + (Number(overall.emotion) || 0)) / 3;
  const r = avg >= 75 ? "Excellent Performance" : avg >= 50 ? "Good Performance" : "Needs Improvement";
  const bars = [
    { label: "Face", value: overall.face || 0, from: FAMILY.face.a, to: FAMILY.face.b },
    { label: "Voice", value: overall.voice || 0, from: FAMILY.voice.a, to: FAMILY.voice.b },
    { label: "Emotion", value: overall.emotion || 0, from: FAMILY.emotion.a, to: FAMILY.emotion.b },
  ];

  return (
    <section className="ar-panel ar-reveal p-6" style={{ animationDelay: "0.2s" }}>
      <SectionTitle icon={Award} tint="#6e60ff">Overall Score</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-6 items-center">
        <div className="min-h-[220px] flex items-center justify-center">
          <SVGScoreGauge value={avg} size={200} label={r} />
        </div>
        <div className="min-w-0">
          <SVGBarChart data={bars} />
        </div>
      </div>
    </section>
  );
};

const MiniDonut = ({ title, family, data }) => (
  <article className="ar-panel overflow-hidden" style={{ borderColor: `${family.a}55` }}>
    <div
      className="text-center text-white text-[12px] font-black py-2.5 uppercase tracking-wide px-3"
      style={{ background: `linear-gradient(90deg, ${family.a}D0, transparent)` }}
    >
      {title}
    </div>
    <div className="flex items-center gap-4 p-[18px] min-w-0">
      <SVGDonutChart data={data} size={110} />
      <ul className="flex-1 min-w-0 list-none m-0 p-0">
        {data.map((d) => (
          <li key={d.name} className="flex items-center justify-between gap-3 text-[13px] text-[#e9f1ff] my-2 min-w-0">
            <span className="flex items-center gap-2 min-w-0">
              <i className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
              <span className="min-w-0 break-words">{d.name}</span>
            </span>
            <b className="font-semibold text-white shrink-0 whitespace-nowrap">{(Number(d.value) || 0).toFixed(2)}%</b>
          </li>
        ))}
      </ul>
    </div>
  </article>
);

const StatCard = ({ label, icon: Icon, value, capitalize }) => (
  <article className="ar-panel flex flex-col items-center justify-between text-center gap-3 py-5 px-3 min-h-[150px]">
    <small className="text-white text-[13px] font-bold">{label}</small>
    <span className="text-[#9c75ff]" style={{ filter: "drop-shadow(0 0 10px rgba(133,91,255,0.7))" }}>
      <Icon size={30} />
    </span>
    <strong className={`text-white text-lg font-black ${capitalize ? "capitalize" : ""}`}>{value}</strong>
  </article>
);

const KeywordBlock = ({ label, icon: Icon, items, tone }) => {
  const palette =
    tone === "good"
      ? { bg: "rgba(26,45,43,0.86)", chipBg: "rgba(49,142,76,0.28)", chipBorder: "rgba(75,221,111,0.34)", ring: "#3fea7a", countBg: "linear-gradient(145deg,#28d26c,#107c38)" }
      : { bg: "rgba(51,31,53,0.86)", chipBg: "rgba(142,39,72,0.34)", chipBorder: "rgba(255,80,128,0.34)", ring: "#ff3d5e", countBg: "linear-gradient(145deg,#f43b73,#951536)" };
  return (
    <div className="rounded-[10px] p-4 min-h-[160px]" style={{ background: `linear-gradient(145deg, ${palette.bg}, rgba(12,20,30,0.94))`, border: "1px solid rgba(158,190,245,0.22)" }}>
      <div className="flex items-center gap-3 mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: `${palette.ring}22`, border: `3px solid ${palette.ring}`, color: palette.ring }}
        >
          <Icon size={15} />
        </span>
        <span className="text-white font-black text-sm">{label}</span>
        <span className="ml-auto min-w-[34px] h-7 rounded-lg flex items-center justify-center text-white font-black text-xs" style={{ background: palette.countBg }}>
          {items.length}
        </span>
      </div>
      {items.length ? (
        <div className="flex flex-wrap gap-2.5">
          {items.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center min-h-[28px] px-3 py-1.5 rounded-[9px] text-[12px] text-[#f5fbff]"
              style={{ background: palette.chipBg, border: `1px solid ${palette.chipBorder}` }}
            >
              {kw}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-[#9aa7bf] text-sm">None found</span>
      )}
    </div>
  );
};

const RubricRow = ({ label, icon: Icon, tint, value, first }) => (
  <div className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)]" style={{ borderTop: first ? "none" : "1px solid rgba(255,255,255,0.1)" }}>
    <div
      className="flex items-center gap-3 px-4 py-3 text-[13px] font-black text-white"
      style={{ borderRight: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 shadow-md" style={{ background: tint }}>
        <Icon size={14} className="text-white" />
      </span>
      {label}
    </div>
    <div className="px-4 py-3 text-[13px] leading-relaxed text-[#f1f6ff]">{value || "Not evaluated"}</div>
  </div>
);

/* -------------------------------------------------------------------------
 * Main component
 * ---------------------------------------------------------------------- */
const VideoAnalysisReport = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getVideoAnalysisReport(userId);
      if (response.success) setReportData(response);
      else setError("Failed to load report");
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(err.message || "Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center ar-root" style={{ background: "#0b1120" }}>
        <GlobalStyle />
        <div style={{ width: 56, height: 56, borderRadius: "50%", border: "4px solid rgba(150,185,245,0.25)", borderTopColor: "#7c4dff", animation: "spin 0.9s linear infinite", marginBottom: 18 }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div className="text-lg font-medium text-[#c9d6e8]">Loading report…</div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center ar-root" style={{ background: "#0b1120" }}>
        <GlobalStyle />
        <p className="text-lg mb-4" style={{ color: "#ff5c7a" }}>{error || "Report not found"}</p>
        <button onClick={() => navigate("/admin/video-analysis")} className="ar-panel px-4 py-2 rounded-full text-white hover:brightness-110 transition">
          Go Back to Users
        </button>
      </div>
    );
  }

  const { assessment, user, questions } = reportData;

  return (
    <div className="min-h-screen ar-root py-6 px-3 overflow-x-hidden" style={{ background: "#0b1120" }}>
      <GlobalStyle />
      <div className="w-full max-w-[1400px] mx-auto space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate("/admin/video-analysis")}
          className="flex items-center gap-2 text-[#c9d6e8] hover:text-white transition ar-reveal"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Users</span>
        </button>

        {/* Hero header */}
        <header className="ar-hero rounded-[22px] px-6 md:px-10 py-7 flex flex-col md:flex-row md:items-center gap-6 ar-reveal" style={{ animationDelay: "0.05s" }}>
          <div className="flex items-center gap-6">
            <div className="ar-medal w-[74px] h-[78px] shrink-0">
              <div className="ar-ribbon" style={{ left: 20, transform: "rotate(18deg)" }} />
              <div className="ar-ribbon" style={{ right: 19, transform: "rotate(-18deg)" }} />
              <div className="ar-seal">
                <Award size={26} className="text-white relative z-[1]" />
              </div>
            </div>
            <div>
              <h1 className="ar-display text-white text-2xl md:text-[34px] font-black tracking-wide" style={{ textShadow: "0 4px 6px rgba(0,0,0,0.5)" }}>
                ASSESSMENT REPORT
              </h1>
              <p className="text-[#c9d8eb] text-sm md:text-base mt-2">Comprehensive Performance Overview</p>
            </div>
          </div>
        </header>

        {/* User + assessment + scores */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_minmax(0,1fr)] gap-6">
          <div className="grid grid-rows-[auto_auto] gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={User}
                title="User Details"
                rows={[
                  { label: "Name", value: user.name, full: true },
                  { label: "Designation", value: user.designation },
                  { label: "User ID", value: user.userid },
                ]}
              />
              <InfoCard
                icon={ClipboardList}
                title="Assessment Details"
                tint="linear-gradient(145deg, rgba(75,83,135,0.86), rgba(13,20,34,0.95))"
                iconTint="linear-gradient(145deg, #c77cff, #6429d9)"
                rows={[
                  { label: "Assessment", value: assessment.title, full: true },
                  { label: "Total Questions", value: questions?.length || 0 },
                  { label: "Date", value: assessment.attempted_date },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard label="FACE SCORE" icon={Smile} value={assessment.overall?.face || 0} family={FAMILY.face} delay={100} />
              <MetricCard label="VOICE SCORE" icon={Mic} value={assessment.overall?.voice || 0} family={FAMILY.voice} delay={180} />
              <MetricCard label="EMOTION SCORE" icon={Sparkles} value={assessment.overall?.emotion || 0} family={FAMILY.emotion} delay={260} />
            </div>
          </div>

          <OverallPanel overall={assessment.overall || {}} />
        </div>

        {/* Per-question breakdown */}
        {questions && questions.length > 0 ? (
          questions.map((q, idx) => {
            const matchedKeywords = parseKeywords(q.word?.matched_keywords);
            const missingKeywords = parseKeywords(q.word?.missing_keywords);
            const videoUrl = q.video ? `${FILE_BASE_URL}/${q.video}` : null;

            const faceData = [
              { name: "Confident", value: q.face?.Confidence || 0, color: "#ffad2d" },
              { name: "Attentive", value: q.face?.Attention || 0, color: "#43d663" },
              { name: "Doubtful", value: q.face?.Doubt || 0, color: "#ff477b" },
              { name: "Passive", value: q.face?.Anxiety || 0, color: "#438dff" },
            ];
            const voiceData = [
              { name: "Confident", value: q.voice?.Confidence || 0, color: "#ffad2d" },
              { name: "Attentive", value: q.voice?.Attention || 0, color: "#43d663" },
              { name: "Doubtful", value: q.voice?.Doubt || 0, color: "#ff477b" },
              { name: "Passive", value: q.voice?.Anxiety || 0, color: "#438dff" },
            ];
            const emotionData = [
              { name: "Happy", value: q.emotion?.Happy || 0, color: "#ffad2d" },
              { name: "Neutral", value: q.emotion?.Neutral || 0, color: "#43d663" },
              { name: "Fear", value: q.emotion?.Fear || 0, color: "#ff3978" },
              { name: "Confusion", value: q.emotion?.Confusion || 0, color: "#2b8cff" },
            ];

            const delay = 0.06 * (idx % 5);

            return (
              <div key={idx} className="space-y-4">
                {/* Question summary + word power */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_minmax(0,1fr)] gap-4">
                  <section className="ar-panel ar-reveal p-5" style={{ animationDelay: `${delay}s` }}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="min-w-0">
                        <SectionTitle icon={ClipboardList} tint="#6e60ff">Question {idx + 1}</SectionTitle>
                        <p className="text-white text-sm leading-relaxed -mt-3">{q.question}</p>
                      </div>
                      {videoUrl && (
                        <button
                          onClick={() => setSelectedVideo(videoUrl)}
                          className="relative shrink-0 rounded-full p-2 text-white"
                          style={{ background: "linear-gradient(145deg,#e63950,#c31432)" }}
                          title="Play video"
                        >
                          <Video size={18} />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                      <div className="flex-1 basis-[280px] min-w-[260px] max-w-[380px]">
                        <MiniDonut title="Face Expression Score" family={FAMILY.face} data={faceData} />
                      </div>
                      <div className="flex-1 basis-[280px] min-w-[260px] max-w-[380px]">
                        <MiniDonut title="Voice Expression Score" family={FAMILY.voice} data={voiceData} />
                      </div>
                      <div className="flex-1 basis-[280px] min-w-[260px] max-w-[380px]">
                        <MiniDonut title="Emotion Expression Score" family={FAMILY.emotion} data={emotionData} />
                      </div>
                    </div>
                  </section>

                  <section className="ar-panel ar-reveal p-5" style={{ animationDelay: `${delay + 0.05}s` }}>
                    <SectionTitle icon={TypeIcon} tint="#9d79ff">Word Power Analysis</SectionTitle>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <StatCard label="Text Emotion" icon={MessageCircle} value={q.sentiment || "Neutral"} capitalize />
                      <StatCard label="Score" icon={Star} value={`${q.score}/70`} />
                      <StatCard label="Grammar Mistakes" icon={TypeIcon} value={q.grammar_mistakes ?? 0} />
                      <StatCard label="Total Words" icon={FileText} value={q.word?.total_words || 0} />
                      <StatCard label="Unique Words" icon={BookOpen} value={q.word?.keyword_count || 0} />
                    </div>
                  </section>
                </div>

                {/* Answer analysis + correctness */}
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_minmax(0,1fr)] gap-4">
                  <section className="ar-panel ar-reveal p-5" style={{ animationDelay: `${delay + 0.1}s` }}>
                    <SectionTitle icon={CheckCircle2} tint="#3fea7a">Answer Analysis</SectionTitle>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <KeywordBlock label="Matched Keywords" icon={CheckCircle2} items={matchedKeywords} tone="good" />
                      <KeywordBlock label="Missing Keywords" icon={XCircle} items={missingKeywords} tone="bad" />
                    </div>
                  </section>

                  <section className="ar-panel ar-reveal p-5" style={{ animationDelay: `${delay + 0.15}s` }}>
                    <SectionTitle icon={Target} tint="#ff9b24">Correctness</SectionTitle>
                    <div className="rounded-[10px] overflow-hidden" style={{ border: "1px solid rgba(158,190,245,0.18)", background: "rgba(11,18,30,0.44)" }}>
                      <RubricRow first label="Correctness" icon={CheckCircle2} tint="linear-gradient(145deg,#49df82,#176d39)" value={q.correctness?.Correctness} />
                      <RubricRow label="Understanding" icon={Lightbulb} tint="linear-gradient(145deg,#9d79ff,#4b2ce2)" value={q.correctness?.Understanding} />
                      <RubricRow label="Depth & Clarity" icon={Target} tint="linear-gradient(145deg,#ff9b24,#c74a07)" value={q.correctness?.["Depth and Clarity"]} />
                      <RubricRow label="Explanation" icon={PenLine} tint="linear-gradient(145deg,#ff5a9a,#9e255e)" value={q.correctness?.Explanation} />
                    </div>
                  </section>
                </div>

                {/* Transcript */}
                {q.transcript && (
                  <section
                    className="ar-panel ar-reveal p-6 flex items-center gap-5"
                    style={{
                      animationDelay: `${delay + 0.2}s`,
                      background: "radial-gradient(380px 160px at 25% 65%, rgba(120,73,255,0.25), transparent 70%), linear-gradient(145deg, rgba(27,31,101,0.92), rgba(11,16,42,0.96))",
                      borderColor: "rgba(104,86,255,0.86)",
                    }}
                  >
                    <span className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(145deg,#8359ff,#3d29d4)" }}>
                      <FileText size={22} className="text-white" />
                    </span>
                    <div>
                      <h3 className="ar-display text-white text-sm font-black uppercase mb-2 tracking-wide">Transcript</h3>
                      <p className="text-[#f5f8ff] text-sm leading-relaxed">{q.transcript}</p>
                    </div>
                  </section>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-[#c9d6e8]">No questions found.</p>
        )}
      </div>

      {/* Video modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: "rgba(6,9,16,0.8)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedVideo(null)}
        >
          <div className="ar-panel p-4 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="ar-display font-black text-white">Video</h3>
              <button onClick={() => setSelectedVideo(null)} className="text-[#c9d6e8] hover:text-white">
                <X size={24} />
              </button>
            </div>
            <video src={selectedVideo} controls className="w-full rounded-xl" autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysisReport;