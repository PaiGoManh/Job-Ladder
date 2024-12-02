import React,{ useState, useEffect } from 'react';

const UserPage = () => {
  const [userDetails, setUserDetails] = useState("");


  const fetchUserDetails = async () => {
    const token = localStorage.getItem("token");

  
    try {
      const response = await fetch(`/api/auth/getUserDetails`,{
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }
  
      const data = await response.json();
      console.log("User details:", data);

      setUserDetails(data);  
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <div className="bg-blue-100 min-h-screen flex mt-[5%]">
        <div className="bg-blue-100 flex-1">

          <div className="mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg ml-10 mr-10 relative">
            <div className="text-center">
              <img
                className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500"
                src="/Frontend/src/Images/Polish_20230516_022418225.jpg"
                alt="User"
              />
              <h2 className="mt-4 text-2xl font-extrabold animate-bounce">{userDetails.firstName}<span className='ml-2'></span>{userDetails.lastName}</h2>
              <p className="text-blue-600 font-semibold">Job Seeker, JOB LADDER</p>
            </div>

            <div className="mt-8 ml-10 mr-10">
              <h3 className="text-lg font-extrabold mb-4 border-b-2 border-blue-300 pb-2">
                ACCOUNT INFORMATION
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p className="font-semibold">
                  Email: <span className="font-normal">{userDetails.email}</span>
                </p>
                <p className="font-semibold">
                  Phone: <span className="font-normal">----------</span>
                </p>
                <p className="font-semibold">
                  Location: <span className="font-normal">----------</span>
                </p>
                <p className="font-semibold">
                  Role: <span className="font-normal">User</span>
                </p>
                <p className="font-semibold">
                  Qualification: <span className="font-normal">-----------</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
