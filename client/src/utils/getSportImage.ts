import { Sport, SportType } from "../apis/interfaces";

export const getSportImage = (sports: Sport[]): string => {
  const prioritySports: SportType[] = [
    "badminton",
    "cricket",
    "football",
    "soccer",
  ];
  for (const sport of prioritySports) {
    if (sports.some((s) => s.type === sport)) {
      return `/${sport}.webp`;
    }
  }
  return "/default.webp";
};
