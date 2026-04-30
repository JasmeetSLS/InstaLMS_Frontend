import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Upload, Download, FileSpreadsheet, CheckCircle, XCircle } from 'lucide-react';
import { FaToggleOn, FaRegQuestionCircle } from "react-icons/fa";
import api, { FILE_BASE_URL } from '../services/api';
import * as XLSX from 'xlsx';

const Quiz = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchPostTitles();
    }, []);

    const fetchPostTitles = async () => {
        try {
            setLoading(true);
            const response = await api.getAllPostTitles();
            if (response.success) {
                setPosts(response.data);
                // Automatically select first post if available
                if (response.data && response.data.length > 0) {
                    setSelectedPost(response.data[0]);
                    fetchQuizQuestions(response.data[0].id);
                }
            }
        } catch (err) {
            console.error('Error fetching posts:', err);
            alert('Failed to fetch posts: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    const fetchQuizQuestions = async (postId) => {
        try {
            setLoading(true);
            const response = await api.getQuizQuestions(postId);
            if (response.success) {
                setQuestions(response.data.questions);
                setSelectedPost(response.data.post);
            }
        } catch (err) {
            console.error('Error fetching quiz:', err);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePostSelect = (postId) => {
        const post = posts.find(p => p.id === parseInt(postId));
        if (post) {
            setSelectedPost(post);
            fetchQuizQuestions(postId);
        }
    };

    const handleBulkUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        
        setUploading(true);
        setError('');
        setSuccess('');

        try {
            const response = await api.bulkUploadQuiz(formData);
            if (response.success) {
                const message = `Successfully uploaded!\nInserted: ${response.inserted}\nSkipped: ${response.skipped}\nTotal: ${response.total}`;
                alert(message);
                if (selectedPost) {
                    fetchQuizQuestions(selectedPost.id);
                }
            } else {
                alert('Upload failed: ' + (response.error || 'Unknown error'));
            }
        } catch (err) {
            console.error('Upload error:', err);
            alert('Failed to upload quiz: ' + (err.message || 'Unknown error'));
        } finally {
            setUploading(false);
            event.target.value = '';
        }
    };

    const handleEdit = (post) => {
       alert('Edit functionality will be added soon');
    };

    const handleDelete = (post) => {
       alert('Delete functionality will be added soon');
    };

    const exportToExcel = () => {
        if (!questions.length) {
            alert('No questions to export!');
            return;
        }

        const exportData = questions.map((q, index) => ({
            'S.No': index + 1,
            'Post': selectedPost?.title || '',
            'Question': q.question_text,
            'Option A': q.option_a,
            'Option B': q.option_b,
            'Option C': q.option_c || '',
            'Option D': q.option_d || '',
            'Correct Option': q.correct_option,
            'Marks': q.marks
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Quiz Questions');
        XLSX.writeFile(wb, `quiz_${selectedPost?.title || 'questions'}_${new Date().toISOString().split('T')[0]}.xlsx`);
        
        alert('Excel exported successfully!');
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quiz Management</h1>
                </div>
                
                <div className="flex gap-2">
                    <button
                                onClick={exportToExcel}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                            >
                                <FileSpreadsheet className="w-4 h-4" />
                                Export Excel
                            </button>
                    
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Upload Excel'}
                        <input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleBulkUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </label>
                </div>
            </div>

            {/* Post Selection */}
            <div className="bg-white rounded-lg shadow mb-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Post
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => handlePostSelect(e.target.value)}
                            value={selectedPost?.id || ''}
                        >
                            {posts.map(post => (
                                <option key={post.id} value={post.id}>
                                    {post.title}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            </div>

            {/* Questions Table */}
            {selectedPost ? (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Questions for: {selectedPost.title}
                            <span className="ml-2 text-sm text-gray-500">({questions.length} questions)</span>
                        </h2>
                    </div>
                    
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : questions.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            S.No
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Question
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Options
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Correct
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Marks
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    Media
</th>
 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {questions.map((question, index) => (
                                        <tr key={question.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                                                <div className="line-clamp-2">{question.question_text}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-blue-600">A:</span>
                                                        <span className="text-gray-700">{question.option_a}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-blue-600">B:</span>
                                                        <span className="text-gray-700">{question.option_b}</span>
                                                    </div>
                                                    {question.option_c && (
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-blue-600">C:</span>
                                                            <span className="text-gray-700">{question.option_c}</span>
                                                        </div>
                                                    )}
                                                    {question.option_d && (
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-blue-600">D:</span>
                                                            <span className="text-gray-700">{question.option_d}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold">
                                                    {question.correct_option}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                                    {question.marks} marks
                                                </span>
                                             </td>
                                             <td className="px-6 py-4 whitespace-nowrap text-sm">
    {question.question_media_url && (
        <img 
            src={`${FILE_BASE_URL}${question.question_media_url}`}
            alt="Question media"
            className="w-10 h-10 object-cover rounded-lg border border-gray-200"
        />
    )}
</td>
  <td className="px-4 py-2 text-3xl text-green-600 whitespace-nowrap">
                                                                                {/* {category.status} */}
                                                                                <FaToggleOn />
                                                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center gap-2">
                                                  <button
                                                        onClick={() => handleEdit()}
                                                        className="p-1 text-blue-600 hover:bg-red-50 rounded-md transition"
                                                        title="edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                          onClick={() => handleDelete()}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded-md transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                             </td>
                                         </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <FaRegQuestionCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No quiz questions found for this post</p>
                            <p className="text-sm text-gray-400 mt-2">Upload an Excel file to add questions</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <FaRegQuestionCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-700 mb-2">No Posts Available</h3>
                    <p className="text-gray-500">Please create a post first to add quiz questions</p>
                </div>
            )}

        </div>
    );
};

export default Quiz;