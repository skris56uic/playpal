import { v4 as uuidv4 } from "uuid";
import {
  VenueAvailableSlots,
  VenueAvailableTimeSlots,
} from "../routes/interfaces";
import { SportType } from "../models/venue";

export const getRandomPrice = (): number => {
  return Math.floor(Math.random() * 50) + 10; // Random price between 10 and 59
};

export const generateTimeSlots = (
  sportType: SportType
): VenueAvailableTimeSlots[] => {
  const mockPrice = getRandomPrice();
  const availableSlots: VenueAvailableTimeSlots[] = [];
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dates = [today, tomorrow];

  dates.forEach((date) => {
    const dateString = date.toISOString().split("T")[0];
    const timeSlots: VenueAvailableSlots[] = [];
    for (let hour = 9; hour < 18; hour++) {
      const startTime = `${hour}:00`;
      const endTime = `${hour + 1}:00`;
      timeSlots.push({
        id: uuidv4(),
        startTime,
        endTime,
        price: mockPrice, // Example price
        isBooked: false,
        totalPlayers: ["football", "soccer", "cricket"].includes(sportType)
          ? 11
          : 4,
        playersJoined: [],
      });
    }
    availableSlots.push({
      date: dateString,
      timeSlots,
    });
  });

  return availableSlots;
};
