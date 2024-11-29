import React from "react";
import Footer1 from "../Components/Footer1";

const Adminpage = () => {
  return (
    <>
      <div className="bg-blue-100">
        <header className="bg-blue-600 text-white py-6 ">
          <nav className=" mx-auto flex justify-between items-center">
            <h1 className="text-4xl font-bold animate-bounce ml-10 ">
              ADMIN PROFILE
            </h1>
            <ul className="flex items-center gap-8 mr-10">
              {/* <!-- <li><a href="admin-profile.html" className="hover:text-blue-300 text-2xl font-bold ">VIEW EMPLOYERS LIST</a></li> --> */}
              <li>
                <a
                  href="/Frontend/Pages/EmployerProfile.html"
                  className="hover:text-blue-300 text-2xl font-bold "
                >
                  EMPLOYER PROFILE
                </a>
              </li>
              <li>
                <a 
                  href="/"
                  className="hover:text-blue-300 text-2xl font-bold "
                >
                  LOGOUT
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <div className=" mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg ml-10 mr-10">
          <div className="text-center">
            <img
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
              src="/Frontend/src/Images/Polish_20230516_022418225.jpg"
              alt="Admin"
            />
            <h2 className="mt-4 text-2xl font-bold animate-bounce">
              ADMIN MANEESH
            </h2>
            <p className="text-blue-600">Admin, JOB LADDER</p>
          </div>

          <div className="mt-10 ml-10 mr-10">
            <h3 className="text-lg font-semibold mb-2">ACCOUNT INFORMATION</h3>
            <div className="grid grid-cols-2 gap-4">
              <p>Email: maneeshroks@gmail.com</p>
              <p>Phone: +918281422036</p>
              <p>Location: Technopark</p>
              <p>Role: Admin</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/Frontend/Pages/EditAdminProfilePage.html"
              className="mb-10 pb-4 text-center bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            >
              EDIT ADMIN PROFILE
            </a>
            {/* <!-- <button onclick="" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit MY Profile</button> --> */}
          </div>

          <div className="mt-40 text-center flex ml-10 gap-6">
            <h3 className="font-bold text-blue-600 text-2xl ">
              {" "}
              ADMIN ADD EMPLOYER
            </h3>
            <a
              href="/Frontend/Pages/AdminAddEmployer.html"
              className="mb-10 pb-4 text-center bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            >
              ADD EMPLOYER
            </a>
          </div>

          <div className=" text-center flex ml-10 gap-6 mt-40">
            <h3 className="font-bold text-blue-600 text-2xl ">
              {" "}
              ADMIN REMOVE EMPLOYER
            </h3>
            <button className="  mb-4 text-center bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse">
              <a href="/Frontend/Pages/AdminRemoveEmployerPage.html">
                REMOVE EMPLOYER
              </a>
            </button>
          </div>
        </div>
        <Footer1/>


        {/* <!-- footer................................. --> */}

        {/* <div className="bg-blue-200 mt-4 ">
          <div className="max-w-2   ml-10 mr-10  ">
            <div className=" gap-40 mb-4 flex">
              <div className="sm:col-span-2">
                <p className="font-bold text-9xl"> JOB LADDER</p>
                <div className="mt-8">
                  <p className="mt-4 text-xl text-blue-800">
                    Job Ladder is a comprehensive job recruitment platform
                    designed to streamline the hiring process for both employers
                    and job seekers.
                  </p>
                </div>
              </div>
              <div className="mt-4 text-xl">
                <p className="text-base font-bold tracking-wide text-blue-900">
                  Contacts
                </p>
                <div className="flex">
                  <p className="mr-1 text-blue-800">Phone:</p>
                  <a
                    href="tel:850-123-5021"
                    aria-label="Our phone"
                    title="Our phone"
                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    +918281422036
                  </a>
                </div>
                <div className="flex">
                  <p className="mr-1 text-blue-800">Email:</p>
                  <a
                    href="mailto:info@lorem.mail"
                    aria-label="Our email"
                    title="Our email"
                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    maneeshroks@gmail.com
                  </a>
                </div>
                <div className="flex">
                  <p className="mr-1 text-blue-800">Address:</p>
                  <a
                    href="https://www.google.com/maps"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Our address"
                    title="Our address"
                    className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                  >
                    Thiruvananthapuram, KERALA,INDIA
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row bg-blue-600 pl-4 pr-4">
            <p className="text-sm text-white">© MANEESH@KBA.in OCT-24-2024</p>
            <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
              <li>
                <a
                  href="/"
                  className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  KBA Project
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Adminpage;
