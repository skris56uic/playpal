import { ReactNode, useEffect, useState } from "react";
import {
  Venue,
  LocationDetails,
  Country,
  State,
  City,
} from "../apis/interfaces";
import { getVenueList } from "../apis";
import ActionAreaCard from "./Card";
import {
  Divider,
  FormControl,
  Select,
  Stack,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
} from "@mui/material";
import Spinner from "./Spinner";
import countriesJSON from "../countries_data/united_states.json";

export function VenueList() {
  const [venueList, setVenueList] = useState<Venue[]>([]);
  const [location, setLocation] = useState<LocationDetails>({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const handleCountryChange = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ) => {
    const country = countriesJSON.find(
      (c: Country) => c.name === event.target.value
    );
    setSelectedCountry(event.target.value as string);
    setSelectedState("");
    setSelectedCity("");
    setStates(country ? country.states : []);
    setCities([]);
  };

  const handleStateChange = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ) => {
    const state = states.find((s: State) => s.name === event.target.value);
    setSelectedState(event.target.value as string);
    setSelectedCity("");
    setCities(state ? state.cities : []);
  };

  const handleCityChange = (event: SelectChangeEvent<string>, _: ReactNode) => {
    const city = cities.find((c: City) => c.name === event.target.value);
    setSelectedCity(event.target.value as string);
    if (city) {
      setLocation({
        latitude: parseFloat(city.latitude),
        longitude: parseFloat(city.longitude),
      });
    }
  };

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
    return (
      <Spinner message="Loading Venues. Initially it might take upto 2 minutes. Please bear with us" />
    );
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
