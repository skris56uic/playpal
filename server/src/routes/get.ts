import express, { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { LocationAPIResponse, VenueDetails } from "./interfaces";
import { RegisterRequest, LoginRequest } from "./interfaces";
import { PlaceLocation, PlaceLocationModel, Venue } from "../models/venue";
import { userModel } from "../models/user";
import { generateTimeSlots } from "../utils/getTimeSlots";
import { getRandomAmenities } from "../utils/amenities";
import { getRandomContactInformation } from "../utils/contactInfo";

const router: Router = express.Router();

const jwtSecret = "jhfasdf894u5y9ngmy6467h3b6m7n34d09vba09v8d0";

router.get("/venues", async (req, res) => {
  const overpassUrl = "http://overpass-api.de/api/interpreter";
  const userLatitude = +(req.query.latitude || 0);
  const userLongitude = +(req.query.longitude || 0);

  if (userLatitude === 0 || userLongitude === 0) {
    res.status(400).send("Missing required parameters");
    return;
  }

  const placeLocations: PlaceLocation[] = await PlaceLocationModel.find({});
  if (placeLocations.length > 0) {
    const locationPresent = placeLocations.findIndex(
      (pl) => pl.latitude === userLatitude && pl.longitude === userLongitude
    );
    if (locationPresent !== -1) {
      res.send(placeLocations[locationPresent]);
      console.log("Location found in DB");
      return;
    }
    console.log("Location not found in DB");
  }

  const overpassQuery = `
    [out:json][timeout:180];
    nwr(around:100000,${userLatitude},${userLongitude})["sport"~".*\\s*base\\s*ball\\s*.*",i]["name"]["addr:city"]["addr:housenumber"]["addr:postcode"]["addr:state"]["addr:street"];
    out center tags;`;

  try {
    // Send the query to the Overpass API

    const request = new Request(overpassUrl, {
      method: "POST",
      body: overpassQuery,
    });

    const response = await fetch(request);
    const data: LocationAPIResponse = await response.json();
    const formattedResponse: VenueDetails[] =
      data.elements
        ?.map((e) => {
          return {
            id: e.id,
            name: e.tags.name || "",
            address_city: e.tags["addr:city"] || "",
            address_housenumber: e.tags["addr:housenumber"] || "",
            address_postcode: e.tags["addr:postcode"] || "",
            address_state: e.tags["addr:state"] || "",
            address_street: e.tags["addr:street"] || "",
            availableSlots: [],
          };
        })
        .filter(
          (x) =>
            !!x.name &&
            !!x.address_city &&
            !!x.address_housenumber &&
            !!x.address_postcode &&
            !!x.address_state &&
            !!x.address_street
        ) || [];

    const uniqueVenues = new Set<string>();
    const formattedLocation: PlaceLocation = {
      latitude: userLatitude,
      longitude: userLongitude,
      venues: formattedResponse
        .filter((x) => {
          if (uniqueVenues.has(`${x.id}`)) {
            return false;
          } else {
            uniqueVenues.add(`${x.id}`);
            return true;
          }
        })
        .map((x) => ({
          id: `${x.id}`,
          name: x.name,
          location: `${x.address_housenumber} ${x.address_street}, ${x.address_city}, ${x.address_state}, ${x.address_postcode}`,
          amenities: getRandomAmenities(),
          facilities: "Baseball",
          availableSlots: generateTimeSlots(),
          contactInfo: getRandomContactInformation(),
        })),
    };

    await PlaceLocationModel.insertMany(formattedLocation);

    res.send(formattedLocation);

    // Return the data from the Overpass API
  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    res.send("Error fetching data from Overpass API");
  }
});

router.get("/venue/:id", async (req, res) => {
  const venueId = req.params.id;

  try {
    const placeLocation = await PlaceLocationModel.findOne({
      "venues.id": venueId,
    });

    if (!placeLocation) {
      res.status(404).send({ error: "Venue not found" });
      return;
    }

    const venue = placeLocation.venues.find((v) => v.id === venueId);

    if (!venue) {
      res.status(404).send({ error: "Venue not found" });
      return;
    }

    res.send(venue);
  } catch (error) {
    console.error("Error fetching venue details:", error);
    res.status(500).send("Error fetching venue details");
  }
});

router.get("/my-bookings", async (req, res) => {
  try {
    const cookies = req.cookies;
    const token = cookies.token;

    if (!token) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
    const userId = decoded.id;

    const user = await userModel.findById(userId);

    if (!user) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const placeLocations: PlaceLocation[] = await PlaceLocationModel.find();

    if (!placeLocations || placeLocations.length === 0) {
      res.send({ error: "No venues found" });
      return;
    }

    const filteredVenues: Venue[] = [];
    placeLocations.forEach((placeLocation) => {
      placeLocation.venues.forEach((venue) => {
        venue.availableSlots.forEach((slot, i) => {
          venue.availableSlots[i].timeSlots = slot.timeSlots.filter(
            (ts) => ts.isBooked && user.bookedSlots.includes(ts.id)
          );
        });

        venue.availableSlots = venue.availableSlots.filter(
          (as) => as.timeSlots.length > 0
        );
      });

      filteredVenues.push(
        ...placeLocation.venues.filter((v) => v.availableSlots.length > 0)
      );
    });

    res.send(filteredVenues);
  } catch (error) {
    console.error("Error fetching venues and booked slots:", error);
    res.status(500).send("Error fetching venues and booked slots");
  }
});

router.get("/book-slot", async (req, res) => {
  const slotId = req.query.slotId as string;
  const book = req.query.book as string;

  if (!slotId) {
    res.status(400).send("Missing required parameters");
    return;
  }

  try {
    const cookie = req.cookies;
    const token = cookie.token;
    if (!token) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, jwtSecret);
    const userId = (decoded as jwt.JwtPayload).id;

    const user = await userModel.findById(userId);

    if (!user) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const placeLocation = await PlaceLocationModel.findOne({
      "venues.availableSlots.timeSlots.id": slotId,
    });

    if (!placeLocation) {
      res.status(404).send("Timeslot not found");
      return;
    }

    let slotFound = false;
    placeLocation.venues.forEach((venue) => {
      venue.availableSlots.forEach((availableSlot) => {
        availableSlot.timeSlots.forEach((timeSlot) => {
          if (timeSlot.id === slotId) {
            timeSlot.isBooked = book === "true";
            slotFound = true;
          }
        });
      });
    });

    if (!slotFound) {
      res.status(404).send("Timeslot not found");
      return;
    }

    if (book === "true") {
      if (!user.bookedSlots.includes(slotId)) {
        user.bookedSlots.push(slotId);
      }
    } else {
      user.bookedSlots = user.bookedSlots.filter((slot) => slot !== slotId);
    }

    await user.save();
    await placeLocation.save();
    res.send({ message: book === "true" ? "Slot booked" : "Slot unbooked" });
  } catch (error) {
    console.error("Error booking timeslot:", error);
    res.status(500).send("Error booking timeslot");
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
      bookedSlots: [],
    });

    res.status(200).json(userDoc);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(422).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    const userDoc = await userModel.findOne({ email });
    if (userDoc) {
      const passwordCorrect = bcrypt.compareSync(
        password,
        `${userDoc.password}`
      );

      if (passwordCorrect) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              throw err;
            }
            res.cookie("token", token).json(userDoc);
          }
        );
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
