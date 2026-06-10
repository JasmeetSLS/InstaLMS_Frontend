import React, { useState } from "react";
import HighchartsReactOfficial from "highcharts-react-official";

// Use the global Highcharts from CDN
const Highcharts = window.Highcharts;

const HighchartsReact = HighchartsReactOfficial.default || HighchartsReactOfficial;


// Rest of your imports...
import "./PerformanceAnalytics.css";
// ... etc

import { FaMapMarkedAlt, FaMapMarkerAlt ,FaUserPlus, FaUserCheck, FaUserSlash, FaTimesCircle, FaCheckCircle, FaBook} from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

import IndiaMap from "../assets/india_green.png";

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

// ================= ROLE WISE USAGE HIERARCHY =================

const roleUsageHierarchy = {
  // ================= ALL INDIA =================
  All: {
    roles: [
      { role: "DSE", hours: 4291 },
      { role: "TL", hours: 3117 },
      { role: "RSE", hours: 2824 },
      { role: "DSM", hours: 2200 },
      { role: "GM", hours: 2568 },
    ],
  },

  // ================= NORTH REGION =================
  North: {
    roles: [
      { role: "DSE", hours: 1540 },
      { role: "TL", hours: 1136 },
      { role: "RSE", hours: 1029 },
      { role: "DSM", hours: 802 },
      { role: "GM", hours: 936 },
    ],

    cities: {
      Delhi: [
        { role: "DSE", hours: 440 },
        { role: "TL", hours: 330 },
        { role: "RSE", hours: 294 },
        { role: "DSM", hours: 255 },
        { role: "GM", hours: 216 },
      ],
      Chandigarh: [
        { role: "DSE", hours: 349 },
        { role: "TL", hours: 275 },
        { role: "RSE", hours: 239 },
        { role: "DSM", hours: 182 },
        { role: "GM", hours: 162 },
      ],
      Jaipur: [
        { role: "DSE", hours: 404 },
        { role: "TL", hours: 293 },
        { role: "RSE", hours: 257 },
        { role: "DSM", hours: 200 },
        { role: "GM", hours: 180 },
      ],
      Lucknow: [
        { role: "DSE", hours: 220 },
        { role: "TL", hours: 147 },
        { role: "RSE", hours: 129 },
        { role: "DSM", hours: 91 },
        { role: "GM", hours: 108 },
      ],
      Noida: [
        { role: "DSE", hours: 128 },
        { role: "TL", hours: 92 },
        { role: "RSE", hours: 110 },
        { role: "DSM", hours: 73 },
        { role: "GM", hours: 90 },
      ],
    },
  },

  // ================= SOUTH REGION =================
  South: {
    roles: [
      { role: "DSE", hours: 1431 },
      { role: "TL", hours: 1027 },
      { role: "RSE", hours: 918 },
      { role: "DSM", hours: 728 },
      { role: "GM", hours: 828 },
    ],

    cities: {
      Bangalore: [
        { role: "DSE", hours: 514 },
        { role: "TL", hours: 403 },
        { role: "RSE", hours: 330 },
        { role: "DSM", hours: 273 },
        { role: "GM", hours: 234 },
      ],
      Chennai: [
        { role: "DSE", hours: 440 },
        { role: "TL", hours: 330 },
        { role: "RSE", hours: 294 },
        { role: "DSM", hours: 218 },
        { role: "GM", hours: 180 },
      ],
      Hyderabad: [
        { role: "DSE", hours: 477 },
        { role: "TL", hours: 293 },
        { role: "RSE", hours: 257 },
        { role: "DSM", hours: 237 },
        { role: "GM", hours: 198 },
      ],
      Kochi: [
        { role: "DSE", hours: 202 },
        { role: "TL", hours: 147 },
        { role: "RSE", hours: 129 },
        { role: "DSM", hours: 109 },
        { role: "GM", hours: 101 },
      ],
      Coimbatore: [
        { role: "DSE", hours: 165 },
        { role: "TL", hours: 110 },
        { role: "RSE", hours: 92 },
        { role: "DSM", hours: 73 },
        { role: "GM", hours: 65 },
      ],
    },
  },

  // ================= WEST REGION =================
  West: {
    roles: [
      { role: "DSE", hours: 1321 },
      { role: "TL", hours: 953 },
      { role: "RSE", hours: 881 },
      { role: "DSM", hours: 655 },
      { role: "GM", hours: 756 },
    ],

    cities: {
      Mumbai: [
        { role: "DSE", hours: 550 },
        { role: "TL", hours: 440 },
        { role: "RSE", hours: 367 },
        { role: "DSM", hours: 255 },
        { role: "GM", hours: 216 },
      ],
      Pune: [
        { role: "DSE", hours: 404 },
        { role: "TL", hours: 293 },
        { role: "RSE", hours: 275 },
        { role: "DSM", hours: 200 },
        { role: "GM", hours: 180 },
      ],
      Ahmedabad: [
        { role: "DSE", hours: 367 },
        { role: "TL", hours: 220 },
        { role: "RSE", hours: 239 },
        { role: "DSM", hours: 164 },
        { role: "GM", hours: 144 },
      ],
      Surat: [
        { role: "DSE", hours: 202 },
        { role: "TL", hours: 128 },
        { role: "RSE", hours: 110 },
        { role: "DSM", hours: 91 },
        { role: "GM", hours: 108 },
      ],
      Goa: [
        { role: "DSE", hours: 147 },
        { role: "TL", hours: 92 },
        { role: "RSE", hours: 73 },
        { role: "DSM", hours: 55 },
        { role: "GM", hours: 72 },
      ],
    },
  },

  // ================= EAST REGION =================
  East: {
    roles: [
      { role: "DSE", hours: 1174 },
      { role: "TL", hours: 880 },
      { role: "RSE", hours: 807 },
      { role: "DSM", hours: 619 },
      { role: "GM", hours: 720 },
    ],

    cities: {
      Kolkata: [
        { role: "DSE", hours: 477 },
        { role: "TL", hours: 348 },
        { role: "RSE", hours: 312 },
        { role: "DSM", hours: 255 },
        { role: "GM", hours: 234 },
      ],
      Bhubaneswar: [
        { role: "DSE", hours: 275 },
        { role: "TL", hours: 202 },
        { role: "RSE", hours: 183 },
        { role: "DSM", hours: 127 },
        { role: "GM", hours: 144 },
      ],
      Patna: [
        { role: "DSE", hours: 220 },
        { role: "TL", hours: 165 },
        { role: "RSE", hours: 147 },
        { role: "DSM", hours: 109 },
        { role: "GM", hours: 126 },
      ],
      Ranchi: [
        { role: "DSE", hours: 128 },
        { role: "TL", hours: 92 },
        { role: "RSE", hours: 73 },
        { role: "DSM", hours: 66 },
        { role: "GM", hours: 79 },
      ],
      Guwahati: [
        { role: "DSE", hours: 73 },
        { role: "TL", hours: 73 },
        { role: "RSE", hours: 92 },
        { role: "DSM", hours: 62 },
        { role: "GM", hours: 65 },
      ],
    },
  },

  // ================= CENTRAL REGION =================
  Central: {
    roles: [
      { role: "DSE", hours: 1101 },
      { role: "TL", hours: 806 },
      { role: "RSE", hours: 770 },
      { role: "DSM", hours: 582 },
      { role: "GM", hours: 684 },
    ],

    cities: {
      Bhopal: [
        { role: "DSE", hours: 330 },
        { role: "TL", hours: 257 },
        { role: "RSE", hours: 220 },
        { role: "DSM", hours: 164 },
        { role: "GM", hours: 180 },
      ],
      Indore: [
        { role: "DSE", hours: 294 },
        { role: "TL", hours: 220 },
        { role: "RSE", hours: 202 },
        { role: "DSM", hours: 146 },
        { role: "GM", hours: 162 },
      ],
      Raipur: [
        { role: "DSE", hours: 202 },
        { role: "TL", hours: 147 },
        { role: "RSE", hours: 128 },
        { role: "DSM", hours: 109 },
        { role: "GM", hours: 115 },
      ],
      Nagpur: [
        { role: "DSE", hours: 165 },
        { role: "TL", hours: 110 },
        { role: "RSE", hours: 128 },
        { role: "DSM", hours: 91 },
        { role: "GM", hours: 101 },
      ],
      Jabalpur: [
        { role: "DSE", hours: 110 },
        { role: "TL", hours: 73 },
        { role: "RSE", hours: 92 },
        { role: "DSM", hours: 73 },
        { role: "GM", hours: 90 },
      ],
    },
  },
};



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
     accessibility: {
    enabled: false  // Add this
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
  { category: "Brand", scores: [80,20,30,	20,10	] },
  { category: "BAT", scores: [70,40,30,40,50] },
  { category: "SOP", scores: [90,	40,	20,	20,	30] },
  { category: "Soft Skills", scores: [20,	10,	50,10,	20] },
  { category: "Product", scores: [50,	30,	30,	10,	50] },
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
  const totalUsers = 530;
  const totalCourses = 35;

  const [selectedRegion, setSelectedRegion] =
    useState("Regions");
    const [selectedRole, setSelectedRole] = useState("All");
    const [selectedDealership, setSelectedDealership] = useState("All");
    const [currentImage1, setCurrentImage1] = useState(0);
const [currentImage2, setCurrentImage2] = useState(0);
const [selectedUsageRegion, setSelectedUsageRegion] =
  useState("All");

const [selectedUsageCity, setSelectedUsageCity] =
  useState("All");
const [activeTab, setActiveTab] = useState(0);
const [selectedContentRole, setSelectedContentRole] = useState("All");

{/* ================= DYNAMIC DATA ================= */}
const usageData =
  selectedUsageRegion === "All"
    ? roleUsageHierarchy.All.roles
    : selectedUsageCity === "All"
    ? roleUsageHierarchy[selectedUsageRegion].roles
    : roleUsageHierarchy[selectedUsageRegion]
        .cities[selectedUsageCity];


React.useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage1((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(interval);
}, []);


const tabs = [
  {
    title: "Fastest Task Completion",
    image: Image_1,
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
    image: Image_2,
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
    image: Image_3,
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
    image: Image_4,
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
    { name: "RSE", y: 150 },
    { name: "DSM", y: 50 },
    { name: "GM", y: 30 },
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
    //  options3d: {
    //   enabled: true,
    //   alpha: 45,
    // },

  },
  accessibility: {
    enabled: false  // Add this
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
    // depth: 45,
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
    //  options3d: {
    //   enabled: true,
    //   alpha: 15,
    //   beta: 15,
    //   depth: 50,
    // },


  },
   accessibility: {
    enabled: false  // Add this
  },

  credits: { enabled: false },
  title: { text: null },

  xAxis: {
    type: "category",
    labels: { enabled: false },
    gridLineWidth: 0,
    lineWidth: 0,
    tickLength: 0,
  },

  yAxis: {
    title: { text: null },
    labels: { enabled: false },
    gridLineWidth: 0,
  },

  // ✅ THIS REMOVES 3D BACKGROUND PANES (MAIN FIX)
  pane: {
    background: [],
  },

  plotOptions: {
    column: {
      //  depth: 25,
      colorByPoint: true,
      borderWidth: 0,
    },
  },

  tooltip: {
    formatter: function () {
      return "<b>" + this.key + ":</b> " + this.y + " Courses";
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
        ["Sales", 7],
      ],
    },
  ],
};

