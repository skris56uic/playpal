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

// export type Data = Country[];

// export interface Country {
// 	name: string;
// 	latitude: string;
// 	longitude: string;
// 	states: State[];
// }

// export interface State {
// 	name: string;
// 	latitude: string;
// 	longitude: string;
// 	cities: City[];
// }

// export interface City {
// 	name: string;
// 	latitude: string;
// 	longitude: string;
// }

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
