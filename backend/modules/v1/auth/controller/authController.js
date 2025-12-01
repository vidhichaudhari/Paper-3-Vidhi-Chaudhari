import User from "../../../../database/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "../../../../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (exists) return res.status(400).json({ message: "Email or Mobile already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      isVerified: false,
    });

    res.status(201).json({ message: "Signup successful, please login & verify email", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOTP = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail(email, "Verification OTP", `<h3>Your OTP code is <b>${otp}</b></h3>`);

    return res.status(200).json({
      message: "Login Successful. OTP sent to your email. Please verify.",
      email: user.email,
      isVerified: user.isVerified
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid Email" });

    if (user.resetOTP != otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.resetOTP = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Email verified successfully",
      token,
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOTP = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail(email, "Resend Verification OTP", `<h3>Your new OTP: <b>${otp}</b></h3>`);

    res.status(200).json({ message: "OTP Resent Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
