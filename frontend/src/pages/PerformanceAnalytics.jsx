import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReactOfficial from "highcharts-react-official";
import HighchartsMap from "highcharts/modules/map";
import mapDataIndia from "@highcharts/map-collection/countries/in/in-all.geo.json";
import './PerformanceAnalytics.css'

import "highcharts/highcharts-3d";
import Cylinder from "highcharts/modules/cylinder";

import {
  UsersIcon,
  BookOpenIcon,
  MapPinIcon,
} from "@animateicons/react/lucide";
import { FiRefreshCw } from "react-icons/fi";
import { Hourglass } from "react-loader-spinner";
import banner1 from "../assets/banner2.png";
import banner2 from "../assets/banner2.png";
import image_1 from "../assets/image_1.png";
import image_2 from "../assets/image_2.png";
import image_3 from "../assets/image_3.png";
import image_4 from "../assets/image_4.png";
import f1 from '../assets/picture40.png'
import f2 from '../assets/picture28.png'
import f3 from '../assets/picture29.png'
import h1 from '../assets/picture30.png'
import h2 from '../assets/picture31.png'
import h3 from '../assets/picture32.png'
import m1 from '../assets/picture33.png'
import m2 from '../assets/picture34.png'
import m3 from '../assets/picture35.png'
import e1 from '../assets/picture36.png'
import e2 from '../assets/picture37.png'
import e3 from '../assets/picture38.png'
import s1 from '../assets/picture16.png'
import s2 from '../assets/picture17.png'
import s3 from '../assets/picture18.png'
import s4 from '../assets/picture19.png'
import s5 from '../assets/picture20.png'
import s6 from '../assets/picture21.png'
import s7 from '../assets/picture22.png'
import s8 from '../assets/picture23.png'
import s9 from '../assets/picture24.png'
import s10 from '../assets/picture25.png'
// HighchartsMap(Highcharts);


const HighchartsReact =
  HighchartsReactOfficial.default || HighchartsReactOfficial;

const YELLOW = "#f4ae3d";

const carouselImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
];

const carouselImages2 = [
  banner1,
  banner2,
];

// ---------------- TOP CARDS ----------------
const cards = [
  {
    title: "Learning Path",
    subtitle: "Program",
    value: 20,       // completed
    total: 50,       // total courses
  },
  {
    title: "Certificates",
    value: 20,       // certified
    total: 60,       // total certificate courses
  },
  {
    title: "Assessment",
    subtitle: "Attempted",
    value: 25,       // attempted
    total: 40,       // total assessments
  },
  {
    title: "Score",
    value: 60,       // marks scored
    total: 100,      // total marks
  },
];

const userData = [
  { role: "DSC", total: 120 },
  { role: "TL", total: 121 },
  { role: "XX", total: 150 },
  { role: "XX", total: 168 },
  { role: "XX", total: 166 },
  { role: "SM", total: 275 },
];

// ---------------- REGION DATA ----------------
const regionCityData = {
  Regions: [
    ["North", 3500],
    ["South", 2500],
    ["West", 1800],
    ["East", 1200],
    ["Central", 1000],
  ],

  North: [
    ["Delhi", 1200],
    ["Chandigarh", 800],
    ["Jaipur", 700],
    ["Lucknow", 600],
    ["Noida", 400],
    ["Gurugram", 300],
    ["Amritsar", 250],
    ["Dehradun", 150],
    ["Shimla", 100],
  ],

  South: [
    ["Bangalore", 900],
    ["Chennai", 750],
    ["Hyderabad", 500],
    ["Kochi", 200],
    ["Coimbatore", 150],
  ],

  West: [
    ["Mumbai", 700],
    ["Pune", 500],
    ["Ahmedabad", 300],
    ["Surat", 200],
    ["Goa", 100],
  ],

  East: [
    ["Kolkata", 800],
    ["Bhubaneswar", 500],
    ["Patna", 400],
    ["Ranchi", 200],
  ],

  Central: [
    ["Bhopal", 350],
    ["Indore", 300],
    ["Raipur", 200],
    ["Nagpur", 150],
  ],
};

// ---------------- DONUT ----------------
const DonutChart = ({ title, value, total, color = "#f97316" }) => {
  const percentage = Math.round((value / total) * 100);

  const options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 140,
    },

    credits: { enabled: false },
    title: { text: null },
    tooltip: { enabled: false },

    plotOptions: {
      pie: {
        innerSize: "72%",
        borderWidth: 0,
        dataLabels: { enabled: false },
      },
    },

    series: [
      {
        data: [
          { y: percentage, color: color },
          { y: 100 - percentage, color: "#ececec" },
        ],
      },
    ],
  };

  return (
 <div className="bg-white rounded-md p-3 flex flex-col items-center h-[210px] shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      <div className="text-sm font-bold text-center mb-1">
        {title}
      </div>

      <div className="relative w-full">
        <HighchartsReact highcharts={Highcharts} options={options} />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>

      <div className="text-black mb-2 text-sm font-bold text-center ">
        {value} / {total}
      </div>
    </div>
  );
};

// ---------------- ASSESSMENT SCORE TABLE ----------------
const assessmentData = [
  { category: "Brand", scores: [80, 85, 90, 75, 95] },
  { category: "BAT", scores: [70, 80, 75, 85, 90] },
  { category: "SOP", scores: [90, 92, 88, 85, 91] },
  { category: "Soft Skills", scores: [85, 87, 90, 92, 88] },
  { category: "Product", scores: [78, 80, 82, 79, 85] },
];

