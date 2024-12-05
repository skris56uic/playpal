import { SportType } from "../models/venue";
import { SportDetails } from "../routes/interfaces";
import { generateTimeSlots } from "./getTimeSlots";

export const formatSportInfo = (sports: string): SportDetails[] => {
  const sportTypes = sports.split(";");
  const sportList: SportDetails[] = [];
  sportTypes.forEach((s) => {
    let sportType: SportType = "badminton";
    if (s === "football") {
      sportType = "football";
      sportList.push({
        type: sportType,
        availableSlots: generateTimeSlots(sportType),
      });
    } else if (s === "soccer") {
      sportType = "soccer";
      sportList.push({
        type: sportType,
        availableSlots: generateTimeSlots(sportType),
      });
    } else if (s === "cricket") {
      sportType = "cricket";
      sportList.push({
        type: sportType,
        availableSlots: generateTimeSlots(sportType),
      });
    } else if (s === "badminton") {
      sportType = "badminton";
      sportList.push({
        type: sportType,
        availableSlots: generateTimeSlots(sportType),
      });
    }
  });

  return sportList;
};
