import React, { useState } from "react";

// ✅ Import Highcharts FIRST
import Highcharts from "highcharts";

// ✅ Import ALL modules IMMEDIATELY after Highcharts
import "highcharts/modules/map";
import "highcharts/highcharts-3d";
import "highcharts/modules/cylinder";
import "highcharts/modules/accessibility";

// ✅ Import map data AFTER modules are registered
import mapDataIndia from "@highcharts/map-collection/countries/in/in-all.geo.json";

// ✅ Import React component wrapper AFTER Highcharts is ready
import HighchartsReactOfficial from "highcharts-react-official";

import './PerformanceAnalytics.css'

// Rest of your imports...
import { FaMapMarkedAlt, FaMapMarkerAlt } from "react-icons/fa";
import IndiaMap from '../assets/india_green.png'

import {
  UsersIcon,
  BookOpenIcon,
  MapPinIcon,
} from "@animateicons/react/lucide";
import { FiRefreshCw } from "react-icons/fi";
import Banner1 from "../assets/banner2.png";
import Banner2 from "../assets/banner2.png";
import Image_1 from "../assets/Image_1.png";
import Image_2 from "../assets/Image_2.png";
import Image_3 from "../assets/Image_3.png";
import Image_4 from "../assets/Image_4.png";
import f1 from '../assets/Picture40.png'
import f2 from '../assets/Picture28.png'
import f3 from '../assets/Picture29.png'
import h1 from '../assets/Picture30.png'
import h2 from '../assets/Picture31.png'
import h3 from '../assets/Picture32.png'
import m1 from '../assets/Picture33.png'
import m2 from '../assets/Picture34.png'
import m3 from '../assets/Picture35.png'
import e1 from '../assets/Picture36.png'
import e2 from '../assets/Picture37.png'
import e3 from '../assets/Picture38.png'
import s1 from '../assets/Picture16.png'
import s2 from '../assets/Picture17.png'
import s3 from '../assets/Picture18.png'
import s4 from '../assets/Picture19.png'
import s5 from '../assets/Picture20.png'
import s6 from '../assets/Picture21.png'
import s7 from '../assets/Picture22.png'
import s8 from '../assets/Picture23.png'
import s9 from '../assets/Picture24.png'
import s10 from '../assets/Picture25.png'

// ✅ Safe way to get the React component
const HighchartsReact = HighchartsReactOfficial.default || HighchartsReactOfficial;

const YELLOW = "#f4ae3d";

const carouselImages = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
];

