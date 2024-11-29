import React, { useState, useEffect } from "react";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state as true
  const [error, setError] = useState(null); // Initialize error state

  const handleEdit = (id) => {
    const employerToEdit = employers.find((employer) => employer.id === id);
    alert(`Editing employer: ${employerToEdit.name}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employer?")) {
      const updatedEmployers = employers.filter((employer) => employer.id !== id);
      setEmployers(updatedEmployers);
      alert("Employer deleted successfully.");
    }
  };

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch("http://localhost:8000/auth/employerList");
        if (!response.ok) {
          throw new Error("Failed to fetch employers");
        }
        const data = await response.json();
        setEmployers(data);
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false); 
      }
    };

    fetchEmployers();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-8 w-full lg:w-3/4 animate-fadeIn transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Employer List
        </h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-blue-300 rounded-lg">
              <thead>
                <tr className="bg-blue-500">
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Name</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Job Position</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Email</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">Mobile</th>
                  <th className="px-6 py-3 border border-blue-300 text-left font-semibold text-white">About</th>
                  <th className="px-6 py-3 border border-blue-300 text-center font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employers.map((employer) => (
                  <tr key={employer.id} className="even:bg-blue-100 odd:bg-white hover:bg-blue-200 transition">
                    <td className="px-6 py-4 border border-blue-300">{employer.firstName}</td>
                    <td className="px-6 py-4 border border-blue-300">{employer.lastName}</td>
                    <td className="px-6 py-4 border border-blue-300">{employer.email}</td>
                    <td className="px-6 py-4 border border-blue-300">{employer.mobile}</td>
                    <td className="px-6 py-4 border border-blue-300">{employer.about}</td>
                    <td className="px-6 py-4 border border-blue-300 text-center space-x-4">
                      <button onClick={() => handleEdit(employer.id)} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500 transition transform hover:scale-105">Edit</button>
                      <button onClick={() => handleDelete(employer.id)} className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-500 transition transform hover:scale-105">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerList;
