import React, { useState, useEffect } from "react";

const EmployerJobApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs with applications
  const fetchJobsWithApplications = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication token is missing");
      return;
    }

    try {
      const response = await fetch("/api/job/employer/applications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch job applications");
      }

      const data = await response.json();
      setJobs(data.jobs);
      console.log(data) // Assuming the response is in the format { jobs: [...] }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Handle the application status change
  const handleApplicationStatusChange = async (jobId, applicationId, newStatus) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      setError("Authentication token is missing");
      return;
    }
  
    try {
      const response = await fetch(`/api/job/${newStatus.toLowerCase()}/${jobId}/${applicationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to update application status");
      }
  
      const data = await response.json();
      
      // Update the local state to reflect the change
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId
            ? {
                ...job,
                applications: job.applications.map((application) =>
                  application._id === applicationId
                    ? { ...application, status: newStatus }
                    : application
                ),
              }
            : job
        )
      );
  
      // You can show a success message here if needed
      alert(`${newStatus} the application successfully!`);
  
    } catch (error) {
      setError(error.message);
    }
  };

  const acceptApplication = async (jobId,applicationId) => {
    const token = localStorage.getItem("token");
    console.log(token,'accepting check')
    if (!token) {
      alert("Authentication token is missing");
      return;
    }
  
    try {
      const response = await fetch(`/api/job/accept/${jobId}/${applicationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to accept the application");
      }
  
      const data = await response.json();
      alert("Application accepted successfully!");
      // Update the local state to reflect the acceptance of the application
      setJobs(prevJobs => prevJobs.map(job =>
        job._id === jobId
          ? {
              ...job,
              applications: job.applications.map(app =>
                app._id === applicationId ? { ...app, status: "Accepted" } : app
              ),
            }
          : job
      ));
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const rejectApplication = async (jobId, applicationId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Authentication token is missing");
      return;
    }
  
    try {
      const response = await fetch(`/api/job/reject/${jobId}/${applicationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to reject the application");
      }
  
      const data = await response.json();
      alert("Application rejected successfully!");
      // Update the local state to reflect the rejection of the application
      setJobs(prevJobs => prevJobs.map(job =>
        job._id === jobId
          ? {
              ...job,
              applications: job.applications.map(app =>
                app._id === applicationId ? { ...app, status: "Rejected" } : app
              ),
            }
          : job
      ));
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  
  

  useEffect(() => {
    fetchJobsWithApplications();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8 mt-[-5%]">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full lg:w-3/4 animate-fadeIn">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Employer Job Applications</h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          jobs.map((job) => (
            <div key={job._id} className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">{job.title}</h3>
              <p className="text-black mb-4">{job.description}</p>

              <table className="table-fixed min-w-full border-collapse border border-blue-300 rounded-lg mb-8">
                <thead>
                  <tr className="bg-blue-500 sticky top-0 z-10">
                    <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">User Name</th>
                    <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Status</th>
                    <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Applied At</th>
                    <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {job.applications.map((application) => (
                    <tr key={application._id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                      <td className="px-6 py-4 border border-blue-300 text-black">
                        {application.userName} {/* Display user's name */}
                      </td>
                      <td className="px-6 py-4 border border-blue-300">
                        {application.status} {/* Display application status */}
                      </td>
                      <td className="px-6 py-4 border border-blue-300">
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 border border-blue-300">
                        <button
                          onClick={() => acceptApplication(job.id,application.applicationId)}
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectApplication(job.id, application.applicationId)}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployerJobApplications;
