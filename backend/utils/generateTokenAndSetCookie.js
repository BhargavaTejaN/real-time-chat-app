import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Failed to generate token");
  }
};

export default generateTokenAndSetCookie;
