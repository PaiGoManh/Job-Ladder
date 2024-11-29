import React, { useState, useEffect } from "react";
import EmployerSidebar from "../../Components/employer/EmployerSidebar";
import Navbar from "../../Components/employer/EmployerNavbar";
import EmployerEditProfile from "./EmployerEditProfile";
import EmployerAddJob from "./EmployerAddJob";
import JobList from "./JobList";
import Applications from "./Applications";

const EmployerPage = () => {
  const [currentPage, setCurrentPage] = useState("profile");
  const [userDetails, setUserDetails] = useState("");

  const fetchUserDetails = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      console.error("No email found in localStorage.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/auth/getUserDetails?email=${email}`);
  
      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }
  
      const data = await response.json();
      console.log("User details:", data);
      localStorage.setItem('empId',data._id)
      setUserDetails(data);  
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  

  const renderContent = () => {
    switch (currentPage) {
      case "profile":
        return (
          <>
            <div className="mx-auto mt-2 p-4 bg-white rounded-lg shadow-lg ml-10 mr-10">
              <div className="text-center">
                <img
                  className="w-80 rounded-full mx-auto border-4 border-blue-500"
                  src="/Frontend/src/Images/Polish_20230516_022418225.jpg"
                  alt="Employer"
                />
                <h2 className="mt-4 text-2xl font-bold animate-bounce">
                  {userDetails.firstName}<span className="ml-3"></span>{userDetails.lastName}
                </h2>
                <p className="text-blue-600">Employer, JOB LADDER</p>
              </div>
              <div className="mt-10 ml-10 mr-10">
                <h3 className="text-lg font-semibold mb-2">ACCOUNT INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>Email: {userDetails.email}</p>
                  <p>Phone: -------------</p>
                  <p>Location: -----------</p>
                  <p>Role: Employer</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={() => setCurrentPage("editProfile")}
                  className="mb-10 pb-4 bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
                >
                  EDIT EMPLOYER PROFILE
                </button>
              </div>
            </div>
          </>
        );
      case "addJob":
        return (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">Add Job</h2>
            <p><EmployerAddJob/></p>
            {/* Add Job Form Goes Here */}
          </div>
        );
      case "removeJob":
        return (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">Remove Job</h2>
            <p className="mt-[-15%]"><JobList/></p>
            {/* Remove Job Form Goes Here */}
          </div>
        );
      case "viewJobs":
        return (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">View Job List</h2>
            <p>Here is the list of all your job postings.</p>
            {/* Job Listing Component */}
          </div>
        );
      case "applications":
        return (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">Job Applications</h2>
            <p><Applications/></p>
            {/* Applications List */}
          </div>
        );
      case "editProfile":
        return (
          <div className="p-10 text-center">
            <h2 className="text-2xl font-bold">Edit Employer Profile</h2>
            <p><EmployerEditProfile/></p>
            {/* Edit Profile Form Goes Here */}
          </div>
        );
      default:
        return <div>Welcome to the Employer Dashboard</div>;
    }
  };

  return (
    <div className="flex flex-col h-screen">
  {/* Navbar */}
  <header className="bg-white shadow-md">
    <Navbar />
  </header>

  <div className="flex flex-1">
    {/* Sidebar */}
    <aside className="w-64 bg-blue-600 text-white shadow-lg">
      <EmployerSidebar setCurrentPage={setCurrentPage} />
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-6 bg-blue-100 overflow-y-auto">
      {renderContent()}
    </main>
  </div>
</div>

  );
};

export default EmployerPage;
