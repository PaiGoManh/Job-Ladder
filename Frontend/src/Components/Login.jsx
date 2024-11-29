
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css"; 
import image from "../Images/IMAGESFORJOBLADDER.jpg"; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const { email, password } = formData;
  
    try {
      const response = await fetch("/api/auth/jobladderlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          credentials: "include",
        }),
      });
      ;
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText || "Login failed. Please try again."}`);
      }
  
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        alert(data.message);
  
        localStorage.setItem("token", data.token);  
        localStorage.setItem("role", data.userRole);
        localStorage.setItem("email", data.userEmail);
        
         // Storing the role
  
        // Check the role and navigate accordingly
        const role = data.userRole;
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "employer") {
          navigate("/employer");
        } else if (role === "user") {
          navigate("/user");
        }
      } else {
        throw new Error("Invalid response format. Expected JSON.");
      }
    } catch (error) {
      alert(error.message || "Login failed. Please try again.");
    }
  };
  

  return (
    <div className="flex mx-[20%] gap-[2%] mb-10 my-[10%]">
      {/* Job-related Picture */}
      <div className="w-1/2">
        <img
          src={image}
          alt="Job-related"
          className=" h-[750px] w-[600px] rounded-md shadow-lg"
        />
      </div>

      {/* Login Form Section */}
      <div className="w-1/2 p-8 space-y-6 bg-white border-4 rounded-md shadow-2xl shadow-blue-600 border-blue-600">
        <h2 className="text-3xl font-bold text-center text-blue-800 mt-4">
          LOGIN TO JOB LADDER
        </h2>
        <form className="mt-6" onSubmit={handleLogin}>



          {/* //username input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-blue-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none"
              required
            />
          </div>
          {/* Email Input */}
          {/* <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-blue-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
              required
            />
          </div> */}


          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-blue-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Dropdown Menu for Role Selection */}
          {/* <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              className="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                -- Select Role --
              </option>
              <option value="user">USER</option>
              <option value="employer">EMPLOYER</option>
              <option value="admin">ADMIN</option>
            </select>
          </div> */}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-16 py-2 mt-6 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-blue-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-900">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "../App.css";

// const Login = () => {
//   const navigate = useNavigate();

//   // Updated formData to include 'username'
//   const [formData, setFormData] = useState({
//     username: "", // Added this field
//     password: "",
//     role: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     const { username, password, role } = formData;

//     if (!role) {
//       alert("Please select a role before logging in.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8000/admin/jobladderlogin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName: username, // Using 'username' here
//           password: password,
//         }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error: ${errorText || "Login failed. Please try again."}`);
//       }

//       const contentType = response.headers.get("Content-Type");
//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();
//         alert(data.message);
//         if (role === "admin") {
//           navigate("/admin");
//         } else if (role === "employer") {
//           navigate("/employer");
//         } else if (role === "user") {
//           navigate("/user");
//         }
//       } else {
//         throw new Error("Invalid response format. Expected JSON.");
//       }
//     } catch (error) {
//       alert(error.message || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex mx-[10%] gap-[5%] mb-10 my-[10%]">
//       {/* Job-related Picture */}
//       <div className="w-1/2">
//         <img
//           src={image}
//           alt="Job-related"
//           className="w-full h-full object-cover rounded-md shadow-lg"
//         />
//       </div>

//       {/* Login Form Section */}
//       <div className="w-1/2 p-8 space-y-6 bg-white border-4 rounded-md shadow-2xl shadow-blue-600 border-blue-600">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mt-4">
//           LOGIN TO JOB LADDER
//         </h2>
//         <form className="mt-6" onSubmit={handleLogin}>
//           {/* Username Input */}
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-medium text-blue-700">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username" // Matches the 'username' key in formData
//               value={formData.username}
//               onChange={handleInputChange}
//               className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none"
//               required
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-blue-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           {/* Dropdown Menu for Role Selection */}
//           <div className="mb-4">
//             <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
//               Select Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               value={formData.role}
//               className="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
//               onChange={handleInputChange}
//               required
//             >
//               <option value="" disabled>
//                 -- Select Role --
//               </option>
//               <option value="user">USER</option>
//               <option value="employer">EMPLOYER</option>
//               <option value="admin">ADMIN</option>
//             </select>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full px-16 py-2 mt-6 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
//           >
//             Login
//           </button>
//         </form>

//         {/* Signup Link */}
//         <p className="text-sm text-center text-blue-600">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:text-blue-900">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



// / import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "../App.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();
    
//     const { email, password, role } = formData;
  
//     if (!role) {
//       alert("Please select a role before logging in.");
//       return;
//     }
  
//     try {
//       const response = await fetch("http://localhost:8000/admin/jobladderlogin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName: email,
//           password: password,
//         }),
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Error: ${errorText || 'Login failed. Please try again.'}`);
//       }
  
//       const contentType = response.headers.get("Content-Type");
//       if (contentType && contentType.includes("application/json")) {
//         const data = await response.json();
//         alert(data.message);
//         if (role === "admin") {
//           navigate("/admin");
//         } else if (role === "employer") {
//           navigate("/employer");
//         } else if (role === "user") {
//           navigate("/user");
//         }
//       } else {
//         throw new Error("Invalid response format. Expected JSON.");
//       }
//     } catch (error) {
//       alert(error.message || "Login failed. Please try again.");
//     }
//   };
  
  

//   return (
//     <div className="bg-blue-100 flex ml-80 mb-10 mt-32">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white-950 border-4 rounded-md shadow-2xl shadow-blue-600 border-blue-600">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mt-4">
//           LOGIN TO JOB LADDER
//         </h2>
//         <form className="mt-6" onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-blue-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-blue-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
//               Select Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               className="block w-full rounded-md border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
//               onChange={handleInputChange}
//               required
//             >
//               <option value="" disabled>
//                 -- Select Role --
//               </option>
//               <option value="user">USER</option>
//               <option value="employer">EMPLOYER</option>
//               <option value="admin">ADMIN</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full px-16 py-2 mt-6 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-center text-blue-600">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:text-blue-900">
//             Sign up
//           </Link>
//         </p>
//       </div>
//       <div className="pl-10">
//         <h3 className="bg-blue-500 text-5xl font-extrabold text-black mb-12 mt-10">
//           WE'RE HERE TO TAKE THE STRESS OUT OF RECRUITING
//         </h3>
//         <p className="text-gray-600 text-4xl font-semibold">
//           WHETHER YOU'RE LOOKING FOR TEMPORARY, PERMANENT, OR CONTRACT
//           PLACEMENTS, OUR RECRUITMENT CONSULTANTS ARE TRAINED TO LOOK FOR MORE
//           THAN JUST SKILLS AND EXPERIENCE. WE FIND THE RIGHT OPPORTUNITIES BASED
//           ON COMPANY CULTURE AND VALUES.
//         </p>
//         <img
//           className="mt-6 w-[500px] h-[600px]"
//           src="/src/Images/Ladder guy.gif"
//           alt="Ladder Guy"
//         />
//       </div>
//     </div>
//   );
// };

// export default Login;
