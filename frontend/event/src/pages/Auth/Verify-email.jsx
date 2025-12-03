import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../Api/EventApi";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/verify-email", {
        email: state?.email,
        otp,
      });

      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    }
  };

  const handleResend = async () => {
    try {
      await API.post("/auth/reset-otp", { email: state?.email });
      toast.success("OTP sent again successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Email</h2>
      <p>OTP sent to <strong>{state?.email}</strong></p>

      <form onSubmit={handleVerify} className="auth-form">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Verify OTP
        </button>
      </form>

      <button onClick={handleResend} className="btn-secondary">
        Resend OTP
      </button>
    </div>
  );
};

export default VerifyEmail;
