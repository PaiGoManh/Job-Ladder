import React, { useState, useEffect } from "react";

const UserEditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    bio: "",
    location: "",
    qualification : "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchEmployDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/auth/getUserDetails", {
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
            qualification : data.qualification || "",
            profilePicture: null, 
          });

        } else {
          console.error("Error fetching admin details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching admin details:", error);
      } 
    };

    fetchEmployDetails();
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
      const response = await fetch("/api/auth/updateUser", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedProfile,
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Profile updated successfully!");
      } else {
        console.error("Error updating profile:", result.message);
        alert(result.message || "Error updating profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
    };

    return (
      <div className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 shadow-xl rounded-xl p-12 mt-10 w-3/4 lg:w-[600px] mx-auto transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-l hover:from-blue-300 hover:to-blue-500">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-center text-2xl font-bold text-blue-500 mb-8">
            Edit User Details
          </h2>
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phoneNumber", type: "tel" },
            { label: "Bio", name: "bio", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Qualification", name: "qualification", type: "text" },
          ].map(({ label, name, type }) => (
            <div className="space-y-2" key={name}>
              <label htmlFor={name} className="block text-lg text-white">
                {label}
              </label>
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
            <label htmlFor="profilePicture" className="block text-lg text-white">
              Profile Picture
            </label>
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
    );
  };
  
  export default UserEditProfile;
  