export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
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

export interface Venue {
  id: string;
  name: string;
  location: string;
  facilities: string;
  amenities: string[];
  availableSlots: AvailableSlots[];
  contactInfo: ContactInformation;
}

export interface LocationDetails {
  latitude: number;
  longitude: number;
  radius: number;
}
