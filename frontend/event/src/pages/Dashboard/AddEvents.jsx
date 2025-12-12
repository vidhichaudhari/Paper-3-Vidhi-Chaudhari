import React, { useState } from "react";
import API from "../../Api/EventApi";
import { useNavigate } from "react-router-dom";

const AddEvents = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    price: "",
    seats: "",
    location: "",
    category: "",
    image: "imageName",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/events/", form);
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Event creation failed");
    }
  };

  return (
    <div className="add-event-container">
      <div className="add-event-card">
        <h2 className="add-event-title">Create Event</h2>

        <form onSubmit={handleSubmit} className="add-event-form">

          <input type="text" name="title" placeholder="Event Title" onChange={handleChange} />

          <textarea name="description" placeholder="Description" onChange={handleChange} />

          <input type="date" name="date" onChange={handleChange} />

          <input type="text" name="venue" placeholder="Venue" onChange={handleChange} />

          <input type="number" name="price" placeholder="Price" onChange={handleChange} />

          <input type="number" name="seats" placeholder="Seats" onChange={handleChange} />

          <input type="text" name="location" placeholder="Location" onChange={handleChange} />

          <input type="text" name="category" placeholder="Category" onChange={handleChange} />

          <input type="file" accept="image/*" onChange={handleImageChange} />
          {form.image && (
            <img
              src={`/uploads/${form.image}`}
              alt="preview"
              className="image-preview"
            />
          )}


          <button type="submit" className="submit-btn">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
