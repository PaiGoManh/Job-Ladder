import React, { useState, useEffect } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editJobId, setEditJobId] = useState(null); 
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    jobtype: "On-Site",
    salary: "",
    vacancy: "",
    courseCriteria: "",
    jobstatus :"",
  });

  // Handle Edit Button
  const handleEdit = (id) => {
    const jobToEdit = jobs.find((job) => job._id === id);
    if (jobToEdit) {
      setEditJobId(id);
      setJobData({
        title: jobToEdit.title,
        description: jobToEdit.description,
        jobtype: jobToEdit.jobtype,
        salary: jobToEdit.salary,
        vacancy: jobToEdit.vacancy,
        courseCriteria: jobToEdit.courseCriteria,
        jobstatus:jobToEdit.jobstatus,
      });
    }
  };

  // Handle Submit Edit Form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");  
    try {
        const response = await fetch(`/api/job/edit/${editJobId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, 
            },
            body: JSON.stringify(jobData),
          });

      if (response.ok) {
        const updatedJob = await response.json();
        setJobs(jobs.map((job) => (job._id === updatedJob.job._id ? updatedJob.job : job)));
        setEditJobId(null);
        alert("Job updated successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update job");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      alert("An error occurred while updating the job.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");  
  
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        const response = await fetch(`/api/job/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Pass token for authentication
          },
        });
  
        if (response.ok) {
          setJobs(jobs.filter((job) => job._id !== id));
          alert("Job deleted successfully.");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to delete job.");
        }
      } catch (error) {
        console.error("Error deleting job:", error);
        alert("An error occurred while deleting the job.");
      }
    }
  };
  

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/job/view");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full lg:w-3/4 animate-fadeIn transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Job List</h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-blue-300 rounded-lg">
              <thead>
                <tr className="bg-blue-500">
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Title</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Description</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Type</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Salary</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Vacancy</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Criteria</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Status</th>
                  <th className="px-6 py-3 border border-blue-300 text-center font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                    <td className="px-6 py-4 border border-blue-300">{job.title}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.description}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.jobtype}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.salary}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.vacancy}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.courseCriteria}</td>
                    <td className="px-6 py-4 border border-blue-300">{job.jobstatus}</td>
                    <td className="px-6 py-4 border border-blue-300 text-center flex-row">
                      <button
                        onClick={() => handleEdit(job._id)}
                        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500 transition transform hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-500 transition transform hover:scale-105"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Job Modal */}
      {editJobId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-lg">Job Title</label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg">Description</label>
                <textarea
                  value={jobData.description}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg">Job Type</label>
                <select
                  value={jobData.jobtype}
                  onChange={(e) => setJobData({ ...jobData, jobtype: e.target.value })}
                  className="w-full border rounded-lg p-2"
                >
                  <option value="On-Site">On-Site</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-lg">Salary</label>
                <input
                  type="number"
                  value={jobData.salary}
                  onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg">Vacancy</label>
                <input
                  type="number"
                  value={jobData.vacancy}
                  onChange={(e) => setJobData({ ...jobData, vacancy: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg">Criteria</label>
                <textarea
                  value={jobData.courseCriteria}
                  onChange={(e) => setJobData({ ...jobData, courseCriteria: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg">Job Status</label>
                <input
                  type="text"
                  value={jobData.jobstatus}
                  onChange={(e) => setJobData({ ...jobData, jobstatus: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
                <button
                  type="button"
                  onClick={() => setEditJobId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
