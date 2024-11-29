import React, { useState } from "react";

const AdminProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "ADMIN MANEESH",
    email: "maneeshroks@gmail.com",
    phone: "+918281422036",
    location: "Technopark",
    role: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-12 animate-fadeIn w-4/5 lg:w-1/3 transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-300">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Update Admin Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-lg text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-lg text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-lg text-white"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-lg text-white"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-lg text-white"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg bg-gray-200 text-gray-600 focus:outline-none"
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold py-3 px-10 rounded-full hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer animate-pulse"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileUpdate;





// import React, { useState } from "react";

// const AdminProfileUpdate = () => {
//   const [formData, setFormData] = useState({
//     name: "ADMIN MANEESH",
//     email: "maneeshroks@gmail.com",
//     phone: "+918281422036",
//     location: "Technopark",
//     role: "Admin",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Updated Profile Data:", formData);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-100 ">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//           Update Admin Profile
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-blue-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-blue-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label
//               htmlFor="phone"
//               className="block text-sm font-medium text-blue-700"
//             >
//               Phone
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label
//               htmlFor="location"
//               className="block text-sm font-medium text-blue-700"
//             >
//               Location
//             </label>
//             <input
//               type="text"
//               id="location"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Role */}
//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-blue-700"
//             >
//               Role
//             </label>
//             <input
//               type="text"
//               id="role"
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               readOnly
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
//             >
//               Update Profile
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminProfileUpdate;
