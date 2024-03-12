import User from "../models/User.js";

// get users controller
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json({
      success: true,
      users: filteredUsers,
    });
  } catch (error) {
    console.log("error while gettingUsersForSidebar : ", error);
    res.status(500).json({
      success: false,
      message: "Error while gettingUsersForSidebar",
      error: error.message,
    });
  }
};

