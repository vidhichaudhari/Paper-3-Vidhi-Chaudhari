import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../../Api/EventApi";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.redirectTo || "/dashboard";
  const redirectEvent = location.state?.event || null;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message);

      if (redirectEvent) {
        navigate(redirectPath, { state: { event: redirectEvent } });
      } else {
      
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2>Log In</h2>

        <form onSubmit={handleLogin}>
          <label className="auth-label">Email address</label>
          <input
            type="email"
            name="email"
            className="auth-input"
            placeholder="Your email address"
            value={form.email}
            onChange={handleInputChange}
            required
          />

          <label className="auth-label">Password</label>
          <input
            type="password"
            name="password"
            className="auth-input"
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btn">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
