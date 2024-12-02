import React from "react";
import Logout from "../Logout";

const Sidebar = ({ setCurrentPage }) => {
  return (
    <div>
      <aside className="w-64 bg-blue-600 text-white min-h-screen flex flex-col">
        <div className="p-4">
          <img
            src="/src/Images/JOB LADDER.jpg"
            alt="Profile"
            className="rounded-full w-25 "
          />
          <h2 className="mt-4 text-xl font-bold">JOB LADDER</h2>
        </div>

        <hr className="border-blue-100 mx-4" />

        <nav>
          <ul className="space-y-4 mt-4 px-4">
            <li>
              <button
                className="w-full text-left p-2 hover:bg-blue-500 rounded"
                onClick={() => setCurrentPage("user")}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="w-full text-left p-2 hover:bg-blue-500 rounded"
                onClick={() => setCurrentPage("editprofile")}
              >
                 Edit Profile
              </button>
            </li>
            {/* <li>
              <button
                className="w-full text-left p-2 hover:bg-blue-500 rounded"
                onClick={() => setCurrentPage("notifications")}
              >
                Notifications
              </button>
            </li> */}
            <li>
              <button
                className="w-full text-left p-2 hover:bg-blue-500 rounded"
                onClick={() => setCurrentPage("joblist")}
              >
                Jobs
              </button>
            </li>
            <li>
              <button
                className="w-full text-left p-2 hover:bg-blue-500 rounded"
                onClick={() => setCurrentPage("applied")}
              >
                Applied Jobs
              </button>
            </li>

          </ul>
        </nav>

        <div className="p-4">
          <button className="w-full bg-blue-900  py-2 px-4 rounded">
            <Logout/>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
