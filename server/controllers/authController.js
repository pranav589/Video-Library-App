import User from "../models/UserModel.js";
import CryptoJS from "crypto-js";
import valid from "../utils/valid.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ err: "Email and password are required fields." });
    }
    const decryptPassword = CryptoJS.AES.decrypt(
      password,
      `${process.env.CRYPTOJS_SECRET}`
    ).toString();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(decryptPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ err: "Invalid Password" });
    }

    const payload = {
      id: user._id,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "30d",
    });
    return res.json({
      status: "success",
      Data: {
        user: {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          root: user.root,
        },
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        err: "Name, Email, Password and Confirm Password are required fields.",
      });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      password,
      process.env.CRYPTOJS_SECRET
    ).toString();

    const decryptConfirmPassword = CryptoJS.AES.decrypt(
      confirmPassword,
      process.env.CRYPTOJS_SECRET
    ).toString();

    const errorMessage = valid(
      name,
      email,
      decryptedPassword,
      decryptConfirmPassword
    );

    if (errorMessage) {
      return res.status(400).json({ err: errorMessage });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        err: "This email already exist.",
      });
    }
    const passwordHash = await bcrypt.hash(decryptedPassword, 12);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    await newUser.save();
    return res.json({
      status: "success",
      Data: {
        user: {
          email: newUser.email,
          name: newUser.name,
          avatar: newUser.avatar,
          role: newUser.role,
          root: newUser.root,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ err: "Authentication failed" });
    const tokenVerification = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!tokenVerification) {
      return res.status(400).json({ err: "Authorization failed" });
    }

    const user = await User.findById(tokenVerification.id);
    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }
    return res.json({
      status: "success",
      Data: {
        user: {
          role: user.role,
          avatar: user.avatar,
          _id: user.id,
          name: user.name,
          email: user.email,
          subscribedUsers: user.subscribedUsers,
          subscribeNumber: user.subscribeNumber,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
