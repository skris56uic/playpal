import mongoose from "mongoose";

interface User {
	_id: String;
	name: String;
	email: String;
	password: String;
	__v: Number;
}

const userSchema = new mongoose.Schema<User>({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const userModel = mongoose.model<User>("user", userSchema);

export { userModel, User };
