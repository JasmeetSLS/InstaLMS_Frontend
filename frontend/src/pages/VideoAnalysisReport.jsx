import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  ArrowLeft,
  BarChart3,
  Smile,
  Mic,
  Heart,
  Laugh,
  SpellCheck,
  AlignLeft,
  Key,
  User,
  ListChecks,
  Video,
  X,
} from "lucide-react";
import api, { FILE_BASE_URL } from "../services/api";
import HighchartsReactOfficial from "highcharts-react-official";

// Use the global Highcharts from CDN
const Highcharts = window.Highcharts;
const HighchartsReact = HighchartsReactOfficial.default || HighchartsReactOfficial;

const VideoAnalysisReport = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // for video modal

  useEffect(() => {
    fetchReport();
  }, [userId]);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getVideoAnalysisReport(userId);
      if (response.success) {
        setReportData(response);
      } else {
        setError("Failed to load report");
      }
    } catch (err) {
      console.error("Error fetching report:", err);
      setError(err.message || "Failed to load report.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex justify-center items-center">
        <div className="text-lg font-medium">Loading report...</div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg mb-4">{error || "Report not found"}</p>
        <button
          onClick={() => navigate("/admin/video-analysis")}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Go Back to Users
        </button>
      </div>
    );
  }

  const { assessment, user, questions } = reportData;

  // Helper to parse keywords from JSON string
  const parseKeywords = (str) => {
    if (!str) return [];
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return str.split(",").map((s) => s.trim()).filter(Boolean);
    }
  };

  // Overall chart options
  const overallChartOptions = {
    chart: { type: "column", backgroundColor: "transparent" },
    title: { text: "" },
    credits: { enabled: false },
    exporting: { enabled: false },
    xAxis: { categories: ["Face", "Voice", "Emotion"] },
    yAxis: { min: 0, max: 100, title: { text: "Score (%)" } },
    legend: { enabled: false },
    plotOptions: {
      column: {
        pointWidth: 100,
        borderRadius: 6,
        borderWidth: 0,
        groupPadding: 0.15,
        pointPadding: 0.05,
      },
    },
    series: [
      {
        data: [
          { y: assessment.overall?.face || 0, color: "#F4C430" },
          { y: assessment.overall?.voice || 0, color: "#6B7280" },
          { y: assessment.overall?.emotion || 0, color: "#EF4444" },
        ],
        dataLabels: { enabled: true, format: "{y}%" },
      },
    ],
  };

  // Helper to build pie chart options
  const getPieOptions = (data) => ({
    chart: { type: "pie", backgroundColor: "transparent" },
    title: { text: "" },
    credits: { enabled: false },
    exporting: { enabled: false },
    tooltip: { pointFormat: "<b>{point.y}%</b>" },
    plotOptions: {
      pie: {
        innerSize: "0%",
        dataLabels: { enabled: false },
      },
    },
    series: [{ data }],
  });

  return (
    <div className="min-h-screen bg-red-50/40 py-6 px-4">
      <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Back Button */}
  <button
    onClick={() => navigate("/admin/video-analysis")}
    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
  >
    <ArrowLeft size={20} />
    <span className="text-sm font-medium">Back to Users</span>
  </button>

        {/* Page Title */}
        <section className="rounded-2xl border-2 border-red-600 bg-gradient-to-br from-white to-red-50 card-shadow px-6 py-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold gradient-text">
            Assessment Report
          </h2>
        </section>

        {/* User + Assessment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow p-6 hover-lift">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center red-gradient shadow-lg text-white">
              <User size={32} className="text-red-500" />
            </div>
            <h4 className="text-lg font-bold text-black-800 my-3">User Details</h4>
            <div className="text-black-700 space-y-1 text-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Designation:</strong> {user.designation}</p>
              <p><strong>UserID:</strong> {user.userid}</p>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow p-6 hover-lift">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center red-gradient shadow-lg text-white">
              <ListChecks size={32} className="text-red-500" />
            </div>
            <h4 className="text-lg font-bold text-black-800 my-3">Assessment Details</h4>
            <div className="text-black-700 space-y-1 text-sm">
              <p><strong>Name:</strong> {assessment.title}</p>
              <p><strong>Total Questions:</strong> {questions?.length || 0}</p>
              <p><strong>Date:</strong> {assessment.attempted_date}</p>
            </div>
          </div>
        </div>

        {/* Overall Score Summary */}
        <section className="rounded-2xl border-2 border-red-600 bg-gradient-to-br from-white to-red-50 card-shadow px-6 py-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold gradient-text">
            Overall Score Summary
          </h2>
        </section>

        {/* Overall Bar Chart */}
        <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow p-6">
          <HighchartsReact highcharts={Highcharts} options={overallChartOptions} />
          <div className="flex justify-center gap-6 mt-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#F4C430" }}></span>
              <span className="text-sm text-black-700 font-medium">Face</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#6B7280" }}></span>
              <span className="text-sm text-black-700 font-medium">Voice</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: "#EF4444" }}></span>
              <span className="text-sm text-black-700 font-medium">Emotion</span>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
            <div className="red-gradient bg-red-500 text-white text-center font-semibold py-3 text-2xl tracking-wide">FACE</div>
            <div className="grid grid-cols-2 items-center">
              <div className="h-36 bg-red-500 red-radial flex items-center justify-center text-white">
                <Smile size={48} className="text-white" />
              </div>
              <div className="flex items-center justify-center p-4">
                <div className="rounded-xl border-2 border-red-600 bg-red-50/60 text-red-600 font-bold px-5 py-3 text-xl">
                  {assessment.overall?.face?.toFixed(2) || "0.00"}%
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
            <div className="red-gradient bg-red-500 text-white text-center font-semibold py-3 text-2xl tracking-wide">VOICE</div>
            <div className="grid grid-cols-2 items-center">
              <div className="h-36 bg-red-500 red-radial flex items-center justify-center text-white">
                <Mic size={48} className="text-white" />
              </div>
              <div className="flex items-center justify-center p-4">
                <div className="rounded-xl border-2 border-red-600 bg-red-50/60 text-red-600 font-bold px-5 py-3 text-xl">
                  {assessment.overall?.voice?.toFixed(2) || "0.00"}%
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
            <div className="red-gradient bg-red-500 text-white text-center font-semibold py-3 text-2xl tracking-wide">EMOTION</div>
            <div className="grid grid-cols-2 items-center">
              <div className="h-36 bg-red-500 red-radial flex items-center justify-center text-white">
                <Heart size={48} className="text-white" />
              </div>
              <div className="flex items-center justify-center p-4">
                <div className="rounded-xl border-2 border-red-600 bg-red-50/60 text-red-600 font-bold px-5 py-3 text-xl">
                  {assessment.overall?.emotion?.toFixed(2) || "0.00"}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Question Wise Summary */}
        <section className="rounded-2xl border-2 border-red-600 bg-gradient-to-br from-white to-red-50 card-shadow px-6 py-6">
          <h2 className="text-center text-2xl md:text-3xl font-bold gradient-text">
            QUESTION WISE SUMMARY
          </h2>
        </section>

        {questions && questions.length > 0 ? (
          questions.map((q, idx) => {
            const matchedKeywords = parseKeywords(q.word?.matched_keywords);
            const missingKeywords = parseKeywords(q.word?.missing_keywords);

            // Pie data
            const faceData = [
              { name: "Confidence", y: q.face?.Confidence || 0, color: "#F4C430" },
              { name: "Attention", y: q.face?.Attention || 0, color: "#6B7280" },
              { name: "Doubt", y: q.face?.Doubt || 0, color: "#EF4444" },
              { name: "Anxiety", y: q.face?.Anxiety || 0, color: "#22C55E" },
            ];
            const voiceData = [
              { name: "Confidence", y: q.voice?.Confidence || 0, color: "#F4C430" },
              { name: "Attention", y: q.voice?.Attention || 0, color: "#6B7280" },
              { name: "Doubt", y: q.voice?.Doubt || 0, color: "#EF4444" },
              { name: "Anxiety", y: q.voice?.Anxiety || 0, color: "#22C55E" },
            ];
            const emotionData = [
              { name: "Happy", y: q.emotion?.Happy || 0, color: "#F4C430" },
              { name: "Neutral", y: q.emotion?.Neutral || 0, color: "#6B7280" },
              { name: "Fear", y: q.emotion?.Fear || 0, color: "#EF4444" },
              { name: "Confusion", y: q.emotion?.Confusion || 0, color: "#22C55E" },
            ];

            // Build full video URL
            const videoUrl = q.video ? `${FILE_BASE_URL}/${q.video}` : null;

            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-red-600 bg-white card-shadow p-6"
              >
                {/* Question header */}
               <div className="flex justify-between items-center bg-red-50 rounded-lg px-4 py-3 mb-5">
  <span className="font-semibold text-black-800 text-sm md:text-base">
    Question {idx + 1}: {q.question}
  </span>
  {videoUrl && (
    <button
      onClick={() => setSelectedVideo(videoUrl)}
      className="text-red-600 hover:text-red-800 transition"
      title="Play video"
    >
      <Video size={20} />
    </button>
  )}
</div>

                {/* Pie charts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  {/* Face */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient text-white text-center font-semibold py-3 text-sm">
                      FACE EXPRESSION SCORE
                    </div>
                    <div className="p-4 flex flex-col items-center">
                      <HighchartsReact highcharts={Highcharts} options={getPieOptions(faceData)} />
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full max-w-[320px]">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#F4C430" }}></span>
                          <span className="text-black-700 font-medium">Confidence : {q.face?.Confidence?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#6B7280" }}></span>
                          <span className="text-black-700 font-medium">Attention : {q.face?.Attention?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }}></span>
                          <span className="text-black-700 font-medium">Doubt : {q.face?.Doubt?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#22C55E" }}></span>
                          <span className="text-black-700 font-medium">Anxiety : {q.face?.Anxiety?.toFixed(2) || 0}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Voice */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient text-white text-center font-semibold py-3 text-sm">
                      VOICE EXPRESSION SCORE
                    </div>
                    <div className="p-4 flex flex-col items-center">
                      <HighchartsReact highcharts={Highcharts} options={getPieOptions(voiceData)} />
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full max-w-[320px]">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#F4C430" }}></span>
                          <span className="text-black-700 font-medium">Confidence : {q.voice?.Confidence?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#6B7280" }}></span>
                          <span className="text-black-700 font-medium">Attention : {q.voice?.Attention?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }}></span>
                          <span className="text-black-700 font-medium">Doubt : {q.voice?.Doubt?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#22C55E" }}></span>
                          <span className="text-black-700 font-medium">Anxiety : {q.voice?.Anxiety?.toFixed(2) || 0}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emotion */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient text-white text-center font-semibold py-3 text-sm">
                      EMOTION EXPRESSION SCORE
                    </div>
                    <div className="p-4 flex flex-col items-center">
                      <HighchartsReact highcharts={Highcharts} options={getPieOptions(emotionData)} />
                      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-4 w-full max-w-[320px]">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#F4C430" }}></span>
                          <span className="text-black-700 font-medium">Happy : {q.emotion?.Happy?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#6B7280" }}></span>
                          <span className="text-black-700 font-medium">Neutral : {q.emotion?.Neutral?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#EF4444" }}></span>
                          <span className="text-black-700 font-medium">Fear : {q.emotion?.Fear?.toFixed(2) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="w-3 h-3 rounded-full" style={{ background: "#22C55E" }}></span>
                          <span className="text-black-700 font-medium">Confusion : {q.emotion?.Confusion?.toFixed(2) || 0}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Word Power Analysis */}
                <div className="rounded-2xl border-2 border-red-600 overflow-hidden mb-4">
                  <div className="red-gradient text-white text-center font-bold py-3 tracking-wide">
                    WORD POWER ANALYSIS
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {/* Text Emotion */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient bg-red-500 text-white text-center font-semibold py-2 text-xs tracking-wider uppercase">
                      Text Emotion
                    </div>
                    <div className="p-0">
                      <div className="h-32 overflow-hidden flex">
                        <div className="w-[38%] bg-red-500 red-radial flex items-center justify-center text-white">
                          <Laugh size={40} className="text-white" />
                        </div>
                        <div className="w-[62%] flex items-center justify-center bg-white border-l border-red-100">
                          <p className="font-bold text-xl text-black capitalize">{q.sentiment || "Neutral"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient bg-red-500 text-white text-center font-semibold py-2 text-xs tracking-wider uppercase">
                      Score
                    </div>
                    <div className="p-0">
                      <div className="h-32 overflow-hidden flex">
                        <div className="w-[38%] bg-red-500 red-radial flex items-center justify-center text-white">
                          <BarChart3 size={40} className="text-white" />
                        </div>
                        <div className="w-[62%] flex items-center justify-center bg-white border-l border-red-100">
                          <p className="font-bold text-xl text-black">{q.score}/{70}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Grammar Mistakes */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient bg-red-500 text-white text-center font-semibold py-2 text-xs tracking-wider uppercase">
                      Grammar Mistakes
                    </div>
                    <div className="p-0">
                      <div className="h-32 overflow-hidden flex">
                        <div className="w-[38%] bg-red-500 red-radial flex items-center justify-center text-white">
                          <SpellCheck size={40} className="text-white" />
                        </div>
                        <div className="w-[62%] flex items-center justify-center bg-white border-l border-red-100">
                          <p className="font-bold text-xl text-black">{q.grammar_mistakes}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Words */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient bg-red-500 text-white text-center font-semibold py-2 text-xs tracking-wider uppercase">
                      Total Words
                    </div>
                    <div className="p-0">
                      <div className="h-32 overflow-hidden flex">
                        <div className="w-[38%] bg-red-500 red-radial flex items-center justify-center text-white">
                          <AlignLeft size={40} className="text-white" />
                        </div>
                        <div className="w-[62%] flex items-center justify-center bg-white border-l border-red-100">
                          <p className="font-bold text-xl text-black">{q.word?.total_words || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Keywords */}
                  <div className="rounded-2xl border-2 border-red-600 bg-white card-shadow overflow-hidden">
                    <div className="red-gradient bg-red-500 text-white text-center font-semibold py-2 text-xs tracking-wider uppercase">
                      Match Keywords
                    </div>
                    <div className="p-0">
                      <div className="h-32 overflow-hidden flex">
                        <div className="w-[38%] bg-red-500 red-radial flex items-center justify-center text-white">
                          <Key size={40} className="text-white" />
                        </div>
                        <div className="w-[62%] flex items-center justify-center bg-white border-l border-red-100">
                          <p className="font-bold text-xl text-black">{q.word?.keyword_count || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Answer Analysis */}
                <div className="bg-white rounded-2xl border-2 border-red-600 p-5 mb-6 card-shadow">
                  <h3 className="text-center text-lg font-semibold text-black-800 mb-4 pb-2 border-b border-gray-200">
                    Answer Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Matched */}
                    <div className="rounded-xl border-l-4 border-green-500 bg-gradient-to-br from-green-50 to-green-50/60 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">✅</span>
                        <h4 className="font-semibold text-black-800">Matched Keywords</h4>
                        <span className="ml-auto bg-green-200 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                          {matchedKeywords.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {matchedKeywords.length > 0 ? (
                          matchedKeywords.map((kw, i) => (
                            <span
                              key={i}
                              className="bg-green-100 text-green-800 border border-green-200 text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {kw}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No matched keywords</span>
                        )}
                      </div>
                    </div>
                    {/* Missing */}
                    <div className="rounded-xl border-l-4 border-red-500 bg-gradient-to-br from-red-50 to-red-50/60 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">❌</span>
                        <h4 className="font-semibold text-black-800">Missing Keywords</h4>
                        <span className="ml-auto bg-red-200 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
                          {missingKeywords.length}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {missingKeywords.length > 0 ? (
                          missingKeywords.map((kw, i) => (
                            <span
                              key={i}
                              className="bg-red-100 text-red-800 border border-red-200 text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {kw}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">No missing keywords</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Correctness Table */}
                <div className="rounded-2xl overflow-hidden border-2 border-red-600 card-shadow mb-6">
                  <div className="red-gradient bg-red-500 text-white text-center font-bold py-3 tracking-wide">CORRECTNESS</div>
                  <div>
                    <div className="flex flex-wrap border-b border-red-100 bg-white">
                      <div className="w-full md:w-1/4 bg-red-50 text-red-600 font-bold px-5 py-4 flex items-center justify-center text-center">
                        Correctness
                      </div>
                      <div className="w-full md:w-3/4 text-black px-5 py-4 leading-relaxed text-sm font-medium">
                        {q.correctness?.Correctness || "Not evaluated"}
                      </div>
                    </div>
                    <div className="flex flex-wrap border-b border-red-100 bg-red-50/60">
                      <div className="w-full md:w-1/4 bg-red-50 text-red-600 font-bold px-5 py-4 flex items-center justify-center text-center">
                        Understanding
                      </div>
                      <div className="w-full md:w-3/4 text-black px-5 py-4 leading-relaxed text-sm font-medium">
                        {q.correctness?.Understanding || "Not evaluated"}
                      </div>
                    </div>
                    <div className="flex flex-wrap border-b border-red-100 bg-white">
                      <div className="w-full md:w-1/4 bg-red-50 text-red-600 font-bold px-5 py-4 flex items-center justify-center text-center">
                        Depth & Clarity
                      </div>
                      <div className="w-full md:w-3/4 text-black px-5 py-4 leading-relaxed text-sm font-medium">
                        {q.correctness?.["Depth and Clarity"] || "Not evaluated"}
                      </div>
                    </div>
                    <div className="flex flex-wrap bg-white">
                      <div className="w-full md:w-1/4 bg-red-50 text-red-600 font-bold px-5 py-4 flex items-center justify-center text-center">
                        Explanation
                      </div>
                      <div className="w-full md:w-3/4 text-black px-5 py-4 leading-relaxed text-sm font-medium">
                        {q.correctness?.Explanation || "Not evaluated"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transcript */}
                {q.transcript && (
                  <div className="rounded-2xl overflow-hidden border-2 border-red-600 card-shadow">
                    <div className="red-gradient bg-red-500 text-white text-center font-bold py-3 tracking-wide">Transcript</div>
                    <div className="bg-red-50/40 p-5 text-black leading-relaxed text-sm font-bold">
                      {q.transcript}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No questions found.</p>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-white rounded-lg p-4 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Video</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <video src={selectedVideo} controls className="w-full rounded" autoPlay />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysisReport;