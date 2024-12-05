import { SportType } from "../models/venue";

export interface LocationAPIResponse {
  version: number;
  generator: string;
  osm3s: Osm3s;
  elements: ElementsEntity[];
}

export interface Osm3s {
  timestamp_osm_base: string;
  copyright: string;
}

export interface ElementsEntity {
  type: string;
  id: number;
  lat?: number;
  lon?: number;
  tags: Tags;
  center?: Center;
}

export interface Center {
  lat: number;
  lon: number;
}

export interface Tags {
  "addr:city": string;
  "addr:housenumber": string;
  "addr:postcode": string;
  "addr:state": string;
  "addr:street": string;
  leisure: string;
  name: string;
  opening_hours?: string;
  phone?: string;
  sport: string;
  website?: string;
  lit?: string;
  building?: string;
  alt_name?: string;
  landuse?: string;
}

export interface VenueAvailableTimeSlots {
  date: string;
  timeSlots: VenueAvailableSlots[];
}

export interface SportDetails {
  type: SportType;
  availableSlots: VenueAvailableTimeSlots[];
}

export interface VenueDetails {
  id: number;
  name: string;
  address_city: string;
  address_housenumber: string;
  address_postcode: string;
  address_state: string;
  address_street: string;
  sports: SportDetails[];
}

export interface VenueAvailableSlots {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  isBooked: boolean;
  totalPlayers: number;
  playersJoined: string[];
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserDataType {
  name: string;
  email: string;
  password: string;
  iat: number;
}
