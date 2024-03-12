import jwt from "jsonwebtoken";

import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
  //const token = req.cookies.jwt-chat-app; 
  const token = req.cookies['jwt-chat-app']; 

  //console.log("token : ",token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "no token available",
      error: "Unauthorized - No Token provided",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //console.log("decoded : ",decoded);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      error: "Unauthorized - Invalid Token provided",
    });
  }

  try {
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid User",
        error: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware : ", error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Internal Server Error",
    });
  }
};

export default protectRoute;
