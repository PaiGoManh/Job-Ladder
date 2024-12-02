import React, { useState, useEffect } from 'react';

const EmployerJobApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobsWithApplications = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication token is missing');
      return;
    }

    try {
      const response = await fetch('/api/job/applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch job applications');
      }

      const data = await response.json();
      setJobs(data.jobs);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleApplicationStatusChange = async (jobId, applicationId, newStatus) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Authentication token is missing');
      return;
    }

    try {
      const response = await fetch(`/api/job/${newStatus.toLowerCase()}/${jobId}/${applicationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to ${newStatus.toLowerCase()} the application`);
      }

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                applications: job.applications.map((app) =>
                  app.applicationId === applicationId
                    ? { ...app, status: newStatus }
                    : app
                ),
              }
            : job
        )
      );

      alert(`Application ${newStatus.toLowerCase()}ed successfully!`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchJobsWithApplications();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full lg:w-3/4">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Employer Job Applications</h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="mb-10">
              <h3 className="text-xl font-semibold text-white mb-4">{job.jobTitle}</h3>
              <p className="text-black mb-4">{job.jobDescription}</p>
              <table className="table-fixed min-w-full border-collapse border border-blue-300 rounded-lg mb-8">
                <thead>
                  <tr className="bg-blue-500">
                    <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">User Name</th>
                    <th className="w-1/4 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Status</th>
                    <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Applied At</th>
                    <th className="w-1/6 px-6 py-3 border border-blue-300 text-left font-semibold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {job.applications.map((app) => (
                    <tr key={app.applicationId}>
                      <td className="px-6 py-4 border border-blue-300">{app.userName}</td>
                      <td className="px-6 py-4 border border-blue-300">{app.status}</td>
                      <td className="px-6 py-4 border border-blue-300">{app.appliedAt}</td>
                      <td className="px-6 py-4 border border-blue-300">
                        {app.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleApplicationStatusChange(job.id, app.applicationId, 'Accepted')
                              }
                              className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleApplicationStatusChange(job.id, app.applicationId, 'Rejected')
                              }
                              className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                              Reject
                            </button>
                          </div>
                        )}
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
