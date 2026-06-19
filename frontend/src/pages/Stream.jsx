
// // Stream.jsx

// // Stream.jsx

// import React from "react";
// import {
//   Bell,
//   UserCircle,
//   Search,
//   ChevronDown,
//   RefreshCcw,
//   Pencil,
// } from "lucide-react";

// const streams = [
//   {
//     id: 1,
//     title: "(Old)Mastering the Pulsar 220F",
//     description:
//       "To equip learners with in-depth knowledge of the Pulsar 220F motorcycle, covering its performance and features.",
//     image:
//       "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
//     sections: 9,
//     cards: 75,
//     updated: "23-Jul-2025",
//     available: 8,
//   },
//   {
//     id: 2,
//     title: "(Old)Inside the Chetak Range",
//     description:
//       "Equip learners with complete knowledge of the three Chetak variants - 2901, 2901 and 3501.",
//     image:
//       "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800",
//     sections: 6,
//     cards: 77,
//     updated: "25-Jul-2025",
//     available: 8,
//   },
//   {
//     id: 3,
//     title: "(Old)Pulsar 150 Smart Cluster Mastery",
//     description:
//       "This stream helps users gain practical knowledge of the upgraded Pulsar 150 Smart Cluster system.",
//     image:
//       "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
//     sections: 9,
//     cards: 79,
//     updated: "23-Jul-2025",
//     available: 9,
//   },
// ];

// const Stream = () => {
//   return (
//     <div className="min-h-screen bg-[#f3f3f3]">
//       {/* Header */}
//       <div className="h-12 bg-white border-b flex items-center justify-end px-6">
//         <div className="flex items-center gap-4">
//           <span className="text-sm text-gray-500 font-medium">
//             Vijay Gaikwad
//           </span>

//           <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
//             <Bell size={15} className="text-red-500" />
//           </button>

//           <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
//             <UserCircle size={18} className="text-red-500" />
//           </button>
//         </div>
//       </div>

//       {/* Filter Bar */}
//       <div className="bg-[#ededed] border-b px-3 py-3">
//         <div className="bg-white border px-4 py-3 flex items-center justify-between flex-wrap gap-3">
//           <div className="flex items-center gap-3 flex-wrap">
//             <button className="h-10 bg-[#2d2d31] text-white px-4 rounded-sm flex items-center gap-3 text-sm">
//               English Global
//               <ChevronDown size={14} />
//             </button>

//             <div className="flex items-center gap-2 border rounded px-3 h-10 bg-white">
//               <Search size={15} className="text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-[220px] outline-none text-sm"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4 flex-wrap">
//             <button className="text-sm text-gray-600 flex items-center gap-2">
//               1 filter applied
//               <ChevronDown size={14} />
//             </button>

//             <button className="text-sm text-red-500">
//               Clear Filter
//             </button>

//             <button className="h-10 px-5 text-white text-sm rounded bg-gradient-to-r from-[#d94d59] to-[#e47b4a] flex items-center gap-2">
//               Add Stream
//               <ChevronDown size={14} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-3">
//         {/* Top Bar */}
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="font-semibold text-[18px] text-gray-800">
//             9 Streams found
//           </h2>

//           <div className="bg-white border px-3 py-2 rounded text-sm flex items-center gap-2">
//             <span className="text-gray-500">sort by :</span>
//             <span className="font-semibold">Relevance</span>
//             <ChevronDown size={14} />
//           </div>
//         </div>

//         {/* Stream Cards */}
//         <div className="space-y-3">
//           {streams.map((stream) => (
//             <div
//               key={stream.id}
//               className="bg-white border border-gray-200 px-3 py-3 rounded-sm"
//             >
//               <div className="grid grid-cols-[220px_1.8fr_220px_180px_120px] gap-4 items-center">
//                 {/* Image */}
//                 <div className="relative">
//                   <img
//                     src={stream.image}
//                     alt={stream.title}
//                     className="w-full h-[90px] object-cover border rounded"
//                   />

//                   <button className="absolute -bottom-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
//                     <Pencil size={10} />
//                   </button>
//                 </div>

//                 {/* Details */}
//                 <div>
//                   <div className="flex items-center gap-2 mb-1 flex-wrap">
//                     <h3 className="font-semibold text-[15px] text-gray-800">
//                       {stream.title}
//                     </h3>

//                     <span className="bg-[#2d2d2d] text-white text-[10px] px-2 py-[2px] rounded">
//                       V1
//                     </span>

//                     <span className="font-semibold text-xs text-gray-700">
//                       EDITED
//                     </span>
//                   </div>

//                   <p className="text-xs text-gray-500 line-clamp-2">
//                     {stream.description}
//                   </p>

//                   <span className="inline-block mt-2 bg-gray-100 px-2 py-1 rounded text-[11px] font-medium">
//                     1 Language
//                   </span>
//                 </div>

//                 {/* Stats */}
//                 <div>
//                   <div className="text-[#c94f4f] text-sm font-semibold">
//                     {stream.sections} Sections | {stream.cards} Cards
//                   </div>

//                   <p className="text-[11px] text-gray-500 mt-1">
//                     LAST UPDATED : {stream.updated}
//                   </p>
//                 </div>

