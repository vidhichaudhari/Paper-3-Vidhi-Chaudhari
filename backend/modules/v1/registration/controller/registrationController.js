import Registration from "../../../../database/models/Registration.js";
import Event from "../../../../database/models/Event.js";
import { sendEmail } from "../../../../utils/sendEmail.js";
import { generateQRCode } from "../../../../utils/qr.js";

export const registerForEvent = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const exists = await Registration.findOne({ event: eventId, user: req.user.id });
    if (exists) return res.status(400).json({ message: "Already registered" });

    let status = "confirmed";

    if (event.availableSeats < tickets) {
      status = "waitlisted";
    } else {
      event.availableSeats -= tickets;
      await event.save();
    }

    const qrCode = await generateQRCode(`USER-${req.user.id}-EVENT-${eventId}`);

    const booking = await Registration.create({
      user: req.user.id,
      event: eventId,
      status,
      tickets,
      qrCode,
    });

    await sendEmail(
      req.user.email,
      "Event Booking Confirmation",
      `<h3>Your booking status: ${status}</h3>
       <p>QR Code Attached</p>`
    );

    res.status(201).json({ message: "Registered successfully", booking });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate("event", "title date venue price image");

    return res.json({ success: true, registrations });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch registrations" });
  }
};

export const cancelRegistration = async (req, res) => {
  const registration = await Registration.findById(req.params.id);
  if (!registration) return res.status(404).json({ message: "Not found" });

  if (registration.status === "cancelled")
    return res.status(400).json({ message: "Already cancelled" });

  registration.status = "cancelled";
  await registration.save();

  await Event.findByIdAndUpdate(registration.eventId, {
    $inc: { bookedSeats: -1 }
  });

  res.json({ success: true, message: "Registration cancelled" });
};

export const updateAttendanceStatus = async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { status } = req.body; 

    const registration = await Registration.findById(registrationId);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.attendanceStatus = status;
    await registration.save();

    res.json({ message: "Attendance updated successfully", registration });
  } catch (error) {
    res.status(500).json({ message: "Failed to update attendance" });
  }
};
