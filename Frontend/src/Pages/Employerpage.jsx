import React from 'react'

const Employerpage = () => {
  return (
    <>
    <div class="bg-blue-100">
        <header class="bg-blue-600 text-white py-6">
          <nav class="mx-auto flex justify-between items-center">
            <h1 class="text-4xl font-bold animate-bounce ml-10">
              EMPLOYER PROFILE
            </h1>
            <ul class="flex items-center gap-8 mr-10">
              <li>
                <a
                  href="employer-profile.html"
                  class="hover:text-blue-300 text-2xl font-bold"
                  >VIEW JOB LIST</a >
              </li>
              <li>
                <a href="#" class="hover:text-blue-300 text-2xl font-bold"
                  >JOB APPLICATIONS</a >
              </li>
              <li>
                <a href="#" class="hover:text-blue-300 text-2xl font-bold"
                  >LOGOUT</a >
              </li>
            </ul>
          </nav>
        </header>
    
        <div class="mx-auto mt-2 p-4 bg-white rounded-lg shadow-lg ml-10 mr-10">
          <div class="text-center">
            <img
              class="w-80  rounded-full mx-auto border-4 border-blue-500"
              src="/Frontend/src/Images/Polish_20230516_022418225.jpg"
              alt="Employer"
            />
            <h2 class="mt-4 text-2xl font-bold animate-bounce">EMPLOYER NAME</h2>
            <p class="text-blue-600">Employer, JOB LADDER</p>
          </div>
    
          <div class="mt-10 ml-10 mr-10">
            <h3 class="text-lg font-semibold mb-2">ACCOUNT INFORMATION</h3>
            <div class="grid grid-cols-2 gap-4">
              <p>Email: employer@example.com</p>
              <p>Phone: +918281422036</p>
              <p>Location: Technopark</p>
              <p>Role: Employer</p>
            </div>
          </div>
    
          <div class="mt-8 text-center">
            <a
              href="/Frontend/Pages/EditEmployerProfile.html"
              class="mb-10 pb-4 text-center bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            >
              EDIT EMPLOYER PROFILE
            </a>
          </div>
    
          <div class="mt-40 text-center flex ml-10 gap-6">
            <h3 class="font-bold text-blue-600 text-2xl">EMPLOYER ADD JOB</h3>
            <a
              href="/Frontend/Pages/EmployerAddJobPage.html"
              class="mb-10 pb-4 text-center bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            >ADD JOB<a href="/Frontend/Pages/EmployerAddJobPage.html"></a>
          
            
            </a>
          </div>
    
          <div class="text-center flex ml-10 gap-6 mt-40">
            <h3 class="font-bold text-blue-600 text-2xl">EMPLOYER REMOVE JOB POST</h3>
            <button
              class="mb-4 text-center bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-600 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            ><a href="/Frontend/Pages/EmployerRemoveJobsPage.html"> REMOVE JOB</a>
          
            </button>
          </div>
        </div>
    
     
      </div> 
    
      </>  )
}

export default Employerpage