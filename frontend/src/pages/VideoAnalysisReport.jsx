import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Smile,
  Mic,
  Heart,
  MessageCircle,
  Star,
  Type as TypeIcon,
  FileText,
  BookOpen,
  Key,
  User,
  ClipboardList,
  ClipboardCheck,
  Video,
  X,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Target,
  PenLine,
  MessageSquareText,
} from "lucide-react";
import api, { FILE_BASE_URL } from "../services/api";
import HighchartsReactOfficial from "highcharts-react-official";

// Highcharts is expected to be on window if loaded via script tags.
// If you use npm imports, import Highcharts as well.
const Highcharts = window.Highcharts;
const HighchartsReact = HighchartsReactOfficial.default || HighchartsReactOfficial;

/* -------------------------------------------------------------------------
 * Design tokens — bright, colour-coded "ribbon report" theme
 * ---------------------------------------------------------------------- */
const T = {
  page: "#F4F6FB",
  card: "#FFFFFF",
  text: "#232838",
  textDim: "#7A8096",
  border: "#E7E9F3",
  red1: "#C31432",
  red2: "#E63950",
  purple1: "#7C4DFF",
  purple2: "#6236C9",
  teal1: "#14B8A6",
  teal2: "#0891A8",
  indigo1: "#4C5FD9",
  indigo2: "#3730A3",
  face1: "#F7A93B",
  face2: "#E8871A",
  voice1: "#4A5568",
  voice2: "#2D3748",
  emo1: "#E5384F",
  emo2: "#C81E3A",
  green: "#22C55E",
  greenBg: "#DCFCE7",
  greenText: "#15803D",
  roseBg: "#FCE7F3",
  roseText: "#BE185D",
};

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

    .rr-root { background: ${T.page}; font-family: 'Inter', sans-serif; color: ${T.text}; }
    .rr-display { font-family: 'Poppins', sans-serif; }

    @keyframes rr-fade-up {
      from { opacity: 0; transform: translateY(14px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .rr-reveal { opacity: 0; animation: rr-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }

    @keyframes rr-shine {
      0% { transform: translateX(-60%) skewX(-20deg); }
      100% { transform: translateX(220%) skewX(-20deg); }
    }
    .rr-shine::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0; left: 0;
      width: 26%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
      animation: rr-shine 3.2s ease-in-out infinite;
    }

    .rr-card {
      background: ${T.card};
      border: 1px solid ${T.border};
      border-radius: 20px;
      box-shadow: 0 10px 30px -18px rgba(35,40,56,0.18);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .rr-card:hover { transform: translateY(-3px); box-shadow: 0 18px 36px -16px rgba(35,40,56,0.24); }

    .rr-chip { transition: transform 0.15s ease; }
    .rr-chip:hover { transform: translateY(-2px); }

    .rr-video-btn { position: relative; }
    @keyframes rr-pulse { 0% { box-shadow: 0 0 0 0 rgba(230,57,80,0.35); } 100% { box-shadow: 0 0 0 12px rgba(230,57,80,0); } }
    .rr-video-btn::after {
      content: ''; position: absolute; inset: -6px; border-radius: 999px;
      border: 1px solid ${T.red2}; animation: rr-pulse 2s infinite;
    }

    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #EEF0F8; }
    ::-webkit-scrollbar-thumb { background: #C9CEE6; border-radius: 8px; }

    @media (prefers-reduced-motion: reduce) {
      .rr-reveal, .rr-shine::after, .rr-video-btn::after { animation: none !important; }
      .rr-card { transition: none !important; }
    }
  `}</style>
);

/* -------------------------------------------------------------------------
 * Ribbon — colour-coded pill banner
 * ---------------------------------------------------------------------- */
const Ribbon = ({ icon: Icon, children, from, to, className = "" }) => (
  <div
    className={`rr-shine relative overflow-hidden rounded-full flex items-center justify-center gap-2 px-6 py-3 mb-5 ${className}`}
    style={{ background: `linear-gradient(100deg, ${from}, ${to})`, boxShadow: `0 10px 24px -10px ${from}99` }}
  >
    {Icon && (
      <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center shrink-0">
        <Icon size={15} className="text-white" />
      </span>
    )}
    <h2 className="rr-display text-white font-bold text-sm md:text-base tracking-wide text-center uppercase">
      {children}
    </h2>
  </div>
);

/* -------------------------------------------------------------------------
 * AnimatedNumber — counts up on mount
 * ---------------------------------------------------------------------- */
const AnimatedNumber = ({ value = 0, decimals = 0, suffix = "", duration = 1100, delay = 0 }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf, start;
    const target = Number(value) || 0;
    const timeout = setTimeout(() => {
      const tick = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(target * eased);
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [value, duration, delay]);
  return <span>{display.toFixed(decimals)}{suffix}</span>;
};

/* -------------------------------------------------------------------------
 * ProgressBar — thin animated fill
 * ---------------------------------------------------------------------- */
const ProgressBar = ({ value = 0, color = T.red2, delay = 0 }) => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(Math.min(Math.max(value, 0), 100)), delay + 100);
    return () => clearTimeout(t);
  }, [value, delay]);
  return (
    <div style={{ height: 8, borderRadius: 999, background: "#EEF0F8", overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${w}%`,
          borderRadius: 999,
          background: `linear-gradient(90deg, ${color}, ${color}CC)`,
          transition: "width 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
};

/* -------------------------------------------------------------------------
 * CylinderChart — uses Highcharts cylinder (3D) if available,
 * otherwise falls back to a standard 3D column chart.
 * ---------------------------------------------------------------------- */
const getCylinderOptions = (data) => ({
  chart: {
    type: "cylinder",
    backgroundColor: "transparent",
    options3d: {
      enabled: true,
      alpha: 0,
      beta: 0,
      depth: 60,
      viewDistance: 25,
      frame: { visible: false },   // removes 3D frame edges
    },
  },
  title: { text: "" },
  credits: { enabled: false },
  exporting: { enabled: false },
  xAxis: {
    categories: data.map((d) => d.label),
    labels: {
      style: { color: T.textDim, fontFamily: "Inter", fontWeight: 600, fontSize: "13px" },
    },
    lineWidth: 0,      // removes x-axis baseline
    tickWidth: 0,      // removes ticks
    tickLength: 0,
  },
  yAxis: {
    min: 0,
    max: 100,
    title: { text: "" },              // <-- removes "Score (%)"
    labels: { enabled: false },       // <-- removes 0, 20, 40, ... 100
    gridLineWidth: 0,                 // removes horizontal grid lines
    lineWidth: 0,                     // removes y-axis line
    tickWidth: 0,                     // removes y-axis ticks (if any)
  },
  legend: { enabled: false },
  plotOptions: {
    series: {
      depth: 60,
      colorByPoint: true,
      borderWidth: 0,                 // removes cylinder outlines
      dataLabels: {
        enabled: true,
        format: "{y}%",
        style: {
          fontWeight: "bold",
          color: T.text,
          textOutline: "none",
          fontFamily: "Poppins",
        },
      },
    },
  },
  series: [
    {
      name: "Score",
      data: data.map((d) => ({ y: Number(d.value) || 0, color: d.from })),
    },
  ],
});

const getColumnOptions = (data) => ({
  chart: {
    type: "column",
    backgroundColor: "transparent",
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 18,
      depth: 60,
      viewDistance: 25,
    },
  },
  title: { text: "" },
  credits: { enabled: false },
  exporting: { enabled: false },
  xAxis: {
    categories: data.map((d) => d.label),
    labels: { style: { color: T.textDim, fontFamily: "Inter", fontWeight: 600, fontSize: "13px" } },
    lineColor: T.border,
  },
  yAxis: {
    min: 0,
    max: 100,
    title: { text: "Score (%)", style: { color: T.textDim } },
    labels: { style: { color: T.textDim } },
    gridLineColor: "#EEF0F8",
  },
  legend: { enabled: false },
  plotOptions: {
    column: {
      depth: 60,
      colorByPoint: true,
      dataLabels: {
        enabled: true,
        format: "{y}%",
        style: { fontWeight: "bold", color: T.text, textOutline: "none", fontFamily: "Poppins" },
      },
    },
  },
  series: [
    {
      name: "Score",
      data: data.map((d) => ({ y: Number(d.value) || 0, color: d.from })),
    },
  ],
});

const CylinderChart = ({ data }) => {
  // Check if the cylinder series type is registered
  const hasCylinder = Highcharts && Highcharts.seriesTypes && Highcharts.seriesTypes.cylinder;

  // Use cylinder options if available, otherwise fallback to 3D column
  const options = hasCylinder ? getCylinderOptions(data) : getColumnOptions(data);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

/* -------------------------------------------------------------------------
 * MetricTile — icon block + animated progress bar
 * ---------------------------------------------------------------------- */
const MetricTile = ({ label, icon: Icon, value, from, to, delay = 0 }) => (
  <div className="rr-card overflow-hidden rr-reveal" style={{ animationDelay: `${delay}s` }}>
    <div
      className="text-center font-bold py-3 text-lg tracking-wide text-white rr-display"
      style={{ background: `linear-gradient(100deg, ${from}, ${to})` }}
    >
      {label}
    </div>
    <div className="p-5 flex items-center gap-4">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})`, boxShadow: `0 8px 16px -6px ${to}88` }}
      >
        <Icon size={26} className="text-white" />
      </div>
      <div className="flex-1">
        <div className="rr-display font-bold text-2xl mb-2" style={{ color: T.text }}>
          <AnimatedNumber value={value} decimals={2} suffix="%" delay={delay * 1000} />
        </div>
        <ProgressBar value={value} color={from} delay={delay * 1000} />
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------
 * KeywordChips — pill chips with "+N more" overflow badge
 * ---------------------------------------------------------------------- */
const MAX_CHIPS = 12;
const KeywordChips = ({ items, bg, color, border }) => {
  if (!items.length) return <span className="text-sm" style={{ color: T.textDim }}>None found</span>;
  const shown = items.slice(0, MAX_CHIPS);
  const extra = items.length - shown.length;
  return (
    <div className="flex flex-wrap gap-2">
      {shown.map((kw, i) => (
        <span
          key={i}
          className="rr-chip text-xs font-medium px-3 py-1 rounded-full"
          style={{ background: bg, color, border: `1px solid ${border}` }}
        >
          {kw}
        </span>
      ))}
      {extra > 0 && (
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: T.text, color: "#fff" }}
        >
          +{extra} more
        </span>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------
 * Main Component: VideoAnalysisReport
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
      <div className="min-h-screen flex flex-col justify-center items-center rr-root">
        <GlobalStyle />
        <div
          style={{
            width: 56, height: 56, borderRadius: "50%",
            border: `4px solid ${T.border}`, borderTopColor: T.red2,
            animation: "spin 0.9s linear infinite", marginBottom: 18,
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div className="text-lg font-medium" style={{ color: T.textDim }}>Loading report…</div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center rr-root">
        <GlobalStyle />
        <p className="text-lg mb-4" style={{ color: T.red2 }}>{error || "Report not found"}</p>
        <button
          onClick={() => navigate("/admin/video-analysis")}
          className="px-4 py-2 rounded-full rr-card hover:brightness-95 transition"
        >
          Go Back to Users
        </button>
      </div>
    );
  }

  const { assessment, user, questions } = reportData;

  const parseKeywords = (str) => {
    if (!str) return [];
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return str.split(",").map((s) => s.trim()).filter(Boolean);
    }
  };

  const getDonutOptions = (data) => ({
    chart: { type: "pie", backgroundColor: "transparent", height: 190 },
    title: { text: "" },
    credits: { enabled: false },
    exporting: { enabled: false },
    tooltip: { pointFormat: "<b>{point.y}%</b>", backgroundColor: "#fff", style: { color: T.text } },
    plotOptions: {
      pie: { innerSize: "60%", dataLabels: { enabled: false }, borderWidth: 3, borderColor: "#fff" },
    },
    series: [{ data }],
  });

  const overallBars = [
    { label: "Face", value: assessment.overall?.face || 0, from: T.face1, to: T.face2 },
    { label: "Voice", value: assessment.overall?.voice || 0, from: T.voice1, to: T.voice2 },
    { label: "Emotion", value: assessment.overall?.emotion || 0, from: T.emo1, to: T.emo2 },
  ];

  return (
    <div className="min-h-screen rr-root py-6 px-3">
      <GlobalStyle />
      <div className="w-full space-y-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/admin/video-analysis")}
          className="flex items-center gap-2 transition rr-reveal"
          style={{ color: T.textDim }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.textDim)}
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Users</span>
        </button>

        {/* Page title banner */}
        <div
          className="rr-shine relative overflow-hidden rounded-3xl py-7 px-6 text-center rr-reveal"
          style={{ background: `linear-gradient(100deg, ${T.red1}, ${T.red2})`, animationDelay: "0.05s" }}
        >
          <h1 className="rr-display text-white text-2xl md:text-3xl font-extrabold tracking-wide">Assessment Report</h1>
          <div className="w-14 h-1 rounded-full bg-white/50 mx-auto mt-3" />
        </div>

        {/* User + Assessment cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rr-card p-5 flex items-start gap-4 rr-reveal" style={{ animationDelay: "0.1s" }}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${T.red1}, ${T.red2})`, boxShadow: `0 8px 16px -6px ${T.red2}66` }}
            >
              <User size={26} className="text-white" />
            </div>
            <div>
              <h4 className="rr-display font-bold text-base mb-2" style={{ color: T.text }}>User Details</h4>
              <div className="space-y-1 text-sm" style={{ color: T.textDim }}>
                <p><strong style={{ color: T.text }}>Name:</strong> {user.name}</p>
                <p><strong style={{ color: T.text }}>Designation:</strong> {user.designation}</p>
                <p><strong style={{ color: T.text }}>User ID:</strong> {user.userid}</p>
              </div>
            </div>
          </div>

          <div className="rr-card p-5 flex items-start gap-4 rr-reveal" style={{ animationDelay: "0.15s" }}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${T.red1}, ${T.red2})`, boxShadow: `0 8px 16px -6px ${T.red2}66` }}
            >
              <ClipboardList size={26} className="text-white" />
            </div>
            <div>
              <h4 className="rr-display font-bold text-base mb-2" style={{ color: T.text }}>Assessment Details</h4>
              <div className="space-y-1 text-sm" style={{ color: T.textDim }}>
                <p><strong style={{ color: T.text }}>Name:</strong> {assessment.title}</p>
                <p><strong style={{ color: T.text }}>Total Questions:</strong> {questions?.length || 0}</p>
                <p><strong style={{ color: T.text }}>Date:</strong> {assessment.attempted_date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Score Summary */}
        <div className="rr-card p-6 rr-reveal" style={{ animationDelay: "0.2s" }}>
          <Ribbon icon={BarChart3} from={T.red1} to={T.red2}>Overall Score Summary</Ribbon>
          <CylinderChart data={overallBars} />
          <div className="flex justify-center gap-6 mt-2 flex-wrap">
            {overallBars.map((d) => (
              <div className="flex items-center gap-2" key={d.label}>
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: d.from }} />
                <span className="text-sm font-medium" style={{ color: T.textDim }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metric tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <MetricTile label="FACE" icon={Smile} value={assessment.overall?.face || 0} from={T.face1} to={T.face2} delay={0.3} />
          <MetricTile label="VOICE" icon={Mic} value={assessment.overall?.voice || 0} from={T.voice1} to={T.voice2} delay={0.38} />
          <MetricTile label="EMOTION" icon={Heart} value={assessment.overall?.emotion || 0} from={T.emo1} to={T.emo2} delay={0.46} />
        </div>

        {/* Question Wise Summary banner */}
        <Ribbon icon={ClipboardList} from={T.purple1} to={T.purple2} className="rr-reveal">
          Question Wise Summary
        </Ribbon>

        {questions && questions.length > 0 ? (
          questions.map((q, idx) => {
            const matchedKeywords = parseKeywords(q.word?.matched_keywords);
            const missingKeywords = parseKeywords(q.word?.missing_keywords);

            const faceData = [
              { name: "Confidence", y: q.face?.Confidence || 0, color: T.face1 },
              { name: "Attention", y: q.face?.Attention || 0, color: T.voice1 },
              { name: "Doubt", y: q.face?.Doubt || 0, color: T.emo1 },
              { name: "Anxiety", y: q.face?.Anxiety || 0, color: T.green },
            ];
            const voiceData = [
              { name: "Confidence", y: q.voice?.Confidence || 0, color: T.face1 },
              { name: "Attention", y: q.voice?.Attention || 0, color: T.voice1 },
              { name: "Doubt", y: q.voice?.Doubt || 0, color: T.emo1 },
              { name: "Anxiety", y: q.voice?.Anxiety || 0, color: T.green },
            ];
            const emotionData = [
              { name: "Happy", y: q.emotion?.Happy || 0, color: T.face1 },
              { name: "Neutral", y: q.emotion?.Neutral || 0, color: T.voice1 },
              { name: "Fear", y: q.emotion?.Fear || 0, color: T.emo1 },
              { name: "Confusion", y: q.emotion?.Confusion || 0, color: T.green },
            ];

            const videoUrl = q.video ? `${FILE_BASE_URL}/${q.video}` : null;

            return (
              <div key={idx} className="rr-card p-6 rr-reveal" style={{ animationDelay: `${0.08 * (idx % 4)}s` }}>
                {/* Question header */}
                <div
                  className="flex justify-between items-center rounded-2xl px-4 py-3 mb-5"
                  style={{ background: "#F4F6FB" }}
                >
                  <span className="font-semibold text-sm md:text-base" style={{ color: T.text }}>
                    Question {idx + 1}: {q.question}
                  </span>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    
                    {videoUrl && (
                      <button
                        onClick={() => setSelectedVideo(videoUrl)}
                        className="rr-video-btn rounded-full p-1"
                        style={{ color: T.red2 }}
                        title="Play video"
                      >
                        <Video size={20} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Donut charts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  {[
                    { title: "Face Expression Score", data: faceData, from: T.face1, to: T.face2 },
                    { title: "Voice Expression Score", data: voiceData, from: T.voice1, to: T.voice2 },
                    { title: "Emotion Expression Score", data: emotionData, from: T.emo1, to: T.emo2 },
                  ].map((block) => (
                    <div key={block.title} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
                      <div
                        className="text-center font-bold py-3 text-xs tracking-wide text-white uppercase rr-display"
                        style={{ background: `linear-gradient(100deg, ${block.from}, ${block.to})` }}
                      >
                        {block.title}
                      </div>
                      <div className="p-4 flex flex-col items-center">
                        {Highcharts && <HighchartsReact highcharts={Highcharts} options={getDonutOptions(block.data)} />}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 w-full">
                          {block.data.map((d) => (
                            <div className="flex items-center gap-2 text-xs" key={d.name}>
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                              <span className="font-medium" style={{ color: T.textDim }}>
                                {d.name}: {d.y?.toFixed(2) || 0}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Word Power Analysis */}
                <Ribbon icon={TypeIcon} from={T.purple1} to={T.purple2} className="!mb-4">
                  Word Power Analysis
                </Ribbon>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {[
                    { label: "Text Emotion", icon: MessageCircle, content: q.sentiment || "Neutral", color: T.green, capitalize: true },
                    { label: "Score", icon: Star, content: `${q.score}/70`, color: T.face1 },
                    { label: "Grammar Mistakes", icon: TypeIcon, content: q.grammar_mistakes, color: T.purple1 },
                    { label: "Total Words", icon: FileText, content: q.word?.total_words || 0, color: T.voice1 },
                    { label: "Unique Words", icon: BookOpen, content: q.word?.keyword_count || 0, color: T.emo1 },
                  ].map((card) => (
                    <div key={card.label} className="rr-chip rounded-2xl p-4 text-center" style={{ border: `1px solid ${T.border}` }}>
                      <div className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: T.textDim }}>
                        {card.label}
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                        style={{ background: `${card.color}1A` }}
                      >
                        <card.icon size={20} color={card.color} />
                      </div>
                      <p className={`font-bold text-base ${card.capitalize ? "capitalize" : ""}`} style={{ color: T.text }}>
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Answer Analysis */}
                <Ribbon icon={ClipboardCheck} from={T.teal1} to={T.teal2} className="!mb-4">
                  Answer Analysis
                </Ribbon>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="rounded-2xl p-4" style={{ background: T.greenBg + "55", border: `1px solid ${T.greenBg}` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 size={18} color={T.greenText} />
                      <h4 className="font-semibold" style={{ color: T.text }}>Matched Keywords</h4>
                      <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: T.greenText, color: "#fff" }}>
                        {matchedKeywords.length}
                      </span>
                    </div>
                    <KeywordChips items={matchedKeywords} bg={T.greenBg} color={T.greenText} border="#BBF7D0" />
                  </div>
                  <div className="rounded-2xl p-4" style={{ background: T.roseBg + "55", border: `1px solid ${T.roseBg}` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle size={18} color={T.roseText} />
                      <h4 className="font-semibold" style={{ color: T.text }}>Missing Keywords</h4>
                      <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: T.roseText, color: "#fff" }}>
                        {missingKeywords.length}
                      </span>
                    </div>
                    <KeywordChips items={missingKeywords} bg={T.roseBg} color={T.roseText} border="#FBCFE8" />
                  </div>
                </div>

                {/* Correctness */}
                <Ribbon icon={ClipboardCheck} from={T.indigo1} to={T.indigo2} className="!mb-4">
                  Correctness
                </Ribbon>
                <div className="rounded-2xl overflow-hidden mb-6" style={{ border: `1px solid ${T.border}` }}>
                  {[
                    { label: "Correctness", icon: CheckCircle2, color: T.greenText, value: q.correctness?.Correctness },
                    { label: "Understanding", icon: Lightbulb, color: T.purple1, value: q.correctness?.Understanding },
                    { label: "Depth & Clarity", icon: Target, color: T.face2, value: q.correctness?.["Depth and Clarity"] },
                    { label: "Explanation", icon: PenLine, color: T.roseText, value: q.correctness?.Explanation },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className="flex flex-wrap md:flex-nowrap"
                      style={{ background: i % 2 === 0 ? "#FAFBFF" : "#fff", borderTop: i > 0 ? `1px solid ${T.border}` : "none" }}
                    >
                      <div className="w-full md:w-56 shrink-0 flex items-center gap-2 px-5 py-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${row.color}1A` }}>
                          <row.icon size={16} color={row.color} />
                        </div>
                        <span className="font-semibold text-sm" style={{ color: T.text }}>{row.label}</span>
                      </div>
                      <div className="flex-1 px-5 py-4 text-sm leading-relaxed" style={{ color: T.textDim, borderLeft: `1px solid ${T.border}` }}>
                        {row.value || "Not evaluated"}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transcript */}
                {q.transcript && (
                  <>
                    <Ribbon icon={FileText} from={T.purple1} to={T.purple2} className="!mb-4">
                      Transcript
                    </Ribbon>
                    <div className="rounded-2xl p-5 text-sm leading-relaxed" style={{ background: "#F4F6FB", color: T.text }}>
                      {q.transcript}
                    </div>
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center" style={{ color: T.textDim }}>No questions found.</p>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: "rgba(20,20,30,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setSelectedVideo(null)}
        >
          <div className="rr-card p-4 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold rr-display" style={{ color: T.text }}>Video</h3>
              <button onClick={() => setSelectedVideo(null)} style={{ color: T.textDim }}>
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