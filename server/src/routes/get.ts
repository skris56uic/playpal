import express, { Router } from "express";
import { userModel } from "../models/user";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const router: Router = express.Router();

const jwtSecret = "jhfasdf894u5y9ngmy6467h3b6m7n34d09vba09v8d0";

interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

interface LoginRequest {
	email: string;
	password: string;
}

interface UserDataType {
	name: string;
	email: string;
	password: string;
	iat: Number;
}

router.get("/", async (req, res) => {
	try {
		const overpassUrl = "http://overpass-api.de/api/interpreter";

		const overpassQuery = `
    		[out:json][timeout:180];
    		area[name = "Illinois"];
   			nwr(area)["sport"~".*\\s*base\\s*ball\\s*.*",i];
    		out geom;
  		`;

		const response = await fetch(overpassUrl, {
			method: "POST",
			body: overpassQuery,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		res.send(data);
	} catch (error) {
		console.error("Error fetching data from Overpass API:", error);
		res.status(500).json({ error: "Error fetching data from Overpass API" });
	}
});

router.get("/profile", async (req, res) => {
	const { token } = req.cookies;

	if (token) {
		jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
			if (err) {
				return res.status(401).json({ error: "Invalid token" });
			}

			const userData = decoded as JwtPayload & { id: string };

			if (!userData || !userData.id) {
				return res.status(401).json({ error: "Invalid token data" });
			}

			const user = await userModel.findById(userData.id);

			if (!user) {
				return res.status(404).json({ error: "User not found" });
			}

			const { name, email, _id } = user;
			res.json({ name, email, _id });
		});
	} else {
		res.json(null);
	}
});

router.post("/register", async (req, res) => {
	try {
		const { name, email, password }: RegisterRequest = req.body;
		const bcryptSalt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, bcryptSalt);
		const userDoc = await userModel.create({
			name,
			email,
			password: bcrypt.hashSync(password, hashedPassword),
		});

		res.status(200).json(userDoc);
	} catch (error) {
		console.error("Error registering user:", error);
		res.status(422).json({ error: "Error registering user" });
	}
});

router.post("/login", async (req, res) => {
	try {
		console.log("login called !");
		const { email, password }: LoginRequest = req.body;

		const userDoc = await userModel.findOne({ email });
		if (userDoc) {
			const passwordCorrect = bcrypt.compareSync(password, `${userDoc.password}`);

			if (passwordCorrect) {
				const options: jwt.SignOptions = {};

				jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
					if (err) {
						throw err;
					}
					res.cookie("token", token).json(userDoc);
				});
			} else {
				res.status(422).json("Wrong passowrd");
			}
		} else {
			res.status(404).json("User not found");
		}
	} catch (error) {
		console.error("Error logging in user:", error);
		res.status(422).json({ error: "Error logging in user" });
	}
});

router.post("/logout", (req, res) => {
	res.clearCookie("token", {
		path: "/",
	});
	res.json({ success: true });
});

export default router;