const AssessmentScoreTable = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Assessment Score Breakup</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-500 text-white uppercase text-sm font-semibold">
            <th className="px-4 py-3 border">Categories</th>
            <th className="px-4 py-3 border">Assessment 1</th>
            <th className="px-4 py-3 border">Assessment 2</th>
            <th className="px-4 py-3 border">Assessment 3</th>
            <th className="px-4 py-3 border">Assessment 4</th>
            <th className="px-4 py-3 border">Assessment 5</th>
            <th className="px-4 py-3 border">Average Score</th>
          </tr>
        </thead>
        <tbody>
          {assessmentData.map((row, idx) => {
            const average =
              Math.round(row.scores.reduce((a, b) => a + b, 0) / row.scores.length);
            return (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="px-4 py-3 border font-medium">{row.category}</td>
                {row.scores.map((score, i) => (
                  <td key={i} className="px-4 py-3 border text-center">
                    {score}%
                  </td>
                ))}
                <td className="px-4 py-3 border text-center font-bold">
                  {average}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// ---------------- MAIN DASHBOARD ----------------
const PerformanceAnalytics = () => {
  const totalUsers = 1000;
  const totalCourses = 50;

  const [selectedRegion, setSelectedRegion] =
    useState("Regions");
    const [selectedRole, setSelectedRole] = useState("All");
    const [selectedDealership, setSelectedDealership] = useState("All");
    const [currentImage1, setCurrentImage1] = useState(0);
const [currentImage2, setCurrentImage2] = useState(0);
const [activeTab, setActiveTab] = useState(0);


React.useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage1((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, []);

React.useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage2((prev) =>
      prev === carouselImages2.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, []);

const tabs = [
  {
    title: "Fast Task Completion",
    image: image_1,
    users: [
      { rank: 1, name: "Amit Singh", photo: f1, role: "Service Advisor", dealership: "Delhi Motors" },
      { rank: 2, name: "Ravi Kumar", photo: f2, role: "Sales Manager", dealership: "Mumbai Wheels" },
      { rank: 3, name: "Sourabh Kumar", photo: f3, role: "Sales Executive", dealership: "Ahmedabad Auto" },
      { rank: 4, name: "Neha Verma", photo: s1, role: "HR Manager", dealership: "Pune Drive" },
      { rank: 5, name: "Kabir Singh", photo: s2, role: "Sales Head", dealership: "Chandigarh Cars" },
      { rank: 6, name: "Meera Nair", photo: s3, role: "Service Advisor", dealership: "Kochi Autos" },
      { rank: 7, name: "Arjun Rao", photo: s4, role: "Operations Lead", dealership: "Hyderabad Wheels" },
      { rank: 8, name: "Simran Kaur", photo: s5, role: "Marketing Lead", dealership: "Jaipur Motors" },
      { rank: 9, name: "Vikram Joshi", photo: s6, role: "Floor Manager", dealership: "Nagpur Drive" },
      { rank: 10, name: "Ananya Roy", photo: s7, role: "CRM Executive", dealership: "Kolkata Cars" },
    ]
  },
  {
    title: "Highest Scores",
    image: image_2,
    users: [
      { rank: 1, name: "Vikas Singh", photo: h1, role: "Team Leader", dealership: "Mumbai Motors" },
      { rank: 2, name: "Akash Kumar", photo: h2, role: "Sales Manager", dealership: "Delhi Autos" },
      { rank: 3, name: "Alok Sharma", photo: h3, role: "Sales Executive", dealership: "Bangalore Cars" },
      { rank: 4, name: "Isha Gupta", photo: s7, role: "HR Manager", dealership: "Pune Drive" },
      { rank: 5, name: "Rahul Nair", photo: s8, role: "Service Manager", dealership: "Chennai Wheels" },
      { rank: 6, name: "Anjali Desai", photo: s9, role: "Marketing Lead", dealership: "Ahmedabad Auto" },
      { rank: 7, name: "Suresh Reddy", photo: s10, role: "Operations Lead", dealership: "Hyderabad Motors" },
      { rank: 8, name: "Kavita Joshi", photo: s4, role: "CRM Executive", dealership: "Jaipur Cars" },
      { rank: 9, name: "Manoj Tiwari", photo: s5, role: "Floor Manager", dealership: "Lucknow Autos" },
      { rank: 10, name: "Swati Mehta", photo: s6, role: "Service Advisor", dealership: "Kochi Wheels" },
    ]
  },
  {
    title: "Maximum Certificates",
    image: image_3,
    users: [
      { rank: 1, name: "Rahul Mishra", photo: m1, role: "Team Leader", dealership: "Kolkata Motors" },
      { rank: 2, name: "Rishabh Gupta", photo: m2, role: "Sales Manager", dealership: "Chandigarh Autos" },
      { rank: 3, name: "Ajay Kumar", photo: m3, role: "Sales Executive", dealership: "Surat Cars" },
      { rank: 4, name: "Neelam Jain", photo: s10, role: "HR Manager", dealership: "Indore Drive" },
      { rank: 5, name: "Deepak Saxena", photo: s3, role: "Service Manager", dealership: "Bhopal Wheels" },
      { rank: 6, name: "Shreya Mishra", photo: s5, role: "Marketing Lead", dealership: "Lucknow Autos" },
      { rank: 7, name: "Vijay Pawar", photo: s9, role: "Operations Lead", dealership: "Nagpur Motors" },
      { rank: 8, name: "Ritu Agarwal", photo: s1, role: "CRM Executive", dealership: "Jaipur Cars" },
      { rank: 9, name: "Sunil Shetty", photo: s7, role: "Floor Manager", dealership: "Goa Autos" },
      { rank: 10, name: "Manisha Kulkarni", photo: s2, role: "Service Advisor", dealership: "Pune Wheels" },
    ]
  },
  {
    title: "Highest Engagement on LMS",
    image: image_4,
    users: [
      { rank: 1, name: "Abhishek Kumar", photo: e1, role: "Team Leader", dealership: "Noida Motors" },
      { rank: 2, name: "Varun Verma", photo: e2, role: "Sales Manager", dealership: "Gurugram Autos" },
      { rank: 3, name: "Karthik Kumar", photo: e3, role: "Sales Executive", dealership: "Faridabad Cars" },
      { rank: 4, name: "Divya Bhatia", photo: s1, role: "HR Manager", dealership: "Agra Drive" },
      { rank: 5, name: "Alok Nath", photo: s2, role: "Service Manager", dealership: "Meerut Wheels" },
      { rank: 6, name: "Preeti John", photo: s7, role: "Marketing Lead", dealership: "Varanasi Autos" },
      { rank: 7, name: "Naveen Kumar", photo:s4, role: "Operations Lead", dealership: "Allahabad Motors" },
      { rank: 8, name: "Shalini Raj", photo: s3, role: "CRM Executive", dealership: "Kanpur Cars" },
      { rank: 9, name: "Gaurav Chopra", photo: s9, role: "Floor Manager", dealership: "Dehradun Autos" },
      { rank: 10, name: "Rashmi Thakur", photo: s10, role: "Service Advisor", dealership: "Shimla Wheels" },
    ]
  },
];

  // ---------------- USER ROLE DATA ----------------
  const roleData = [
    { name: "DSE", y: 200 },
    { name: "TL", y: 100 },
    { name: "Manager", y: 150 },
    { name: "Director", y: 50 },
    { name: "VP", y: 30 },
    { name: "SVP", y: 20 },
    { name: "Executive", y: 450 },
  ];

  const dealershipData = [
  "All Dealerships",
  "Delhi Motors",
  "Mumbai Auto",
  "Punjab Wheels",
  "Chandigarh Cars",
];

  // ---------------- USER PIE ----------------
const pieOptions = {
  chart: {
    type: "pie",
    backgroundColor: "transparent",
    height: 420,
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },
  credits: {
    enabled: false,
  },
  title: {
    text: null,
  },
  tooltip: {
    formatter: function() {
      return `<b>${this.point.name}</b><br/>${this.y} users`;
    },
    followPointer: true,
  },
plotOptions: {
  pie: {
    innerSize: 100,
    depth: 45,
    dataLabels: {
      enabled: false   // ✅ removes role names and connector lines
    }
  }
},
  series: [
    {
      name: "Users",
      data: roleData,
    },
  ],
};

  // ---------------- COURSE ANALYTICS ----------------
const courseOptions = {
  chart: {
    type: "column",
    backgroundColor: "transparent",
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      depth: 50,
    },
  },
  credits: {
    enabled: false,
  },
  title: {
    text: null,
  },
  xAxis: {
    type: "category",
    labels: {
      rotation: -45,
      style: {
        fontSize: '11px'
      }
    }
  },
  yAxis: {
    title: {
      text: null,
    },
  },
  tooltip: {
    formatter: function() {
      // Show only the count in tooltip
      return '<b>' + this.y + ' Courses</b>';
    },
    followPointer: true,
  },
  plotOptions: {
    column: {
      depth: 25,
      colorByPoint: true,
      // Remove dataLabels section completely
    },
  },
  series: [
    {
      name: "Courses",
      data: [
        ["Brand", 3],
        ["BAT", 20],
        ["SOP", 2],
        ["VAS", 3],
        ["HR", 5],
        ["Tech", 10],
        ["Sales", 7],
      ],
    },
  ],
};

  // ---------------- REGION / CITY PIE ----------------
const indiaRegionOptions = {
  chart: {
    type: "pie",
    backgroundColor: "transparent",
    height: 420,
    options3d: {
      enabled: true,
      alpha: 45,
    },
  },

  title: {
    text:
      selectedRegion === "Regions"
        ? "India Region Usage Share - 2026"
        : `${selectedRegion} Cities Usage Share`,
  },

  subtitle: {
    text:
      selectedRegion === "Regions"
        ? "Click a region to view cities"
        : "City analytics distribution",
  },

  credits: {
    enabled: false,
  },

  tooltip: {
    // Fixed tooltip to show name and hours
    formatter: function() {
       return '<b>' + this.y + ' hours</b>';
    },
    followPointer: true,
  },

  plotOptions: {
    pie: {
      innerSize: 100,
      depth: 45,
      allowPointSelect: true,
      cursor: "pointer",

      dataLabels: {
        enabled: true,
        // SHOW HOURS IN LABEL
        format: "{point.name}",
        style: {
          fontWeight: "bold",
          color: "#000",
        },
      },

      point: {
        events: {
          click: function () {
            if (selectedRegion === "Regions") {
              setSelectedRegion(this.name);
            }
          },
        },
      },
    },
  },

  series: [
    {
      name: "Usage",
      data: regionCityData[selectedRegion].map((item) => ({
        name: item[0],
        y: item[1], // hours
      })),
    },
  ],
};

// ---------------- INDIA HEAT MAP ----------------
const indiaHeatMapOptions = {
  chart: {
    map: mapDataIndia,
    backgroundColor: "transparent",
    height: 500,
events: {
  render: function () {
    const chart = this;

    chart.series[0].points.forEach((point) => {

      if (point.graphic && point.graphic.element) {

        // REMOVE OLD CLASS FIRST
        point.graphic.element.classList.remove(
          "highcharts-point-dark-orange"
        );

        // ADD BLINK TO HIGH USER STATES
        if (point.value >= 160) {
          point.graphic.element.classList.add(
            "highcharts-point-dark-orange"
          );
        }
      }
    });
  },
},
  },

  title: {
    text: "India Heat Map (Usage Intensity)",
  },

  credits: {
    enabled: false,
  },

  colorAxis: {
    min: 0,
    max: 200,
    stops: [
      [0, '#fff7ed'],   // Very Light Orange - low usage (0-30)
      [0.15, '#ffedd5'], // Light Orange (30-60)
      [0.3, '#fed7aa'],  // Light-Medium Orange (60-90)
      [0.5, '#fdba74'],  // Medium Orange (90-120)
      [0.7, '#f97316'],  // Orange (120-150)
      [0.85, '#ea580c'], // Dark Orange (150-180)
      [1, '#c2410c']     // Very Dark Orange (180-200)
    ],
  },

  tooltip: {
    formatter: function() {
      return '<b>' + this.point.name + '</b><br/>' +
             'Users: <b>' + this.point.value + '</b>';
    },
    borderWidth: 2,
    borderColor: '#ea580c',
    borderRadius: 8,
    padding: 10,
    style: {
      fontSize: '12px',
      fontWeight: 'bold'
    }
  },

  series: [
    {
      data: [
        ["in-dl", 195],   // Delhi - 195 users (Always Blink)
        ["in-mh", 185],   // Maharashtra - 185 users (Always Blink)
        ["in-ka", 175],   // Karnataka - 175 users (Always Blink)
        ["in-tn", 185],   // Tamil Nadu - 165 users (Always Blink)
        ["in-up", 160],   // Uttar Pradesh - 160 users (Always Blink)
        ["in-gj", 120],   // Gujarat - 140 users (No Blink)
        ["in-wb", 110],   // West Bengal - 110 users (No Blink)
        ["in-rj", 85],    // Rajasthan - 85 users (No Blink)
        ["in-mp", 65],    // Madhya Pradesh - 65 users (No Blink)
        ["in-kl", 50],    // Kerala - 50 users (No Blink)
        ["in-pb", 40],    // Punjab - 40 users (No Blink)
        ["in-hr", 30],    // Haryana - 30 users (No Blink)
        ["in-br", 25],    // Bihar - 25 users (No Blink)
        ["in-or", 20],    // Odisha - 20 users (No Blink)
        ["in-jk", 15],    // Jammu & Kashmir - 15 users (No Blink)
        ["in-as", 10],    // Assam - 10 users (No Blink)
        ["in-hp", 8],     // Himachal Pradesh - 8 users (No Blink)
        ["in-ut", 5]      // Uttarakhand - 5 users (No Blink)
      ],
      name: "Users",
      joinBy: "hc-key",
      states: {
        hover: {
          enabled: true,
          brightness: 0.2,
          color: '#ff6b6b'
        }
      },
      dataLabels: {
        enabled: false
      },
      borderWidth: 1,
      borderColor: '#ffffff'
      // Remove point.events section completely
    },
  ],
};

  return (
    <div className="min-h-screen bg-[#f7f7f7] px-6 py-10">
<div className="flex justify-between items-center mb-5">
  <h2 className="text-3xl font-bold">Leaderboards</h2>

<div className="flex gap-4">
  {/* Filter 1: Region / India */}
  <div className="relative">
    <select
      value={selectedRegion}
      onChange={(e) => setSelectedRegion(e.target.value)}
      className="px-5 py-2.5 pr-10 rounded-md bg-white shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-[#f4ae3d] focus:border-transparent
                 hover:bg-gray-50 transition-all duration-200 cursor-pointer
                 font-medium text-gray-700 appearance-none"
    >
      <option value="Regions">All India</option>
      {Object.keys(regionCityData)
        .filter((r) => r !== "Regions")
        .map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Filter 2: Role */}
  <div className="relative">
    <select
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
      className="px-5 py-2.5 pr-10 rounded-md bg-white shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-[#f4ae3d] focus:border-transparent
                 hover:bg-gray-50 transition-all duration-200 cursor-pointer
                 font-medium text-gray-700 appearance-none"
    >
      <option value="All">All Role Holders</option>
      {roleData.map((role) => (
        <option key={role.name} value={role.name}>
          {role.name}
        </option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* ✅ Filter 3: Dealership */}
  <div className="relative">
    <select
      value={selectedDealership}
      onChange={(e) => setSelectedDealership(e.target.value)}
      className="px-5 py-2.5 pr-10 rounded-md bg-white shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-[#f4ae3d] focus:border-transparent
                 hover:bg-gray-50 transition-all duration-200 cursor-pointer
                 font-medium text-gray-700 appearance-none"
    >
      {dealershipData.map((dealer) => (
        <option key={dealer} value={dealer}>
          {dealer}
        </option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>
</div>
{/* ================= ROW 1 ================= */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8 items-stretch">

  {/* ========== LEFT COLUMN ========== */}
  <div className="flex flex-col h-full gap-2">

    {/* ---- TOP : 4 BOXES ---- */}
    <div className="grid grid-cols-4 gap-2">
      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => setActiveTab(i)}
          className={`cursor-pointer rounded-md shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-2 text-center text-[11px] font-semibold  transition
            ${
              activeTab === i
                ? "bg-[#f97316] text-white"
                : "bg-white hover:bg-gray-100"
            }`}
        >
          {tab.title}
        </div>
      ))}
    </div>

    {/* ---- IMAGE (SLIGHTLY REDUCED HEIGHT) ---- */}
    <div className="relative flex-1 max-h-[280px] rounded-md overflow-hidden shadow-md">
      <img
        src={tabs[activeTab].image}
        alt="Metric"
        className="w-full h-full object-cover"
      />
    </div>

  </div>

{/* ========== RIGHT : LISTING ========== */}
<div className="bg-white rounded-md shadow-md h-full flex flex-col overflow-hidden">

  {/* HEADER */}
  <div className="px-6 py-3 border-b border-[#eeeeee]">
    <h2 className="text-lg font-bold">{tabs[activeTab].title} - Top Performers</h2>
  </div>

  {/* FIXED HEIGHT SCROLL AREA (shows 10 rows) */}
  <div className="h-[240px] overflow-y-auto">
    <table className="w-full text-sm">
      
      {/* TABLE HEADER */}
      <thead className="sticky top-0 bg-white z-10">
        <tr className="border-b border-[#eeeeee] ">
          <th className="px-6 py-2 text-left">Rank</th>
          <th className="px-6 py-2 text-left">Name</th>
          <th className="px-6 py-2 text-left">User Photo</th>
          <th className="px-6 py-2 text-left">Role Holder</th>
          <th className="px-6 py-2 text-center">Dealership</th>
         </tr>
      </thead>

      {/* TABLE BODY - DYNAMIC BASED ON ACTIVE TAB */}
      <tbody>
        {tabs[activeTab].users.map((u, i) => (
          <tr
            key={i}
            className="border-b border-[#eeeeee] last:border-none hover:bg-gray-50"
          >
            <td className="px-6 py-3">{u.rank}</td>
            <td className="px-6 py-3">{u.name}</td>
            <td className="px-6 py-3">
              <img
                src={u.photo}
                alt={u.name}
                className="w-10 h-10 border rounded-full object-cover"
              />
            </td>
            <td className="px-6 py-3">{u.role}</td>
            <td className="px-6 py-3 text-center">
              {u.dealership}
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>

</div>

{/* ROW 2 */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

  {/* LEFT SIDE - DONUTS */}
  <div className="xl:col-span-2">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <DonutChart key={i} {...c} />
      ))}
    </div>
  </div>

  {/* RIGHT SIDE - IMAGE CAROUSEL */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden h-[210px] relative">

    <img
      src={carouselImages[currentImage1]}
      alt="banner"
      className="w-full h-full object-cover transition-all duration-700"
    />

    {/* Overlay */}
    <div className="absolute inset-0 rounded-md flex flex-col justify-end p-6">
      <h2 className="text-white text-2xl font-bold">
        Learning Analytics
      </h2>

      <p className="text-white text-sm mt-1">
        Performance & engagement insights
      </p>
    </div>

    {/* Dots */}
    <div className="absolute bottom-4 right-4 flex gap-2">
      {carouselImages.map((_, idx) => (
        <div
          key={idx}
          className={`w-3 h-3 rounded-full ${
            currentImage1 === idx
              ? "bg-white"
              : "bg-white/40"
          }`}
        />
      ))}
    </div>
  </div>
</div>

{/* ROW 3*/}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">

  {/* ================= USER ANALYTICS ================= */}
  <div className="bg-white  rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col">

    <h2 className="text-base font-bold text-gray-800 mb-3">
      User Analytics
    </h2>

    {/* ========== TOP SECTION ========== */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
{/* KPI CARD - TOTAL USERS */}
<div className="px-3 py-3 flex flex-col flex-1 min-h-[125px]">

  <div className="flex-1 flex flex-col justify-center items-center text-center">

    {/* LABEL (INCREASED SIZE) */}
    <div className="text-[16px] font-bold text-gray-700 mb-2">
      Total Users
    </div>

    {/* BIG COUNT */}
    <div className="text-5xl font-black text-[#f97316] leading-none">
      {totalUsers.toLocaleString()}
    </div>

    {/* SUB TEXT */}
    <div className="text-[11px] italic text-gray-600 mt-2">
      Last updated <span className="font-bold">2hr ago</span>
    </div>

    {/* LOADER */}
    <div className="mt-3">
      <Hourglass
        visible={true}
        height="30"
        width="30"
        colors={["#f97316", "#fdba74"]}
      />
    </div>

  </div>

</div>

      {/* PIE CHART */}
      <div className="md:col-span-2 h-[240px] flex items-center justify-center overflow-hidden">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...pieOptions,
            chart: {
              ...pieOptions.chart,
              height: 240,
              backgroundColor: "transparent",
            },
          }}
        />
      </div>

    </div>

    {/* ========== BOTTOM TABLE ========== */}
<div className="mt-3 overflow-hidden">
  <table className="w-full text-[11px] border-collapse">

    {/* HEADER */}
    <thead>
      <tr className="bg-gray-600 text-white">
        <th className="p-2 text-center">S.No</th>
        <th className="p-2 text-center"></th> {/* Dot column */}
        <th className="p-2 text-center w-[100px]">Role</th>
        <th className="p-2 text-center">Count</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {roleData.map((role, i) => {
        const colors = [
          "#f97316","#0f766e","#84cc16",
          "#ea580c","#eab308","#60a5fa","#8b5cf6"
        ];

        return (
          <tr
            key={i}
            className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
          >
            {/* NO */}
            <td className="p-1 text-center font-medium">
              {i + 1}
            </td>

            {/* COLOR DOT COLUMN */}
           <td className="p-1 text-center">
  <div className="flex justify-end items-center">
    <span
      className="w-3 h-3 text-center"
      style={{ backgroundColor: colors[i % colors.length] }}
    />
  </div>
</td>

            {/* ROLE TEXT — TRUE CENTER */}
            <td className="p-1 text-center font-medium truncate">
              {role.name}
            </td>

            {/* COUNT */}
            <td className="p-1 text-center font-bold">
              {role.y}
            </td>
          </tr>
        );
      })}
    </tbody>

  </table>
</div>

  </div>

  {/* ================= COURSE ANALYTICS ================= */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col">

    <h2 className="text-base font-bold text-gray-800 mb-3">
      Course Analytics
    </h2>

    {/* ========== TOP SECTION ========== */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">

      {/* KPI CARD - TOTAL COURSES */}
    <div className="px-3 py-3 flex flex-col flex-1 min-h-[125px]">

  <div className="flex-1 flex flex-col justify-center items-center text-center">

    {/* LABEL (INCREASED SIZE) */}
    <div className="text-[16px] font-bold text-gray-700 mb-2">
      Total Courses
    </div>

    {/* BIG COUNT */}
    <div className="text-5xl font-black text-[#f97316] leading-none">
      {courseOptions.series[0].data.reduce((s, i) => s + i[1], 0)}
    </div>

    {/* SUB TEXT */}
    <div className="text-[11px] italic text-gray-600 mt-2">
       Last updated <span className="font-bold">2hr ago</span>
    </div>

    {/* LOADER */}
    <div className="mt-3">
      <Hourglass
        visible={true}
        height="30"
        width="30"
        colors={["#f97316", "#fdba74"]}
      />
    </div>

  </div>

</div>

      {/* BAR CHART */}
      <div className="md:col-span-2 h-[240px] flex items-center justify-center overflow-hidden">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...courseOptions,
            chart: {
              ...courseOptions.chart,
              height: 240,
              backgroundColor: "transparent",
            },
          }}
        />
      </div>

    </div>

    {/* ========== BOTTOM TABLE ========== */}
<div className="mt-3 overflow-hidden">
  <table className="w-full text-[11px] border-collapse">

    {/* HEADER */}
    <thead>
      <tr className="bg-gray-600 text-white">
        <th className="p-2 text-center">S.No</th>
        <th className="p-2 text-center"></th> {/* Dot column */}
        <th className="p-2 text-center w-[100px]">Course</th>
        <th className="p-2 text-center">Count</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {courseOptions.series[0].data.map((c, i) => {
        const colors = [
          "#f59e0b","#3b82f6","#10b981",
          "#8b5cf6","#ef4444","#f97316","#ec4899"
        ];

        return (
          <tr
            key={i}
            className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
          >
            {/* NO */}
            <td className="p-1 text-center font-medium">
              {i + 1}
            </td>

            {/* DOT COLUMN (same as Role) */}
            <td className="p-1 text-center">
              <div className="flex justify-end items-center">
                <span
                  className="w-3 h-3"
                  style={{ backgroundColor: colors[i % colors.length] }}
                />
              </div>
            </td>

            {/* COURSE TEXT */}
            <td className="p-1 text-center font-medium truncate">
              {c[0]}
            </td>

            {/* COUNT */}
            <td className="p-1 text-center font-bold">
              {c[1]}
            </td>
          </tr>
        );
      })}
    </tbody>

  </table>
</div>

  </div>

</div>

{/* ROW 4 */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6 items-stretch">

{/* ================= LEFT SIDE ================= */}
<div className="flex flex-col gap-5 h-[520px]">

  {/* ================= TOP CAROUSEL ================= */}
 <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden h-[240px] relative">

    {/* IMAGE */}
    <img
     src={carouselImages2[currentImage2]}
      alt="analytics-banner"
      className="w-full h-full object-cover transition-all duration-700"
    />



    {/* DOTS */}
    <div className="absolute bottom-4 right-4 flex gap-2">
      {carouselImages2.map((_, idx) => (
        <div
          key={idx}
          className={`w-3 h-3 rounded-full ${
            currentImage2 === idx
              ? "bg-white"
              : "bg-white/40"
          }`}
        />
      ))}
    </div>

  </div>

  {/* ================= ASSESSMENT SCORE BREAKUP ================= */}
 <div className="bg-white  rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 h-[260px] overflow-hidden flex flex-col">

    <h2 className="text-base font-bold  text-gray-800">
      Assessment Score Breakup
    </h2>

    <div className="overflow-hidden flex-1">

      <table className="w-full table-auto border-collapse text-[10px]">

        <thead>
          <tr className="bg-gray-600 text-white uppercase font-semibold">

            <th className="px-2 py-2 ">
              Categories
            </th>

            <th className="px-2 py-2 ">A1</th>
            <th className="px-2 py-2 ">A2</th>
            <th className="px-2 py-2 ">A3</th>
            <th className="px-2 py-2 ">A4</th>
            <th className="px-2 py-2 ">A5</th>

            <th className="px-2 py-2 ">
              Avg
            </th>

          </tr>
        </thead>

        <tbody>
          {assessmentData.map((row, idx) => {
            const average = Math.round(
              row.scores.reduce((a, b) => a + b, 0) /
              row.scores.length
            );

            return (
              <tr
                key={idx}
                className={
                  idx % 2 === 0
                    ? "bg-gray-50"
                    : "bg-white"
                }
              >

                <td className="px-2 py-2 text-center font-semibold whitespace-nowrap">
                  {row.category}
                </td>

                {row.scores.map((score, i) => (
                  <td
                    key={i}
                    className="px-2 py-2  text-center"
                  >
                    {score}%
                  </td>
                ))}

                <td className="px-2 py-2  text-center font-bold text-[#f97316]">
                  {average}%
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>

    </div>

  </div>

</div>

  {/* ================= INDIA HEAT MAP ================= */}
  <div className="bg-white  rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 h-[520px] overflow-hidden flex flex-col">

    <h2 className="text-base font-bold mb-3 text-gray-800">
      India Heat Map
    </h2>

    <div className="flex flex-col lg:flex-row gap-3 flex-1 overflow-hidden">

{/* ACTIVE USERS + STATES SECTION */}
<div className="lg:w-[32%] flex flex-col gap-3 h-full">

<div className="px-3 py-3 flex flex-col flex-1 min-h-[125px]">

  <div className="flex-1 flex flex-col justify-center items-center text-center">

    {/* LABEL (INCREASED SIZE) */}
    <div className="text-[16px] font-bold text-gray-700 mb-2">
     Active Users
    </div>

    {/* BIG COUNT */}
    <div className="text-5xl font-black text-[#f97316] leading-none">
      {totalUsers.toLocaleString()}
    </div>

    {/* SUB TEXT */}
    <div className="text-[11px] italic text-gray-600 mt-2">
       Across <span className="font-bold">18 States</span>
    </div>

    {/* LOADER */}
    <div className="mt-3">
      <Hourglass
        visible={true}
        height="30"
        width="30"
        colors={["#f97316", "#fdba74"]}
      />
    </div>

  </div>

</div>

{/* ================= TOP STATES LIST ================= */}
<div className="overflow-hidden flex-1 bg-white">

  <table className="w-full h-full text-[9px]">

 <thead>
  <tr className="bg-[#4a4a4a] text-white uppercase font-semibold">

    <th className="px-2 py-1.5 text-center  w-[35px] leading-4">
      No
    </th>

    <th className="px-2 py-1.5 text-center  leading-4">
      State
    </th>

    <th className="px-2 py-1.5 text-center  w-[55px] leading-4">
      Users
    </th>

  </tr>
</thead>

    {/* BODY */}
    <tbody>
      {indiaHeatMapOptions.series[0].data
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map((item, i) => {

          const stateNameMap = {
            "in-dl": "Delhi",
            "in-mh": "Maharashtra",
            "in-ka": "Karnataka",
            "in-tn": "Tamil Nadu",
            "in-up": "Uttar Pradesh",
            "in-gj": "Gujarat",
            "in-wb": "West Bengal",
            "in-rj": "Rajasthan",
            "in-mp": "Madhya Pradesh",
            "in-kl": "Kerala",
            "in-pb": "Punjab",
            "in-hr": "Haryana",
            "in-br": "Bihar",
            "in-or": "Odisha",
            "in-jk": "Jammu & Kashmir",
            "in-as": "Assam",
            "in-hp": "Himachal Pradesh",
            "in-ut": "Uttarakhand",
          };

          const users = item[1];

          // SAME COLOR LOGIC AS HEATMAP
          let stateColor = "#fff7ed";

          if (users >= 180) {
            stateColor = "#c2410c";
          } else if (users >= 150) {
            stateColor = "#ea580c";
          } else if (users >= 120) {
            stateColor = "#f97316";
          } else if (users >= 90) {
            stateColor = "#fdba74";
          } else if (users >= 60) {
            stateColor = "#fed7aa";
          } else if (users >= 30) {
            stateColor = "#ffedd5";
          }

          // TOP STATES BLINK
          const isBlinking = users >= 160;

          return (
            <tr
              key={i}
            className={`hover:bg-gray-200 transition ${
  isBlinking ? "top-state-blink" : ""
}`}
            >

              {/* SERIAL */}
              <td className=" px-1 py-[3px] text-center font-semibold text-gray-800">
                {i + 1}
              </td>

              {/* STATE */}
              <td className=" px-1 py-[3px]">

                <div className="flex items-center gap-1 font-medium text-gray-700">

                  {/* COLOR DOT */}
                  <span
                 className={`w-2 h-2 rounded-full flex-shrink-0 ${
  isBlinking ? "top-state-dot-blink" : ""
}`}
                    style={{
                      backgroundColor: stateColor,
                    }}
                  />

                  <span className="truncate  font-semibold">
                    {stateNameMap[item[0]]}
                  </span>

                </div>

              </td>

              {/* USERS */}
              <td
                className={` px-1 py-[3px] text-center font-bold ${
                  isBlinking
                    ? "text-[#c2410c]"
                    : "text-gray-800"
                }`}
              >
                {users}
              </td>

            </tr>
          );
        })}
    </tbody>

  </table>

</div>

</div>

      {/* MAP */}
      <div className="lg:w-[68%] h-full overflow-hidden rounded-2xl">

        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"mapChart"}
          options={{
            ...indiaHeatMapOptions,
            chart: {
              ...indiaHeatMapOptions.chart,
              height: 450,
              backgroundColor: "transparent",
            },
          }}
        />

      </div>

    </div>

  </div>

</div>

{/* ================= ROW 5 (Left: India City Usage | Right: Role Holder + Weekly Usage) ================= */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6 items-stretch auto-rows-fr">

  {/* ================= LEFT COLUMN: INDIA CITY USAGE ================= */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col min-h-[820px]">

    {/* TITLE */}
    <h2 className="text-base font-bold text-gray-800 mb-3">
      India City Usage
    </h2>

    {/* TOP SECTION */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">

      {/* KPI CARD */}
      <div className="px-3 py-3 flex flex-col flex-1 min-h-[125px]">

        <div className="flex-1 flex flex-col justify-center items-center text-center">

          <div className="text-[16px] font-bold text-gray-700 mt-2">
            {selectedRegion === "Regions"
              ? "All India Usage"
              : `${selectedRegion} Region`}
          </div>

          <div className="text-4xl font-black text-[#10b981] leading-none mt-2">
            {selectedRegion === "Regions"
              ? Object.keys(regionCityData)
                  .filter((r) => r !== "Regions")
                  .reduce(
                    (sum, r) =>
                      sum + regionCityData[r].reduce((a, b) => a + b[1], 0),
                    0
                  )
              : regionCityData[selectedRegion].reduce(
                  (sum, city) => sum + city[1],
                  0
                )}
          </div>

          <div className="text-[11px] italic text-gray-600 mt-2">
            Total Usage Hours
          </div>

          <div className="mt-3">
            <Hourglass
              visible={true}
              height="30"
              width="30"
              colors={["#10b981", "#6ee7b7"]}
            />
          </div>

          {selectedRegion !== "Regions" && (
            <button
              onClick={() => setSelectedRegion("Regions")}
              className="mt-3 px-4 py-1 bg-black text-white text-[10px] rounded-md"
            >
              Back
            </button>
          )}

        </div>
      </div>

      {/* PIE CHART */}
      <div className="md:col-span-2 h-[320px] flex items-center justify-center overflow-hidden">

        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "pie",
              backgroundColor: "transparent",
              height: 320,
              options3d: {
                enabled: true,
                alpha: 45,
              },
            },
            title: {
              text: null,
            },
            subtitle: {
              text: null,
            },
            credits: {
              enabled: false,
            },
            tooltip: {
              formatter: function () {
                return (
                  "<b>" +
                  this.point.name +
                  "</b><br/>" +
                  this.y +
                  " hours"
                );
              },
              followPointer: true,
            },
            plotOptions: {
              pie: {
                innerSize: 100,
                depth: 45,
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                  enabled: false,
                },
                point: {
                  events: {
                    click: function () {
                      if (selectedRegion === "Regions") {
                        setSelectedRegion(this.name);
                      }
                    },
                  },
                },
              },
            },
            series: [
              {
                name: "Usage",
                data: regionCityData[selectedRegion].map((item) => ({
                  name: item[0],
                  y: item[1],
                })),
              },
            ],
          }}
        />

      </div>
    </div>

    {/* TABLE */}
    <div className="mt-5 overflow-hidden flex-1">

      <table className="w-full text-[11px] border-collapse">

        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="p-2 text-center">S.No</th>
            <th className="p-2 text-center"></th>
            <th className="p-2 text-center">City / Region</th>
            <th className="p-2 text-center">Hours</th>
          </tr>
        </thead>

        <tbody>
          {regionCityData[selectedRegion].map((item, i) => {

            const colors = [
              "#10b981",
              "#06b6d4",
              "#f97316",
              "#8b5cf6",
              "#ef4444",
              "#eab308",
              "#3b82f6",
            ];

            return (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >

                <td className="p-2 text-center font-medium">
                  {i + 1}
                </td>

                <td className="p-2 text-center">
                  <div className="flex justify-center items-center">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor:
                          colors[i % colors.length],
                      }}
                    />
                  </div>
                </td>

                <td className="p-2 text-center font-medium truncate">
                  {item[0]}
                </td>

                <td className="p-2 text-center font-bold">
                  {item[1]} hrs
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>

    </div>

  </div>

  {/* ================= RIGHT COLUMN ================= */}
  <div className="flex flex-col gap-5 min-h-[820px]">

    {/* ================= TOP: ROLE HOLDER USAGE ================= */}
    <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex-1 overflow-hidden flex flex-col">

      <h2 className="text-base font-bold mb-2 text-gray-800">
        Role Holder Usage (Last 24 Hours)
      </h2>

      <div className="flex-1 min-h-0">

        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "bubble",
              backgroundColor: "transparent",
              height: 320,
              plotBorderWidth: 1,
              zooming: {
                type: "xy",
              },
            },

            title: {
              text: null,
            },

            credits: {
              enabled: false,
            },

            legend: {
              enabled: false,
            },

            xAxis: {
              gridLineWidth: 1,
              title: {
                text: "Role Holders",
                style: {
                  fontSize: "11px",
                  fontWeight: "bold",
                },
              },
              categories: [
                "DSE",
                "TL",
                "SM",
                "DSC",
                "VP",
                "EXE",
                "MGR",
              ],
              labels: {
                style: {
                  fontSize: "10px",
                  fontWeight: "bold",
                },
                rotation: -45,
              },
            },

            yAxis: {
              min: 1,
              max: 24,
              tickInterval: 2,
              gridLineWidth: 1,
              title: {
                text: "Hour of Day",
                style: {
                  fontSize: "11px",
                  fontWeight: "bold",
                },
              },
              labels: {
                format: "{value}:00",
                style: {
                  fontSize: "9px",
                },
              },
            },

            tooltip: {
              useHTML: true,
              pointFormat:
                "<b>{point.role}</b><br/>" +
                "Peak Hour: {point.y}:00<br/>" +
                "Activity Level: {point.z}%",
            },

            plotOptions: {
              bubble: {
                minSize: 15,
                maxSize: 60,
              },
              series: {
                color: "#f97316",
                dataLabels: {
                  enabled: true,
                  format: "{point.name}",
                  style: {
                    fontSize: "9px",
                    fontWeight: "bold",
                  },
                },
              },
            },

            series: [
              {
                data: [
                  { x: 0, y: 14, z: 92, name: "DSE", role: "Digital Sales Executive" },
                  { x: 1, y: 10, z: 78, name: "TL", role: "Team Leader" },
                  { x: 2, y: 16, z: 85, name: "SM", role: "Sales Manager" },
                  { x: 3, y: 6, z: 45, name: "DSC", role: "Digital Sales Coordinator" },
                  { x: 4, y: 22, z: 35, name: "VP", role: "Vice President" },
                  { x: 5, y: 11, z: 95, name: "EXE", role: "Executive" },
                  { x: 6, y: 19, z: 72, name: "MGR", role: "Manager" },
                ],
              },
            ],
          }}
        />

      </div>
    </div>

    {/* ================= BOTTOM: WEEKLY USAGE ================= */}
    <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex-1 overflow-hidden flex flex-col">

      <h2 className="text-base font-bold mb-2 text-gray-800">
        Weekly Usage (Monday to Sunday)
      </h2>

      <div className="flex-1 min-h-0">

        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "bubble",
              backgroundColor: "transparent",
              height: 320,
              plotBorderWidth: 1,
              zooming: {
                type: "xy",
              },
            },

            title: {
              text: null,
            },

            credits: {
              enabled: false,
            },

            legend: {
              enabled: false,
            },

            xAxis: {
              categories: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              labels: {
                rotation: -45,
                style: {
                  fontSize: "10px",
                  fontWeight: "bold",
                },
              },
            },

            yAxis: {
              title: {
                text: "Active Users",
                style: {
                  fontSize: "11px",
                  fontWeight: "bold",
                },
              },
              gridLineWidth: 1,
            },

            tooltip: {
              useHTML: true,
              pointFormat:
                "<b>{point.day}</b><br/>" +
                "Users: {point.y}<br/>" +
                "Engagement: {point.z}%",
            },

            plotOptions: {
              bubble: {
                minSize: 15,
                maxSize: 60,
              },
              series: {
                dataLabels: {
                  enabled: true,
                  format: "{point.name}",
                  style: {
                    fontSize: "9px",
                    fontWeight: "bold",
                  },
                },
              },
            },

            series: [
              {
                data: [
                  { x: 0, y: 120, z: 65, name: "Mon", day: "Monday" },
                  { x: 1, y: 150, z: 72, name: "Tue", day: "Tuesday" },
                  { x: 2, y: 180, z: 78, name: "Wed", day: "Wednesday" },
                  { x: 3, y: 200, z: 85, name: "Thu", day: "Thursday" },
                  { x: 4, y: 170, z: 80, name: "Fri", day: "Friday" },
                  { x: 5, y: 90, z: 45, name: "Sat", day: "Saturday" },
                  { x: 6, y: 75, z: 38, name: "Sun", day: "Sunday" },
                ],
              },
            ],
          }}
        />

      </div>
    </div>

  </div>

</div>
    </div>
  );
};

export default PerformanceAnalytics;