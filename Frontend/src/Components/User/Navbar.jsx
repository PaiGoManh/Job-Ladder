import React from 'react'

const Navbar = ({ setCurrentPage }) => {
  return (
    <div>
        <header className="bg-blue-600 text-white py-6">
            <nav className="mx-auto flex justify-between items-center">
              <h1 className="text-4xl font-extrabold animate-bounce ml-10">
                USER PROFILE
              </h1>
              <ul className="flex items-center gap-8 mr-10">
              <button
                onClick={() => setCurrentPage("joblist")}
                className="text-white hover:text-gray-300"
              >
                SEARCH JOBS
              </button>
              <button
                onClick={() => setCurrentPage("saved")}
                className="text-white hover:text-gray-300"
              >
                SAVED JOBS
              </button>
                
                <li>
                  <a
                    href="/"
                    className="hover:text-red-600 text-2xl font-bold"
                  >
                    LOGOUT<header className="bg-blue-600 text-white py-6">
           
               </header>
                  </a>
                </li>
              </ul>
            </nav>
          </header>
    </div>
  )
}

export default Navbar