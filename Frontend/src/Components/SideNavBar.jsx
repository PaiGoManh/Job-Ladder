import React from 'react';
import Logout from './Logout';

const SideNavBar = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-16 group hover:w-64 bg-blue-600 text-white transition-all duration-300 ease-in-out min-h-screen flex flex-col">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 p-4">
          <img
            src="/Frontend/src/Images/Polish_20230516_022418225.jpg"
            alt="Profile Picture"
            className="rounded-full w-12 h-12"
          />
          <span className="hidden group-hover:block text-xl font-semibold">JOB LADDER</span>
        </div>

        {/* Divider */}
        <hr className="border-blue-100 mx-4" />

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2 mt-4">
            <li>
              <a href="#" className="flex items-center space-x-4 p-4 hover:bg-blue-500 rounded-lg">
                <span className="hidden group-hover:block">Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-4 p-4 hover:bg-blue-500 rounded-lg">
                <span className="hidden group-hover:block">Admin Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-4 p-4 hover:bg-blue-500 rounded-lg">
                <span className="hidden group-hover:block">Employer Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-4 p-4 hover:bg-blue-500 rounded-lg">
                <span className="hidden group-hover:block">User Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-4 p-4 hover:bg-blue-500 rounded-lg">
                <span className="hidden group-hover:block">Search Jobs</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <Logout/>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-blue-600 animate-bounce">WELCOME TO JOB LADDER</h1>
        <p className="mt-4 text-lg text-blue-800">
          Use the sidebar to navigate through different profiles and search for jobs.
        </p>
      </main>
    </div>
  );
};

export default SideNavBar;
