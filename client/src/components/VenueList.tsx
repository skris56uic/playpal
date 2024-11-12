import { useEffect, useState } from "react";
import { Venue, LocationDetails, Country } from "../apis/interfaces";
import { getVenueList } from "../apis";
import ActionAreaCard from "./Card";
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Divider,
	Stack,
	SelectChangeEvent,
	Button,
	Typography,
	Box,
} from "@mui/material";
import Spinner from "./Spinner";

// import data from "../data/data.json";\
import data from "../data/united_states.json";

export function VenueList() {
	const [venueList, setVenueList] = useState<Venue[]>([]);
	const [location, setLocation] = useState<LocationDetails>({
		latitude: 0,
		longitude: 0,
		radius: 100000,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [country, setCountry] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [message, setMessage] = useState<string>(
		"Please search for a Country, State, and City to see the list of venues."
	);
	const [countryTouched, setCountryTouched] = useState<boolean>(false);
	const [stateTouched, setStateTouched] = useState<boolean>(false);
	const [cityTouched, setCityTouched] = useState<boolean>(false);

	const countries: Country[] = data;

	const handleCountryChange = (e: SelectChangeEvent<string>) => {
		setCountry(e.target.value);
		setState("");
		setCity("");
		setMessage("");
		setCountryTouched(true);
	};

	const handleStateChange = (e: SelectChangeEvent<string>) => {
		setState(e.target.value);
		setCity("");
		setMessage("");
		setStateTouched(true);
	};

	const handleCityChange = (e: SelectChangeEvent<string>) => {
		setCity(e.target.value);
		setMessage("");
		setCityTouched(true);
	};

	function generate_country_options(countries: Country[]): JSX.Element[] {
		let options = [];
		for (let i = 0; i < countries.length; i++) {
			options.push(
				<MenuItem key={countries[i].name} value={countries[i].name}>
					{countries[i].name}
				</MenuItem>
			);
		}
		return options;
	}

	function generate_state_options(
		countries: Country[],
		country: string
	): JSX.Element[] {
		let options = [];
		for (let i = 0; i < countries.length; i++) {
			if (countries[i].name === country) {
				for (let j = 0; j < countries[i].states.length; j++) {
					options.push(
						<MenuItem
							key={countries[i].states[j].name}
							value={countries[i].states[j].name}
						>
							{countries[i].states[j].name}
						</MenuItem>
					);
				}
			}
		}
		return options;
	}

	function generate_city_options(
		countries: Country[],
		country: string,
		state: string
	): JSX.Element[] {
		let options = [];
		for (let i = 0; i < countries.length; i++) {
			if (countries[i].name === country) {
				for (let j = 0; j < countries[i].states.length; j++) {
					if (countries[i].states[j].name === state) {
						for (
							let k = 0;
							k < countries[i].states[j].cities.length;
							k++
						) {
							options.push(
								<MenuItem
									key={countries[i].states[j].cities[k].name}
									value={
										countries[i].states[j].cities[k].name
									}
								>
									{countries[i].states[j].cities[k].name}
								</MenuItem>
							);
						}
					}
				}
			}
		}
		return options;
	}

	function handleSearch(e: React.MouseEvent<HTMLButtonElement>): void {
		e.preventDefault();
		setCountryTouched(true);
		setStateTouched(true);
		setCityTouched(true);

		if (!country || !state || !city) {
			setMessage("Please select a Country, State, and City.");
			return;
		}

		setMessage(`${country}, ${state}, ${city}`);

		for (let i = 0; i < countries.length; i++) {
			if (countries[i].name === country) {
				for (let j = 0; j < countries[i].states.length; j++) {
					if (countries[i].states[j].name === state) {
						for (
							let k = 0;
							k < countries[i].states[j].cities.length;
							k++
						) {
							if (
								countries[i].states[j].cities[k].name === city
							) {
								setLocation({
									latitude: parseFloat(
										countries[i].states[j].cities[k]
											.latitude
									),
									longitude: parseFloat(
										countries[i].states[j].cities[k]
											.longitude
									),
									radius: 100000,
								});
							}
						}
					}
				}
			}
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			if (location.latitude !== 0 && location.longitude !== 0) {
				try {
					setLoading(true);
					const response = await getVenueList(location);
					if (response.length === 0) {
						setMessage("No venues found in this location.");
					} else {
						setMessage("");
						setVenueList(response);
					}
					setLoading(false);
				} catch (error) {
					console.error("Error fetching venue list:", error);
					setLoading(false);
				}
			}
		};
		fetchData();
	}, [location]);

	return (
		<>
			<Box mb={2} display="flex" flexDirection="row" gap={2}>
				<FormControl
					sx={{ width: 400 }}
					required
					error={countryTouched && !country}
				>
					<InputLabel id="country-label">Country</InputLabel>
					<Select
						labelId="country-label"
						value={country}
						label="Country"
						onChange={(e) => handleCountryChange(e)}
						required
					>
						<MenuItem value="">
							<em>Select Country</em>
						</MenuItem>
						{generate_country_options(countries)}
					</Select>
				</FormControl>

				{country && (
					<FormControl
						sx={{ width: 400 }}
						required
						error={stateTouched && !state}
					>
						<InputLabel id="state-label">State</InputLabel>
						<Select
							labelId="state-label"
							value={state}
							label="State"
							onChange={(e) => handleStateChange(e)}
							required
						>
							<MenuItem value="">
								<em>Select State</em>
							</MenuItem>
							{generate_state_options(countries, country)}
						</Select>
					</FormControl>
				)}

				{country && state && (
					<FormControl
						sx={{ width: 400 }}
						required
						error={cityTouched && !city}
					>
						<InputLabel id="city-label">City</InputLabel>
						<Select
							labelId="city-label"
							value={city}
							label="City"
							onChange={(e) => handleCityChange(e)}
							required
						>
							<MenuItem value="">
								<em>Select City</em>
							</MenuItem>
							{generate_city_options(countries, country, state)}
						</Select>
					</FormControl>
				)}
			</Box>

			<Box mb={2}>
				<Button
					variant="contained"
					color="primary"
					onClick={(e) => handleSearch(e)}
					type="button"
				>
					Search
				</Button>
			</Box>

			<Box mb={2}>
				{message && (
					<Typography variant="body1" color="textSecondary">
						{message}
					</Typography>
				)}
			</Box>

			{loading ? (
				<Spinner />
			) : (
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
			)}
		</>
	);
}
