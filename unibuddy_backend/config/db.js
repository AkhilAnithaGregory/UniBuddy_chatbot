import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to local MongoDB...");

    await mongoose.connect(
      "mongodb://admin:admin@localhost:27017/UniBuddy?authSource=admin"
    );
    /*  await mongoose.connect(
      process.env.MONGODB
    ); */
    

    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;





