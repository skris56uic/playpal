export interface LocationAPIResponse {
  version: number;
  generator: string;
  osm3s: Osm3s;
  elements?: ElementsEntity[] | null;
}

export interface Osm3s {
  timestamp_osm_base: string;
  copyright: string;
}

export interface ElementsEntity {
  type: string;
  id: number;
  bounds?: Bounds | null;
  nodes?: number[] | null;
  geometry?: GeometryEntity[] | null;
  tags: Tags;
  members?: MembersEntity[] | null;
}

export interface Bounds {
  minlat: number;
  minlon: number;
  maxlat: number;
  maxlon: number;
}

export interface GeometryEntity {
  lat: number;
  lon: number;
}

export interface Tags {
  "addr:city"?: string | null;
  "addr:housenumber"?: string | null;
  "addr:postcode"?: string | null;
  "addr:state"?: string | null;
  "addr:street"?: string | null;
  "addr:street:name"?: string | null;
  "addr:street:prefix"?: string | null;
  "addr:street:type"?: string | null;
  building?: string | null;
  "building:levels"?: string | null;
  "chicago:building_id"?: string | null;
  leisure: string;
  name?: string | null;
  operator?: string | null;
  "operator:type"?: string | null;
  ref?: string | null;
  start_date?: string | null;
  sport?: string | null;
  surface?: string | null;
  barrier?: string | null;
  source?: string | null;
  type?: string | null;
}

export interface MembersEntity {
  type: string;
  ref: number;
  role: string;
  geometry?: GeometryEntity[] | null;
}

export interface VenueDetails {
  id: number;
  name: string;
  address_city: string;
  address_housenumber: string;
  address_postcode: string;
  address_state: string;
  address_street: string;
  availableSlots: VenueAvailableSlots[];
}

export interface VenueAvailableSlots {
  id: number;
  startTime: string;
  endTime: string;
}

export interface LocationDetails {
  latitude: number;
  longitude: number;
}
