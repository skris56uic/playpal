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
  
  export interface Venue {
    id: string;
    name: string;
    location: string;
    facilities: string;
    amenities: string[];
    availableSlots: AvailableSlots[];
  }
  
  export interface LocationDetails {
    latitude: number;
    longitude: number;
    radius: number;
  }
  