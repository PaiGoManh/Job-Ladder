import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfileUpdate = ({fetchUserDetails}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    bio: "",
    location: "",
    profilePicture: null,
  });

  // const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Fetch admin details on component mount
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/auth/getAdminDetails", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            username: data.username || "",
            email: data.email || "",
            phoneNumber: data.phoneNumber || "",
            bio: data.bio || "",
            location: data.location || "",
            profilePicture: null, // File input cannot be pre-filled
          });

        } else {
          console.error("Error fetching admin details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      } 
    };

    fetchAdminDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedProfile.append(key, value);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/updateAdmin", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedProfile,
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Profile updated successfully!");
        fetchUserDetails();
      } else {
        console.error("Error updating profile:", result.message);
        alert(result.message || "Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
  //       <p className="text-xl text-blue-700">Loading profile details...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-xl rounded-xl p-12 animate-fadeIn w-4/5 lg:w-1/3">
        <h2 className="text-center text-3xl font-bold text-white mb-8">Update Admin Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
            { label: "Bio", name: "bio", type: "text" },
            { label: "Location", name: "location", type: "text" },
          ].map(({ label, name, type }) => (
            <div className="space-y-2" key={name}>
              <label htmlFor={name} className="block text-lg text-white">{label}</label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                required={name !== "bio"}
              />
            </div>
          ))}

          <div className="space-y-2">
            <label htmlFor="profilePicture" className="block text-lg text-white">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-bold py-3 px-10 rounded-full hover:scale-110 transition"
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
