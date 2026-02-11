import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existing = await User.findOne({ username: username });

    if (existing) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      loggedIn: false,
    });

    res.status(201).json({
      message: "User successfully created",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    // check if user already exists
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    });
    if (!user) return res.status(400).json({ message: "User not found!" });

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Password mismatch" });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "User not found",
      });
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};
export { registerUser, loginUser,logoutUser };