const carouselImages2 = [
  Banner1,
  Banner2,
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
      depth: 25,
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

// ================= DATA =================
const tableData = [
  {
    code: "in-mh",
    state: "Maharashtra",
    ytd: 1850,
    mtd: 308,
    week: 154,
  },
  {
    code: "in-ka",
    state: "Karnataka",
    ytd: 1750,
    mtd: 292,
    week: 146,
  },
  {
    code: "in-tn",
    state: "Tamil Nadu",
    ytd: 1630,
    mtd: 272,
    week: 136,
  },
  {
    code: "in-up",
    state: "Uttar Pradesh",
    ytd: 1600,
    mtd: 267,
    week: 134,
  },
  {
    code: "in-gj",
    state: "Gujarat",
    ytd: 1400,
    mtd: 233,
    week: 117,
  },
  {
    code: "in-wb",
    state: "West Bengal",
    ytd: 1100,
    mtd: 183,
    week: 92,
  },
  {
    code: "in-rj",
    state: "Rajasthan",
    ytd: 850,
    mtd: 142,
    week: 71,
  },
  {
    code: "in-mp",
    state: "Madhya Pradesh",
    ytd: 700,
    mtd: 117,
    week: 59,
  },
];

// ================= ACTIVE TAB =================
const [activeUsageTab, setActiveUsageTab] = useState("ytd");

// ================= MAP DATA =================
const currentHeatData = tableData.map((item) => [
  item.code,
  item[activeUsageTab],
]);

// ================= TOTAL =================
const totalUsage = tableData.reduce(
  (sum, item) => sum + item[activeUsageTab],
  0
);

// ================= INDIA HEAT MAP =================
const indiaHeatMapOptions = {
  chart: {
    map: mapDataIndia,
    backgroundColor: "transparent",
    height: 500,

    events: {
      render: function () {
        const chart = this;

        const top3Values = [...chart.series[0].points]
          .map((p) => p.value)
          .sort((a, b) => b - a)
          .slice(0, 3);

        chart.series[0].points.forEach((point) => {

          if (point.graphic && point.graphic.element) {

            point.graphic.element.classList.remove(
              "highcharts-point-dark-orange"
            );

            if (top3Values.includes(point.value)) {
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

    max:
      activeUsageTab === "ytd"
        ? 2000
        : activeUsageTab === "mtd"
        ? 350
        : 180,

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
      return `
        <div style="padding:4px">
          <b>${this.point.name}</b><br/>
          ${
            activeUsageTab === "ytd"
              ? "YTD"
              : activeUsageTab === "mtd"
              ? "MTD"
              : "This Week"
          } :
          <b style="color:#ea580c">
            ${this.point.value}
          </b>
        </div>
      `;
    },

    borderWidth: 2,
    borderColor: "#ea580c",
    borderRadius: 8,
    padding: 10,
    shadow: true,

    style: {
      fontSize: "12px",
      fontWeight: "bold",
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

      data: currentHeatData,
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
    Learning Path
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

{/* ROW 3 */}
<div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1.3fr] gap-5 mb-6">

  {/* ================= USER ANALYTICS ================= */}
  <div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col">

    <h2 className="text-base font-bold text-gray-800">
      User Analytics
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">

      {/* KPI */}
      <div className="flex flex-col flex-1 min-h-[125px]">
        <div className="flex-1 flex flex-col justify-center items-center text-center">

          <div className="text-[16px] font-bold text-gray-700 mb-2">
            Total Users
          </div>

          <div className="text-5xl font-black text-[#f97316] leading-none">
            {totalUsers.toLocaleString()}
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

    {/* TABLE */}
    <div className="mt-3 overflow-hidden">
      <table className="w-full text-[11px] border-collapse">

        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="p-2 text-center">S.No</th>
            <th className="p-2 text-center"></th>
            <th className="p-2 text-center w-[100px]">Role</th>
            <th className="p-2 text-center">Count</th>
          </tr>
        </thead>

        <tbody>
          {roleData.map((role, i) => {
            const colors = ["#f97316","#0f766e","#84cc16","#ea580c","#eab308","#60a5fa","#8b5cf6"];

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
                  {role.name}
                </td>

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

{/* ROW 4 */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6 items-stretch">

{/* ================= LEFT SIDE ================= */}
<div className="flex flex-col h-full">

{/* ================= Total USAGE ================= */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 flex flex-col h-[640px]">

  {/* ================= TOTAL HOURS ================= */}
  {/*
    15000 = overall target / total available hours
    usageData changes dynamically on filter
  */}
  {(() => {

    const totalUsageHours = usageData.reduce(
      (sum, item) => sum + item.hours,
      0
    );

    const usagePercentage = (
      (totalUsageHours / 15000) *
      100
    ).toFixed(1);

    return (

      <>
        {/* TITLE + FILTERS */}
        <div className="flex justify-between items-center mb-4">

  <h2 className="flex flex-col leading-tight">

  <span className="text-[18px] font-bold text-[#1f2340] tracking-tight">
    Total Usage
  </span>

  <span className="text-[22px] font-black text-[#0f8b8d] mt-1">
    15000 hrs
  </span>

</h2>

          <div className="flex gap-3">

            {/* REGION FILTER */}
            <select
              value={selectedUsageRegion}
              onChange={(e) => {
                setSelectedUsageRegion(e.target.value);
                setSelectedUsageCity("All");
              }}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm"
            >

              <option value="All">
                All Regions
              </option>

              {Object.keys(roleUsageHierarchy)
                .filter((r) => r !== "All")
                .map((region) => (

                  <option
                    key={region}
                    value={region}
                  >
                    {region}
                  </option>

                ))}

            </select>

            {/* CITY FILTER */}
            {selectedUsageRegion !== "All" && (

              <select
                value={selectedUsageCity}
                onChange={(e) =>
                  setSelectedUsageCity(e.target.value)
                }
                className="px-4 py-2 rounded-md border border-gray-300 text-sm"
              >

                <option value="All">
                  All Cities
                </option>

                {Object.keys(
                  roleUsageHierarchy[selectedUsageRegion]
                    .cities
                ).map((city) => (

                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>

                ))}

              </select>

            )}

          </div>

        </div>


{/* ================= TOP SECTION ================= */}
<div
  className={`grid gap-4 items-stretch ${
    selectedUsageRegion === "All"
      ? "grid-cols-1"
      : "grid-cols-1 md:grid-cols-[1.1fr_1.3fr]"
  }`}
>

  {/* ================= KPI CARD ================= */}
  {selectedUsageRegion !== "All" && (

    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="px-4 pt-3 pb-2">
        <h2 className="text-[15px] font-bold text-[#1f2340]">
          All India vs Region Usage
        </h2>
      </div>

      {/* ================= ROW 1 ================= */}
      <div className="flex items-center justify-between px-4 py-2">

        <div className="flex items-center gap-3">

          {/* ICON */}
          <div className="w-[44px] h-[44px] rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 shrink-0">
            <img
              src={IndiaMap}
              alt="Map Icon"
              className="w-8 object-contain"
            />
          </div>

          {/* CONTENT */}
          <div>

            <div className="text-[12px] font-bold text-[#1f2340]">
              All India Usage
            </div>

            <div className="flex items-end gap-1 mt-0.5">

              <span className="text-[28px] font-black text-[#0f8b8d] leading-none">
                15000
              </span>

              <span className="text-[14px] font-bold text-[#0f8b8d] mb-1">
                hrs
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200" />

      {/* ================= ROW 2 ================= */}
      <div className="flex items-center justify-between px-4 py-2">

        <div className="flex items-center gap-3">

          {/* ICON */}
          <div className="w-[44px] h-[44px] rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 shrink-0">
            <FaMapMarkerAlt className="text-[#0f8b8d] text-[18px]" />
          </div>

          {/* CONTENT */}
          <div>

            <div className="text-[12px] font-bold text-[#1f2340]">

              {selectedUsageCity === "All"
                ? `${selectedUsageRegion} Region Usage`
                : `${selectedUsageCity} Usage`}

            </div>

            <div className="flex items-end gap-1 mt-0.5">

              <span className="text-[28px] font-black text-[#0f8b8d] leading-none">
                {totalUsageHours}
              </span>

              <span className="text-[14px] font-bold text-[#0f8b8d] mb-1">
                hrs
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200" />

      {/* ================= PROGRESS ================= */}
      <div className="px-4 py-3">

        {/* BAR */}
        <div className="w-full h-[30px] bg-gray-100 rounded-md overflow-hidden border border-gray-200">

          <div
            className="h-full bg-[#0f8b8d] flex items-center justify-center text-white text-[12px] font-bold transition-all duration-500"
            style={{
              width: `${Math.min(usagePercentage, 100)}%`,
            }}
          >
            {usagePercentage}%
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center mt-2 px-1">

          <span className="text-[12px] font-bold text-[#0f8b8d]">
            {totalUsageHours} hrs
          </span>

          <span className="text-[12px] font-bold text-[#1f2340]">
            15000 hrs
          </span>

        </div>

      </div>

    </div>

  )}

  {/* ================= PIE CHART ================= */}
  <div
    className={`flex items-center justify-center overflow-hidden ${
      selectedUsageRegion === "All"
        ? "h-[320px]"
        : "h-[250px]"
    }`}
  >

    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "pie",
          backgroundColor: "transparent",
          height: selectedUsageRegion === "All" ? 250 : 250,
          spacing: [0, 0, 0, 0],

          options3d: {
            enabled: true,
            alpha: 45,
          },
        },

        title: {
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
              "</b><br/>Hours: " +
              this.y
            );
          },
        },

        plotOptions: {
          pie: {
            innerSize: 85,
            depth: 45,
            size:
              selectedUsageRegion === "All"
                ? "115%"
                : "98%",

            dataLabels: {
              enabled: false,
            },
          },
        },

        legend: {
          enabled: false,
        },

        series: [
          {
            name: "Usage",

            data: usageData.map((item) => ({
              name: item.role,
              y: item.hours,
            })),
          },
        ],
      }}
    />

  </div>

</div>
{/* ================= TABLE ================= */}
<div className="mt-5 overflow-hidden flex-1">

  <table className="w-full text-[11px] border-collapse">

    {/* HEADER */}
    <thead>

      <tr className="bg-gray-600 text-white">

        <th className="p-2 text-center">
          S.No
        </th>

        <th className="p-2 text-center"></th>

        <th className="p-2 text-center">
          Role
        </th>

        <th className="p-2 text-center">
          Hours
        </th>

        <th className="p-2 text-center">
         Share %
        </th>

      </tr>

    </thead>

    {/* BODY */}
    <tbody>

      {usageData.map((item, i) => {

        const colors = [
          "#10b981",
          "#06b6d4",
          "#f97316",
          "#8b5cf6",
          "#ef4444",
        ];

        // Calculate total hours for percentage
        const totalHours = usageData.reduce(
          (sum, curr) => sum + curr.hours,
          0
        );
        
        const percentage = ((item.hours / totalHours) * 100).toFixed(1);

        return (

          <tr
            key={i}
            className={
              i % 2 === 0
                ? "bg-gray-50"
                : "bg-white"
            }
          >

            {/* SERIAL */}
            <td className="p-2 text-center font-medium">
              {i + 1}
            </td>

            {/* COLOR DOT */}
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

            {/* ROLE */}
            <td className="p-2 text-center font-medium">
              {item.role}
            </td>

            {/* HOURS */}
            <td className="p-2 text-center font-bold">
              {item.hours} hrs
            </td>

            {/* PERCENTAGE */}
            <td className="p-2 text-center font-medium">
              <span className="text-[#0f8b8d] font-bold">
                {percentage}%
              </span>
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

{/* ================= INDIA HEAT MAP ================= */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 h-[640px] overflow-hidden">

  {/* ================= HEADER ================= */}
  <div className="flex items-center justify-between mb-4">

    {/* TITLE */}
    <h2 className="text-base font-bold text-gray-800">
      State Wise Usage Heat Map
    </h2>

    {/* TABS */}
    <div className="flex items-center gap-2">

      <button
        onClick={() => setActiveUsageTab("ytd")}
        className={`px-4 py-2 rounded-md text-[12px] font-bold transition-all ${
          activeUsageTab === "ytd"
            ? "bg-[#f97316] text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        YTD
      </button>

      <button
        onClick={() => setActiveUsageTab("mtd")}
        className={`px-4 py-2 rounded-md text-[12px] font-bold transition-all ${
          activeUsageTab === "mtd"
            ? "bg-[#f97316] text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        MTD
      </button>

      <button
        onClick={() => setActiveUsageTab("week")}
        className={`px-4 py-2 rounded-md text-[12px] font-bold transition-all ${
          activeUsageTab === "week"
            ? "bg-[#f97316] text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        THIS WEEK
      </button>

    </div>

  </div>

  {/* ================= BODY ================= */}
  <div className="flex flex-col lg:flex-row gap-3 items-start">

    {/* ================= TABLE ================= */}
    <div className="lg:w-[35%] bg-white border border-gray-200 rounded-md overflow-hidden h-fit">

      {/* TOTAL CARD */}
      <div className="p-4 border-b border-gray-200 text-center">

        <div className="text-[14px] font-bold text-gray-600 mb-1">
          Total Usage
        </div>

        <div className="text-4xl font-black text-[#f97316]">
          {totalUsage.toLocaleString()}
        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-hidden">

        <table className="w-full text-[11px]">

          {/* HEADER */}
          <thead>
            <tr className="bg-[#4a4a4a] text-white">

              <th className="px-2 py-2 text-center w-[40px]">
                NO
              </th>

              <th className="px-2 py-2 text-left">
                STATE
              </th>

              <th className="px-2 py-2 text-center w-[90px]">
                {activeUsageTab === "ytd"
                  ? "YTD"
                  : activeUsageTab === "mtd"
                  ? "MTD"
                  : "THIS WEEK"}
              </th>

            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {[...tableData]
              .sort((a, b) => b[activeUsageTab] - a[activeUsageTab])
              .map((item, i) => {

                const value = item[activeUsageTab];

                const top3 = [...tableData]
                  .sort((a, b) => b[activeUsageTab] - a[activeUsageTab])
                  .slice(0, 3)
                  .map((d) => d[activeUsageTab]);

                const isTop = top3.includes(value);

                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      isTop ? "top-state-blink" : ""
                    }`}
                  >

                    {/* NUMBER */}
                    <td className="px-2 py-3 text-center font-semibold">
                      {i + 1}
                    </td>

                    {/* STATE */}
                    <td className="px-2 py-3">

                      <div className="flex items-center gap-2">

                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isTop ? "top-state-dot-blink" : ""
                          }`}
                          style={{
                            backgroundColor:
                              i === 0
                                ? "#c2410c"
                                : i === 1
                                ? "#ea580c"
                                : i === 2
                                ? "#f97316"
                                : "#fdba74",
                          }}
                        />

                        <span className="font-semibold text-gray-700">
                          {item.state}
                        </span>

                      </div>

                    </td>

                    {/* VALUE */}
                    <td
                      className={`px-2 py-3 text-center font-bold ${
                        isTop
                          ? "text-[#c2410c]"
                          : "text-gray-700"
                      }`}
                    >
                      {value}
                    </td>

                  </tr>
                );
              })}

          </tbody>

        </table>

      </div>

    </div>

    {/* ================= MAP ================= */}
    <div className="lg:w-[65%] w-full rounded-2xl overflow-hidden">

      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={{
          ...indiaHeatMapOptions,

          chart: {
            ...indiaHeatMapOptions.chart,
            height: 500,
            backgroundColor: "transparent",
          },
        }}
      />

    </div>

  </div>

</div>

</div>


{/* ================= ROW 5 ================= */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6 items-stretch auto-rows-fr">

{/* ================= LEFT: ROLE HOLDER USAGE ================= */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 min-h-[420px] flex flex-col">

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
          height: 350,
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
            text: "Roles",
            style: {
              fontSize: "11px",
              fontWeight: "bold",
            },
          },

          categories: ["DSE", "TL", "RSE", "DSM", "GM"],

          labels: {
            style: {
              fontSize: "10px",
              fontWeight: "bold",
            },
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
          formatter: function () {
            return `
              <div style="padding:4px">
                <b>${this.point.role}</b><br/>
                Total Users: ${this.point.totalCount}<br/>
                Active Users: ${this.point.activeUsers}<br/>
                Hour: ${this.point.y}:00<br/>
                Usage: ${this.point.z}%
              </div>
            `;
          },
        },

        plotOptions: {
          bubble: {
            minSize: 15,
            maxSize: 70,
          },

          series: {
            dataLabels: {
              enabled: true,
              format: "{point.z}%",

              style: {
                fontSize: "9px",
                fontWeight: "bold",
                color: "#ffffff",
                textOutline: "none",
              },
            },
          },
        },

series: [
  {
    data: [

      // ================= DSE =================
      {
        x: 0,
        y: 9,
        z: 22, // Monday
        activeUsers: 44,
        totalCount: 200,
        role: "DSE",
        color: "#3b82f6",
      },
      {
        x: 0,
        y: 14,
        z: 50, // Thursday
        activeUsers: 100,
        totalCount: 200,
        role: "DSE",
        color: "#3b82f6",
      },
      {
        x: 0,
        y: 19,
        z: 2, // Saturday (low activity)
        activeUsers: 4,
        totalCount: 200,
        role: "DSE",
        color: "#3b82f6",
      },

      // ================= TL =================
      {
        x: 1,
        y: 8,
        z: 18,
        activeUsers: 18,
        totalCount: 100,
        role: "TL",
        color: "#22c55e",
      },
      {
        x: 1,
        y: 13,
        z: 55,
        activeUsers: 55,
        totalCount: 100,
        role: "TL",
        color: "#22c55e",
      },
      {
        x: 1,
        y: 21,
        z: 7,
        activeUsers: 7,
        totalCount: 100,
        role: "TL",
        color: "#22c55e",
      },

      // ================= RSE =================
      {
        x: 2,
        y: 10,
        z: 33,
        activeUsers: 49,
        totalCount: 150,
        role: "RSE",
        color: "#f97316",
      },
      {
        x: 2,
        y: 15,
        z: 61,
        activeUsers: 91,
        totalCount: 150,
        role: "RSE",
        color: "#f97316",
      },
      {
        x: 2,
        y: 20,
        z: 12,
        activeUsers: 18,
        totalCount: 150,
        role: "RSE",
        color: "#f97316",
      },

      // ================= DSM =================
      {
        x: 3,
        y: 11,
        z: 40,
        activeUsers: 20,
        totalCount: 50,
        role: "DSM",
        color: "#a855f7",
      },
      {
        x: 3,
        y: 14,
        z: 25,
        activeUsers: 12,
        totalCount: 50,
        role: "DSM",
        color: "#a855f7",
      },
      {
        x: 3,
        y: 18,
        z: 8,
        activeUsers: 4,
        totalCount: 50,
        role: "DSM",
        color: "#a855f7",
      },

      // ================= GM =================
      {
        x: 4,
        y: 12,
        z: 60,
        activeUsers: 18,
        totalCount: 30,
        role: "GM",
        color: "#ef4444",
      },
      {
        x: 4,
        y: 17,
        z: 30,
        activeUsers: 9,
        totalCount: 30,
        role: "GM",
        color: "#ef4444",
      },
      {
        x: 4,
        y: 22,
        z: 5,
        activeUsers: 1,
        totalCount: 30,
        role: "GM",
        color: "#ef4444",
      },
    ],
  },
],
      }}
    />

  </div>
</div>

{/* ================= RIGHT: WEEKLY ROLE USAGE ================= */}
<div className="bg-white rounded-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 min-h-[420px] flex flex-col">

  <h2 className="text-base font-bold mb-2 text-gray-800">
    Weekly Role Usage
  </h2>

  <div className="flex-1 min-h-0">

    <HighchartsReact
      highcharts={Highcharts}
      options={{
        chart: {
          type: "bubble",
          backgroundColor: "transparent",
          height: 400,
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

        // ================= X AXIS = ROLE =================
        xAxis: {
          categories: ["DSE", "TL", "RSE", "DSM", "GM"],

          title: {
            text: "Roles",
            style: {
              fontSize: "11px",
              fontWeight: "bold",
            },
          },

          labels: {
            style: {
              fontSize: "10px",
              fontWeight: "bold",
            },
          },

          gridLineWidth: 1,
        },

        // ================= Y AXIS = WEEK DAYS =================
        yAxis: {
          categories: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],

          title: {
            text: "Week Days",
            style: {
              fontSize: "11px",
              fontWeight: "bold",
            },
          },

          labels: {
            style: {
              fontSize: "10px",
            },
          },

          gridLineWidth: 1,
        },

        tooltip: {
          useHTML: true,

          formatter: function () {
            return `
              <div style="padding:4px">
                <b>${this.point.role}</b><br/>
                Day: ${this.point.day}<br/>
                Active Users: ${this.point.activeUsers}<br/>
                Total Users: ${this.point.totalUsers}<br/>
                Usage: ${this.point.z}%
              </div>
            `;
          },
        },

        plotOptions: {
          bubble: {
            minSize: 12,
            maxSize: 60,
          },

          series: {
            dataLabels: {
              enabled: true,
              format: "{point.z}%",

              style: {
                fontSize: "8px",
                fontWeight: "bold",
                color: "#ffffff",
                textOutline: "none",
              },
            },
          },
        },
series: [
  {
    data: [

      // =====================================================
      // DSE (Total Users = 200)
      // Only 3 random days
      // =====================================================

      {
        x: 0,
        y: 0, // Monday
        z: 35,
        activeUsers: 70,
        totalUsers: 200,
        role: "DSE",
        day: "Monday",
        color: "#3b82f6",
      },

      {
        x: 0,
        y: 3, // Thursday
        z: 60,
        activeUsers: 120,
        totalUsers: 200,
        role: "DSE",
        day: "Thursday",
        color: "#3b82f6",
      },

      {
        x: 0,
        y: 5, // Saturday
        z: 25,
        activeUsers: 50,
        totalUsers: 200,
        role: "DSE",
        day: "Saturday",
        color: "#3b82f6",
      },

      // =====================================================
      // TL (Total Users = 100)
      // Only 2 random days
      // =====================================================

      {
        x: 1,
        y: 1, // Tuesday
        z: 40,
        activeUsers: 40,
        totalUsers: 100,
        role: "TL",
        day: "Tuesday",
        color: "#22c55e",
      },

      {
        x: 1,
        y: 4, // Friday
        z: 65,
        activeUsers: 65,
        totalUsers: 100,
        role: "TL",
        day: "Friday",
        color: "#22c55e",
      },

      // =====================================================
      // RSE (Total Users = 150)
      // Only 4 random days
      // =====================================================

      {
        x: 2,
        y: 0, // Monday
        z: 30,
        activeUsers: 45,
        totalUsers: 150,
        role: "RSE",
        day: "Monday",
        color: "#f97316",
      },

      {
        x: 2,
        y: 2, // Wednesday
        z: 55,
        activeUsers: 82,
        totalUsers: 150,
        role: "RSE",
        day: "Wednesday",
        color: "#f97316",
      },

      {
        x: 2,
        y: 3, // Thursday
        z: 70,
        activeUsers: 105,
        totalUsers: 150,
        role: "RSE",
        day: "Thursday",
        color: "#f97316",
      },

      {
        x: 2,
        y: 6, // Sunday
        z: 20,
        activeUsers: 30,
        totalUsers: 150,
        role: "RSE",
        day: "Sunday",
        color: "#f97316",
      },

      // =====================================================
      // DSM (Total Users = 50)
      // Only 3 random days
      // =====================================================

      {
        x: 3,
        y: 1, // Tuesday
        z: 20,
        activeUsers: 10,
        totalUsers: 50,
        role: "DSM",
        day: "Tuesday",
        color: "#a855f7",
      },

      {
        x: 3,
        y: 4, // Friday
        z: 50,
        activeUsers: 25,
        totalUsers: 50,
        role: "DSM",
        day: "Friday",
        color: "#a855f7",
      },

      {
        x: 3,
        y: 5, // Saturday
        z: 40,
        activeUsers: 20,
        totalUsers: 50,
        role: "DSM",
        day: "Saturday",
        color: "#a855f7",
      },

      // =====================================================
      // GM (Total Users = 30)
      // Only 2 random days
      // =====================================================

      {
        x: 4,
        y: 2, // Wednesday
        z: 35,
        activeUsers: 10,
        totalUsers: 30,
        role: "GM",
        day: "Wednesday",
        color: "#ef4444",
      },

      {
        x: 4,
        y: 6, // Sunday
        z: 15,
        activeUsers: 5,
        totalUsers: 30,
        role: "GM",
        day: "Sunday",
        color: "#ef4444",
      },
    ],
  },
],
      }}
    />

  </div>
</div>

</div>



    </div>
  );
};

export default PerformanceAnalytics;