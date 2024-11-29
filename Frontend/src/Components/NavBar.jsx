import React from 'react';

const NavBar = () => {
  return (
    <div>
      <div>
        <header className="bg-blue-600 text-white py-6">
          <nav className="mx-auto flex justify-between items-center">
            <img
              style={{ width: "200px", height: "150px", paddingLeft: "50px" }}
              src="/home/user/Desktop/JOBLADDER3_0REAT/Frontend/src/Images/JOB LADDER.jpg"
              alt="Job Ladder Logo"
            />
            <a
              href="#"
              className="animate-bounce mr-96 text-5xl font-extrabold text-white"
            >
              JOB LADDER
            </a>
            <ul className="flex items-center">
              <li className="mr-4">
                <a
                  href="/Frontend/Pages/HomePage4.html"
                  className="text-3xl mr-28 border-blue-700 hover:underline"
                >
                  Job Seekers
                </a>
              </li>
              <li className="mr-4">
                <a href="#" className="text-3xl mr-16 hover:underline">
                  Employers
                </a>
              </li>
              <li>
                <a
                  href="/Frontend/Pages/SignupPage.html"
                  className="font-extrabold text-3xl mr-20 hover:underline"
                >
                  JOIN JOB LADDER
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default NavBar;
