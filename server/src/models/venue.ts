import mongoose from "mongoose";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
}

interface AvailableSlots {
  date: string;
  timeSlots: TimeSlot[];
}

interface Venue {
  id: string;
  name: string;
  location: string;
  facilities: string;
  amenities: string[];
  availableSlots: AvailableSlots[];
}

const timeSlotSchema = new mongoose.Schema<TimeSlot>({
  id: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  price: { type: Number, required: true },
  isBooked: { type: Boolean, required: true, default: false },
});

const availableSlotsSchema = new mongoose.Schema<AvailableSlots>({
  date: { type: String, required: true },
  timeSlots: { type: [timeSlotSchema], required: true },
});

const venueSchema = new mongoose.Schema<Venue>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  facilities: { type: String, required: true },
  amenities: { type: [String], required: true },
  availableSlots: { type: [availableSlotsSchema], required: true },
});

const VenueModel = mongoose.model<Venue>("Venue", venueSchema);

export { VenueModel, Venue, TimeSlot, AvailableSlots };
