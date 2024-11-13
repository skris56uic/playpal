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
import countriesJSON from "../../assets/united_states.json";

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
  }, [location, selectedCity]);

  return (
    <Stack spacing={2}>
      <Typography variant="h6" align="center">
        Select Country, State and City to Search for Venues
      </Typography>
      <Stack direction="row" spacing={2}>
        <FormControl variant="outlined" fullWidth disabled={loading}>
          <InputLabel>Country</InputLabel>
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            label="Country"
          >
            {countriesJSON.map((country: Country) => (
              <MenuItem key={country.name} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          fullWidth
          disabled={!selectedCountry || loading}
        >
          <InputLabel>State</InputLabel>
          <Select
            value={selectedState}
            onChange={handleStateChange}
            label="State"
          >
            {states.map((state: State) => (
              <MenuItem key={state.name} value={state.name}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          fullWidth
          disabled={!selectedState || loading}
        >
          <InputLabel>City</InputLabel>
          <Select value={selectedCity} onChange={handleCityChange} label="City">
            {cities.map((city: City) => (
              <MenuItem key={city.name} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      {loading && selectedCity ? (
        <Spinner message="Loading venues... Time to stretch your legs or do a little dance!" />
      ) : selectedCity && venueList.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="body1" align="center">
            No venues available. Looks like the party moved elsewhere! Try
            selecting another place.
          </Typography>
        </Box>
      ) : (
        venueList.map((x, i) => (
          <ActionAreaCard
            key={i}
            id={x.id}
            name={x.name}
            location={x.location}
            amenities={x.amenities.join(", ")}
            price={x.availableSlots[0].timeSlots[0].price}
          />
        ))
      )}
      <Divider />
    </Stack>
  );
}
