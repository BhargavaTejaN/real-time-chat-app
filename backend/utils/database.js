import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    if (!process.env.MONGODB_URI) {
      return console.log("MONGODB URL IS NOT DEFINED");
    }

    if (isConnected)
      return console.log("=> using existing database connection");

    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.log("error while connecting to mongodb : ", error);
    throw new Error("Failed To Connect To Mongodb " + error.message);
  }
};

export default connectToDB;
