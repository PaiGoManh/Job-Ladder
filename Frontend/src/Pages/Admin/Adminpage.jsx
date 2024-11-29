
import React, { useState , useEffect } from "react";
import Footer1 from "../../Components/Footer1";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import AdminProfileUpdate from "./EditAdmin";
import AddEmployer from "./AddEmployer";
import EmployerList from "./EmployersList";
import Logout from "../../Components/Logout";

const Adminpage = () => {
  const [currentPage, setCurrentPage] = useState("adminProfile");
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
      case "editAdmin":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
            <AdminProfileUpdate />
          </div>
        );
      case "addEmployer":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
            <AddEmployer />
          </div>
        );
      case "removeEmployer":
        return (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-4">
            <EmployerList />
          </div>
        );
      default:
        return (
          <div className="bg-gradient-to-r from-blue-200 to-blue-300 shadow-lg rounded-xl p-6 mt-4">
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-md"
                src="/Frontend/src/Images/Polish_20230516_022418225.jpg"
                alt="Admin"
              />
              <h2 className="mt-4 text-3xl font-bold text-blue-700 animate-pulse">
              {userDetails.firstName}<span className="ml-3"></span>{userDetails.lastName}
              </h2>
              <p className="text-blue-600 font-semibold">Admin, JOB LADDER</p>
            </div>
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">
                ACCOUNT INFORMATION
              </h3>
              <div className="grid grid-cols-2 gap-6 text-gray-700 font-medium">
                <p>Email:{userDetails.email}</p>
                <p>Phone: </p>
                <p>Location:</p>
                <p>Role: Admin</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
        {/* Sidebar */}
        <AdminSidebar setCurrentPage={setCurrentPage} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <header className="bg-blue-700 text-white py-6 rounded-xl shadow-md mb-6">
            <nav className="flex justify-between items-center mx-auto px-6">
              <h1 className="text-4xl font-bold animate-pulse">
                ADMIN PROFILE
              </h1>
              <ul className="flex items-center gap-8">
                <li>
                  <a
                    href="/Frontend/Pages/EmployerProfile.html"
                    className="text-lg font-semibold hover:text-blue-300"
                  >
                    EMPLOYER PROFILE
                  </a>
                </li>
                <li>
                 <Logout/>
                </li>
              </ul>
            </nav>
          </header>
          {renderContent()}
        </div>
      </div>

      {/* Footer */}
      <Footer1 />
    </>
  );
};

export default Adminpage;


