import React, { useState } from "react";
import API from "../../Api/EventApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", form);
      toast.success(res.data.message);

      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
   <div className="auth-container">
  <div className="auth-form-box">
    <h2>Create Account</h2>

    <form onSubmit={handleSubmit}>

      <label className="auth-label">Full Name</label>
      <input
        type="text"
        name="name"
        className="auth-input"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <label className="auth-label">Email Address</label>
      <input
        type="email"
        name="email"
        className="auth-input"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <label className="auth-label">Mobile Number</label>
      <input
        type="number"
        name="mobile"
        className="auth-input"
        placeholder="Enter your mobile number"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <label className="auth-label">Password</label>
      <input
        type="password"
        name="password"
        className="auth-input"
        placeholder="Create a password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button type="submit" className="btn">Sign Up</button>
    </form>
  </div>
</div>

  );
};

export default Signup;
