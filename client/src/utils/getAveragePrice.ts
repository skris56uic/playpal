import { Venue } from "../apis/interfaces";

export const calculateAveragePrice = (venue: Venue): string => {
  let totalPrices = 0;
  let totalCount = 0;

  venue.sports.forEach((sport) => {
    sport.availableSlots.forEach((availableSlot) => {
      availableSlot.timeSlots.forEach((timeSlot) => {
        totalPrices += timeSlot.price;
        totalCount += 1;
      });
    });
  });

  return totalCount > 0 ? "$" + `${totalPrices / totalCount}` : "N/A";
};
