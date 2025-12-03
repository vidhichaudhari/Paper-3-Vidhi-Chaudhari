import Event from "../../../../database/models/Event.js"; 

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue, price, capacity, category } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      price,
      capacity,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, startDate, endDate, sort, page, limit, search } = req.query;

    const filters = {};

   
    if (search) {
      filters.title = { $regex: search, $options: "i" };
    }

    
    if (category) filters.category = category;

    if (location) filters.location = location;

    
    if (minPrice && maxPrice) {
      filters.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    }

    if (startDate && endDate) {
      filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const perPage = Number(limit) || 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * perPage;

    let sortOption = {};
    if (sort === "date") sortOption.date = 1;
    if (sort === "price") sortOption.price = 1;
    if (sort === "popularity") sortOption.popularity = -1;

    const events = await Event.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    const total = await Event.countDocuments(filters);

    return res.status(200).json({
      success: true,
      total,
      page: currentPage,
      pages: Math.ceil(total / perPage),
      events,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({ success: true, event });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }  
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
