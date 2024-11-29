

import React from "react";

const AddEmployer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-12 animate-fadeIn w-4/5 lg:w-1/3 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
        <form className="space-y-6">
          <h2 className="text-center text-3xl font-bold text-white mb-8">
            ADD NEW EMPLOYER
          </h2>

          {/* Employer Name */}
          <div className="space-y-2">
            <label
              htmlFor="employerName"
              className="block text-lg text-white"
            >
              EMPLOYER NAME:
            </label>
            <input
              type="text"
              id="employerName"
              placeholder="Enter Employer Full Name"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Job Position */}
          <div className="space-y-2">
            <label
              htmlFor="jobPosition"
              className="block text-lg text-white"
            >
              JOB POSITION:
            </label>
            <input
              type="text"
              id="jobPosition"
              placeholder="Enter Job Position"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label
              htmlFor="emailAddress"
              className="block text-lg text-white"
            >
              EMAIL ADDRESS:
            </label>
            <input
              type="email"
              id="emailAddress"
              placeholder="Enter Email Address"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-2">
            <label
              htmlFor="mobileNumber"
              className="block text-lg text-white"
            >
              MOBILE NUMBER:
            </label>
            <input
              type="number"
              id="mobileNumber"
              placeholder="Enter Mobile Number"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* About Employer */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-lg text-white"
            >
              ABOUT EMPLOYER:
            </label>
            <textarea
              id="description"
              placeholder="Enter Details About Employer"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition h-32"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              value="ADD EMPLOYER"
              className="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold py-3 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployer;



// import React from "react";

// const AddEmployer = () => {
//   return (
//     <div className=" pl-40 mt-40 container ml-80  justify-items-center">
//       <div className="mt-10 justify-center bg-gradient-to-r from-blue-400 to-blue-400 shadow-xl rounded-xl p-12 animate-fadeIn w-4/5 lg:w-1/2 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
//         <form className="space-y-6">
//           <h2 className="text-center text-3xl font-bold text-blue-600 mb-8">
//             ADD NEW EMPLOYER
//           </h2>

//           {/* Employer Name */}
//           <div className="space-y-2">
//             <label
//               htmlFor="employerName"
//               className="block text-lg text-blue-700"
//             >
//               EMPLOYER NAME:
//             </label>
//             <input
//               type="text"
//               id="employerName"
//               placeholder="Enter Employer Full Name"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </div>

//           {/* Job Position */}
//           <div className="space-y-2">
//             <label htmlFor="jobPosition" className="block text-lg text-blue-700">
//               JOB POSITION:
//             </label>
//             <input
//               type="text"
//               id="jobPosition"
//               placeholder="Enter Job Position"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </div>

//           {/* Email Address */}
//           <div className="space-y-2">
//             <label htmlFor="emailAddress" className="block text-lg text-blue-700">
//               EMAIL ADDRESS:
//             </label>
//             <input
//               type="email"
//               id="emailAddress"
//               placeholder="Enter Email Address"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </div>

//           {/* Mobile Number */}
//           <div className="space-y-2">
//             <label
//               htmlFor="mobileNumber"
//               className="block text-lg text-blue-700"
//             >
//               MOBILE NUMBER:
//             </label>
//             <input
//               type="number"
//               id="mobileNumber"
//               placeholder="Enter Mobile Number"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             />
//           </div>

//           {/* About Employer */}
//           <div className="space-y-2">
//             <label htmlFor="description" className="block text-lg text-blue-700">
//               ABOUT EMPLOYER:
//             </label>
//             <textarea
//               id="description"
//               placeholder="Enter Details About Employer"
//               required
//               className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-32"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <input
//               type="submit"
//               value="ADD EMPLOYER"
//               className="bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-3 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-900 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEmployer;
