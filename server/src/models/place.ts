import mongoose, { Document } from "mongoose";

interface Place extends Document {
	owner: mongoose.Schema.Types.ObjectId;
	title: string;
	address: string;
	photos: string[];
	description: string;
	perks: string[];
	extraInfo: string;
	checkIn: number;
	checkOut: number;
	maxGuests: number;
	price: number;
}

const placeSchema = new mongoose.Schema<Place>({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	title: String,
	address: String,
	photos: [String],
	description: String,
	perks: [String],
	extraInfo: String,
	checkIn: Number,
	checkOut: Number,
	maxGuests: Number,
	price: Number,
});

const placeModel = mongoose.model<Place>("place", placeSchema);

export { placeModel, Place };
