import React, { useState, useEffect } from "react";
import HighchartsReactOfficial from "highcharts-react-official";
import api from "../services/api"; // Adjust the import path to your actual api.js file

// Use the global Highcharts from CDN
const Highcharts = window.Highcharts;
const HighchartsReact = HighchartsReactOfficial.default || HighchartsReactOfficial;

import "./PerformanceAnalytics.css";
import {
  FaMapMarkedAlt, FaMapMarkerAlt, FaUserPlus, FaUserCheck, FaUserSlash,
  FaTimesCircle, FaCheckCircle, FaBook
} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import IndiaMap from "../assets/india_green.png";
import Leaderboard_BG from "../assets/Leaderboard_BG.png";
import PodiumCenter from "../assets/L_Gold.png";
import PodiumLeft from "../assets/L_Silver.png";
import PodiumRight from "../assets/L_Bronze.png";
import {
  UsersIcon,
  BookOpenIcon,
  MapPinIcon,
} from "@animateicons/react/lucide";

import Image_1 from "../assets/Image_1.png";
import Image_2 from "../assets/Image_2.png";
import Image_3 from "../assets/Image_3.png";
import Image_4 from "../assets/Image_4.png";

import f1 from "../assets/Picture40.png";
import f2 from "../assets/Picture28.png";
import f3 from "../assets/Picture29.png";
import h1 from "../assets/Picture30.png";
import h2 from "../assets/Picture31.png";
import h3 from "../assets/Picture32.png";
import m1 from "../assets/Picture33.png";
import m2 from "../assets/Picture34.png";
import m3 from "../assets/Picture35.png";
import e1 from "../assets/Picture36.png";
import e2 from "../assets/Picture37.png";
import e3 from "../assets/Picture38.png";
import s1 from "../assets/Picture16.png";
import s2 from "../assets/Picture17.png";
import s3 from "../assets/Picture18.png";
import s4 from "../assets/Picture19.png";
import s5 from "../assets/Picture20.png";
import s6 from "../assets/Picture21.png";
import s7 from "../assets/Picture22.png";
import s8 from "../assets/Picture23.png";
import s9 from "../assets/Picture24.png";
import s10 from "../assets/Picture25.png";

const YELLOW = "#f4ae3d";

const carouselImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
];

// ================= STATIC DATA FOR MAP & HEATMAP (keep as is) =================
const roleUsageHierarchy = { /* ... unchanged ... */ };
const regionCityData = { /* ... unchanged ... */ };
const tableData = [ /* ... unchanged ... */ ];
const assessmentData = [ /* ... unchanged ... */ ];

// ================= DONUT CHART COMPONENT =================
const DonutChart = ({ title, value, total, percentage, color = "#f97316" }) => {
  // Use the exact percentage from API – NO CALCULATION
  const finalPercentage = Math.round(percentage);

  const options = {
    chart: { type: "pie", backgroundColor: "transparent", height: 140 },
    accessibility: { enabled: false },
    credits: { enabled: false },
    title: { text: null },
    tooltip: { enabled: false },
    plotOptions: { pie: { innerSize: "72%", borderWidth: 0, dataLabels: { enabled: false } } },
    series: [{ data: [{ y: finalPercentage, color: color }, { y: 100 - finalPercentage, color: "#ececec" }] }],
  };

  return (
    <div className="bg-white rounded-md p-3 flex flex-col items-center h-[210px] shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      <div className="text-sm font-bold text-center mb-1">{title}</div>
      <div className="relative w-full">
        <HighchartsReact highcharts={Highcharts} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{finalPercentage}%</span>
        </div>
      </div>
      <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
        <div className="h-2 rounded-full" style={{ width: `${finalPercentage}%`, backgroundColor: color }} />
      </div>
      <div className="text-black mb-2 text-sm font-bold text-center">
        {value} / {total}
      </div>
    </div>
  );
};

