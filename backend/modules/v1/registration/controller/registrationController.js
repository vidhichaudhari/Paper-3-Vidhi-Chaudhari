import Registration from "../../../../database/models/Registration.js";
import Event from "../../../../database/models/Event.js";
import {sendEmail }from "../../../../utils/sendEmail.js";
import { generateQRCode } from "../../../../utils/qr.js";

export const registerForEvent = async (req, res) => {
  const { eventId, tickets } = req.body;

  const event = await Event.findById(eventId);

  
  const exists = await Registration.findOne({ event: eventId, user: req.user.id });
  if (exists) return res.status(400).json({ message: "Already registered" });

  let status = "confirmed";

  if (event.bookedSeats + tickets > event.capacity) {
    status = "waitlisted";
  } else {
    event.bookedSeats += tickets;
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
};
