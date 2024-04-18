import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    //console.log(`connected to MongoDb Database ${mongoose.connection.host}`);
  } catch (error) {
    //console.log(`Database Error ${error}`);
  }
};

export default connectDB;