// ================= MAIN DASHBOARD =================
const PerformanceAnalytics = () => {
  // ---------- Filter States ----------
  const [selectedRegion, setSelectedRegion] = useState("Regions");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedDealership, setSelectedDealership] = useState("All Dealerships");
  const [dropdowns, setDropdowns] = useState({ zones: [], dealership: [], roles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- API Data States ----------
  const [userStats, setUserStats] = useState({
    totals: { total: 0, active: 0, inactive: 0, new_users: 0 },
    by_role: []
  });
  const [courseStats, setCourseStats] = useState({
    totals: { total_courses: 0, completed_courses: 0, pending_courses: 0 },
    by_category: []
  });
  const [mediaStats, setMediaStats] = useState({ total_media: 0, by_type: [] });
  const [leaderboard, setLeaderboard] = useState({
    fastest_course_completion: [],
    highest_quiz_scores: [],
    most_quizzes_completed: [],
    highest_engagement: []
  });
  const [learningProgress, setLearningProgress] = useState({
    mycourse: { total_courses_available: 0, avg_completion_percentage: 0, users_fully_completed: 0 },
    mycourse_certified: { total_courses_available: 0, avg_completion_percentage: 0, users_fully_completed: 0 },
    quiz: { total_quizzes_available: 0, avg_completion_percentage: 0, users_fully_completed_quizzes: 0 },
    quiz_score: { quizzes_average_total_score: "0", avg_score_percentage: 0, users_quiz_average__score: "0" },
    assessment_breakup: []
  });

  // ---------- UI States ----------
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("total");
  const [selectedCourseMetric, setSelectedCourseMetric] = useState("total");
  const [selectedUsageRegion, setSelectedUsageRegion] = useState("All");
  const [selectedUsageCity, setSelectedUsageCity] = useState("All");
  const [selectedContentRole, setSelectedContentRole] = useState("All");
  const [activeUsageTab, setActiveUsageTab] = useState("all");
  const [selectedMapRegion, setSelectedMapRegion] = useState("all");
  const [selectedMapRole, setSelectedMapRole] = useState("all");
  const [currentImage1, setCurrentImage1] = useState(0);

  // ================= Fetch Dropdowns & Data on Filter Change =================
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const params = {};
        if (selectedRegion && selectedRegion !== "Regions") params.zone = selectedRegion;
        const res = await api.getDashboardDropdowns(params);
        if (res.success) {
          setDropdowns(res.dropdowns);
          // Reset dealership if current selection not in list
          if (selectedDealership !== "All Dealerships" && !res.dropdowns.dealership.includes(selectedDealership)) {
            setSelectedDealership("All Dealerships");
          }
          // Reset role if current not in list
          if (selectedRole !== "All" && !res.dropdowns.roles.includes(selectedRole)) {
            setSelectedRole("All");
          }
        }
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };
    fetchDropdowns();
  }, [selectedRegion]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (selectedRegion && selectedRegion !== "Regions") params.zone = selectedRegion;
        if (selectedDealership && selectedDealership !== "All Dealerships") params.dealer = selectedDealership;
        if (selectedRole && selectedRole !== "All") params.role = selectedRole;

        const [statsRes, leaderboardRes, learningRes] = await Promise.all([
          api.getDashboardStats(params),
          api.getDashboardLeaderboard(params),
          api.getDashboardLearningProgress(params)
        ]);

        if (statsRes.success) {
          setUserStats(statsRes.data.users);
          setCourseStats(statsRes.data.courses);
          setMediaStats(statsRes.data.media);
        }
        if (leaderboardRes.success) setLeaderboard(leaderboardRes.data);
        if (learningRes.success) setLearningProgress(learningRes.data);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [selectedRegion, selectedDealership, selectedRole]);

  // ================= Helper Functions for Dynamic Data =================
  const getCurrentRoleData = () => {
    const metric = selectedMetric;
    return userStats.by_role.map(role => ({
      name: role.role,
      y: metric === "total" ? role.total : metric === "active" ? role.active : metric === "inactive" ? role.inactive : role.new_users
    }));
  };

  const getCurrentCourseData = () => {
    const metric = selectedCourseMetric;
    return courseStats.by_category.map(cat => ({
      name: cat.category_name,
      y: metric === "total" ? cat.total : metric === "completed" ? cat.completed : cat.pending
    }));
  };

  const getTotalUsers = () => userStats.totals.total;
  const getActiveUsers = () => userStats.totals.active;
  const getInactiveUsers = () => userStats.totals.inactive;
  const getNewUsers = () => userStats.totals.new_users;

  // Leaderboard tabs mapping
  const leaderboardTabs = [
    { title: "Fastest Task Completion", data: leaderboard.fastest_course_completion, image: Image_1 },
    { title: "Highest Scores", data: leaderboard.highest_quiz_scores, image: Image_2 },
    { title: "Maximum Certificates", data: leaderboard.most_quizzes_completed, image: Image_3 },
    { title: "Highest Engagement on LMS", data: leaderboard.highest_engagement, image: Image_4 }
  ];

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage1((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Donut cards data from learningProgress API
const donutCards = [
  {
    title: "Learning Path",
    percentage: learningProgress.mycourse.avg_completion_percentage,
    value: learningProgress.mycourse.users_fully_completed,
    total: learningProgress.mycourse.total_courses_available,
    color: "#f97316"
  },
  {
    title: "Certificates",
    percentage: learningProgress.mycourse_certified.avg_completion_percentage,
    value: learningProgress.mycourse_certified.users_fully_completed,
    total: learningProgress.mycourse_certified.total_courses_available,
    color: "#10b981"
  },
  {
    title: "Assessment",
    percentage: learningProgress.quiz.avg_completion_percentage,
    value: learningProgress.quiz.users_fully_completed_quizzes,
    total: learningProgress.quiz.total_quizzes_available,
    color: "#3b82f6"
  },
  {
    title: "Score",
    percentage: learningProgress.quiz_score.avg_score_percentage,
    value: parseFloat(learningProgress.quiz_score.users_quiz_average__score),
    total: parseFloat(learningProgress.quiz_score.quizzes_average_total_score),
    color: "#8b5cf6"
  }
];
  // User stat cards
const userStatCards = [
  { 
    key: "total", label: "Total Users", value: getTotalUsers(), 
    icon: UsersIcon, bgFrom: "from-orange-400", bgTo: "to-orange-600", 
    borderColor: "border-orange-400" 
  },
  { 
    key: "active", label: "Active Users", value: getActiveUsers(), 
    icon: FaUserCheck, bgFrom: "from-emerald-400", bgTo: "to-teal-500", 
    borderColor: "border-emerald-400" 
  },
  { 
    key: "new", label: "New Users", value: getNewUsers(), 
    icon: FaUserPlus, bgFrom: "from-blue-400", bgTo: "to-cyan-500", 
    borderColor: "border-blue-400" 
  },
  { 
    key: "inactive", label: "Inactive Users", value: getInactiveUsers(), 
    icon: FaUserSlash, bgFrom: "from-red-400", bgTo: "to-red-500", 
    borderColor: "border-red-400" 
  }
];

  const courseStatCards = [
    { key: "total", label: "Total Courses", value: courseStats.totals.total_courses, icon: FaBook, bgFrom: "from-orange-400", bgTo: "to-orange-600" },
    { key: "completed", label: "Completed Courses", value: courseStats.totals.completed_courses, icon: FaCheckCircle, bgFrom: "from-emerald-400", bgTo: "to-teal-500" },
    { key: "pending", label: "Pending Courses", value: courseStats.totals.pending_courses, icon: FaTimesCircle, bgFrom: "from-red-400", bgTo: "to-red-500" }
  ];

  // Content type data from mediaStats
  const contentData = mediaStats.by_type.map(item => ({ type: item.media_type, count: item.count }));
  const totalContent = mediaStats.total_media;

  // ================= INDIA HEAT MAP OPTIONS (unchanged, static) =================
  const getFilteredMapData = () => {
    let filteredData = [...tableData];
    if (selectedMapRegion !== "all") filteredData = filteredData.filter(item => item.zone === selectedMapRegion);
    return filteredData.map((item) => {
      const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
      let totalUsage = 0;
      if (selectedMapRole === "all") {
        roles.forEach(role => { totalUsage += item[activeUsageTab][role]; });
      } else {
        totalUsage = item[activeUsageTab][selectedMapRole];
      }
      return [item.code, totalUsage];
    });
  };

  const indiaHeatMapOptions = {
    chart: { map: window.Highcharts.maps['countries/in/in-all'], backgroundColor: "transparent", height: 500 },
    accessibility: { enabled: false },
    title: { text: null },
    credits: { enabled: false },
    mapNavigation: { enabled: false },
    colorAxis: {
      min: 0,
      max: Math.max(...getFilteredMapData().map(d => d[1]), 100),
      stops: [[0, "#fff7ed"], [0.15, "#ffedd5"], [0.3, "#fed7aa"], [0.5, "#fdba74"], [0.7, "#f97316"], [0.85, "#ea580c"], [1, "#c2410c"]]
    },
    tooltip: { /* ... same as original ... */ },
    series: [{ name: "Usage", joinBy: "hc-key", borderWidth: 1, borderColor: "#ffffff", nullColor: "#f5f5f5", data: getFilteredMapData() }]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-orange-500 text-white rounded-md">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-6 py-10">
      {/* ================= FILTERS SECTION ================= */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex gap-4">
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-5 py-2.5 pr-10 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer"
            >
              <option value="Regions">All India</option>
              {dropdowns.zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
            </select>
          </div>
          <div className="relative">
            <select
              value={selectedDealership}
              onChange={(e) => setSelectedDealership(e.target.value)}
              className="px-5 py-2.5 pr-10 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer"
            >
              <option value="All Dealerships">All Dealerships</option>
              {dropdowns.dealership.map(dealer => <option key={dealer} value={dealer}>{dealer}</option>)}
            </select>
          </div>
          <div className="relative">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-5 py-2.5 pr-10 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer"
            >
              <option value="All">All Role Holders</option>
              {dropdowns.roles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ================= ROW 1: USER STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {userStatCards.map((card) => {
          let IconComponent = card.icon;
          return (
          <div 
  key={card.key} 
  className={`stats-card bg-white/90 backdrop-blur-sm rounded-xl border-l-4 ${card.borderColor} p-2 shadow-sm`}
>
              <div className="flex items-center justify-between mb-1">
                <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${card.bgFrom} ${card.bgTo} flex items-center justify-center shadow-sm`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-[18px] font-medium">{card.label}</p>
              <p className="text-xl font-black leading-tight">{card.value.toLocaleString()}</p>
            </div>
          );
        })}
      </div>

      {/* ================= ROW 2: THREE ANALYTICS GRAPHS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* USER ANALYTICS */}
        <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3">
          <h2 className="text-sm font-bold text-gray-800 mb-2">User Analytics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mb-3">
            {userStatCards.map((card) => (
              <div
                key={card.key}
                onClick={() => setSelectedMetric(card.key)}
                className={`flex flex-col items-center justify-center p-1 rounded border shadow-sm cursor-pointer transition-all hover:scale-[1.01] text-center ${selectedMetric === card.key ? "border-blue-500 ring-1 ring-blue-200" : "border-black"}`}
              >
                <div className={`h-5 w-5 rounded-md bg-gradient-to-br ${card.bgFrom} ${card.bgTo} flex items-center justify-center shadow-sm mb-0.5`}>
                  <card.icon className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="text-[9px] font-medium text-gray-600">{card.label}</div>
                <div className="text-sm font-black text-gray-800">{card.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  ...{
                    chart: { type: "pie", backgroundColor: "transparent", height: 250 },
                    accessibility: { enabled: false },
                    credits: { enabled: false },
                    title: { text: null },
                    plotOptions: { pie: { innerSize: 70, dataLabels: { enabled: false } } },
                    series: [{ name: "Users", data: getCurrentRoleData() }]
                  }
                }}
              />
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-600 text-white"><th className="p-1 text-center">S.No</th><th className="p-1 text-left">Role</th><th className="p-1 text-center">Count</th></tr>
                </thead>
                <tbody>
                  {getCurrentRoleData().map((role, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-1 text-center font-medium">{i + 1}</td>
                      <td className="p-1 font-medium">{role.name}</td>
                      <td className="p-1 text-center font-bold">{role.y.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COURSE ANALYTICS */}
        <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3">
          <h2 className="text-sm font-bold text-gray-800 mb-2">Course Analytics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 mb-3">
            {courseStatCards.map((card) => (
              <div
                key={card.key}
                onClick={() => setSelectedCourseMetric(card.key)}
                className={`flex flex-col items-center justify-center p-1 rounded border shadow-sm cursor-pointer transition-all hover:scale-[1.01] text-center ${selectedCourseMetric === card.key ? "border-blue-500 ring-1 ring-blue-200" : "border-black"}`}
              >
                <div className={`h-5 w-5 rounded-md bg-gradient-to-br ${card.bgFrom} ${card.bgTo} flex items-center justify-center shadow-sm mb-0.5`}>
                  <card.icon className="h-2.5 w-2.5 text-white" />
                </div>
                <div className="text-[9px] font-medium text-gray-600">{card.label}</div>
                <div className="text-sm font-black text-gray-800">{card.value}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            <div>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: { type: "pie", backgroundColor: "transparent", height: 250 },
                  accessibility: { enabled: false },
                  credits: { enabled: false },
                  title: { text: null },
                  plotOptions: { pie: { innerSize: 70, dataLabels: { enabled: false } } },
                  series: [{ name: "Courses", data: getCurrentCourseData() }]
                }}
              />
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-[10px] border-collapse">
                <thead><tr className="bg-gray-600 text-white"><th className="p-1 text-center">S.No</th><th className="p-1 text-left">Category</th><th className="p-1 text-center">Count</th></tr></thead>
                <tbody>
                  {getCurrentCourseData().map((cat, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-1 text-center font-medium">{i + 1}</td>
                      <td className="p-1 font-medium">{cat.name}</td>
                      <td className="p-1 text-center font-bold">{cat.y}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CONTENT TYPE */}
        <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3">
          <h2 className="text-sm font-bold text-gray-800 mb-2">Content Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-stretch">
            <div className="flex flex-col justify-center items-center text-center py-2">
              <div className="text-[12px] font-bold text-gray-700">Total Content</div>
              <div className="text-2xl font-black text-[#f97316]">{totalContent}</div>
            </div>
            <div className="md:col-span-2 h-[180px] flex items-center justify-center">
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: { type: "pie", backgroundColor: "transparent", height: 180, options3d: { enabled: true, alpha: 45 } },
                  accessibility: { enabled: false },
                  credits: { enabled: false },
                  title: { text: null },
                  plotOptions: { pie: { innerSize: 70, depth: 45, dataLabels: { enabled: false } } },
                  series: [{ name: "Content", data: contentData.map(item => ({ name: item.type, y: item.count })) }]
                }}
              />
            </div>
          </div>
          <div className="mt-2 overflow-hidden">
            <table className="w-full text-[10px] border-collapse">
              <thead><tr className="bg-gray-600 text-white"><th className="p-1 text-center">S.No</th><th className="p-1 text-left">Type</th><th className="p-1 text-center">Count</th></tr></thead>
              <tbody>
                {contentData.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-1 text-center">{i + 1}</td>
                    <td className="p-1 font-medium">{item.type}</td>
                    <td className="p-1 text-center font-bold text-[#f97316]">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

{/* ================= LEADERBOARD ================= */}
<div className="mb-3"><h2 className="text-2xl font-bold">LeaderBoard</h2></div>
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-4 items-stretch">
  
{/* LEFT SIDE: Tabs + Podium for Top 3 */}
<div className="flex flex-col h-full gap-2">
  {/* Tab buttons */}
  <div className="grid grid-cols-4 gap-2">
    {leaderboardTabs.map((tab, i) => (
      <div
        key={i}
        onClick={() => setActiveTab(i)}
        className={`cursor-pointer rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-2 text-center text-[11px] font-semibold transition ${
          activeTab === i ? "bg-[#f97316] text-white" : "bg-white hover:bg-gray-100"
        }`}
      >
        {tab.title}
      </div>
    ))}
  </div>

  {/* Podium area with background image */}
  <div
    className="relative flex-1 max-h-[540px] rounded-md overflow-hidden shadow-md bg-cover bg-center"
    style={{ backgroundImage: `url(${Leaderboard_BG})` }}
  >
    <div className="relative z-10 h-full flex items-end justify-center gap-4 px-4 pt-4 pb-0">
      {/* 2nd Place (Left) */}
      <div className="w-1/3 flex flex-col items-center relative">
        <img
          src={PodiumLeft}
          alt="2nd place podium"
          className="w-full h-[270px] object-contain"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5">
          <img
            src={leaderboardTabs[activeTab].data[1]?.photo || "/default-avatar.png"}
            alt={leaderboardTabs[activeTab].data[1]?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-7"
          />
          <div className="text-center drop-shadow-md text-xs mb-5">
            <div className="font-bold max-w-[90px]">{leaderboardTabs[activeTab].data[1]?.name}</div>
            <div className="text-[#302f2f] opacity-90 font-bold">{leaderboardTabs[activeTab].data[1]?.role}</div>
          </div>
        </div>
      </div>

      {/* 1st Place (Center) */}
      <div className="w-1/3 flex flex-col items-center relative -mt-15">
        <img
          src={PodiumCenter}
          alt="1st place podium"
          className="w-full h-[300px] object-contain"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-7">
          <img
             src={leaderboardTabs[activeTab].data[0]?.photo || "/default-avatar.png"}
            alt={leaderboardTabs[activeTab].data[0]?.name}
           className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-10"
          />
          <div className="text-center drop-shadow-md text-xs mb-5">
            <div className="font-bold  max-w-[110px]">{leaderboardTabs[activeTab].data[0]?.name}</div>
            <div className="text-[#302f2f] opacity-90 font-bold">{leaderboardTabs[activeTab].data[0]?.role}</div>
          </div>
        </div>
      </div>

      {/* 3rd Place (Right) */}
      <div className="w-1/3 flex flex-col items-center relative">
        <img
          src={PodiumRight}
          alt="3rd place podium"
          className="w-full h-[270px] object-contain"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-5">
          <img
           src={leaderboardTabs[activeTab].data[2]?.photo || "/default-avatar.png"}
            alt={leaderboardTabs[activeTab].data[2]?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-7"
          />
          <div className="text-center drop-shadow-md text-xs mb-5">
            <div className="font-bold  max-w-[90px]">{leaderboardTabs[activeTab].data[2]?.name}</div>
            <div className="opacity-90 text-[#302f2f] font-bold">{leaderboardTabs[activeTab].data[2]?.role}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  {/* RIGHT SIDE: Full leaderboard table */}
  <div className="bg-white rounded-md shadow-md h-full flex flex-col overflow-hidden">
    <div className="px-6 py-3 border-b border-[#eeeeee]">
      <h2 className="text-lg font-bold">{leaderboardTabs[activeTab].title} - All Performers</h2>
    </div>
    <div className="h-[280px] overflow-y-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="border-b border-[#eeeeee]">
            <th className="px-6 py-2 text-left">Rank</th>
            <th className="px-6 py-2 text-left">Name</th>
            <th className="px-6 py-2 text-left">Photo</th>
            <th className="px-6 py-2 text-left">Role</th>
            <th className="px-6 py-2 text-center">Dealership</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardTabs[activeTab].data.map((user, idx) => (
            <tr key={idx} className="border-b border-[#eeeeee] last:border-none hover:bg-gray-50">
              <td className="px-6 py-3">{idx + 1}</td>
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">
                 <img src={user.photo || "/default-avatar.png"} alt={user.name}  className="w-10 h-10 border rounded-full object-cover" />
              </td>
              <td className="px-6 py-3">{user.role}</td>
              <td className="px-6 py-3 text-center">{user.dealership}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

      {/* ================= LEARNING PROGRESS ================= */}
      <div className="mb-3"><h2 className="text-2xl font-bold">Learning Progress</h2></div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
        <div className="xl:col-span-2">
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  {donutCards.map((card, i) => (
    <DonutChart
      key={i}
      title={card.title}
      percentage={card.percentage}
      value={card.value}
      total={card.total}
      color={card.color}
    />
  ))}
</div>
        </div>
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 h-[210px] overflow-auto">
  <h2 className="text-base font-bold text-gray-800 mb-3">Assessment Score Breakup</h2>
  
  {learningProgress.assessment_breakup && learningProgress.assessment_breakup.length > 0 ? (
    <table className="w-full table-auto border-collapse text-[10px]">
      <thead>
        <tr className="bg-gray-600 text-white uppercase font-semibold">
          <th className="px-2 py-2">Categories</th>
          {Object.keys(learningProgress.assessment_breakup[0])
            .filter(key => key !== 'category_name' && key !== 'average')
            .map((assessmentName, idx) => (
              <th key={idx} className="px-2 py-2 text-center">
                {/* Optional: shorten long names, keep original in title */}
                <span title={assessmentName}>
                  {assessmentName.length > 20 ? assessmentName.substring(0, 18) + '…' : assessmentName}
                </span>
              </th>
            ))
          }
          <th className="px-2 py-2 text-center">Avg (%)</th>
        </tr>
      </thead>
      <tbody>
        {learningProgress.assessment_breakup.map((row, rowIdx) => {
          const assessmentEntries = Object.entries(row).filter(
            ([key]) => key !== 'category_name' && key !== 'average'
          );
          return (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-2 py-2 font-medium whitespace-nowrap">
                {row.category_name}
              </td>
              {assessmentEntries.map(([_, value], colIdx) => (
                <td key={colIdx} className="px-2 py-2 text-center">
                  {value}%
                </td>
              ))}
              <td className="px-2 py-2 text-center font-bold text-[#f97316]">
                {row.average}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-500 text-center py-4">No assessment data available</p>
  )}
</div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;