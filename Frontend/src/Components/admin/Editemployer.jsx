import React from "react";

const Editemployer = () => {
  return (
    <>
      <div>
        <header className="bg-blue-400 text-white py-6">
          <nav className="mx-auto flex justify-between items-center">
            <img
              style={{ width: "200px", height: "150px", paddingLeft: "50px" }}
              src="/Frontend/src/Images/JOB LADDER.jpg"
              alt="JOB LADDER Logo"
            />
            <a
              href="#"
              className="animate-bounce mr-96 text-5xl font-extrabold text-white"
            >
              JOB LADDER
            </a>
            <ul className="flex items-center">
              <li className="mr-4">
                <a href="#" className="text-3xl mr-16">
                  EMPLOYERS LIST
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>

      <div className="container ml-40 mb-10 justify-items-center">
        <div
          className="mt-10 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-400 shadow-xl rounded-xl p-12 animate-fadeIn w-4/5 lg:w-1/2 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300"
        >
          <form className="space-y-6">
            <h2 className="text-center text-3xl font-bold text-red-900 mb-8">
              REMOVE EMPLOYER
            </h2>

            <div className="space-y-2">
              <label htmlFor="employerName" className="block text-lg text-blue-700">
                EMPLOYER NAME:
              </label>
              <input
                type="text"
                id="employerName"
                placeholder="Enter Employer Full Name"
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="jobPosition" className="block text-lg text-blue-700">
                JOB POSITION:
              </label>
              <input
                type="text"
                id="jobPosition"
                placeholder="Enter Job Position"
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="emailAddress" className="block text-lg text-blue-700">
                Email Address:
              </label>
              <input
                type="email"
                id="emailAddress"
                placeholder="Enter Email Address"
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reason" className="block text-lg text-blue-700">
                Reason for Removal:
              </label>
              <textarea
                id="reason"
                placeholder="Enter Reason for Removal"
                required
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-32"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <input
                type="submit"
                value="REMOVE EMPLOYER"
                className="bg-gradient-to-r from-blue-600 to-red-900 text-white font-bold py-3 px-10 rounded-full hover:bg-gradient-to-l hover:from-red-600 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Editemployer;
