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

interface PlaceLocation {
  latitude: number;
  longitude: number;
  venues: Venue[];
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

const placeLocationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  venues: { type: [venueSchema], required: true },
});

const PlaceLocationModel = mongoose.model<PlaceLocation>(
  "PlaceLocation",
  placeLocationSchema
);

export {
  PlaceLocationModel,
  Venue,
  TimeSlot,
  AvailableSlots,
  placeLocationSchema,
  PlaceLocation,
};
