import React, { useEffect, useState } from "react";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to view your jobs.");
        return;
      }

      try {
        const response = await fetch("/api/user/jobs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSavedJobs(data.savedJobs);
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Failed to fetch saved jobs.");
        }
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        alert("An error occurred while fetching saved jobs.");
      }
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8 mt-[-5%]">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full lg:w-3/4 animate-fadeIn">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Saved Jobs</h2>
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
                <th className="w-1/6 px-6 py-3 border border-blue-300 text-center font-semibold text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {savedJobs.map((job) => (
                <tr key={job._id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                  <td className="px-6 py-4 border border-blue-300">{job.title}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.description}</td>
                  <td className="px-6 py-4 border border-blue-300">{job.jobtype}</td>
                  <td className="px-6 py-4 border border-blue-300">${job.salary}</td>
                  <td className="px-6 py-4 border border-blue-300 text-center">{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
