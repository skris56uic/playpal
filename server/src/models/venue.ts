import mongoose from "mongoose";

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
  totalPlayers: number;
  playersJoined: string[];
}

interface AvailableSlots {
  date: string;
  timeSlots: TimeSlot[];
}

interface ContactInformation {
  name: string;
  phoneNumber: string;
}

type SportType = "soccer" | "football" | "cricket" | "badminton";

interface Sport {
  type: SportType;
  availableSlots: AvailableSlots[];
}

interface Venue {
  id: string;
  name: string;
  location: string;
  amenities: string[];
  sports: Sport[];
  contactInfo: ContactInformation;
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
  totalPlayers: { type: Number, required: true },
  playersJoined: { type: [String], required: true },
});

const availableSlotsSchema = new mongoose.Schema<AvailableSlots>({
  date: { type: String, required: true },
  timeSlots: { type: [timeSlotSchema], required: true },
});

const contactInformationSchema = new mongoose.Schema<ContactInformation>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

const sportSchema = new mongoose.Schema<Sport>({
  type: { type: String, required: true },
  availableSlots: { type: [availableSlotsSchema], required: true },
});

const venueSchema = new mongoose.Schema<Venue>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  amenities: { type: [String], required: true },
  sports: { type: [sportSchema], required: true },
  contactInfo: { type: contactInformationSchema, required: true },
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
  Sport,
  SportType,
  sportSchema,
  placeLocationSchema,
  PlaceLocation,
  ContactInformation,
};
