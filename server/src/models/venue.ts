import mongoose from "mongoose";

interface Venue {
  name: string;
  location: string;
  facilities: string;
  amenities: string[];
}

const venueSchema = new mongoose.Schema<Venue>({
  name: { type: String, required: true },
  location: { location: String, required: true },
  facilities: { type: String, required: true },
  amenities: { type: [String], required: true },
});

const VenueModel = mongoose.model<Venue>("Venue", venueSchema);

export { VenueModel, Venue };