// Enrollments data for Course Enrollments pie chart & table
const enrollmentsData = [
  { name: "Brand", y: 145 },
  { name: "BAT", y: 320 },
  { name: "SOP", y: 88 },
  { name: "VAS", y: 112 },
  { name: "Sales", y: 276 },
];

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

// ================= ACTIVE TAB =================
const [activeUsageTab, setActiveUsageTab] = useState("all");
// Add these with other useState declarations
const [selectedMapRegion, setSelectedMapRegion] = useState("all");
const [selectedMapRole, setSelectedMapRole] = useState("all");

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

const currentHeatData = getFilteredMapData();

// ================= TOTAL =================
const getTotalUsage = () => {
  let filteredData = [...tableData];
  
  if (selectedMapRegion !== "all") {
    filteredData = filteredData.filter(item => item.zone === selectedMapRegion);
  }
  
  return filteredData.reduce((sum, item) => sum + item[activeUsageTab], 0);
};

// Helper function to get filtered table data based on region and role
const getFilteredTableData = () => {
  // First filter by zone (selectedMapRegion)
  let filteredByZone = [...tableData];
  if (selectedMapRegion !== "all") {
    filteredByZone = filteredByZone.filter(item => item.zone === selectedMapRegion);
  }

  let filteredData = [];

  if (selectedMapRole === "all") {
    // Show all roles for filtered states
    const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
    filteredByZone.forEach(state => {
      roles.forEach(role => {
        // Get role-specific usage value from tableData based on activeUsageTab
        const usageValue = state[activeUsageTab][role];
        filteredData.push({
          role: role,
          state: state.state,
          usage: usageValue
        });
      });
    });
  } else {
    // Show only selected role for filtered states
    filteredByZone.forEach(state => {
      // Get role-specific usage value from tableData based on activeUsageTab
      const usageValue = state[activeUsageTab][selectedMapRole];
      filteredData.push({
        role: selectedMapRole,
        state: state.state,
        usage: usageValue
      });
    });
  }

  return filteredData;
};

