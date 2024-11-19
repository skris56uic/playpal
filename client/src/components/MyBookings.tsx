import { useEffect, useState, useContext } from "react";
import { Venue } from "../apis/interfaces";
import { getBookedVenues, updateBooking } from "../apis";
import { Box, Button, Typography } from "@mui/material";
import Spinner from "./Spinner";
import BookingSnackbar from "./BookingSnackBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const MyBookings: React.FC = () => {
  const [bookedVenues, setBookedVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBookedVenues = async () => {
      try {
        setLoading(true);
        const response: Venue[] = await getBookedVenues();
        setBookedVenues(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked venues:", error);
        setLoading(false);
      }
    };
    fetchBookedVenues();
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleCancelBooking = async (slotId: string) => {
    try {
      await updateBooking(slotId, false);
      setSnackbarMessage("Booking cancelled successfully");
      setSnackbarOpen(true);
      setLoading(true);
      const response: Venue[] = await getBookedVenues();
      if (response.length === 0) {
        navigate("/venues");
      }
      setBookedVenues(response);
      setLoading(false);
    } catch (error) {
      console.error("Error canceling booking:", error);
      setSnackbarMessage("Error canceling booking");
      setSnackbarOpen(true);
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {bookedVenues.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No Booking Present, kindly make a booking to be viewed here.
        </Typography>
      ) : (
        bookedVenues.map((venue) => (
          <Box
            key={venue.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h5" component="div">
              {venue.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {venue.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Facilities: {venue.facilities}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amenities: {venue.amenities.join(", ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Booked Slots:
            </Typography>
            {venue.availableSlots.map((slot) =>
              slot.timeSlots.map((timeSlot) => (
                <Box
                  key={timeSlot.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {new Date(slot.date).toDateString()} - {timeSlot.startTime}{" "}
                    to {timeSlot.endTime}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleCancelBooking(timeSlot.id)}
                  >
                    Cancel
                  </Button>
                </Box>
              ))
            )}
          </Box>
        ))
      )}
      <BookingSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default MyBookings;
