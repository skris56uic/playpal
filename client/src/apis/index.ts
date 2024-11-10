import { Venue, LocationDetails } from "./interfaces";

export async function getVenueList(
  location: LocationDetails
): Promise<Venue[]> {
  const url = `http://localhost:3000/venues?latitude=${location.latitude}&longitude=${location.longitude}&radius=${location.radius}`;
  const request: Request = new Request(url);
  try {
    const response = await fetch(request);
    const data: Venue[] = await response.json();
    console.log("Data fetched from the server:", data);
    return new Promise((res, _) => res(data));
  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    return new Promise((_, rej) =>
      rej({ error: "Error fetching data from Overpass API" })
    );
  }
}

export async function getVenueDetails(id: string): Promise<Venue> {
  const url = `http://localhost:3000/venue/${id}`;
  const request: Request = new Request(url);
  try {
    const response = await fetch(request);
    const data: Venue = await response.json();
    console.log("Data fetched from the server Venue Details:", data);
    return new Promise((res, _) => res(data));
  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    return new Promise((_, rej) =>
      rej({ error: "Error fetching data from Overpass API" })
    );
  }
}

export async function getBookedVenues(): Promise<Venue[]> {
  const url = `http://localhost:3000/my-bookings`;
  const request: Request = new Request(url);
  try {
    const response = await fetch(request);
    const data: Venue[] = await response.json();
    console.log("Data fetched from the server Bookings:", data);
    return new Promise((res, _) => res(data));
  } catch (error) {
    console.error("Error fetching booked venues:", error);
    return new Promise((_, rej) =>
      rej({ error: "Error fetching booked venues" })
    );
  }
}

export async function updateBooking(
  slotId: string,
  book: boolean
): Promise<void> {
  const url = `http://localhost:3000/book-slot?slotId=${slotId}&book=${book}`;
  const request: Request = new Request(url);
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error("Error updating booking");
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
}
