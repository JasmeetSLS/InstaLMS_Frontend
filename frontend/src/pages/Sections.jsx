import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronDown, Edit, BookOpen, FileText, CheckCircle } from "lucide-react";
import api from "../services/api";

const Sections = () => {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSections();
  }, [streamId]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const response = await api.getSectionsByStream(streamId);
      setSections(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching sections:", err);
      setError("Failed to load sections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex justify-center items-center">
        <div className="text-lg font-medium">Loading sections...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f3f3f3] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      {/* Simple Header */}
      <div className="h-12 bg-white border-b flex items-center px-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={16} /> Back to Streams
        </button>
        <span className="mx-3 text-gray-300">|</span>
        <h1 className="text-lg font-semibold text-gray-800">Sections</h1>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {sections.length} Section{sections.length !== 1 && "s"} found
          </h2>
          <button className="bg-gradient-to-r from-red-600 to-orange-400 text-white px-4 py-2 rounded-md text-sm">
            + Add Section
          </button>
        </div>

        {sections.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No sections available for this stream.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((section) => (
              <div key={section.id} className="bg-white border rounded-md p-5 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-lg text-gray-800">{section.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${section.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {section.status || 'active'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{section.description || 'No description'}</p>
                <div className="mt-4 flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><FileText size={14} /> {section.contents_count || 0} Contents</span>
                  <span className="flex items-center gap-1"><CheckCircle size={14} /> {section.assessments_count || 0} Assessments</span>
                </div>
                <button className="mt-4 text-red-500 text-sm font-medium flex items-center gap-1">
                  <Edit size={14} /> Manage
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sections;