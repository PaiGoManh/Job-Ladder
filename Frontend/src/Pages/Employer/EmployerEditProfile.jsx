import React from 'react';

const EmployerEditProfile = () => {
  return (
    <>
      {/* Edit Profile Form Container */}
      <div className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 shadow-xl rounded-xl p-12 mt-10 w-4/5 lg:w-1/2 mx-auto transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-l hover:from-blue-300 hover:to-blue-500">
        <form className="space-y-6">
          <h2 className="text-center text-3xl font-bold text-blue-500 mb-8">
            Edit Employer Details
          </h2>

          {/* Employer Name */}
          <div className="space-y-2">
            <label htmlFor="employerName" className="block text-lg text-blue-700">
              Employer Name:
            </label>
            <input
              type="text"
              id="employerName"
              placeholder="Enter employer name"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-lg text-blue-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-lg text-blue-700">
              Phone Number:
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter phone number"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-lg text-blue-700">
              Location:
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-center">
            <input
              type="submit"
              value="Save Changes"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            />
          </div>
        </form>
      </div>

      {/* Back to Profile Button */}
      <div className="pt-8 text-center mt-10">
        <a
          href="/Frontend/Pages/EmployerProfile.html"
          className="bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold py-4 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-900 hover:to-blue-700 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
        >
          BACK TO PROFILE
        </a>
      </div>
    </>
  );
};

export default EmployerEditProfile;
