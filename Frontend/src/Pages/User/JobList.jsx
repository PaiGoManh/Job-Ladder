import React, { useState, useEffect } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUserId = localStorage.getItem("userId");

  const handleApply = async (jobId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/job/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const updatedJob = data.job;

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId
              ? {
                  ...job,
                  vacancy: updatedJob.vacancy,
                  applications: job.applications.map((application) =>
                    application.userId.toString() === currentUserId
                      ? { ...application, status: "Pending" } 
                      : application
                  ),
                }
              : job
          )
        );

        alert("Job applied successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to apply for job");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("An error occurred while applying for the job.");
    }
  };

  const handleSave = async (jobId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`/api/user/save/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Job saved successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to save job");
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert("An error occurred while saving the job.");
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8 mt-[-5%]">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full lg:w-3/4 animate-fadeIn">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Job List</h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <table className="table-fixed min-w-full border-collapse border border-blue-300 rounded-lg">
            <thead>
              <tr className="bg-blue-500 sticky top-0 z-10">
                <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Title</th>
                <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Description</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Type</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Salary</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Vacancy</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Status</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Application Status</th>
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-center font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                  <td className="px-6 py-4 border border-blue-300">{job.title}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.description}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.jobtype}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.salary} INR</td>
                  <td className="px-6 py-4 border border-blue-300">{job.vacancy}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.jobstatus}</td>
                  <td className="px-6 py-4 border border-blue-300">
                  {
                    job.applications
                      .map(application => application.userId.toString() === currentUserId ? application.status : null)
                      .filter(status => status !== null)[0] || 'Not Applied'
                  }
                  </td>
                  <td className="px-6 py-4 border border-blue-300 text-center space-x-4">
                    {job.jobstatus !== "Closed" && job.vacancy > 0 && job.jobstatus !== "Pending" ? (
                      <button
                        onClick={() => handleApply(job._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-400 transition"
                      >
                        Apply
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-600 text-white rounded"
                      >
                        Applied
                      </button>
                    )}
                    <button
                      onClick={() => handleSave(job._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-400 transition"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JobList;
