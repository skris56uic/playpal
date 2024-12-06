import { useEffect, useState, useContext } from "react";
import { Venue } from "../apis/interfaces";
import { getBookedVenues, updateBooking } from "../apis";
import { Box, Button, Typography } from "@mui/material";
import Spinner from "./Spinner";
import BookingSnackbar from "./BookingSnackBar";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

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
  }, [user, navigate]);

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
        mt: 13,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 0,
      }}
    >
      {bookedVenues.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No Booking Present, kindly make a booking to be viewed here.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            padding: "16px",
          }}
        >
          {bookedVenues.map((venue) => (
            <Box
              key={venue.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "calc(33.33% - 16px)",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#f9f9f9",
                boxSizing: "border-box",
                gap: "8px",
              }}
            >
              <Typography variant="h5" component="div">
                {venue.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {venue.location}
                <br />
                <br />
                Amenities: {venue.amenities.join(", ")}
                <br />
                <br />
                Booked Slots:
              </Typography>
              {venue.sports.map((sport) =>
                sport.availableSlots.map((slot) =>
                  slot.timeSlots.map((timeSlot) =>
                    timeSlot.playersJoined.includes(user?._id || "") ? (
                      <Box
                        key={timeSlot.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid #ccc",
                          padding: "16px",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Sport:{" "}
                          {sport.type.charAt(0).toUpperCase() +
                            sport.type.slice(1)}{" "}
                          <br />
                          Date: {new Date(slot.date).toDateString()}
                          <br />
                          Time: {timeSlot.startTime} to {timeSlot.endTime}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCancelBooking(timeSlot.id)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    ) : null
                  )
                )
              )}
            </Box>
          ))}
        </Box>
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