//                 {/* Status */}
//                 <div>
//                   <h4 className="text-sm font-medium text-gray-700">
//                     Work In Progress
//                   </h4>

//                   <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
//                     <RefreshCcw size={14} />
//                     Sync
//                   </div>

//                   <p className="text-[11px] text-gray-500 mt-1">
//                     {stream.available} sections available
//                   </p>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex justify-end">
//                   <button className="border border-red-300 text-red-500 px-3 py-1.5 text-sm rounded flex items-center gap-1">
//                     Actions
//                     <ChevronDown size={12} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stream;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  UserCircle,
  Search,
  ChevronDown,
  RefreshCcw,
  Pencil,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import api from "../services/api";

const Stream = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStreams();
  }, [categoryId]);

  const fetchStreams = async () => {
    try {
      setLoading(true);
      const response = await api.getStreamsByCategory(categoryId);
      setStreams(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching streams:", err);
      setError("Failed to load streams. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(/ /g, "-");
  };

  const getStatusDisplay = (status) => {
    if (status === "active") return "Active";
    if (status === "inactive") return "Inactive";
    return "Work In Progress"; // fallback
  };

    const handleViewSections = (streamId, e) => {
    e.stopPropagation(); // prevent card click if any
    navigate(`/admin/sections/${streamId}`);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex justify-center items-center">
        <div className="text-lg font-medium">Loading streams...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate("/admin/content")}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Go Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Header */}
      <div className="h-12 bg-white border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/content")}
            className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-gray-500">|</span>
          <span className="text-sm font-medium text-gray-700">
            Streams for Category
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 font-medium">
            Vijay Gaikwad
          </span>

          <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
            <Bell size={15} className="text-red-500" />
          </button>

          <button className="w-8 h-8 rounded-full border border-red-300 flex items-center justify-center">
            <UserCircle size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#ededed] border-b px-3 py-3">
        <div className="bg-white border px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button className="h-10 bg-[#2d2d31] text-white px-4 rounded-sm flex items-center gap-3 text-sm">
              English Global
              <ChevronDown size={14} />
            </button>

            <div className="flex items-center gap-2 border rounded px-3 h-10 bg-white">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-[220px] outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button className="text-sm text-gray-600 flex items-center gap-2">
              1 filter applied
              <ChevronDown size={14} />
            </button>

            <button className="text-sm text-red-500">Clear Filter</button>

            <button className="h-10 px-5 text-white text-sm rounded bg-gradient-to-r from-[#d94d59] to-[#e47b4a] flex items-center gap-2">
              Add Stream
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-[18px] text-gray-800">
            {streams.length} Stream{streams.length !== 1 && "s"} found
          </h2>

          <div className="bg-white border px-3 py-2 rounded text-sm flex items-center gap-2">
            <span className="text-gray-500">sort by :</span>
            <span className="font-semibold">Relevance</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Stream Cards */}
        <div className="space-y-3">
          {streams.map((stream) => (
            <div
              key={stream.id}
              className="bg-white border border-gray-200 px-3 py-3 rounded-sm"
            >
              <div className="grid grid-cols-[220px_1.8fr_220px_180px_120px] gap-4 items-center">
                {/* Image */}
                <div className="relative">
                  {stream.icon_url ? (
                    <img
                      src='https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800'
                      alt={stream.title}
                      className="w-full h-[90px] object-cover border rounded"
                    />
                  ) : (
                    <div className="w-full h-[90px] bg-gray-200 border rounded flex items-center justify-center text-gray-500 text-sm">
                      No Image
                    </div>
                  )}

                  <button className="absolute -bottom-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center">
                    <Pencil size={10} />
                  </button>
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-[15px] text-gray-800">
                      {stream.title}
                    </h3>

                    <span className="bg-[#2d2d2d] text-white text-[10px] px-2 py-[2px] rounded">
                      V1
                    </span>

                    <span className="font-semibold text-xs text-gray-700">
                      {stream.status?.toUpperCase() || "ACTIVE"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {stream.content || "No description available"}
                  </p>

                  <span className="inline-block mt-2 bg-gray-100 px-2 py-1 rounded text-[11px] font-medium">
                    {stream.language || "1 Language"}
                  </span>
                </div>

                {/* Stats */}
                <div>
                   <button
                    onClick={(e) => handleViewSections(stream.id, e)}
                    className="text-[#c94f4f] text-sm font-semibold hover:underline flex items-center gap-1 transition"
                  >
                    {stream.sections_count || 0} Sections |{" "}
                    {stream.contents_count || 0} Cards
                    <ChevronRight size={14} className="inline-block" />
                  </button>

                  <p className="text-[11px] text-gray-500 mt-1">
                    LAST UPDATED : {formatDate(stream.updated_at)}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    {getStatusDisplay(stream.status)}
                  </h4>

                  <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                    <RefreshCcw size={14} />
                    Sync
                  </div>

                  <p className="text-[11px] text-gray-500 mt-1">
                    {stream.sections_count || 0} sections available
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <button className="border border-red-300 text-red-500 px-3 py-1.5 text-sm rounded flex items-center gap-1">
                    Actions
                    <ChevronDown size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stream;