import React from 'react'

const Footer2 = () => {
  return (
   <>
 <div className="bg-blue-200 mt-10  ">
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
       

   
   
   
   </>
  )
}

export default Footer2