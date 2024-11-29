import React from 'react'

const Navbar = () => {
  return (
    <div>
        <header className="bg-blue-600 text-white py-6">
            <nav className="mx-auto flex justify-between items-center">
              <h1 className="text-4xl font-extrabold animate-bounce ml-10">
                Employer PROFILE
              </h1>
              <ul className="flex items-center gap-8 mr-10">
                <li>
                  <a
                    href="/Frontend/Pages/HomePage4.html"
                    className="hover:text-blue-300 text-2xl font-bold"
                  >
                    SEARCH JOBS
                  </a>
                </li>
                <li>
                  <a
                    href="/Frontend/Pages/SavedJobsPage.html"
                    className="hover:text-blue-300 text-2xl font-bold"
                  >
                    SAVED JOBS
                  </a>
                </li>
                
              </ul>
            </nav>
          </header>
    </div>
  )
}

export default Navbar