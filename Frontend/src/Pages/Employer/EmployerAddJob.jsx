import React, { useState } from "react";

const EmployerAddJob = () => {
  // State variables for form fields
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [courseCriteria, setCourseCriteria] = useState("");

  const addJob = async () => {
    const jobData = {
      title: jobTitle,
      description: jobDescription,
      jobtype: jobType,
      salary: Number(salary),
      vacancy: Number(vacancy),
      courseCriteria: courseCriteria,
    };

    const token = localStorage.getItem("token");  

    if (!token) {
      alert("You must be logged in to add a job!");
      return;
    }

    try {
      const response = await fetch("/api/job/addJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        alert("Job added successfully!");
        setJobTitle("");
        setJobDescription("");
        setJobType("");
        setSalary("");
        setVacancy("");
        setCourseCriteria("");
      } else {
        const errorData = await response.json();
        alert(`Failed to add the job: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <main className="p-8">
        <h1 className="text-4xl text-center font-bold text-blue-600 animate-bounce">
          Manage Jobs
        </h1>

        {/* Job Management Form */}
        <div className="flex justify-center mt-10">
          <form
            className="bg-blue-50 p-8 rounded-lg shadow-xl w-3/4 transition-transform duration-300 hover:scale-105"
            onSubmit={(e) => e.preventDefault()} // Prevent default form submission
          >
            {/* Job Title */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700">Job Title</label>
              <input
                type="text"
                placeholder="Enter Job Title"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            {/* Job Description */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700">Job Description</label>
              <textarea
                placeholder="Enter Job Description"
                className="w-full border rounded-lg p-2 h-32 focus:ring focus:ring-blue-300"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700">Job Type</label>
              <select
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                id="jobType"
                name="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="select">Select</option>
                <option value="On-Site">On-Site</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700">Salary</label>
              <input
                type="number"
                placeholder="Enter Salary"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            {/* Vacancy */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700">Vacancy</label>
              <input
                type="number"
                placeholder="Enter Vacancy Count"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                value={vacancy}
                onChange={(e) => setVacancy(e.target.value)}
              />
            </div>

            {/* Course Criteria */}
            <div className="mb-4">
              <label className="block text-lg text-blue-700">Course Criteria</label>
              <input type="text"
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                value={courseCriteria}
                onChange={(e) => setCourseCriteria(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={addJob}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-transform duration-300 transform hover:scale-105"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default EmployerAddJob;
