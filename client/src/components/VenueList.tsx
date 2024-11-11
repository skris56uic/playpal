import { useEffect, useState } from "react";
import { Venue, LocationDetails } from "../apis/interfaces";
import { getVenueList } from "../apis";
import ActionAreaCard from "./Card";
import { Divider, Stack } from "@mui/material";
import Spinner from "./Spinner";

export function VenueList() {
  const [venueList, setVenueList] = useState<Venue[]>([]);
  const [location, setLocation] = useState<LocationDetails>({
    latitude: 0,
    longitude: 0,
    radius: 10000,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserUserLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          radius: 100000,
        });
      });
    };
    getUserUserLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location.latitude !== 0 && location.longitude !== 0) {
        try {
          setLoading(true);
          const response = await getVenueList(location);
          setVenueList(response);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching venue list:", error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [location]);

  if (loading) {
    return <Spinner message="Loading Venues. Initially it might take upto 2 minutes. Please bear with us" />;
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      {venueList.map((x, i) => (
        <ActionAreaCard
          key={i}
          id={x.id}
          name={x.name}
          location={x.location}
          amenities={x.amenities.join(", ")}
          price={x.availableSlots[0].timeSlots[0].price}
        />
      ))}
    </Stack>
  );
}