// Get top 2 states for blinking based on total/all roles usage
const getTop2States = () => {
  const filteredData = [...tableData];
  
  // Filter by selected region
  let statesToConsider = filteredData;
  if (selectedMapRegion !== "all") {
    statesToConsider = filteredData.filter(item => item.zone === selectedMapRegion);
  }
  
  // Calculate total usage for each state (sum of all roles)
  const stateTotals = statesToConsider.map(state => {
    const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
    let total = 0;
    
    if (selectedMapRole === "all") {
      roles.forEach(role => {
        total += state[activeUsageTab][role];
      });
    } else {
      total = state[activeUsageTab][selectedMapRole];
    }
    
    return {
      code: state.code,
      total: total
    };
  });
  
  // Sort and get top 2
  const sorted = [...stateTotals].sort((a, b) => b.total - a.total);
  return sorted.slice(0, 2).map(item => item.code);
};

// ================= INDIA HEAT MAP =================
// ================= INDIA HEAT MAP =================
const indiaHeatMapOptions = {
  chart: {
    map: window.Highcharts.maps['countries/in/in-all'],
    backgroundColor: "transparent",
    height: 500,
    events: {
      load: function() {
        const chart = this;
        const top2Codes = getTop2States();
        
        chart.series[0].points.forEach((point) => {
          if (point.graphic && point.graphic.element) {
            point.graphic.element.classList.remove(
              "highcharts-point-blink-1",
              "highcharts-point-blink-2"
            );
            
            if (top2Codes.includes(point.code)) {
              const index = top2Codes.indexOf(point.code);
              point.graphic.element.classList.add(
                index === 0 ? "highcharts-point-blink-1" : "highcharts-point-blink-2"
              );
            }
          }
        });
      },
      redraw: function() {
        const chart = this;
        const top2Codes = getTop2States();
        
        chart.series[0].points.forEach((point) => {
          if (point.graphic && point.graphic.element) {
            point.graphic.element.classList.remove(
              "highcharts-point-blink-1",
              "highcharts-point-blink-2"
            );
            
            if (top2Codes.includes(point.code)) {
              const index = top2Codes.indexOf(point.code);
              point.graphic.element.classList.add(
                index === 0 ? "highcharts-point-blink-1" : "highcharts-point-blink-2"
              );
            }
          }
        });
      },
    },
  },
accessibility: {
    enabled: false  // ← Add this to remove the warning
  },
  title: {
    text: null,
  },

  credits: {
    enabled: false,
  },

  mapNavigation: {
    enabled: false,
  },

colorAxis: {
  min: 0,
  max: (() => {
    const filteredData = [...tableData];
    let statesToConsider = filteredData;
    
    if (selectedMapRegion !== "all") {
      statesToConsider = filteredData.filter(item => item.zone === selectedMapRegion);
    }
    
    // Calculate max total usage across all roles
    let maxValue = 0;
    statesToConsider.forEach(state => {
      const roles = ["DSE", "TL", "RSE", "DSM", "GM"];
      let total = 0;
      
      if (selectedMapRole === "all") {
        roles.forEach(role => {
          total += state[activeUsageTab][role];
        });
      } else {
        total = state[activeUsageTab][selectedMapRole];
      }
      
      if (total > maxValue) maxValue = total;
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
    // Try to find state data by matching state name instead of code
    const pointName = this.point.name;
    const stateData = tableData.find(s => s.state === pointName);
    
    // Fallback: try to find by code if name doesn't match
    const stateDataByCode = tableData.find(s => s.code === this.point.code);
    const finalStateData = stateData || stateDataByCode;
    
    const userCount = finalStateData?.users || 0;
    const totalUsage = this.point.value;
    const averageUsage = userCount > 0 ? Math.round(totalUsage / userCount) : 0;
    
    const timePeriod = activeUsageTab === "all"
      ? "ALL TIME"
      : activeUsageTab === "ytd"
      ? "YTD"
      : activeUsageTab === "mtd"
      ? "MTD"
      : "THIS WEEK";
    
    return `
      <div style="padding:8px; min-width:180px">
        <div style="font-size:14px; font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:8px; padding-bottom:4px;">
          ${this.point.name}
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
  style: {
    fontSize: "12px",
    fontWeight: "normal",
  },
},

series: [
  {
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
    dataLabels: {
      enabled: false,
    },
    data: currentHeatData, // This now uses filtered data
  },
],
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
                 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent
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
                 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent
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
                 focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent
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

{/* ================= ROW 7: LEFT (USER STATS) + RIGHT (USER ANALYTICS) ================= */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
  
{/* LEFT COLUMN: 4 Compact User Stat Cards - reduced card padding, increased gap */}
<div className="grid grid-cols-2 gap-4">
  {/* Total Users */}
  <div className="stats-card bg-white/90 backdrop-blur-sm rounded-xl border border-orange-100 border-l-4 border-l-orange-400 p-2 shadow-sm">
    <div className="flex items-center justify-between mb-1">
      <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
        <UsersIcon className="h-4 w-4 text-white" />
      </div>
      <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-full">
        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="text-[12px] font-bold text-green-700">12%</span>
      </div>
    </div>
    <p className="text-[18px] font-medium">Total Users</p>
    <p className="text-xl font-black leading-tight">1,284</p>
    <div className="flex items-center gap-1 mt-0.5">
      <span className="inline-block w-1 h-1 rounded-full bg-green-500"></span>
      <span className="text-xs">vs last month</span>
    </div>
  </div>

  {/* New Users */}
  <div className="stats-card bg-white/90 backdrop-blur-sm rounded-xl border border-blue-100 border-l-4 border-l-blue-400 p-2 shadow-sm">
    <div className="flex items-center justify-between mb-1">
      <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-sm">
        <FaUserPlus className="h-4 w-4 text-white" />
      </div>
      <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-full">
        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        <span className="text-[12px] font-bold text-green-700">8%</span>
      </div>
    </div>
    <p className="text-[18px] font-medium">New Users</p>
    <p className="text-xl font-black text-gray-800 leading-tight">142</p>
    <div className="flex items-center gap-1 mt-0.5">
      <span className="inline-block w-1 h-1 rounded-full bg-green-500"></span>
      <span className="text-xs">this week</span>
    </div>
  </div>

  {/* Active Users */}
  <div className="stats-card bg-white/90 backdrop-blur-sm rounded-xl border border-emerald-100 border-l-4 border-l-emerald-400 p-2 shadow-sm">
    <div className="flex items-center justify-between mb-1">
      <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
        <FaUserCheck className="h-4 w-4 text-white" />
      </div>
      <div className="bg-emerald-50 px-1.5 py-0.5 rounded-full">
        <span className="text-[12px] font-bold text-emerald-700">68%</span>
      </div>
    </div>
    <p className="text-[18px] font-medium">Active Users</p>
    <p className="text-xl font-black text-gray-800 leading-tight">876</p>
    <div className="mt-1 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-[68%] relative">
        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
      </div>
    </div>
  </div>

  {/* Inactive Users */}
  <div className="stats-card bg-white/90 backdrop-blur-sm rounded-xl border border-red-100 border-l-4 border-l-red-400 p-2 shadow-sm">
    <div className="flex items-center justify-between mb-1">
      <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-sm">
        <FaUserSlash className="h-4 w-4 text-white" />
      </div>
      <div className="bg-red-50 px-1.5 py-0.5 rounded-full">
        <span className="text-[12px] font-bold text-red-700">32%</span>
      </div>
    </div>
    <p className="text-[18px] font-medium">Inactive Users</p>
    <p className="text-xl font-black text-gray-800 leading-tight">408</p>
    <div className="mt-1 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full w-[32%] relative">
        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
      </div>
    </div>
  </div>
</div>

  {/* RIGHT COLUMN: User Analytics - REDUCED HEIGHT */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-2 flex flex-col">
    <h2 className="text-sm font-bold text-gray-800">User Analytics</h2>

    <div className="grid grid-cols-3 gap-1 items-start">
      {/* KPI - smaller */}
      <div className="text-center self-center">
        <div className="text-[16px] font-bold text-gray-500">Total Users</div>
        <div className="text-3xl font-black text-[#f97316]">{totalUsers.toLocaleString()}</div>
      </div>

      {/* PIE CHART - reduced height to 120px */}
      <div className="col-span-2">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...pieOptions,
            chart: { ...pieOptions.chart, height: 160, backgroundColor: "transparent" },
            plotOptions: {
              pie: {
                ...pieOptions.plotOptions.pie,
                innerSize: 50,
              },
            },
          }}
        />
      </div>
    </div>

    {/* TABLE - tighter rows, smaller font */}
    <div className="mt-1 overflow-hidden">
      <table className="w-full text-[10px] border-collapse">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="p-1 text-center">S.No</th>
            <th className="p-1 text-center"></th>
            <th className="p-1 text-center w-[100px]">Role</th>
            <th className="p-1 text-center">Count</th>
          </tr>
        </thead>
        <tbody>
          {roleData.map((role, i) => {
            const colors = ["#f97316","#0f766e","#84cc16","#ea580c","#eab308","#60a5fa","#8b5cf6"];
            return (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-0.5 text-center font-medium">{i + 1}</td>
                <td className="p-0.5 text-center">
                  <div className="flex justify-end items-center">
                    <span className="w-2 h-2" style={{ backgroundColor: colors[i % colors.length] }} />
                  </div>
                </td>
                <td className="p-0.5 text-center font-medium truncate">{role.name}</td>
                <td className="p-0.5 text-center font-bold">{role.y}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</div>

{/* ROW 3 */}
<div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1.3fr] gap-5 mb-6">

  {/* LEFT COLUMN: Content Type Bifurcation only */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col">
    <h2 className="text-base font-bold text-gray-800 mb-3">
      Content Type Bifurcation
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
      {/* KPI - Total Content */}
      <div className="flex flex-col flex-1 min-h-[125px]">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <div className="text-[16px] font-bold text-gray-700 mb-2">
            Total Content
          </div>
          <div className="text-5xl font-black text-[#f97316] leading-none">
            960
          </div>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="md:col-span-2 h-[240px] flex items-center justify-center overflow-hidden">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "pie",
              backgroundColor: "transparent",
              height: 240,
              options3d: {
                enabled: true,
                alpha: 45,
              },
            },
            accessibility: {
              enabled: false,
            },
            credits: {
              enabled: false,
            },
            title: {
              text: null,
            },
            tooltip: {
              formatter: function () {
                return `<b>${this.point.name}</b><br/>${this.y} items`;
              },
              followPointer: true,
            },
            plotOptions: {
              pie: {
                innerSize: 80,
                depth: 45,
                dataLabels: {
                  enabled: false,
                },
                showInLegend: false,
              },
            },
            series: [
              {
                name: "Content",
                data: [
                  { name: "Video", y: 540 },
                  { name: "WBT", y: 230 },
                  { name: "PDF", y: 100 },
                  { name: "PPT", y: 90 },
                ],
              },
            ],
          }}
        />
      </div>
    </div>

    {/* TABLE */}
    <div className="mt-3 overflow-hidden">
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="p-2 text-center">S.No</th>
            <th className="p-2 text-center"></th>
            <th className="p-2 text-center w-[100px]">Content Type</th>
            <th className="p-2 text-center">Total Numbers</th>
          </tr>
        </thead>
        <tbody>
          {[
            { type: "Video", count: 540 },
            { type: "WBT", count: 230 },
            { type: "PDF", count: 100 },
            { type: "PPT", count: 90 },
          ].map((item, i) => {
            const colors = Highcharts.getOptions().colors;
            return (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="p-2 text-center font-medium">{i + 1}</td>
                <td className="p-2 text-center">
                  <div className="flex justify-center items-center">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    />
                  </div>
                </td>
                <td className="p-2 text-center font-medium truncate">
                  {item.type}
                </td>
                <td className="p-2 text-center font-bold">
                  {item.count}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>

  {/* RIGHT COLUMN: 3 Course Stat Cards + Course Analytics */}
  <div className="space-y-4">
    {/* 3 Course Stat Cards (Total, Completed, Incomplete) */}
    <div className="grid grid-cols-3 gap-5">
      {/* Total Courses */}
      <div className="stats-card bg-white/90 backdrop-blur-sm rounded-xl border border-orange-100 border-l-4 border-l-orange-400 p-2.5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
            <FaBook className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-full">
            <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-[10px] font-bold text-green-700">5%</span>
          </div>
        </div>
        <p className="text-xs font-medium">Total Courses</p>
        <p className="text-2xl font-black leading-tight">7</p>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="inline-block w-1 h-1 rounded-full bg-green-500"></span>
          <span className="text-xs">vs last month</span>
        </div>
      </div>

      {/* Completed Courses */}
      <div className="stats-card bg-white/90 backdrop-blur-sm rounded-xl border border-emerald-100 border-l-4 border-l-emerald-400 p-2.5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm">
            <FaCheckCircle className="h-5 w-5 text-white" />
          </div>
          <div className="bg-emerald-50 px-1.5 py-0.5 rounded-full">
            <span className="text-[10px] font-bold text-emerald-700">57%</span>
          </div>
        </div>
        <p className="text-xs font-medium">Completed Courses</p>
        <p className="text-2xl font-black text-gray-800 leading-tight">4</p>
        <div className="mt-1 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full w-[57%] relative">
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Incomplete Courses */}
      <div className="stats-card bg-white/90 backdrop-blur-sm rounded-xl border border-red-100 border-l-4 border-l-red-400 p-2.5 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-sm">
            <FaTimesCircle className="h-5 w-5 text-white" />
          </div>
          <div className="bg-red-50 px-1.5 py-0.5 rounded-full">
            <span className="text-[10px] font-bold text-red-700">43%</span>
          </div>
        </div>
        <p className="text-xs font-medium">Incomplete Courses</p>
        <p className="text-2xl font-black text-gray-800 leading-tight">3</p>
        <div className="mt-1 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full w-[43%] relative">
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Course Analytics */}
    <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col">
      <h2 className="text-base font-bold text-gray-800">
        Course Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
        {/* KPI */}
        <div className="flex flex-col flex-1 min-h-[125px]">
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="text-[16px] font-bold text-gray-700 mb-2">
              Total Courses
            </div>
            <div className="text-5xl font-black text-[#f97316] leading-none">
              {courseOptions.series[0].data.reduce((s, i) => s + i[1], 0)}
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

      {/* TABLE */}
      <div className="mt-3 overflow-hidden">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="p-2 text-center">S.No</th>
              <th className="p-2 text-center"></th>
              <th className="p-2 text-center w-[100px]">Course</th>
              <th className="p-2 text-center">Count</th>
            </tr>
          </thead>
          <tbody>
            {courseOptions.series[0].data.map((c, i) => {
              const colors = ["#f59e0b","#3b82f6","#10b981","#8b5cf6","#ef4444","#f97316","#ec4899"];
              return (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-1 text-center font-medium">{i + 1}</td>
                  <td className="p-1 text-center">
                    <div className="flex justify-end items-center">
                      <span
                        className="w-3 h-3"
                        style={{ backgroundColor: colors[i % colors.length] }}
                      />
                    </div>
                  </td>
                  <td className="p-1 text-center font-medium truncate">
                    {c[0]}
                  </td>
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
</div>


{/* ================= ROW 1 ================= */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-4 items-stretch">

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
<div className="mb-4">
  <h1 className="text-3xl font-bold">
    Learning Progress
  </h1>
</div>
<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

  {/* LEFT SIDE - DONUTS */}
  <div className="xl:col-span-2">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <DonutChart key={i} {...c} />
      ))}
    </div>
  </div>

  {/* RIGHT SIDE - ASSESSMENT SCORE BREAKUP */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 h-[210px] overflow-auto">

    <h2 className="text-base font-bold text-gray-800 mb-3">
      Assessment Score Breakup
    </h2>

    <table className="w-full table-auto border-collapse text-[10px]">

      <thead>
        <tr className="bg-gray-600 text-white uppercase font-semibold">
          <th className="px-2 py-2">Categories</th>
          <th className="px-2 py-2">A1</th>
          <th className="px-2 py-2">A2</th>
          <th className="px-2 py-2">A3</th>
          <th className="px-2 py-2">A4</th>
          <th className="px-2 py-2">A5</th>
          <th className="px-2 py-2">Avg</th>
        </tr>
      </thead>

      <tbody>
        {assessmentData.map((row, idx) => {
          const average = Math.round(
            row.scores.reduce((a, b) => a + b, 0) / row.scores.length
          );

          return (
            <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-2 py-2 text-center font-semibold whitespace-nowrap">
                {row.category}
              </td>

              {row.scores.map((score, i) => (
                <td key={i} className="px-2 py-2 text-center">
                  {score}%
                </td>
              ))}

              <td className="px-2 py-2 text-center font-bold text-[#f97316]">
                {average}%
              </td>
            </tr>
          );
        })}
      </tbody>

    </table>
  </div>
</div>


{/* ROW 5 - CONTENT TYPE BIFURCATION & USER CONTENT PREFERENCES */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">

  {/* ================= LEFT: CONTENT TYPE BIFURCATION ================= */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col">

    <h2 className="text-base font-bold text-gray-800 mb-3">
      Content Type Bifurcation
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">

      {/* KPI - Total Content */}
      <div className="flex flex-col flex-1 min-h-[125px]">
        <div className="flex-1 flex flex-col justify-center items-center text-center">

          <div className="text-[16px] font-bold text-gray-700 mb-2">
            Total Content
          </div>

          <div className="text-5xl font-black text-[#f97316] leading-none">
            960
          </div>

        </div>
      </div>

      {/* PIE CHART */}
      <div className="md:col-span-2 h-[240px] flex items-center justify-center overflow-hidden">
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "pie",
              backgroundColor: "transparent",
              height: 240,
              options3d: {
                enabled: true,
                alpha: 45,
              },
            },
            accessibility: {
              enabled: false,
            },
            credits: {
              enabled: false,
            },
            title: {
              text: null,
            },
            tooltip: {
              formatter: function () {
                return `<b>${this.point.name}</b><br/>${this.y} items`;
              },
              followPointer: true,
            },
            plotOptions: {
              pie: {
                innerSize: 80,
                depth: 45,
                dataLabels: {
                  enabled: false,
                },
                showInLegend: false,
              },
            },
            series: [
              {
                name: "Content",
                data: [
                  { name: "Video", y: 540 },
                  { name: "WBT", y: 230 },
                  { name: "PDF", y: 100 },
                  { name: "PPT", y: 90 },
                ],
              },
            ],
          }}
        />
      </div>

    </div>

    {/* TABLE */}
    <div className="mt-3 overflow-hidden">
      <table className="w-full text-[11px] border-collapse">

        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="p-2 text-center">S.No</th>
            <th className="p-2 text-center"></th>
            <th className="p-2 text-center w-[100px]">Content Type</th>
            <th className="p-2 text-center">Total Numbers</th>
          </tr>
        </thead>

        <tbody>
          {[
            { type: "Video", count: 540 },
            { type: "WBT", count: 230 },
            { type: "PDF", count: 100 },
            { type: "PPT", count: 90 },
          ].map((item, i) => {
            const colors = Highcharts.getOptions().colors;
            return (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>

                <td className="p-2 text-center font-medium">{i + 1}</td>

                <td className="p-2 text-center">
                  <div className="flex justify-center items-center">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: colors[i % colors.length] }}
                    />
                  </div>
                </td>

                <td className="p-2 text-center font-medium truncate">
                  {item.type}
                </td>

                <td className="p-2 text-center font-bold">
                  {item.count}
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>
    </div>

  </div>

  {/* ================= RIGHT: USER CONTENT PREFERENCES ================= */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col">

    <div className="flex justify-between items-center mb-3">
      <h2 className="text-base font-bold text-gray-800">
        User Content Preferences
      </h2>

      {/* ROLE HOLDER FILTER */}
      <select
        value={selectedContentRole}
        onChange={(e) => setSelectedContentRole(e.target.value)}
        className="px-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]"
      >
        <option value="All">All Role Holders</option>
        <option value="DSE">DSE</option>
        <option value="TL">TL</option>
        <option value="RSE">RSE</option>
        <option value="DSM">DSM</option>
        <option value="GM">GM</option>
      </select>
    </div>

    {/* CONTENT PREFERENCES DATA BASED ON ROLE */}
    {(() => {
      // Role-based usage data
      const roleContentData = {
        All: {
          total: 521,
          data: [
            { type: "Video", hours: 200 },
            { type: "WBT", hours: 140 },
            { type: "PDF", hours: 101 },
            { type: "PPT", hours: 80 },
          ],
        },
        DSE: {
          total: 250,
          data: [
            { type: "Video", hours: 110 },
            { type: "WBT", hours: 70 },
            { type: "PDF", hours: 40 },
            { type: "PPT", hours: 30 },
          ],
        },
        TL: {
          total: 120,
          data: [
            { type: "Video", hours: 50 },
            { type: "WBT", hours: 35 },
            { type: "PDF", hours: 20 },
            { type: "PPT", hours: 15 },
          ],
        },
        RSE: {
          total: 80,
          data: [
            { type: "Video", hours: 25 },
            { type: "WBT", hours: 20 },
            { type: "PDF", hours: 18 },
            { type: "PPT", hours: 17 },
          ],
        },
        DSM: {
          total: 45,
          data: [
            { type: "Video", hours: 10 },
            { type: "WBT", hours: 10 },
            { type: "PDF", hours: 13 },
            { type: "PPT", hours: 12 },
          ],
        },
        GM: {
          total: 26,
          data: [
            { type: "Video", hours: 5 },
            { type: "WBT", hours: 5 },
            { type: "PDF", hours: 10 },
            { type: "PPT", hours: 6 },
          ],
        },
      };

      const currentData = roleContentData[selectedContentRole] || roleContentData.All;
      const totalUsage = currentData.total;

      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">

            {/* KPI - Total Usage */}
            <div className="flex flex-col flex-1 min-h-[125px]">
              <div className="flex-1 flex flex-col justify-center items-center text-center">

                <div className="text-[16px] font-bold text-gray-700 mb-2">
                  Total Usage
                </div>

                <div className="text-5xl font-black text-[#f97316] leading-none">
                  {totalUsage}
                </div>

                <div className="text-[11px] text-gray-500 mt-1">
                  hrs
                </div>

              </div>
            </div>

            {/* PIE CHART */}
            <div className="md:col-span-2 h-[240px] flex items-center justify-center overflow-hidden">
              <HighchartsReact
                highcharts={Highcharts}
                options={{
                  chart: {
                    type: "pie",
                    backgroundColor: "transparent",
                    height: 240,
                    options3d: {
                      enabled: true,
                      alpha: 45,
                    },
                  },
                  accessibility: {
                    enabled: false,
                  },
                  credits: {
                    enabled: false,
                  },
                  title: {
                    text: null,
                  },
                  tooltip: {
                    formatter: function () {
                      return `<b>${this.point.name}</b><br/>${this.y} hrs`;
                    },
                    followPointer: true,
                  },
                  plotOptions: {
                    pie: {
                      innerSize: 80,
                      depth: 45,
                      dataLabels: {
                        enabled: false,
                      },
                      showInLegend: false,
                    },
                  },
                  series: [
                    {
                      name: "Usage",
                      data: currentData.data.map(item => ({
                        name: item.type,
                        y: item.hours,
                      })),
                    },
                  ],
                }}
              />
            </div>

          </div>

          {/* TABLE */}
          <div className="mt-3 overflow-hidden">
            <table className="w-full text-[11px] border-collapse">

              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="p-2 text-center">S.No</th>
                  <th className="p-2 text-center"></th>
                  <th className="p-2 text-center w-[80px]">Content Type</th>
                  <th className="p-2 text-center w-[80px]">Role Holder</th>
                  <th className="p-2 text-center">Usage (Hrs)</th>
                </tr>
              </thead>

              <tbody>
                {currentData.data.map((item, i) => {
                  const colors = Highcharts.getOptions().colors;
                  return (
                    <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>

                      <td className="p-2 text-center font-medium">{i + 1}</td>

                      <td className="p-2 text-center">
                        <div className="flex justify-center items-center">
                          <span
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: colors[i % colors.length] }}
                          />
                        </div>
                      </td>

                      <td className="p-2 text-center font-medium truncate">
                        {item.type}
                      </td>

                      <td className="p-2 text-center font-medium">
                        {selectedContentRole === "All" ? "All" : selectedContentRole}
                      </td>

                      <td className="p-2 text-center font-bold text-[#f97316]">
                        {item.hours} hrs
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </>
      );
    })()}

  </div>

</div>

{/* ================= COMBINED ROW: STATE WISE USAGE HEAT MAP (LEFT) + HOURLY USAGE HEAT MAP (RIGHT) ================= */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

{/* LEFT COLUMN: State Wise Usage Heat Map */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 overflow-hidden">
  {/* ================= HEADER ================= */}
  <div className="mb-4 pb-2">
    {/* TOP ROW - Title on left, Region & Role filters on right */}
    <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
      <h2 className="text-base font-bold text-gray-800">State Wise Usage Heat Map</h2>
      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={selectedMapRegion}
          onChange={(e) => setSelectedMapRegion(e.target.value)}
          className="px-3 py-1.5 text-[12px] font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316]"
        >
          <option value="all">All India</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="Central">Central</option>
        </select>
        <select
          value={selectedMapRole}
          onChange={(e) => setSelectedMapRole(e.target.value)}
          className="px-3 py-1.5 text-[12px] font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f97316]"
        >
          <option value="all">All Role Holders</option>
          <option value="DSE">DSE</option>
          <option value="TL">TL</option>
          <option value="RSE">RSE</option>
          <option value="DSM">DSM</option>
          <option value="GM">GM</option>
        </select>
      </div>
    </div>

    {/* BOTTOM ROW - Total Usage Card on LEFT, Tabs on RIGHT */}
    <div className="flex items-center justify-between flex-wrap gap-3">
      {/* LEFT SIDE: Total Usage Card */}
      <div className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm">
        <div className="px-4 py-2 text-left">
          <div className="text-[12px] font-bold text-gray-500 mb-0.5">Total Usage</div>
          <div className="text-2xl font-black text-[#f97316]">
            {(() => {
              const filteredData = getFilteredTableData();
              const total = filteredData.reduce((sum, item) => sum + item.usage, 0);
              return total.toLocaleString();
            })()}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setActiveUsageTab("all")}
          className={`px-4 py-2 rounded-md text-[12px] font-bold transition-all ${
            activeUsageTab === "all" ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          ALL
        </button>
        <button
          onClick={() => setActiveUsageTab("ytd")}
          className={`px-4 py-2 rounded-md text-[12px] font-bold transition-all ${
            activeUsageTab === "ytd" ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          YTD
        </button>
        <button
          onClick={() => setActiveUsageTab("mtd")}
          className={`px-4 py-2 rounded-md text-[12px] font-bold transition-all ${
            activeUsageTab === "mtd" ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          MTD
        </button>
        <button
          onClick={() => setActiveUsageTab("week")}
          className={`px-4 py-2 rounded-md text-[12px] font-bold transition-all ${
            activeUsageTab === "week" ? "bg-[#f97316] text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          THIS WEEK
        </button>
      </div>
    </div>
  </div>

  {/* ================= BODY: MAP + TABLE (no Total Usage card inside) ================= */}
  <div className="flex flex-col gap-4">
    {/* MAP + TABLE ROW - Map on left, Table on right */}
    <div className="flex flex-col lg:flex-row gap-3 items-start">
      {/* MAP (LEFT SIDE) */}
      <div className="w-full lg:w-[55%] rounded-2xl overflow-hidden">
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

      {/* TABLE (RIGHT SIDE) */}
      <div className="w-full lg:w-[45%] bg-white border border-gray-200 rounded-md overflow-hidden h-fit">
        <div className="overflow-hidden max-h-[400px] overflow-y-auto">
          <table className="w-full text-[11px]">
            <thead className="sticky top-0">
              <tr className="bg-[#4a4a4a] text-white">
                <th className="px-2 py-2 text-center w-[40px]">S.No</th>
                <th className="px-2 py-2 text-left">Role Holder(s)</th>
                <th className="px-2 py-2 text-left">State</th>
                <th className="px-2 py-2 text-center w-[90px]">
                  {activeUsageTab === "all"
                    ? "ALL TIME"
                    : activeUsageTab === "ytd"
                    ? "YTD"
                    : activeUsageTab === "mtd"
                    ? "MTD"
                    : "THIS WEEK"}
                </th>
               </tr>
            </thead>
            <tbody>
              {getFilteredTableData()
                .sort((a, b) => b.usage - a.usage)
                .map((item, i) => {
                  const top3 = [...getFilteredTableData()]
                    .sort((a, b) => b.usage - a.usage)
                    .slice(0, 3)
                    .map((d) => d.usage);
                  const isTop = top3.includes(item.usage);
                  return (
                    <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 ${isTop ? "top-state-blink" : ""}`}>
                      <td className="px-2 py-3 text-center font-semibold">{i + 1}</td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${isTop ? "top-state-dot-blink" : ""}`}
                            style={{
                              backgroundColor:
                                i === 0 ? "#c2410c" : i === 1 ? "#ea580c" : i === 2 ? "#f97316" : "#fdba74",
                            }}
                          />
                          <span className="font-semibold text-gray-700">{item.role}</span>
                        </div>
                       </td>
                      <td className="px-2 py-3 font-semibold text-gray-700">{item.state}</td>
                      <td className={`px-2 py-3 text-center font-bold ${isTop ? "text-[#c2410c]" : "text-gray-700"}`}>
                        {item.usage}
                      </td>
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

{/* RIGHT COLUMN: Hourly Usage Heat Map (Smaller left column, larger hour boxes) */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4">
  {/* Header */}
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-15">
    <h2 className="text-xl font-bold text-gray-900">Hourly Usage Heat Map</h2>
    <div className="flex gap-2 flex-wrap">
      <select className="px-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]">
        <option>All India</option>
        <option>North</option>
        <option>South</option>
        <option>West</option>
        <option>East</option>
        <option>Central</option>
      </select>
      <select className="px-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]">
        <option>All Role Holders</option>
        <option>DSE</option>
        <option>TL</option>
        <option>RSE</option>
        <option>DSM</option>
        <option>GM</option>
      </select>
    </div>
  </div>

  {/* Heat Map - No scroll, all 24 hours fit */}
  <div className="w-full">
    {/* Hours Header */}
    <div className="flex">
      <div className="w-16 sm:w-20 bg-black text-white font-bold px-1 py-2 rounded-tl-md text-xs sm:text-sm flex-shrink-0 text-center">
        Hours
      </div>
      <div className="flex flex-1 bg-gray-100 rounded-tr-md">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="flex-1 text-center py-2">
            <div className="text-[10px] sm:text-xs font-medium text-gray-700">{i + 1}</div>
            <div className="text-[8px] sm:text-[9px] text-white rounded-sm px-0.5 inline-block mt-0.5 bg-black">
              {i < 11 ? "AM" : "PM"}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Week Rows */}
    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
      <div key={day} className="flex">
        <div className="w-16 sm:w-20 bg-gray-100 px-1 py-3 text-xs sm:text-sm font-semibold flex items-center justify-center flex-shrink-0">
          {day.slice(0,3)}
        </div>
        <div className="flex flex-1 bg-gray-50">
          {Array.from({ length: 24 }, (_, hour) => {
            let color = "bg-gray-300";
            if (hour >= 7 && hour <= 10) color = "bg-[#efc2a2]";
            if (hour >= 11 && hour <= 17) color = "bg-[#ec8e42]";
            if (hour >= 12 && hour <= 14) color = "bg-[#e96b35]";
            if (hour >= 18 && hour <= 20) color = "bg-[#efc2a2]";
            if (hour <= 6 || hour >= 21) color = "bg-gray-300";
            return (
              <div
                key={hour}
                className={`flex-1 h-5 sm:h-7 m-0.5 rounded border border-white shadow-sm ${color}`}
                title={`${day} ${hour+1}:00`}
              />
            );
          })}
        </div>
      </div>
    ))}

    {/* Legend */}
    <div className="mt-4 border rounded-md p-3 flex flex-wrap gap-4 justify-center">
      <div className="flex items-center gap-2"><div className="h-5 w-5 rounded bg-gray-300 border" /><span className="text-xs">No Usage</span></div>
      <div className="flex items-center gap-2"><div className="h-5 w-5 rounded bg-[#efc2a2]" /><span className="text-xs">Light Usage</span></div>
      <div className="flex items-center gap-2"><div className="h-5 w-5 rounded bg-[#ec8e42]" /><span className="text-xs">Moderate Usage</span></div>
      <div className="flex items-center gap-2"><div className="h-5 w-5 rounded bg-[#e96b35]" /><span className="text-xs">Heavy Usage</span></div>
    </div>
  </div>
</div>
</div>

    </div>
  );
};

export default PerformanceAnalytics;