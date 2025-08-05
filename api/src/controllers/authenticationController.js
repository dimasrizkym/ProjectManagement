import User from "../models/User.js";
import { formatJoiErrors } from "../utils/formatJoiErrors.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/authenticationValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // 1. validasi menggunakan Joi
  const { error } = registerValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  try {
    const { name, email, password } = req.body;
    // console.log("Registering user:", { name, email, password });

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Buat user baru
    const user = new User({
      name,
      email,
      password, // Pastikan password sudah di-hash sebelum disimpan
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(201).json({
      message:
        "User registered successfully, Please wait you will be redirected to login page",
      user,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  const { error } = loginValidation.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = formatJoiErrors(error);
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  const { email, password } = req.body;

  try {
    // Cek apakah user dengan email tersebut ada
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Cek apakah password yang dimasukkan benar
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Jika berhasil, buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token sebagai cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      message: "Login successful, redirecting to dashboard",
      user,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const whoami = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    return res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (err) {
    console.log("Error retrieving user:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
