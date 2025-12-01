import React, { useState } from "react";
import { postData } from "../api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    login_type: "N",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("/auth/signup", form);
    alert(res.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="mobile" placeholder="Mobile" onChange={handleChange} />
      <input name="password" placeholder="Password" onChange={handleChange} />

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
