const possibleAmenities: string[] = [
  "Toilets",
  "Parking",
  "Food & Drink",
  "WiFi",
  "Changing Rooms",
  "Showers",
  "Lockers",
  "First Aid",
  "Water Fountains",
  "Gym",
  "Swimming Pool",
  "Sauna",
  "Steam Room",
  "Bicycle Parking",
];

export const getRandomAmenities = (): string[] => {
  const amenities = [];
  const numberOfAmenities =
    Math.floor(Math.random() * possibleAmenities.length) + 1;
  const shuffled = possibleAmenities.sort(() => 0.5 - Math.random());
  for (let i = 0; i < numberOfAmenities; i++) {
    amenities.push(shuffled[i]);
  }
  return amenities;
};
