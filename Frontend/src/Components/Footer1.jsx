import React from 'react'

const Footer1 = () => {
  return (
   <>
   
   
   <div>
   <div className="bg-blue-200 ">
    <div className="max-w-2   ml-10 mr-10  ">
        <div className=" gap-40 mb-4 flex">
          <div className="sm:col-span-2">
           <p className="font-bold text-9xl"> JOB LADDER</p>
            <div className="mt-8">
              
              <p className="mt-4 text-xl text-blue-800">
                Job Ladder is a comprehensive job recruitment platform designed to streamline the hiring process for both employers and job seekers.
              </p>
            </div>
          </div>
          <div className="mt-4 text-xl">
            <p className="text-base font-bold tracking-wide text-blue-900">Contacts</p>
            <div className="flex">
              <p className="mr-1 text-blue-800">Phone:</p>
              <a href="tel:850-123-5021" aria-label="Our phone" title="Our phone" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">+918281422036</a>
            </div>
            <div className="flex">
              <p className="mr-1 text-blue-800">Email:</p>
              <a href="mailto:info@lorem.mail" aria-label="Our email" title="Our email" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">maneeshroks@gmail.com</a>
            </div>
            <div className="flex">
              <p className="mr-1 text-blue-800">Address:</p>
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Our address" title="Our address" className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
                Thiruvananthapuram, KERALA,INDIA
              </a>
            </div>
        </div>
    </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row bg-blue-600 pl-4 pr-4">
          <p className="text-sm text-white">
            © MANEESH@KBA.in OCT-24-2024 
          </p>
          <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
            <li>
              <a href="/" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">KBA Project</a>
            </li>
            <li>
              <a href="/" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Privacy Policy</a>
            </li>
            <li>
              <a href="/" className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400">Terms &amp; Conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
   
   
   
   
   
   
   
   </>
  )
}

export default Footer1