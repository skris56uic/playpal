import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  SelectChangeEvent,
  Link,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { getVenueDetails, updateBooking } from "../apis";
import { SportType, TimeSlot, Venue } from "../apis/interfaces";
import BookingSnackbar from "./BookingSnackBar";
import Spinner from "./Spinner";
import { UserContext } from "./UserContext";
import { calculateAveragePrice } from "../utils/getAveragePrice";
import { capitalizeFirstLetter } from "../utils/getSportsName";

const defaultSlot: TimeSlot = {
  id: "",
  startTime: "",
  endTime: "",
  price: 0,
  isBooked: false,
  totalPlayers: 0,
  playersJoined: [],
};

const VenueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedSport, setSelectedSport] = useState<SportType | "">("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(defaultSlot);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [joinOrCreate, setJoinOrCreate] = useState<string>("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        if (id) {
          setLoading(true);
          const response = await getVenueDetails(id);
          setVenue(response);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSportChange = (event: SelectChangeEvent<string>) => {
    setSelectedSport(event.target.value as SportType);
    setSelectedDate("");
    setSelectedSlot(defaultSlot);
    setJoinOrCreate("");
  };

  const handleDateChange = (event: SelectChangeEvent<string>) => {
    setSelectedDate(event.target.value);
    setSelectedSlot(defaultSlot); // Reset selected slot when date changes
  };

  const handleSlotChange = (event: SelectChangeEvent<string | number>) => {
    const slotId = event.target.value as string;
    const slot =
      venue?.sports
        .find((sport) => sport.type === selectedSport)
        ?.availableSlots.find((slot) => slot.date === selectedDate)
        ?.timeSlots.find((slot) => slot.id === slotId) || defaultSlot;
    setSelectedSlot(slot);
  };

  const handleBookingConfirm = async () => {
    if (selectedSlot.id) {
      if (selectedSlot.playersJoined.length >= selectedSlot.totalPlayers) {
        setSnackbarMessage("Cannot book slot, player limit reached.");
        setSnackbarOpen(true);
        return;
      }
      await updateBooking(selectedSlot.id, true);
      console.log(`Booking confirmed for slot ID: ${selectedSlot.id}`);
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      const message = `Booking confirmed for ${
        venue?.name
      } (${capitalizeFirstLetter(selectedSport)}) on ${formattedDate} from ${
        selectedSlot.startTime
      } to ${selectedSlot.endTime}. Redirecting to Home page`;
      setSnackbarMessage(message);
      setSnackbarOpen(true);
      setTimeout(() => navigate("/venues"), 2000);
    } else {
      console.log("Please select a time slot");
    }
  };

  const handleJoinOrCreateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJoinOrCreate(event.target.value);
    setSelectedDate(""); // Reset date option when toggling the radio button
    setSelectedSlot(defaultSlot); // Reset selected slot when toggling the radio button
  };

  const handleSnackbarClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const availableSlotsForSelectedDate = venue?.sports
    .find((sport) => sport.type === selectedSport)
    ?.availableSlots.find((slot) => slot.date === selectedDate);

  const availableDates = venue?.sports
    .find((sport) => sport.type === selectedSport)
    ?.availableSlots.filter((slot) => slot.timeSlots.some((s) => !s.isBooked));

  const availableDatesForJoining = venue?.sports
    .find((sport) => sport.type === selectedSport)
    ?.availableSlots.filter((slot) =>
      slot.timeSlots.some(
        (s) =>
          s.isBooked &&
          s.playersJoined.length < s.totalPlayers &&
          !s.playersJoined.includes(user?._id || "")
      )
    );

  const availableSlotsForJoining = venue?.sports
    .find((sport) => sport.type === selectedSport)
    ?.availableSlots.find((slot) => slot.date === selectedDate)
    ?.timeSlots.filter(
      (slot) =>
        slot.isBooked &&
        slot.playersJoined.length < slot.totalPlayers &&
        !slot.playersJoined.includes(user?._id || "")
    );

  if (loading) {
    return <Spinner />;
  }

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card sx={{ maxWidth: 800, margin: "auto", mt: 5 }}>
        <CardMedia
          component="img"
          height="300"
          image="/picture.jpg"
          alt={venue.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {venue.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location:{" "}
            <Link
              href={`https://www.google.com/maps/search/${encodeURIComponent(
                venue.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {venue.location}
            </Link>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Contact Information: {venue.contactInfo.name},{" "}
            {venue.contactInfo.phoneNumber}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Amenities: {venue.amenities.join(", ")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Average Price: <strong>{calculateAveragePrice(venue)}</strong>
          </Typography>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="sport-label">Select Sport Type</InputLabel>
            <Select
              labelId="sport-label"
              value={selectedSport}
              label="Select Sport"
              onChange={handleSportChange}
            >
              {venue.sports.map((sport) => (
                <MenuItem key={sport.type} value={sport.type}>
                  {sport.type.charAt(0).toUpperCase() + sport.type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedSport && (
            <>
              <FormControl component="fieldset" sx={{ mt: 3 }}>
                <RadioGroup
                  row
                  value={joinOrCreate}
                  onChange={handleJoinOrCreateChange}
                >
                  <FormControlLabel
                    value="join"
                    control={<Radio />}
                    label="Join Existing Game"
                  />
                  <FormControlLabel
                    value="create"
                    control={<Radio />}
                    label="Create New Game"
                  />
                </RadioGroup>
              </FormControl>

              {joinOrCreate && (
                <>
                  {joinOrCreate === "join" &&
                  availableSlotsForJoining?.length === 0 ? (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ mt: 3 }}
                    >
                      No games ongoing, create one if you like.
                    </Typography>
                  ) : (
                    <>
                      <FormControl fullWidth sx={{ mt: 3 }}>
                        <InputLabel id="date-label">Select Date</InputLabel>
                        <Select
                          labelId="date-label"
                          value={selectedDate}
                          label="Select Date"
                          onChange={handleDateChange}
                        >
                          {joinOrCreate === "join" ? (
                            (availableDatesForJoining?.length ?? 0) > 0 ? (
                              availableDatesForJoining?.map((slot) => (
                                <MenuItem key={slot.date} value={slot.date}>
                                  {new Date(slot.date).toDateString()}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem value="">
                                No games available to join
                              </MenuItem>
                            )
                          ) : (
                            availableDates?.map((slot) => (
                              <MenuItem key={slot.date} value={slot.date}>
                                {new Date(slot.date).toDateString()}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>

                      {selectedDate && availableSlotsForSelectedDate && (
                        <FormControl fullWidth sx={{ mt: 3 }}>
                          <InputLabel id="time-slot-label">
                            Select Time Slot
                          </InputLabel>
                          <Select
                            labelId="time-slot-label"
                            value={selectedSlot.id}
                            label="Select Time Slot"
                            onChange={handleSlotChange}
                          >
                            {joinOrCreate === "join"
                              ? availableSlotsForJoining?.map((slot) => (
                                  <MenuItem key={slot.id} value={slot.id}>
                                    {slot.startTime} - {slot.endTime} (
                                    {slot.totalPlayers -
                                      slot.playersJoined.length}{" "}
                                    players left)
                                  </MenuItem>
                                ))
                              : availableSlotsForSelectedDate?.timeSlots.map(
                                  (slot) =>
                                    !slot.isBooked && (
                                      <MenuItem key={slot.id} value={slot.id}>
                                        {slot.startTime} - {slot.endTime}
                                      </MenuItem>
                                    )
                                )}
                          </Select>
                        </FormControl>
                      )}
                    </>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    disabled={!selectedDate || !selectedSlot.id}
                    onClick={handleBookingConfirm}
                  >
                    Confirm Booking
                  </Button>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <BookingSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default VenueDetails;
