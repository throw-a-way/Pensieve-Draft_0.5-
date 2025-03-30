import dotenv from "dotenv";
import mongoose, { model, Schema } from "mongoose";

// Load environment variables
dotenv.config();

// Get MongoDB connection string from .env
const mongoURI = process.env.MONGO_CONNECTION_STRING;

// Connect to MongoDB
const connectDB = async () => {
    try {
        if (!mongoURI) {
            throw new Error("MongoDB connection string is missing. Check your .env file.");
        }
        await mongoose.connect(mongoURI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit process if connection fails
    }
};

// Call the function to establish connection
connectDB();

// User Schema & Model
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

export const UserModel = model("User", UserSchema);

// Content Schema & Model
const ContentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
    type: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const ContentModel = model("Content", ContentSchema);

// Link Schema & Model
const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
});

export const LinkModel = model("Links", LinkSchema);
