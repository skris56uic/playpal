import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { getVenueDetails, updateBooking } from "../apis";
import { TimeSlot, Venue } from "../apis/interfaces";
import BookingSnackbar from "./BookingSnackBar";
import Spinner from "./Spinner";

const defaultSlot: TimeSlot = {
  id: "",
  startTime: "",
  endTime: "",
  price: 0,
  isBooked: false,
};

const VenueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>(defaultSlot);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleSlotChange = (event: SelectChangeEvent<string | number>) => {
    const slotId = event.target.value as string;
    const slot =
      venue?.availableSlots
        .find((slot) => slot.date === selectedDate)
        ?.timeSlots.find((slot) => slot.id === slotId) || defaultSlot;
    setSelectedSlot(slot);
  };

  const handleBookingConfirm = async () => {
    if (selectedSlot.id) {
      await updateBooking(selectedSlot.id, true);
      console.log(`Booking confirmed for slot ID: ${selectedSlot.id}`);
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      const message = `Booking confirmed for ${venue?.name} on ${formattedDate} from ${selectedSlot.startTime} to ${selectedSlot.endTime}. Redirecting to Home page`;
      setSnackbarMessage(message);
      setSnackbarOpen(true);
      setTimeout(() => navigate("/venues"), 2000);
    } else {
      console.log("Please select a time slot");
    }
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

  const handleDateChange = (event: SelectChangeEvent<string>) => {
    setSelectedDate(event.target.value);
    setSelectedSlot(defaultSlot); // Reset selected slot when date changes
  };

  const availableSlotsForSelectedDate = venue?.availableSlots.find(
    (slot) => slot.date === selectedDate
  );

  const availableDates = venue?.availableSlots.filter((slot) =>
    slot.timeSlots.some((s) => !s.isBooked)
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
          image="/assets/picture.jpg"
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
            Facilities: {venue.facilities}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Amenities: {venue.amenities.join(", ")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Price:{" "}
            <strong>${venue.availableSlots[0].timeSlots[0].price}</strong>
          </Typography>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="date-label">Select Date</InputLabel>
            <Select
              labelId="date-label"
              value={selectedDate}
              label="Select Date"
              onChange={handleDateChange}
            >
              {availableDates && availableDates.length > 0 ? (
                availableDates.map((slot) => (
                  <MenuItem key={slot.date} value={slot.date}>
                    {new Date(slot.date).toDateString()}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No slots available</MenuItem>
              )}
            </Select>
          </FormControl>

          {selectedDate && availableSlotsForSelectedDate && (
            <FormControl fullWidth sx={{ mt: 3 }}>
              <InputLabel id="time-slot-label">Select Time Slot</InputLabel>
              <Select
                labelId="time-slot-label"
                value={selectedSlot.id}
                label="Select Time Slot"
                onChange={handleSlotChange}
              >
                {availableSlotsForSelectedDate.timeSlots.map((slot) =>
                  slot.isBooked ? null : (
                    <MenuItem key={slot.id} value={slot.id}>
                      {slot.startTime} - {slot.endTime}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
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
