import mongoose from "mongoose";

const jobschema = new mongoose.Schema(
  {
    Company: {
      type: String,
      required: [true, "Comapany name is required"],
    },
    Position: {
      type: String,
      required: [true, "this Field can not be empty"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["Pending", "reject", "interview"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contaract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      default: "Mumbai",
      required: [true, "Work Location is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobschema);
