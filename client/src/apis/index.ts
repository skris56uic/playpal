import { User } from "../components/UserContext";
import { Venue, LocationDetails, PlaceLocation } from "./interfaces";

// const baseUrl = "https://playpal-backend-0saw.onrender.com";
const baseUrl = "http://localhost:3000";

export async function getVenueList(
  location: LocationDetails
): Promise<Venue[]> {
  const url = `${baseUrl}/venues?latitude=${location.latitude}&longitude=${location.longitude}`;
  const request: Request = new Request(url, {
    method: "GET",
    credentials: "include",
  });
  try {
    const response = await fetch(request);
    const data: PlaceLocation = await response.json();
    console.log("Data fetched from the server:", data);
    return new Promise((res, _) => res(data.venues));
  } catch (error) {
    console.error("Error fetching data from Overpass API:", error);
    return new Promise((_, rej) =>
      rej({ error: "Error fetching data from Overpass API" })
    );
  }
}

export async function getVenueDetails(id: string): Promise<Venue> {
  const url = `${baseUrl}/venue/${id}`;
  const request: Request = new Request(url, {
    method: "GET",
    credentials: "include",
  });
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
  const url = `${baseUrl}/my-bookings`;
  const request: Request = new Request(url, {
    method: "GET",
    credentials: "include",
  });
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
  const url = `${baseUrl}/book-slot?slotId=${slotId}&book=${book}`;
  const request: Request = new Request(url, {
    method: "GET",
    credentials: "include",
  });
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

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<void> {
  const url = `${baseUrl}/register`;
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error(data.message || "Registration failed!"));
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(
      new Error("An error occurred. Please try again later.")
    );
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  const url = `${baseUrl}/login`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(url, requestOptions);
    const userDocument = await response.json();

    if (response.ok) {
      return userDocument;
    } else {
      throw new Error(userDocument.message || "Login failed!");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("An error occurred. Please try again later.");
  }
}

export async function logoutUser(): Promise<void> {
  const url = `${baseUrl}/logout`;

  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Logout failed!"));
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(
      new Error("An error occurred. Please try again later.")
    );
  }
}
