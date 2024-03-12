import bcrypt from "bcryptjs";

import User from "../models/User.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

// register controller
export const register = async (req, res) => {
  const { fullName, email, password, confirmPassword, gender } = req.body;

  const emptyFields = [];

  if (!fullName) emptyFields.push("fullName");
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");
  if (!confirmPassword) emptyFields.push("confirmPassword");
  if (!gender) emptyFields.push("gender");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all fields.",
      emptyFields,
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match.",
      error: "passwords do not match",
    });
  }

  const validGenders = ["male", "female", "others", "prefer not to say"];
  if (!validGenders.includes(gender)) {
    return res.status(400).json({
      success: false,
      message:
        'Invalid gender value. Gender must be one of: "male", "female", "others", "prefer not to say".',
      error: "Invalid gender value",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        error: "Try Different Email",
      });
    }

    const slat = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, slat);

    let profilePic;
    switch (gender) {
      case "male":
        profilePic = `https://avatar.iran.liara.run/public/boy?fullName=${fullName}`;
        break;
      case "female":
        profilePic = `https://avatar.iran.liara.run/public/girl?fullName=${fullName}`;
        break;
      case "others":
        profilePic = `https://avatar.iran.liara.run/public/girl?fullName=${fullName}`;
        break;
      case "prefer not to say":
        profilePic = `https://avatar.iran.liara.run/public/boy?fullName=${fullName}`;
        break;
      default:
        profilePic = `https://avatar.iran.liara.run/public/boy?fullName=${fullName}`;
    }
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    if (newUser) {
      // generate jwt token
      const token = generateTokenAndSetCookie(newUser._id);
      await newUser.save();

      res.cookie("jwt-chat-app", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
      })
      .status(201).json({
        success: true,
        message: "User registered successfully",
        user: newUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (error) {
    console.log("error while registering user : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  const emptyFields = [];
  if (!email) emptyFields.push("email");
  if (!password) emptyFields.push("password");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all fields.",
      emptyFields,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email Is Not Registered Yet",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = generateTokenAndSetCookie(user._id);
    res.cookie("jwt-chat-app", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    })
    .status(200).json({
      success: true,
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    console.log("error while login : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Login",
      error: error.message,
    });
  }
};

// logout controller
export const logout = (req, res) => {
  try {
    res.cookie("jwt-chat-app","", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Error while logging out : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Logout",
      error: error.message,
    });
  }
};
