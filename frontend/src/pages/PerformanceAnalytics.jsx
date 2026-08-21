import React, { useState, useEffect } from "react";
import HighchartsReactOfficial from "highcharts-react-official";
import api, { FILE_BASE_URL } from "../services/api";

// Use the global Highcharts from CDN
const Highcharts = window.Highcharts;
const HighchartsReact = HighchartsReactOfficial.default || HighchartsReactOfficial;
import {
  FaUserPlus, FaUserCheck, FaUserSlash,
  FaTimesCircle, FaCheckCircle, FaBook
} from "react-icons/fa";
import IndiaMap from "../assets/india_green.png";
import Leaderboard_BG from "../assets/Leaderboard_BG.png";
import PodiumCenter from "../assets/L_Gold.png";
import PodiumLeft from "../assets/L_Silver.png";
import PodiumRight from "../assets/L_Bronze.png";
import { UsersIcon } from "@animateicons/react/lucide";

import Image_1 from "../assets/Image_1.png";
import Image_2 from "../assets/Image_2.png";
import Image_3 from "../assets/Image_3.png";
import Image_4 from "../assets/Image_4.png";

// ================= STATIC DATA FOR MAP & HEATMAP (keep as is) =================
// (These static objects are unchanged – your original data remains)
const roleUsageHierarchy = { /* ... unchanged ... */ };
const regionCityData = { /* ... unchanged ... */ };
// ================= DATA WITH ROLE-SPECIFIC USAGE AND USER COUNTS =================
const tableData = [
  // WEST ZONE (6 states)
  { 
    code: "in-mh", state: "Maharashtra", zone: "West", users: 530,
    all: { DSE: 2500, TL: 1875, RSE: 1625, DSM: 1250, GM: 1125 },
    ytd: { DSE: 1850, TL: 1388, RSE: 1203, DSM: 925, GM: 833 },
    mtd: { DSE: 308, TL: 231, RSE: 200, DSM: 154, GM: 139 },
    week: { DSE: 154, TL: 116, RSE: 100, DSM: 77, GM: 69 }
  },
  { 
    code: "in-gj", state: "Gujarat", zone: "West", users: 420,
    all: { DSE: 1900, TL: 1425, RSE: 1235, DSM: 950, GM: 855 },
    ytd: { DSE: 1400, TL: 1050, RSE: 910, DSM: 700, GM: 630 },
    mtd: { DSE: 233, TL: 175, RSE: 151, DSM: 117, GM: 105 },
    week: { DSE: 117, TL: 88, RSE: 76, DSM: 59, GM: 53 }
  },
  { 
    code: "in-ga", state: "Goa", zone: "West", users: 180,
    all: { DSE: 800, TL: 600, RSE: 520, DSM: 400, GM: 360 },
    ytd: { DSE: 600, TL: 450, RSE: 390, DSM: 300, GM: 270 },
    mtd: { DSE: 100, TL: 75, RSE: 65, DSM: 50, GM: 45 },
    week: { DSE: 50, TL: 38, RSE: 33, DSM: 25, GM: 23 }
  },
  { 
    code: "in-mh2", state: "Mumbai", zone: "West", users: 350,
    all: { DSE: 1200, TL: 900, RSE: 780, DSM: 600, GM: 540 },
    ytd: { DSE: 900, TL: 675, RSE: 585, DSM: 450, GM: 405 },
    mtd: { DSE: 150, TL: 113, RSE: 98, DSM: 75, GM: 68 },
    week: { DSE: 75, TL: 56, RSE: 49, DSM: 38, GM: 34 }
  },
  { 
    code: "in-rj2", state: "Rajkot", zone: "West", users: 200,
    all: { DSE: 700, TL: 525, RSE: 455, DSM: 350, GM: 315 },
    ytd: { DSE: 520, TL: 390, RSE: 338, DSM: 260, GM: 234 },
    mtd: { DSE: 87, TL: 65, RSE: 57, DSM: 44, GM: 39 },
    week: { DSE: 44, TL: 33, RSE: 29, DSM: 22, GM: 20 }
  },
  { 
    code: "in-mh3", state: "Nagpur", zone: "West", users: 250,
    all: { DSE: 600, TL: 450, RSE: 390, DSM: 300, GM: 270 },
    ytd: { DSE: 450, TL: 338, RSE: 293, DSM: 225, GM: 203 },
    mtd: { DSE: 75, TL: 56, RSE: 49, DSM: 38, GM: 34 },
    week: { DSE: 38, TL: 29, RSE: 25, DSM: 19, GM: 17 }
  },
  
  // SOUTH ZONE (6 states)
  { 
    code: "in-ka", state: "Karnataka", zone: "South", users: 500,
    all: { DSE: 2350, TL: 1763, RSE: 1528, DSM: 1175, GM: 1058 },
    ytd: { DSE: 1750, TL: 1313, RSE: 1138, DSM: 875, GM: 788 },
    mtd: { DSE: 292, TL: 219, RSE: 190, DSM: 146, GM: 131 },
    week: { DSE: 146, TL: 110, RSE: 95, DSM: 73, GM: 66 }
  },
  { 
    code: "in-tn", state: "Tamil Nadu", zone: "South", users: 480,
    all: { DSE: 2200, TL: 1650, RSE: 1430, DSM: 1100, GM: 990 },
    ytd: { DSE: 1630, TL: 1223, RSE: 1060, DSM: 815, GM: 734 },
    mtd: { DSE: 272, TL: 204, RSE: 177, DSM: 136, GM: 122 },
    week: { DSE: 136, TL: 102, RSE: 88, DSM: 68, GM: 61 }
  },
  { 
    code: "in-tg", state: "Telangana", zone: "South", users: 400,
    all: { DSE: 1800, TL: 1350, RSE: 1170, DSM: 900, GM: 810 },
    ytd: { DSE: 1350, TL: 1013, RSE: 878, DSM: 675, GM: 608 },
    mtd: { DSE: 225, TL: 169, RSE: 146, DSM: 113, GM: 101 },
    week: { DSE: 113, TL: 85, RSE: 73, DSM: 57, GM: 51 }
  },
  { 
    code: "in-ap", state: "Andhra Pradesh", zone: "South", users: 320,
    all: { DSE: 1400, TL: 1050, RSE: 910, DSM: 700, GM: 630 },
    ytd: { DSE: 1050, TL: 788, RSE: 683, DSM: 525, GM: 473 },
    mtd: { DSE: 175, TL: 131, RSE: 114, DSM: 88, GM: 79 },
    week: { DSE: 88, TL: 66, RSE: 57, DSM: 44, GM: 40 }
  },
  { 
    code: "in-kl", state: "Kerala", zone: "South", users: 280,
    all: { DSE: 1200, TL: 900, RSE: 780, DSM: 600, GM: 540 },
    ytd: { DSE: 900, TL: 675, RSE: 585, DSM: 450, GM: 405 },
    mtd: { DSE: 150, TL: 113, RSE: 98, DSM: 75, GM: 68 },
    week: { DSE: 75, TL: 56, RSE: 49, DSM: 38, GM: 34 }
  },
  { 
    code: "in-py", state: "Puducherry", zone: "South", users: 120,
    all: { DSE: 500, TL: 375, RSE: 325, DSM: 250, GM: 225 },
    ytd: { DSE: 380, TL: 285, RSE: 247, DSM: 190, GM: 171 },
    mtd: { DSE: 63, TL: 47, RSE: 41, DSM: 32, GM: 28 },
    week: { DSE: 32, TL: 24, RSE: 21, DSM: 16, GM: 14 }
  },
  
  // NORTH ZONE (6 states)
  { 
    code: "in-up", state: "Uttar Pradesh", zone: "North", users: 550,
    all: { DSE: 2150, TL: 1613, RSE: 1398, DSM: 1075, GM: 968 },
    ytd: { DSE: 1600, TL: 1200, RSE: 1040, DSM: 800, GM: 720 },
    mtd: { DSE: 267, TL: 200, RSE: 174, DSM: 134, GM: 120 },
    week: { DSE: 134, TL: 101, RSE: 87, DSM: 67, GM: 60 }
  },
  { 
    code: "in-rj", state: "Rajasthan", zone: "North", users: 300,
    all: { DSE: 1200, TL: 900, RSE: 780, DSM: 600, GM: 540 },
    ytd: { DSE: 850, TL: 638, RSE: 553, DSM: 425, GM: 383 },
    mtd: { DSE: 142, TL: 107, RSE: 92, DSM: 71, GM: 64 },
    week: { DSE: 71, TL: 53, RSE: 46, DSM: 36, GM: 32 }
  },
  { 
    code: "in-pb", state: "Punjab", zone: "North", users: 280,
    all: { DSE: 1100, TL: 825, RSE: 715, DSM: 550, GM: 495 },
    ytd: { DSE: 800, TL: 600, RSE: 520, DSM: 400, GM: 360 },
    mtd: { DSE: 133, TL: 100, RSE: 86, DSM: 67, GM: 60 },
    week: { DSE: 67, TL: 50, RSE: 44, DSM: 34, GM: 30 }
  },
  { 
    code: "in-hr", state: "Haryana", zone: "North", users: 240,
    all: { DSE: 950, TL: 713, RSE: 618, DSM: 475, GM: 428 },
    ytd: { DSE: 700, TL: 525, RSE: 455, DSM: 350, GM: 315 },
    mtd: { DSE: 117, TL: 88, RSE: 76, DSM: 59, GM: 53 },
    week: { DSE: 59, TL: 44, RSE: 38, DSM: 30, GM: 27 }
  },
  { 
    code: "in-hp", state: "Himachal Pradesh", zone: "North", users: 150,
    all: { DSE: 600, TL: 450, RSE: 390, DSM: 300, GM: 270 },
    ytd: { DSE: 450, TL: 338, RSE: 293, DSM: 225, GM: 203 },
    mtd: { DSE: 75, TL: 56, RSE: 49, DSM: 38, GM: 34 },
    week: { DSE: 38, TL: 29, RSE: 25, DSM: 19, GM: 17 }
  },
  { 
    code: "in-jk", state: "Jammu & Kashmir", zone: "North", users: 120,
    all: { DSE: 450, TL: 338, RSE: 293, DSM: 225, GM: 203 },
    ytd: { DSE: 340, TL: 255, RSE: 221, DSM: 170, GM: 153 },
    mtd: { DSE: 57, TL: 43, RSE: 37, DSM: 29, GM: 26 },
    week: { DSE: 29, TL: 22, RSE: 19, DSM: 15, GM: 13 }
  },
  
  // EAST ZONE (6 states)
  { 
    code: "in-wb", state: "West Bengal", zone: "East", users: 380,
    all: { DSE: 1500, TL: 1125, RSE: 975, DSM: 750, GM: 675 },
    ytd: { DSE: 1100, TL: 825, RSE: 715, DSM: 550, GM: 495 },
    mtd: { DSE: 183, TL: 137, RSE: 119, DSM: 92, GM: 82 },
    week: { DSE: 92, TL: 69, RSE: 60, DSM: 46, GM: 41 }
  },
  { 
    code: "in-br", state: "Bihar", zone: "East", users: 340,
    all: { DSE: 1000, TL: 750, RSE: 650, DSM: 500, GM: 450 },
    ytd: { DSE: 750, TL: 563, RSE: 488, DSM: 375, GM: 338 },
    mtd: { DSE: 125, TL: 94, RSE: 81, DSM: 63, GM: 56 },
    week: { DSE: 63, TL: 47, RSE: 41, DSM: 32, GM: 28 }
  },
  { 
    code: "in-or", state: "Odisha", zone: "East", users: 260,
    all: { DSE: 900, TL: 675, RSE: 585, DSM: 450, GM: 405 },
    ytd: { DSE: 680, TL: 510, RSE: 442, DSM: 340, GM: 306 },
    mtd: { DSE: 113, TL: 85, RSE: 73, DSM: 57, GM: 51 },
    week: { DSE: 57, TL: 43, RSE: 37, DSM: 29, GM: 26 }
  },
  { 
    code: "in-jh", state: "Jharkhand", zone: "East", users: 200,
    all: { DSE: 800, TL: 600, RSE: 520, DSM: 400, GM: 360 },
    ytd: { DSE: 600, TL: 450, RSE: 390, DSM: 300, GM: 270 },
    mtd: { DSE: 100, TL: 75, RSE: 65, DSM: 50, GM: 45 },
    week: { DSE: 50, TL: 38, RSE: 33, DSM: 25, GM: 23 }
  },
  { 
    code: "in-as", state: "Assam", zone: "East", users: 180,
    all: { DSE: 600, TL: 450, RSE: 390, DSM: 300, GM: 270 },
    ytd: { DSE: 450, TL: 338, RSE: 293, DSM: 225, GM: 203 },
    mtd: { DSE: 75, TL: 56, RSE: 49, DSM: 38, GM: 34 },
    week: { DSE: 38, TL: 29, RSE: 25, DSM: 19, GM: 17 }
  },
  { 
    code: "in-mn", state: "Manipur", zone: "East", users: 80,
    all: { DSE: 300, TL: 225, RSE: 195, DSM: 150, GM: 135 },
    ytd: { DSE: 225, TL: 169, RSE: 146, DSM: 113, GM: 101 },
    mtd: { DSE: 38, TL: 29, RSE: 25, DSM: 19, GM: 17 },
    week: { DSE: 19, TL: 14, RSE: 12, DSM: 10, GM: 9 }
  },
  
  // CENTRAL ZONE (6 states)
  { 
    code: "in-mp", state: "Madhya Pradesh", zone: "Central", users: 310,
    all: { DSE: 950, TL: 713, RSE: 618, DSM: 475, GM: 428 },
    ytd: { DSE: 700, TL: 525, RSE: 455, DSM: 350, GM: 315 },
    mtd: { DSE: 117, TL: 88, RSE: 76, DSM: 59, GM: 53 },
    week: { DSE: 59, TL: 44, RSE: 38, DSM: 30, GM: 27 }
  },
  { 
    code: "in-ct", state: "Chhattisgarh", zone: "Central", users: 220,
    all: { DSE: 850, TL: 638, RSE: 553, DSM: 425, GM: 383 },
    ytd: { DSE: 620, TL: 465, RSE: 403, DSM: 310, GM: 279 },
    mtd: { DSE: 103, TL: 77, RSE: 67, DSM: 52, GM: 46 },
    week: { DSE: 52, TL: 39, RSE: 34, DSM: 26, GM: 23 }
  },
  { 
    code: "in-ut", state: "Uttarakhand", zone: "Central", users: 190,
    all: { DSE: 750, TL: 563, RSE: 488, DSM: 375, GM: 338 },
    ytd: { DSE: 550, TL: 413, RSE: 358, DSM: 275, GM: 248 },
    mtd: { DSE: 92, TL: 69, RSE: 60, DSM: 46, GM: 41 },
    week: { DSE: 46, TL: 35, RSE: 30, DSM: 23, GM: 21 }
  },
  { 
    code: "in-uk", state: "Uttarakhand West", zone: "Central", users: 130,
    all: { DSE: 550, TL: 413, RSE: 358, DSM: 275, GM: 248 },
    ytd: { DSE: 400, TL: 300, RSE: 260, DSM: 200, GM: 180 },
    mtd: { DSE: 67, TL: 50, RSE: 44, DSM: 34, GM: 30 },
    week: { DSE: 34, TL: 26, RSE: 22, DSM: 17, GM: 15 }
  },
  { 
    code: "in-mp2", state: "Gwalior", zone: "Central", users: 100,
    all: { DSE: 450, TL: 338, RSE: 293, DSM: 225, GM: 203 },
    ytd: { DSE: 330, TL: 248, RSE: 215, DSM: 165, GM: 149 },
    mtd: { DSE: 55, TL: 41, RSE: 36, DSM: 28, GM: 25 },
    week: { DSE: 28, TL: 21, RSE: 18, DSM: 14, GM: 13 }
  },
  { 
    code: "in-ct2", state: "Bilaspur", zone: "Central", users: 90,
    all: { DSE: 350, TL: 263, RSE: 228, DSM: 175, GM: 158 },
    ytd: { DSE: 260, TL: 195, RSE: 169, DSM: 130, GM: 117 },
    mtd: { DSE: 43, TL: 32, RSE: 28, DSM: 22, GM: 19 },
    week: { DSE: 22, TL: 17, RSE: 14, DSM: 11, GM: 10 }
  },
];
const assessmentData = [ /* ... unchanged ... */ ];

