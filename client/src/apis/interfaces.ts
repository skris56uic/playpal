export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
  totalPlayers: number;
  playersJoined: string[];
}

export interface AvailableSlots {
  date: string;
  timeSlots: TimeSlot[];
}

export interface PlaceLocation {
  latitude: number;
  longitude: number;
  venues: Venue[];
}

interface ContactInformation {
  name: string;
  phoneNumber: string;
}

export type SportType = "soccer" | "football" | "cricket" | "badminton";

export interface Sport {
  type: SportType;
  availableSlots: AvailableSlots[];
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  amenities: string[];
  contactInfo: ContactInformation;
  sports: Sport[];
}

export interface LocationDetails {
  latitude: number;
  longitude: number;
}

export interface Country {
  name: string;
  states: State[];
}

export interface State {
  name: string;
  cities: City[];
}

export interface City {
  name: string;
  latitude: string;
  longitude: string;
}
