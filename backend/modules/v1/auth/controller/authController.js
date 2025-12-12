import User from "../../../../database/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../../../utils/sendEmail.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile)
      return res.status(400).json({ message: "All fields are required" });

    const emailParts = email.split("@");
    
    if (emailParts.length !== 2 ||
      emailParts[0].length === 0 ||
      emailParts[1].length === 0 ||
      !emailParts[1].includes(".")) {
      return res.status(400).json({ message: "Invalid email" });
    }


    const exists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (exists)
      return res.status(400).json({ message: "Email or Mobile already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    const otpExpiry = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
      resetOTP: hashedOTP,
      otpExpiry,
      isVerified: false,
    });

    await sendEmail(
      email,
      "Event Booking - Verify your Email",
      `<h3>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</h3>`
    );

    return res.status(201).json({
      message: "Signup successful, OTP sent to your email",
      userId: user._id,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email & OTP are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid Email" });

    if (user.otpExpiry < Date.now())
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const isMatch = await bcrypt.compare(otp, user.resetOTP);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isVerified = true;
    user.resetOTP = null;
    user.otpExpiry = null;
    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      userId: user._id,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.resetOTP = hashedOTP;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(
      email,
      "Resend OTP",
      `<h3>Your new OTP is <b>${otp}</b>. It expires in 10 minutes.</h3>`
    );

    return res.status(200).json({ message: "OTP resent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(401).json({ message: "Please verify your email first" });

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET.trim(),
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
