import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { registerUser } from "../apis";
import BookingSnackbar from "./BookingSnackBar";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await registerUser(name, email, password);
      setSnackbarMessage(
        "Registration successful!, Hold on while we redirect you."
      );
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setSnackbarMessage("Registration failed. Please try again.");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Registration failed. Please try again.");
        setSnackbarOpen(true);
      }
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

  return (
    <Grid
      container
      component="main"
      sx={{
        margin: 0,
        height: "100vh",
        background: "#f0f4f8",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <PersonIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{
                  textTransform: "none",
                  padding: 0,
                  minWidth: "auto",
                  textDecoration: "underline",
                  lineHeight: "inherit",
                  verticalAlign: "middle",
                }}
              >
                Log in
              </Button>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <BookingSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Grid>
  );
}