// ================= DONUT CHART COMPONENT =================
const DonutChart = ({ title, value, total, percentage, color = "#f97316" }) => {
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

const staticLeaderboardData = {
  fastest_course_completion: [
    { rank: 1, user_id: 4, name: "Subhojit", photo: "/uploads/users/4/profile-1776246467383.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "5 days", points: 73, is_selected: false },
    { rank: 2, user_id: 2, name: "Neeraj Jain", photo: "/uploads/users/2/profile-1775713867244.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "5 days", points: 92, is_selected: false },
    { rank: 3, user_id: 7, name: "Dheeraj", photo: "/uploads/users/7/profile-1776246864430.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "3 days", points: 81, is_selected: false },
    { rank: 4, user_id: 5, name: "Pradeep Kumar", photo: "/uploads/users/5/profile-1776246576012.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "9 days", points: 99, is_selected: false },
    { rank: 5, user_id: 11, name: "Sudha Pawar", photo: "/uploads/users/11/profile-1778653157019.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "7 days", points: 92, is_selected: false },
    { rank: 6, user_id: 12, name: "Nagnath Pise", photo: "/uploads/users/12/profile-1778653233079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "11 days", points: 81, is_selected: false },
    { rank: 7, user_id: 3, name: "Ravi Pandey", photo: "/uploads/users/3/profile-1775713939921.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "11 days", points: 100, is_selected: false },
    { rank: 8, user_id: 1, name: "Keshav_Goyal", photo: "/uploads/users/1/profile-1775713806692.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "11 days", points: 90, is_selected: false },
    { rank: 9, user_id: 10, name: "Vinaya Prasad", photo: "/uploads/users/10/profile-1778653116674.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "11 days", points: 73, is_selected: false },
    { rank: 10, user_id: 6, name: "Anil Kumawat", photo: "/uploads/users/6/profile-1776246747079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "7 days", points: 92, is_selected: false },
    { rank: 11, user_id: 8, name: "Karthick", photo: "/uploads/users/8/profile-1778652931250.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "3 days", points: 70, is_selected: false },
    { rank: 12, user_id: 9, name: "SOHAIL KHAN", photo: "/uploads/users/9/profile-1778653072931.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", completion_time: "2 days", points: 98, is_selected: false }
  ],
  highest_quiz_scores: [
    { rank: 1, user_id: 9, name: "SOHAIL KHAN", photo: "/uploads/users/9/profile-1778653072931.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 83, quizzes_taken: 14, is_selected: false },
    { rank: 2, user_id: 3, name: "Ravi Pandey", photo: "/uploads/users/3/profile-1775713939921.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 77, quizzes_taken: 30, is_selected: false },
    { rank: 3, user_id: 7, name: "Dheeraj", photo: "/uploads/users/7/profile-1776246864430.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 78, quizzes_taken: 12, is_selected: false },
    { rank: 4, user_id: 4, name: "Subhojit", photo: "/uploads/users/4/profile-1776246467383.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 98, quizzes_taken: 14, is_selected: false },
    { rank: 5, user_id: 1, name: "Keshav_Goyal", photo: "/uploads/users/1/profile-1775713806692.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 84, quizzes_taken: 13, is_selected: false },
    { rank: 6, user_id: 11, name: "Sudha Pawar", photo: "/uploads/users/11/profile-1778653157019.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 77, quizzes_taken: 23, is_selected: false },
    { rank: 7, user_id: 8, name: "Karthick", photo: "/uploads/users/8/profile-1778652931250.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 77, quizzes_taken: 30, is_selected: false },
    { rank: 8, user_id: 5, name: "Pradeep Kumar", photo: "/uploads/users/5/profile-1776246576012.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 87, quizzes_taken: 23, is_selected: false },
    { rank: 9, user_id: 12, name: "Nagnath Pise", photo: "/uploads/users/12/profile-1778653233079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 96, quizzes_taken: 28, is_selected: false },
    { rank: 10, user_id: 10, name: "Vinaya Prasad", photo: "/uploads/users/10/profile-1778653116674.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 88, quizzes_taken: 22, is_selected: false },
    { rank: 11, user_id: 2, name: "Neeraj Jain", photo: "/uploads/users/2/profile-1775713867244.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 79, quizzes_taken: 23, is_selected: false },
    { rank: 12, user_id: 6, name: "Anil Kumawat", photo: "/uploads/users/6/profile-1776246747079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", score: 95, quizzes_taken: 29, is_selected: false }
  ],
  most_quizzes_completed: [
    { rank: 1, user_id: 10, name: "Vinaya Prasad", photo: "/uploads/users/10/profile-1778653116674.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 16, completion_rate: "94%", is_selected: false },
    { rank: 2, user_id: 9, name: "SOHAIL KHAN", photo: "/uploads/users/9/profile-1778653072931.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 18, completion_rate: "95%", is_selected: false },
    { rank: 3, user_id: 6, name: "Anil Kumawat", photo: "/uploads/users/6/profile-1776246747079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 15, completion_rate: "84%", is_selected: false },
    { rank: 4, user_id: 11, name: "Sudha Pawar", photo: "/uploads/users/11/profile-1778653157019.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 8, completion_rate: "97%", is_selected: false },
    { rank: 5, user_id: 12, name: "Nagnath Pise", photo: "/uploads/users/12/profile-1778653233079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 20, completion_rate: "73%", is_selected: false },
    { rank: 6, user_id: 4, name: "Subhojit", photo: "/uploads/users/4/profile-1776246467383.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 15, completion_rate: "73%", is_selected: false },
    { rank: 7, user_id: 2, name: "Neeraj Jain", photo: "/uploads/users/2/profile-1775713867244.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 12, completion_rate: "72%", is_selected: false },
    { rank: 8, user_id: 3, name: "Ravi Pandey", photo: "/uploads/users/3/profile-1775713939921.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 7, completion_rate: "75%", is_selected: false },
    { rank: 9, user_id: 5, name: "Pradeep Kumar", photo: "/uploads/users/5/profile-1776246576012.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 7, completion_rate: "86%", is_selected: false },
    { rank: 10, user_id: 8, name: "Karthick", photo: "/uploads/users/8/profile-1778652931250.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 8, completion_rate: "99%", is_selected: false },
    { rank: 11, user_id: 7, name: "Dheeraj", photo: "/uploads/users/7/profile-1776246864430.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 9, completion_rate: "77%", is_selected: false },
    { rank: 12, user_id: 1, name: "Keshav_Goyal", photo: "/uploads/users/1/profile-1775713806692.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", certificates: 17, completion_rate: "100%", is_selected: false }
  ],
  highest_engagement: [
    { rank: 1, user_id: 2, name: "Neeraj Jain", photo: "/uploads/users/2/profile-1775713867244.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 97, hours_spent: 110, posts_completed: 42, is_selected: false },
    { rank: 2, user_id: 9, name: "SOHAIL KHAN", photo: "/uploads/users/9/profile-1778653072931.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 73, hours_spent: 97, posts_completed: 34, is_selected: false },
    { rank: 3, user_id: 6, name: "Anil Kumawat", photo: "/uploads/users/6/profile-1776246747079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 78, hours_spent: 62, posts_completed: 37, is_selected: false },
    { rank: 4, user_id: 12, name: "Nagnath Pise", photo: "/uploads/users/12/profile-1778653233079.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 75, hours_spent: 119, posts_completed: 47, is_selected: false },
    { rank: 5, user_id: 1, name: "Keshav_Goyal", photo: "/uploads/users/1/profile-1775713806692.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 88, hours_spent: 103, posts_completed: 25, is_selected: false },
    { rank: 6, user_id: 3, name: "Ravi Pandey", photo: "/uploads/users/3/profile-1775713939921.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 99, hours_spent: 96, posts_completed: 26, is_selected: false },
    { rank: 7, user_id: 7, name: "Dheeraj", photo: "/uploads/users/7/profile-1776246864430.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 83, hours_spent: 98, posts_completed: 47, is_selected: false },
    { rank: 8, user_id: 4, name: "Subhojit", photo: "/uploads/users/4/profile-1776246467383.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 95, hours_spent: 119, posts_completed: 43, is_selected: false },
    { rank: 9, user_id: 11, name: "Sudha Pawar", photo: "/uploads/users/11/profile-1778653157019.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 84, hours_spent: 99, posts_completed: 46, is_selected: false },
    { rank: 10, user_id: 8, name: "Karthick", photo: "/uploads/users/8/profile-1778652931250.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 75, hours_spent: 65, posts_completed: 41, is_selected: false },
    { rank: 11, user_id: 10, name: "Vinaya Prasad", photo: "/uploads/users/10/profile-1778653116674.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 93, hours_spent: 116, posts_completed: 30, is_selected: false },
    { rank: 12, user_id: 5, name: "Pradeep Kumar", photo: "/uploads/users/5/profile-1776246576012.jpg", city: "Mumbai, Maharashtra", dealership: "ABC Motors", role: "DSE", engagement_score: 80, hours_spent: 100, posts_completed: 47, is_selected: false }
  ]
};

const stateWiseStaticData = {
  success: true,
  data: {
    states: [
      {
        state: "Maharashtra",
        code: "maharashtra",
        users: 5,
        total: 8375,
        ytd: 6199,
        mtd: 1032,
        week: 516,
        cities: "Mumbai, Pune, Nagpur"
      },
      {
        state: "Gujarat",
        code: "gujarat",
        users: 4,
        total: 6365,
        ytd: 4690,
        mtd: 781,
        week: 393,
        cities: "Ahmedabad, Surat, Vadodara"
      },
      {
        state: "Karnataka",
        code: "karnataka",
        users: 3,
        total: 7874,
        ytd: 5864,
        mtd: 978,
        week: 490,
        cities: "Bengaluru, Mysuru, Hubballi"
      },
      {
        state: "Tamil Nadu",
        code: "tamil nadu",
        users: 3,
        total: 7370,
        ytd: 5462,
        mtd: 911,
        week: 455,
        cities: "Chennai, Coimbatore, Madurai"
      },
      {
        state: "Uttar Pradesh",
        code: "uttar pradesh",
        users: 3,
        total: 7204,
        ytd: 5360,
        mtd: 895,
        week: 449,
        cities: "Lucknow, Kanpur, Varanasi"
      },
      {
        state: "West Bengal",
        code: "west bengal",
        users: 3,
        total: 5025,
        ytd: 3685,
        mtd: 613,
        week: 308,
        cities: "Kolkata, Howrah, Durgapur"
      },
      {
        state: "Rajasthan",
        code: "rajasthan",
        users: 2,
        total: 4020,
        ytd: 2849,
        mtd: 476,
        week: 238,
        cities: "Jaipur, Jodhpur, Udaipur"
      }
    ],
    summary: {
      total_users: 23,
      total_usage: 46233,
      total_ytd: 34109,
      total_mtd: 5686,
      total_week: 2849
    }
  }
};
// Helper to generate random hourly usage matrix
const generateRandomHourlyData = () => {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const matrix = [];
  let maxVal = 0;

  for (let d = 0; d < 7; d++) {
    const row = [];
    for (let h = 0; h < 24; h++) {
      // Decide if this hour has activity
      // We want some hours to be zero (e.g., 0-6, 19-23 often zero, but can have occasional)
      // For 7-18 we have higher chance of activity.
      let value = 0;
      const rand = Math.random();
      if (h >= 7 && h <= 18) {
        // Work hours: 70% chance of activity, with varying intensity
        if (rand < 0.7) {
          // intensity: low (1-10) or heavy (11-23)
          const intensity = Math.random();
          if (intensity < 0.4) {
            value = Math.floor(Math.random() * 10) + 1; // low
          } else {
            value = Math.floor(Math.random() * 13) + 11; // heavy (11-23)
          }
        }
      } else {
        // Off-hours: 20% chance of activity, mostly low
        if (rand < 0.2) {
          value = Math.floor(Math.random() * 8) + 1; // low
        }
      }
      row.push(value);
      if (value > maxVal) maxVal = value;
    }
    matrix.push(row);
  }

  // Ensure maxVal is at least 1 to avoid division by zero
  if (maxVal === 0) maxVal = 1;

  return { matrix, maxValue: maxVal, days, hours };
};

// ================= MAIN DASHBOARD =================
const PerformanceAnalytics = () => {
  // ---------- Filter States ----------
  const [selectedRegion, setSelectedRegion] = useState("Regions");
  const [selectedDealership, setSelectedDealership] = useState("All Dealerships");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState("All Users");
// const [selectedContentRole, setSelectedContentRole] = useState("All");
// ---------- Usage Analytics Independent Filters ----------
const [uaRegion, setUaRegion] = useState("Regions");
const [uaDealership, setUaDealership] = useState("All Dealerships");
const [uaCity, setUaCity] = useState("All Cities");
const [uaRole, setUaRole] = useState("All");
const [uaUser, setUaUser] = useState("All Users");

// Dropdown options for UA filters (reuse the same data but separate state)
const [uaDropdowns, setUaDropdowns] = useState({ zones: [], dealership: [], roles: [] });
const [uaCitiesList, setUaCitiesList] = useState([]);
const [uaUsersList, setUaUsersList] = useState([]);
const [contentPrefs, setContentPrefs] = useState({ total_users: 0, preferences: [] });
const [hourlyData, setHourlyData] = useState(generateRandomHourlyData);
  const [dropdowns, setDropdowns] = useState({ zones: [], dealership: [], roles: [] });
  const [citiesList, setCitiesList] = useState([]);
  const [usersList, setUsersList] = useState([]);

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
const [leaderboard, setLeaderboard] = useState(staticLeaderboardData);
const [learningProgress, setLearningProgress] = useState({
    mycourse: { 
        total_courses_available: 0, 
        completion_percentage: 0,   // changed from avg_completion_percentage
        completed_course: 0 
    },
    mycourse_certified: { 
        total_courses_available: 0, 
        completion_percentage: 0,   // changed
        completed_course: 0 
    },
    mycourse_assessment: { 
        total_courses_available: 0, 
        completion_percentage: 0,   // changed
        completed_course: 0 
    },
    quiz: { 
        total_quizzes_available: 0, 
        avg_completion_percentage: 0, 
        users_fully_completed_quizzes: 0 
    }, // this may not be used, but keep as is
    quiz_score: { 
        quizzes_average_total_score: "0", 
        avg_score_percentage: 0, 
        users_quiz_average__score: "0" 
    },
    assessment_breakup: []
});

 const [stateWiseData, setStateWiseData] = useState(stateWiseStaticData.data);
 

  // ---------- UI States ----------
  const [activeTab, setActiveTab] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState("total");
  const [selectedCourseMetric, setSelectedCourseMetric] = useState("total");
  const [activeUsageTab, setActiveUsageTab] = useState("all");

  // Color arrays
  const pieColors = ["#0f766e", "#84cc16", "#ea580c", "#eab308", "#3b82f6"];
  const courseColors = ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#ec489a", "#14b8a6", "#6366f1"];
  const contentColors = ["#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#ec489a", "#14b8a6", "#6366f1"];

  // Leaderboard tabs
  const leaderboardTabs = [
    { title: "Fastest Task Completion", data: leaderboard.fastest_course_completion, image: Image_1 },
    { title: "Highest Scores", data: leaderboard.highest_quiz_scores, image: Image_2 },
    { title: "Maximum Certificates", data: leaderboard.most_quizzes_completed, image: Image_3 },
    { title: "Highest Engagement on LMS", data: leaderboard.highest_engagement, image: Image_4 }
  ];

const donutCards = [
    { 
        title: "Learning Path", 
        percentage: learningProgress.mycourse?.completion_percentage || 0,   // changed
        value: learningProgress.mycourse?.completed_course || 0, 
        total: learningProgress.mycourse?.total_courses_available || 0, 
        color: "#f97316" 
    },
    { 
        title: "Certificates", 
        percentage: learningProgress.mycourse_certified?.completion_percentage || 0,   // changed
        value: learningProgress.mycourse_certified?.completed_course || 0, 
        total: learningProgress.mycourse_certified?.total_courses_available || 0, 
        color: "#10b981" 
    },
    { 
        title: "Assessment", 
        percentage: learningProgress.mycourse_assessment?.completion_percentage || 0,   // changed
        value: learningProgress.mycourse_assessment?.completed_course || 0, 
        total: learningProgress.mycourse_assessment?.total_courses_available || 0, 
        color: "#3b82f6" 
    },
    { 
        title: "Score", 
        percentage: learningProgress.quiz_score?.avg_score_percentage || 0, 
        value: parseFloat(learningProgress.quiz_score?.users_quiz_average__score || 0), 
        total: parseFloat(learningProgress.quiz_score?.quizzes_average_total_score || 0), 
        color: "#8b5cf6" 
    }
];

  // User stat cards
  const userStatCards = [
    { key: "total", label: "Total Users", value: userStats.totals.total, icon: UsersIcon, bgFrom: "from-orange-400", bgTo: "to-orange-600", borderColor: "border-orange-400" },
    { key: "active", label: "Active Users", value: userStats.totals.active, icon: FaUserCheck, bgFrom: "from-emerald-400", bgTo: "to-teal-500", borderColor: "border-emerald-400" },
    { key: "new", label: "New Users", value: userStats.totals.new_users, icon: FaUserPlus, bgFrom: "from-blue-400", bgTo: "to-cyan-500", borderColor: "border-blue-400" },
    { key: "inactive", label: "Inactive Users", value: userStats.totals.inactive, icon: FaUserSlash, bgFrom: "from-red-400", bgTo: "to-red-500", borderColor: "border-red-400" }
  ];

  const courseStatCards = [
    { key: "total", label: "Total Courses", value: courseStats.totals.total_courses, icon: FaBook, bgFrom: "from-orange-400", bgTo: "to-orange-600" },
    { key: "completed", label: "Completed Courses", value: courseStats.totals.completed_courses, icon: FaCheckCircle, bgFrom: "from-emerald-400", bgTo: "to-teal-500" },
    { key: "pending", label: "Pending Courses", value: courseStats.totals.pending_courses, icon: FaTimesCircle, bgFrom: "from-red-400", bgTo: "to-red-500" }
  ];

  const contentData = mediaStats.by_type.map(item => ({ type: item.media_type, count: item.count }));
  const totalContent = mediaStats.total_media;

  // ================= Helper Functions =================
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

  // ================= Effects =================
  // Fetch cascading dropdowns
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const params = {};
        if (selectedRegion && selectedRegion !== "Regions") params.zone = selectedRegion;
        if (selectedDealership && selectedDealership !== "All Dealerships") params.dealer = selectedDealership;
        if (selectedCity && selectedCity !== "All Cities") params.city = selectedCity;
        if (selectedRole && selectedRole !== "All") params.role = selectedRole;

        const res = await api.getDashboardDropdowns(params);
        if (res.success) {
          setDropdowns({
            zones: res.dropdowns.zones,
            dealership: res.dropdowns.dealership,
            roles: res.dropdowns.roles,
          });
          setCitiesList(res.dropdowns.cities || []);
          setUsersList(res.dropdowns.users || []);
        }
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };
    fetchDropdowns();
  }, [selectedRegion, selectedDealership, selectedCity, selectedRole]);

  // Fetch cascading dropdowns for UA filters
useEffect(() => {
    const fetchUaDropdowns = async () => {
        try {
            const params = {};
            if (uaRegion && uaRegion !== "Regions") params.zone = uaRegion;
            if (uaDealership && uaDealership !== "All Dealerships") params.dealer = uaDealership;
            if (uaCity && uaCity !== "All Cities") params.city = uaCity;
            if (uaRole && uaRole !== "All") params.role = uaRole;

            const res = await api.getDashboardDropdowns(params);
            if (res.success) {
                setUaDropdowns({
                    zones: res.dropdowns.zones,
                    dealership: res.dropdowns.dealership,
                    roles: res.dropdowns.roles,
                });
                setUaCitiesList(res.dropdowns.cities || []);
                setUaUsersList(res.dropdowns.users || []);
            }
        } catch (err) {
            console.error("UA Dropdown fetch error:", err);
        }
    };
    fetchUaDropdowns();
}, [uaRegion, uaDealership, uaCity, uaRole]);

// Reset dependent UA filters
useEffect(() => {
    setUaDealership("All Dealerships");
    setUaCity("All Cities");
    setUaRole("All");
    setUaUser("All Users");
}, [uaRegion]);

useEffect(() => {
    setUaCity("All Cities");
    setUaRole("All");
    setUaUser("All Users");
}, [uaDealership]);

useEffect(() => {
    setUaRole("All");
    setUaUser("All Users");
}, [uaCity]);

useEffect(() => {
    setUaUser("All Users");
}, [uaRole]);

// Fetch User Content Preferences based on UA filters
useEffect(() => {
    const fetchContentPrefs = async () => {
        try {
            const params = {};
            if (uaRegion && uaRegion !== "Regions") params.zone = uaRegion;
            if (uaDealership && uaDealership !== "All Dealerships") params.dealer = uaDealership;
            if (uaCity && uaCity !== "All Cities") params.city = uaCity;
            if (uaRole && uaRole !== "All") params.role = uaRole;
            if (uaUser && uaUser !== "All Users") params.user = uaUser;

            const res = await api.getUserContentPreferences(params);
            if (res.success) {
                setContentPrefs(res.data);
            }
        } catch (err) {
            console.error("Content prefs fetch error:", err);
        }
    };
    fetchContentPrefs();
}, [uaRegion, uaDealership, uaCity, uaRole, uaUser]);



// Get filtered table data from API
const getFilteredTableData = () => {
  const data = stateWiseData.states || [];
  return data.map(state => ({
    state: state.state,
    usage: activeUsageTab === "all" ? state.total : 
           activeUsageTab === "ytd" ? state.ytd :
           activeUsageTab === "mtd" ? state.mtd : state.week,
    users: state.users
  })).sort((a, b) => b.usage - a.usage);
};

// Get total usage
const getTotalUsage = () => {
    const data = stateWiseData.states || [];
    let total = 0;
    data.forEach(state => {
        total += activeUsageTab === "all" ? state.total : 
                activeUsageTab === "ytd" ? state.ytd :
                activeUsageTab === "mtd" ? state.mtd : state.week;
    });
    return total;
};

// Get top 2 states for blinking
const getTop2States = () => {
  const data = stateWiseData.states || [];
  const sorted = [...data].sort((a, b) => {
    const usageA = activeUsageTab === "all" ? a.total : 
                   activeUsageTab === "ytd" ? a.ytd :
                   activeUsageTab === "mtd" ? a.mtd : a.week;
    const usageB = activeUsageTab === "all" ? b.total : 
                   activeUsageTab === "ytd" ? b.ytd :
                   activeUsageTab === "mtd" ? b.mtd : b.week;
    return usageB - usageA;
  });
  return sorted.slice(0, 2).map(item => item.state); // returns state names
};

// India Heat Map data
const currentHeatData = stateWiseData.states.map(item => {
  const usage = activeUsageTab === "all" ? item.total : 
                activeUsageTab === "ytd" ? item.ytd :
                activeUsageTab === "mtd" ? item.mtd : item.week;
  return [item.code, usage];   // ✅ use item.code
});

  // Reset dependent filters when parent changes
  useEffect(() => {
    setSelectedDealership("All Dealerships");
    setSelectedCity("All Cities");
    setSelectedRole("All");
    setSelectedUser("All Users");
  }, [selectedRegion]);

  useEffect(() => {
    setSelectedCity("All Cities");
    setSelectedRole("All");
    setSelectedUser("All Users");
  }, [selectedDealership]);

  useEffect(() => {
    setSelectedRole("All");
    setSelectedUser("All Users");
  }, [selectedCity]);

  useEffect(() => {
    setSelectedUser("All Users");
  }, [selectedRole]);

  // Fetch main dashboard data
useEffect(() => {
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedRegion && selectedRegion !== "Regions") params.zone = selectedRegion;
      if (selectedDealership && selectedDealership !== "All Dealerships") params.dealer = selectedDealership;
      if (selectedCity && selectedCity !== "All Cities") params.city = selectedCity;
      if (selectedRole && selectedRole !== "All") params.role = selectedRole;
      if (selectedUser && selectedUser !== "All Users") params.user = selectedUser;

      const [statsRes, learningRes] = await Promise.all([
        api.getDashboardStats(params),
        api.getDashboardLearningProgress(params)
      ]);

      if (statsRes.success) {
        setUserStats(statsRes.data.users);
        setCourseStats(statsRes.data.courses);
        setMediaStats(statsRes.data.media);
      }
      if (learningRes.success) setLearningProgress(learningRes.data);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  fetchAllData();
}, [selectedRegion, selectedDealership, selectedCity, selectedRole, selectedUser]);

useEffect(() => {
    const fetchContentPrefs = async () => {
        try {
            const params = {};
            if (uaRegion && uaRegion !== "Regions") params.zone = uaRegion;
            if (uaDealership && uaDealership !== "All Dealerships") params.dealer = uaDealership;
            if (uaCity && uaCity !== "All Cities") params.city = uaCity;
            if (uaRole && uaRole !== "All") params.role = uaRole;
            if (uaUser && uaUser !== "All Users") params.user = uaUser;

            const res = await api.getUserContentPreferences(params);
            if (res.success) {
                setContentPrefs(res.data);
            }
        } catch (err) {
            console.error("Content prefs fetch error:", err);
        }
    };
    fetchContentPrefs();
}, [uaRegion, uaDealership, uaCity, uaRole, uaUser]);

  // ================= Static Map Data (unchanged) =================
  // const getFilteredMapData = () => {
  //   let filteredData = [...tableData];
  //   if (selectedMapRegion !== "all") filteredData = filteredData.filter(item => item.zone === selectedMapRegion);
  //   return filteredData.map((item) => {
  //     const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
  //     let totalUsage = 0;
  //     if (selectedMapRole === "all") {
  //       roles.forEach(role => { totalUsage += item[activeUsageTab][role]; });
  //     } else {
  //       totalUsage = item[activeUsageTab][selectedMapRole];
  //     }
  //     return [item.code, totalUsage];
  //   });
  // };



  const resetFilters = () => {
  setSelectedRegion("Regions");
  setSelectedDealership("All Dealerships");
  setSelectedCity("All Cities");
  setSelectedRole("All");
  setSelectedUser("All Users");
};
// ================= MAP DATA =================
const getFilteredMapData = () => {
  let filteredData = [...tableData];
  
  // Filter by selected region
  if (selectedMapRegion !== "all") {
    filteredData = filteredData.filter(item => item.zone === selectedMapRegion);
  }
  
  // Map to format needed for Highcharts - SUM of ALL roles
  return filteredData.map((item) => {
    const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
    let totalUsage = 0;
    
    if (selectedMapRole === "all") {
      // Sum all roles usage
      roles.forEach(role => {
        totalUsage += item[activeUsageTab][role];
      });
    } else {
      // Use selected role only
      totalUsage = item[activeUsageTab][selectedMapRole];
    }
    
    return [item.code, totalUsage];
  });
};

// const currentHeatData = getFilteredMapData();

// // ================= TOTAL =================
// const getTotalUsage = () => {
//   let filteredData = [...tableData];
  
//   if (selectedMapRegion !== "all") {
//     filteredData = filteredData.filter(item => item.zone === selectedMapRegion);
//   }
  
//   return filteredData.reduce((sum, item) => sum + item[activeUsageTab], 0);
// };
// // Helper function to get filtered table data based on region and role
// const getFilteredTableData = () => {
//   // First filter by zone (selectedMapRegion)
//   let filteredByZone = [...tableData];
//   if (selectedMapRegion !== "all") {
//     filteredByZone = filteredByZone.filter(item => item.zone === selectedMapRegion);
//   }

//   let filteredData = [];

//   if (selectedMapRole === "all") {
//     // Show all roles for filtered states
//     const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
//     filteredByZone.forEach(state => {
//       roles.forEach(role => {
//         // Get role-specific usage value from tableData based on activeUsageTab
//         const usageValue = state[activeUsageTab][role];
//         filteredData.push({
//           role: role,
//           state: state.state,
//           usage: usageValue
//         });
//       });
//     });
//   } else {
//     // Show only selected role for filtered states
//     filteredByZone.forEach(state => {
//       // Get role-specific usage value from tableData based on activeUsageTab
//       const usageValue = state[activeUsageTab][selectedMapRole];
//       filteredData.push({
//         role: selectedMapRole,
//         state: state.state,
//         usage: usageValue
//       });
//     });
//   }

//   return filteredData;
// };

// Get top 2 states for blinking based on total/all roles usage
// const getTop2States = () => {
//   const filteredData = [...tableData];
  
//   // Filter by selected region
//   let statesToConsider = filteredData;
//   if (selectedMapRegion !== "all") {
//     statesToConsider = filteredData.filter(item => item.zone === selectedMapRegion);
//   }
  
//   // Calculate total usage for each state (sum of all roles)
//   const stateTotals = statesToConsider.map(state => {
//     const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
//     let total = 0;
    
//     if (selectedMapRole === "all") {
//       roles.forEach(role => {
//         total += state[activeUsageTab][role];
//       });
//     } else {
//       total = state[activeUsageTab][selectedMapRole];
//     }
    
//     return {
//       code: state.code,
//       total: total
//     };
//   });
  
//   // Sort and get top 2
//   const sorted = [...stateTotals].sort((a, b) => b.total - a.total);
//   return sorted.slice(0, 2).map(item => item.code);
// };

// ================= UPDATE indiaHeatMapOptions =================
// Remove selectedMapRegion and selectedMapRole, use UA filters

const indiaHeatMapOptions = {
  chart: {
    map: window.Highcharts.maps['countries/in/custom/in-all-disputed'],
    backgroundColor: "transparent",
    height: 280,
    events: {
      load: function() {
        const chart = this;
        const top2States = getTop2States();
        
        chart.series[0].points.forEach((point) => {
          if (point.graphic && point.graphic.element) {
            point.graphic.element.classList.remove(
              "highcharts-point-blink-1",
              "highcharts-point-blink-2"
            );
            
            if (top2States.includes(point.name)) {
              const index = top2States.indexOf(point.name);
              point.graphic.element.classList.add(
                index === 0 ? "highcharts-point-blink-1" : "highcharts-point-blink-2"
              );
            }
          }
        });
      },
      redraw: function() {
        const chart = this;
        const top2States = getTop2States();
        
        chart.series[0].points.forEach((point) => {
          if (point.graphic && point.graphic.element) {
            point.graphic.element.classList.remove(
              "highcharts-point-blink-1",
              "highcharts-point-blink-2"
            );
            
            if (top2States.includes(point.name)) {
              const index = top2States.indexOf(point.name);
              point.graphic.element.classList.add(
                index === 0 ? "highcharts-point-blink-1" : "highcharts-point-blink-2"
              );
            }
          }
        });
      },
    },
  },
  accessibility: { enabled: false },
  title: { text: null },
  credits: { enabled: false },
  mapNavigation: { enabled: false },
  colorAxis: {
    min: 0,
    max: (() => {
      const data = stateWiseData.states || [];
      let maxValue = 0;
      data.forEach(state => {
        const usage = activeUsageTab === "all" ? state.total : 
                     activeUsageTab === "ytd" ? state.ytd :
                     activeUsageTab === "mtd" ? state.mtd : state.week;
        if (usage > maxValue) maxValue = usage;
      });
      return Math.max(maxValue, 100);
    })(),
    stops: [
      [0, "#fff7ed"],
      [0.15, "#ffedd5"],
      [0.3, "#fed7aa"],
      [0.5, "#fdba74"],
      [0.7, "#f97316"],
      [0.85, "#ea580c"],
      [1, "#c2410c"],
    ],
  },
  tooltip: {
formatter: function () {
  const stateName = this.point.name; // e.g., "Maharashtra"
  // Find state data by case-insensitive comparison
  const stateData = stateWiseData.states.find(s => s.state.toLowerCase() === stateName.toLowerCase());
  const userCount = stateData?.users || 0;
  const totalUsage = this.point.value;
  const averageUsage = userCount > 0 ? Math.round(totalUsage / userCount) : 0;
      
      const timePeriod = activeUsageTab === "all" ? "ALL TIME" :
                        activeUsageTab === "ytd" ? "YTD" :
                        activeUsageTab === "mtd" ? "MTD" : "THIS WEEK";
      
      return `
        <div style="padding:8px; min-width:180px">
         <div style="font-size:14px; font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:8px; padding-bottom:4px;">
  ${this.point.name} 
  ${stateData?.cities ? `<span style="font-weight: normal;">(${stateData.cities.split(',').map(c => c.trim()).join(', ')})</span>` : ''}
</div>
          <div style="margin-bottom:4px;">
            <span style="color:#666;">Total Usage:</span>
            <b style="color:#ea580c; float:right;">${totalUsage.toLocaleString()}</b>
          </div>
          <div style="margin-bottom:4px;">
            <span style="color:#666;">Total Users:</span>
            <b style="float:right;">${userCount.toLocaleString()}</b>
          </div>
          <div style="margin-bottom:4px;">
            <span style="color:#666;">Average Usage/User:</span>
            <b style="color:#f97316; float:right;">${averageUsage.toLocaleString()}</b>
          </div>
          <div style="border-top:1px solid #eee; margin-top:4px; padding-top:4px; font-size:11px; color:#999; text-align:center;">
            ${timePeriod}
          </div>
        </div>
      `;
    },
    borderWidth: 2,
    borderColor: "#ea580c",
    borderRadius: 8,
    padding: 10,
    shadow: true,
    useHTML: true,
    style: { fontSize: "12px", fontWeight: "normal" },
  },
  series: [{
    name: "Usage",
    joinBy: "hc-key",
    borderWidth: 1,
    borderColor: "#ffffff",
    nullColor: "#f5f5f5",
    states: {
      hover: {
        enabled: true,
        brightness: 0.2,
        color: "#ff6b6b",
      },
    },
    dataLabels: { enabled: false },
    data: currentHeatData,
  }],
};


const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const hours = Array.from({ length: 24 }, (_, i) => i + 1);



  // Loading / Error
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

  // ================= RENDER =================
  return (
    <div className="min-h-screen bg-[#f7f7f7] px-6 py-10">
      {/* ================= FILTERS SECTION ================= */}
<div className="flex justify-between items-center mb-5 flex-wrap gap-2">
  <h2 className="text-2xl font-bold">Dashboard</h2>
  <div className="flex flex-wrap gap-3">
    {/* Zone */}
    <div className="relative">
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="px-3 py-2 pr-8 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-sm"
      >
        <option value="Regions">All India</option>
        {dropdowns.zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      </div>
    </div>

    {/* Dealership */}
    <div className="relative">
      <select
        value={selectedDealership}
        onChange={(e) => setSelectedDealership(e.target.value)}
        className="px-3 py-2 pr-8 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-sm"
      >
        <option value="All Dealerships">All Dealerships</option>
        {dropdowns.dealership.map(dealer => <option key={dealer} value={dealer}>{dealer}</option>)}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      </div>
    </div>

    {/* City */}
    <div className="relative">
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="px-3 py-2 pr-8 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-sm"
        // disabled={selectedDealership === "All Dealerships"}
      >
        <option value="All Cities">All Cities</option>
        {citiesList.map(city => <option key={city} value={city}>{city}</option>)}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      </div>
    </div>

    {/* Role */}
    <div className="relative">
      <select
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
        className="px-3 py-2 pr-8 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-sm"
      >
        <option value="All">All Role Holders</option>
        {dropdowns.roles.map(role => <option key={role} value={role}>{role}</option>)}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      </div>
    </div>

    {/* User */}
    <div className="relative">
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="px-3 py-2 pr-8 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-sm"
        disabled={usersList.length === 0}
      >
        <option value="All Users">All Users</option>
        {usersList.map(user => <option key={user} value={user}>{user}</option>)}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
      </div>
    </div>

    {/* Reset Button */}
    <button
      onClick={resetFilters}
      className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium shadow-sm transition-all duration-200 flex items-center gap-1 text-sm"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Reset
    </button>
  </div>
</div>

      {/* ================= ROW 1: USER STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {userStatCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div key={card.key} className={`stats-card bg-white/90 backdrop-blur-sm rounded-xl border-l-4 ${card.borderColor} p-2 shadow-sm`}>
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
              <div key={card.key} onClick={() => setSelectedMetric(card.key)} className={`flex flex-col items-center justify-center p-1 rounded border shadow-sm cursor-pointer transition-all hover:scale-[1.01] text-center ${selectedMetric === card.key ? "border-blue-500 ring-1 ring-blue-200" : "border-black"}`}>
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
              <HighchartsReact highcharts={Highcharts} options={{
                chart: { type: "pie", backgroundColor: "transparent", height: 250 },
                colors: pieColors,
                accessibility: { enabled: false },
                credits: { enabled: false },
                title: { text: null },
                plotOptions: { pie: { innerSize: 70, dataLabels: { enabled: false } } },
                series: [{ name: "Users", data: getCurrentRoleData() }]
              }} />
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-[10px] border-collapse">
                <thead><tr className="bg-gray-600 text-white"><th className="p-1 text-center">S.No</th><th className="p-1 text-center"></th><th className="p-1 text-left">Role</th><th className="p-1 text-center">Count</th></tr></thead>
                <tbody>
                  {getCurrentRoleData().map((role, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-1 text-center font-medium">{i+1}</td>
                      <td className="p-1 text-center"><span className="inline-block w-2 h-2" style={{ backgroundColor: pieColors[i % pieColors.length] }} /></td>
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
              <div key={card.key} onClick={() => setSelectedCourseMetric(card.key)} className={`flex flex-col items-center justify-center p-1 rounded border shadow-sm cursor-pointer transition-all hover:scale-[1.01] text-center ${selectedCourseMetric === card.key ? "border-blue-500 ring-1 ring-blue-200" : "border-black"}`}>
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
              <HighchartsReact highcharts={Highcharts} options={{
                chart: { type: "pie", backgroundColor: "transparent", height: 250 },
                colors: courseColors,
                accessibility: { enabled: false },
                credits: { enabled: false },
                title: { text: null },
                plotOptions: { pie: { innerSize: 70, dataLabels: { enabled: false } } },
                series: [{ name: "Courses", data: getCurrentCourseData() }]
              }} />
            </div>
            <div className="overflow-hidden">
              <table className="w-full text-[10px] border-collapse">
                <thead><tr className="bg-gray-600 text-white"><th className="p-1 text-center">S.No</th><th className="p-1 text-center"></th><th className="p-1 text-left">Category</th><th className="p-1 text-center">Count</th></tr></thead>
                <tbody>
                  {getCurrentCourseData().map((cat, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-1 text-center font-medium">{i+1}</td>
                      <td className="p-1 text-center"><span className="inline-block w-2 h-2" style={{ backgroundColor: courseColors[i % courseColors.length] }} /></td>
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
              <HighchartsReact highcharts={Highcharts} options={{
                chart: { type: "pie", backgroundColor: "transparent", height: 180},
                colors: contentColors,
                accessibility: { enabled: false },
                credits: { enabled: false },
                title: { text: null },
                plotOptions: { pie: { innerSize: 70, dataLabels: { enabled: false } } },
                series: [{ name: "Content", data: contentData.map(item => ({ name: item.type, y: item.count })) }]
              }} />
            </div>
          </div>
          <div className="mt-2 overflow-hidden">
            <table className="w-full text-[10px] border-collapse">
              <thead><tr className="bg-gray-600 text-white"><th className="p-1 text-center">S.No</th><th className="p-1 text-center"></th><th className="p-1 text-left">Type</th><th className="p-1 text-center">Count</th></tr></thead>
              <tbody>
                {contentData.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-1 text-center">{i+1}</td>
                    <td className="p-1 text-center"><span className="inline-block w-2 h-2" style={{ backgroundColor: contentColors[i % contentColors.length] }} /></td>
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
        {/* LEFT SIDE: Tabs + Podium */}
        <div className="flex flex-col h-full gap-2">
          <div className="grid grid-cols-4 gap-2">
            {leaderboardTabs.map((tab, i) => (
              <div key={i} onClick={() => setActiveTab(i)} className={`cursor-pointer rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-2 text-center text-[11px] font-semibold transition ${activeTab === i ? "bg-[#f97316] text-white" : "bg-white hover:bg-gray-100"}`}>
                {tab.title}
              </div>
            ))}
          </div>
          <div className="relative flex-1 max-h-[540px] rounded-md overflow-hidden shadow-md bg-cover bg-center" style={{ backgroundImage: `url(${Leaderboard_BG})` }}>
            <div className="relative z-10 h-full flex items-end justify-center gap-4 px-4 pt-4 pb-0">
              {/* 2nd Place */}
              <div className="w-1/3 flex flex-col items-center relative">
                <img src={PodiumLeft} alt="2nd place podium" className="w-full h-[270px] object-contain" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-5">
                  <img src={`${FILE_BASE_URL}${leaderboardTabs[activeTab].data[1]?.photo || ""}`} alt={leaderboardTabs[activeTab].data[1]?.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-7" />
                  <div className="text-center drop-shadow-md text-xs mb-5">
                    <div className="font-bold max-w-[90px]">{leaderboardTabs[activeTab].data[1]?.name}</div>
                    <div className="text-[#302f2f] opacity-90 font-bold">{leaderboardTabs[activeTab].data[1]?.role}</div>
                  </div>
                </div>
              </div>
              {/* 1st Place */}
              <div className="w-1/3 flex flex-col items-center relative -mt-15">
                <img src={PodiumCenter} alt="1st place podium" className="w-full h-[300px] object-contain" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-7">
                  <img src={`${FILE_BASE_URL}${leaderboardTabs[activeTab].data[0]?.photo || ""}`} alt={leaderboardTabs[activeTab].data[0]?.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-10" />
                  <div className="text-center drop-shadow-md text-xs mb-5">
                    <div className="font-bold max-w-[110px]">{leaderboardTabs[activeTab].data[0]?.name}</div>
                    <div className="text-[#302f2f] opacity-90 font-bold">{leaderboardTabs[activeTab].data[0]?.role}</div>
                  </div>
                </div>
              </div>
              {/* 3rd Place */}
              <div className="w-1/3 flex flex-col items-center relative">
                <img src={PodiumRight} alt="3rd place podium" className="w-full h-[270px] object-contain" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-5">
                  <img src={`${FILE_BASE_URL}${leaderboardTabs[activeTab].data[2]?.photo || ""}`} alt={leaderboardTabs[activeTab].data[2]?.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-7" />
                  <div className="text-center drop-shadow-md text-xs mb-5">
                    <div className="font-bold max-w-[90px]">{leaderboardTabs[activeTab].data[2]?.name}</div>
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
                  <th className="px-6 py-2 text-left">Rank</th><th className="px-6 py-2 text-left">Name</th><th className="px-6 py-2 text-left">Photo</th><th className="px-6 py-2 text-left">Role</th><th className="px-6 py-2 text-center">Dealership</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardTabs[activeTab].data.map((user, idx) => (
                  <tr 
    key={idx} 
    className={`border-b border-[#eeeeee] last:border-none hover:bg-gray-50 ${
      user.is_selected ? "bg-blue-100 border-l-4 border-l-blue-500" : ""
    }`}
  >
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{user.name}</td>
                    <td className="px-6 py-3"><img src={`${FILE_BASE_URL}${user.photo}`} alt={user.name} className="w-10 h-10 border rounded-full object-cover" /></td>
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
              <DonutChart key={i} title={card.title} percentage={card.percentage} value={card.value} total={card.total} color={card.color} />
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
                        <span title={assessmentName}>{assessmentName.length > 20 ? assessmentName.substring(0, 18) + '…' : assessmentName}</span>
                      </th>
                    ))}
                  <th className="px-2 py-2 text-center">Avg (%)</th>
                </tr>
              </thead>
              <tbody>
                {learningProgress.assessment_breakup.map((row, rowIdx) => {
                  const assessmentEntries = Object.entries(row).filter(([key]) => key !== 'category_name' && key !== 'average');
                  return (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-2 py-2 font-medium whitespace-nowrap">{row.category_name}</td>
                      {assessmentEntries.map(([_, value], colIdx) => <td key={colIdx} className="px-2 py-2 text-center">{value}%</td>)}
                      <td className="px-2 py-2 text-center font-bold text-[#f97316]">{row.average}%</td>
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
    {/* ================= USAGE ANALYTICS HEADING ================= */}

<div className="flex justify-between items-center mb-3 flex-wrap gap-2">
  <h2 className="text-2xl font-bold">Usage Analytics</h2>
  <div className="flex flex-wrap gap-2">
    {/* Zone */}
    <div className="relative">
      <select
        value={uaRegion}
        onChange={(e) => setUaRegion(e.target.value)}
        className="px-2 py-1 pr-6 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-xs"
      >
        <option value="Regions">All India</option>
        {uaDropdowns.zones.map(zone => <option key={zone} value={zone}>{zone}</option>)}
      </select>
    </div>

    {/* Dealership */}
    <div className="relative">
      <select
        value={uaDealership}
        onChange={(e) => setUaDealership(e.target.value)}
        className="px-2 py-1 pr-6 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-xs"
      >
        <option value="All Dealerships">All Dealerships</option>
        {uaDropdowns.dealership.map(dealer => <option key={dealer} value={dealer}>{dealer}</option>)}
      </select>
    </div>

    {/* City */}
    <div className="relative">
      <select
        value={uaCity}
        onChange={(e) => setUaCity(e.target.value)}
        className="px-2 py-1 pr-6 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-xs"
        // disabled={uaDealership === "All Dealerships"}
      >
        <option value="All Cities">All Cities</option>
        {uaCitiesList.map(city => <option key={city} value={city}>{city}</option>)}
      </select>
    </div>

    {/* Role */}
    <div className="relative">
      <select
        value={uaRole}
        onChange={(e) => setUaRole(e.target.value)}
        className="px-2 py-1 pr-6 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-xs"
      >
        <option value="All">All Role Holders</option>
        {uaDropdowns.roles.map(role => <option key={role} value={role}>{role}</option>)}
      </select>
    </div>

    {/* User */}
    <div className="relative">
      <select
        value={uaUser}
        onChange={(e) => setUaUser(e.target.value)}
        className="px-2 py-1 pr-6 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer text-xs"
        disabled={uaUsersList.length === 0}
      >
        <option value="All Users">All Users</option>
        {uaUsersList.map(user => <option key={user} value={user}>{user}</option>)}
      </select>
    </div>

    {/* Reset Button for UA */}
    <button
      onClick={() => {
        setUaRegion("Regions");
        setUaDealership("All Dealerships");
        setUaCity("All Cities");
        setUaRole("All");
        setUaUser("All Users");
      }}
      className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium shadow-sm transition-all duration-200 flex items-center gap-1 text-xs"
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Reset
    </button>
  </div>
</div>

{/* ================= ROW 5: THREE COLUMNS (BALANCED HEIGHTS) ================= */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

{/* ========== COLUMN 1: USER CONTENT PREFERENCES ========== */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3">
  <div className="flex justify-between items-center mb-2">
    <h2 className="text-sm font-bold text-gray-800">
      User Content Preferences
    </h2>
  </div>

  {(() => {
    const prefs = contentPrefs?.preferences || [];

    if (prefs.length === 0) {
      return (
        <div className="text-center text-gray-500 py-4">
          No data available
        </div>
      );
    }

    const totalItems = prefs.reduce(
      (sum, item) => sum + Number(item.total_items || 0),
      0
    );

    const categories = prefs.map(item => item.media_type);

    const usedData = prefs.map(item =>
      Number(item.avg_percentage || 0)
    );

    return (
      <>
        {/* Summary + Chart */}
        <div className="grid grid-cols-4 gap-2 items-center mb-3">
          {/* Total Items */}
          <div className="col-span-1 flex flex-col justify-center items-center">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Total Items
            </div>
            <div className="text-3xl font-black text-[#f97316]">
              {totalItems}
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-3">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  type: "column",
                  backgroundColor: "transparent",
                  height: 250
                },

                accessibility: {
                  enabled: false
                },

                credits: {
                  enabled: false
                },

                title: {
                  text: null
                },

                xAxis: {
                  categories,
                  lineColor: "#666",
                  labels: {
                    style: {
                      fontSize: "10px"
                    }
                  }
                },

                yAxis: {
                  min: 0,
                  max: 100,
                  title: {
                    text: null
                  },
                  labels: {
                    format: "{value}%",
                    style: {
                      fontSize: "9px"
                    }
                  },
                  gridLineColor: "#e5e7eb"
                },

                legend: {
                  align: "center",
                  verticalAlign: "bottom",
                  itemStyle: {
                    fontSize: "11px"
                  }
                },

                tooltip: {
                  formatter: function () {
                    if (this.series.name === "Average % Viewed") {
                      return `
                        <b>${this.category}</b><br/>
                        Average Viewed: ${this.y.toFixed(2)}%
                      `;
                    }
                    return false;
                  }
                },

                plotOptions: {
                  column: {
                    grouping: false,
                    borderWidth: 0,
                    pointPadding: 0.15
                  }
                },

                series: [
                  // Gray Background (100%)
                  {
                    name: "Remaining % Viewed",
                    data: categories.map(() => 100),
                    color: "#e5e7eb",
                    grouping: false,
                    enableMouseTracking: false,
                    zIndex: 1
                  },

                  // Colored Fill from Bottom
                  {
                    name: "Average % Viewed",
                    data: usedData,
                    colorByPoint: true,
                    colors: contentColors,
                    grouping: false,
                    zIndex: 2,
                    dataLabels: {
                      enabled: true,
                      formatter: function () {
                        return `${Number(this.y).toFixed(2)}%`;
                      },
                      crop: false,
                      overflow: "allow",
                      inside: false,
                      style: {
                        fontSize: "9px",
                        fontWeight: "bold",
                        textOutline: "none"
                      }
                    }
                  }
                ]
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="mt-2 overflow-hidden">
          <table className="w-full text-[10px] border-collapse">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="p-1 text-center">S.No</th>
                <th className="p-1 text-left">Media Type</th>
                <th className="p-1 text-center">Total Items</th>
                <th className="p-1 text-center">Avg % Items</th>
              </tr>
            </thead>

            <tbody>
              {prefs.map((item, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }
                >
                  <td className="p-1 text-center">
                    {index + 1}
                  </td>

                  <td className="p-1">
                    <span
                      className="inline-block w-2 h-2 mr-1"
                      style={{
                        backgroundColor:
                          contentColors[
                            index % contentColors.length
                          ]
                      }}
                    />
                    {item.media_type}
                  </td>

                  <td className="p-1 text-center">
                    {item.total_items}
                  </td>

                  <td className="p-1 text-center font-bold text-[#f97316]">
                    {item.avg_items_viewed}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  })()}
</div>


<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3 overflow-hidden">
    <div className="mb-3 pb-1">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h2 className="text-sm font-bold text-gray-800">State Wise Usage Heat Map</h2>
            {/* Remove region and role selects - they now use UA filters */}
        </div>
        <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="bg-white border border-gray-200 rounded-md shadow-sm px-3 py-1">
                <div className="text-[10px] font-bold text-gray-500">Total Usage</div>
                <div className="text-xl font-black text-[#f97316]">
                    {getTotalUsage().toLocaleString()}
                </div>
            </div>
            <div className="flex items-center gap-1">
                {["all","ytd","mtd","week"].map((tab) => (
                    <button key={tab} onClick={() => setActiveUsageTab(tab)}
                        className={`px-2 py-1 rounded text-[10px] font-bold ${activeUsageTab === tab ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-700"}`}>
                        {tab === "all" ? "ALL" : tab === "ytd" ? "YTD" : tab === "mtd" ? "MTD" : "WEEK"}
                    </button>
                ))}
            </div>
        </div>
    </div>

    <div className="flex flex-col gap-2">
        <div className="flex flex-col lg:flex-row gap-2 items-start">
            <div className="w-full lg:w-[55%] rounded-xl overflow-hidden">
                <HighchartsReact highcharts={Highcharts} constructorType={"mapChart"} options={indiaHeatMapOptions} />
            </div>
            <div className="w-full lg:w-[45%] bg-white border border-gray-200 rounded-md overflow-hidden h-fit">
                <div className="overflow-y-auto max-h-[260px]">
                    <table className="w-full text-[10px]">
                        <thead className="sticky top-0">
                            <tr className="bg-[#4a4a4a] text-white">
                                <th className="px-1 py-1 text-center w-[30px]">S.No</th>
                                <th className="px-1 py-1 text-left">State</th>
                                <th className="px-1 py-1 text-center w-[60px]">
                                    {activeUsageTab === "all" ? "ALL" : activeUsageTab === "ytd" ? "YTD" : activeUsageTab === "mtd" ? "MTD" : "WEEK"}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {getFilteredTableData().map((item, i) => {
                                const top3 = getFilteredTableData().slice(0, 3);
                                const isTop = top3.some(t => t.state === item.state);
                                return (
                                    <tr key={i} className={`border-b border-gray-100 ${isTop ? "top-state-blink" : ""}`}>
                                        <td className="px-1 py-2 text-center font-semibold">{i + 1}</td>
                                        <td className="px-1 py-2 font-semibold text-gray-700">{item.state}</td>
                                        <td className={`px-1 py-2 text-center font-bold ${isTop ? "text-[#c2410c]" : "text-gray-700"}`}>{item.usage}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
{/* ========== COLUMN 3: HOURLY USAGE HEAT MAP ========== */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-3 flex flex-col h-full">
  <div className="flex justify-between items-center mb-2">
    <h2 className="text-sm font-bold text-gray-900">Hourly Usage Heat Map</h2>
    <span className="text-[10px] text-gray-500">(last 7 days)</span>
  </div>

  <div className="max-h-[500px] mt-7 overflow-y-auto">
    {/* Hours header row */}
    <div className="flex">
      <div className="w-12 bg-black text-white font-bold text-[10px] px-1 py-1 text-center sticky left-0 z-10">Hrs</div>
      <div className="flex flex-1 bg-gray-100">
        {hourlyData.hours.map((h) => {
          // Convert to 12-hour format
          const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
          const ampm = h < 12 ? 'AM' : 'PM';
          return (
            <div key={h} className="flex-1 text-center py-1">
              <div className="text-[8px] font-medium text-gray-700">{hour12}</div>
              <div className="text-[6px] text-white bg-black rounded-sm px-0.5 inline-block">{ampm}</div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Days rows */}
    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((dayLabel, idx) => {
      const fullDay = hourlyData.days[idx] || dayLabel;
      return (
        <div key={dayLabel} className="flex">
          <div className="w-12 bg-gray-100 text-[10px] font-semibold flex items-center justify-center py-1 sticky left-0 z-10">
            {dayLabel}
          </div>
          <div className="flex flex-1 bg-gray-50">
            {Array.from({ length: 24 }, (_, hour) => {
              const value = hourlyData.matrix[idx]?.[hour] || 0;
              const max = hourlyData.maxValue || 1;

              // --- Colour logic (relative intensity) ---
              const intensity = max > 0 ? value / max : 0;
             let color = "bg-gray-300";
if (intensity > 0.5) color = "bg-[#e96b35]";
else if (intensity > 0) color = "bg-[#f7d8c0]";
              // --- Alternative: absolute thresholds (uncomment to use)
              /*
              let color = "bg-gray-300";
              if (value > 15) color = "bg-[#e96b35]";
              else if (value > 10) color = "bg-[#ec8e42]";
              else if (value > 5) color = "bg-[#efc2a2]";
              else if (value > 0) color = "bg-[#f7d8c0]";
              */

              return (
                <div
                  key={hour}
                  className={`flex-1 h-4 m-0.5 rounded-sm ${color}`}
                  title={`${fullDay} ${hour}:00 – ${value} active users`}
                />
              );
            })}
          </div>
        </div>
      );
    })}

 {/* Legend – */}
    <div className="mt-10 border rounded-md p-2 flex flex-wrap gap-4 justify-center text-[9px]">
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 rounded bg-gray-300 border" />
        <span>No Usage</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 rounded bg-[#f7d8c0]" />
        <span>Low</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="h-3 w-3 rounded bg-[#e96b35]" />
        <span>Heavy</span>
      </div>
    </div>
  </div>
</div>

</div>

    </div>
  );
};

export default PerformanceAnalytics;