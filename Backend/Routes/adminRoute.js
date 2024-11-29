// import { Router } from "express";
// import { Auth } from "../Models/auth.js";

// const adminRoute = Router();

// adminRoute.get("/getUserDetails", async (req, res) => {
//     try {

//       const { email } = req.query; 
  
//       if (!email) {
//         return res.status(400).json({ message: "Email is required" });
//       }
//       const user = await Auth.findOne({ email });
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       const { password, ...userDetails } = user.toObject();
//       res.status(200).json(userDetails);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  
// export { adminRoute };