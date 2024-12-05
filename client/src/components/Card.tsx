import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { Sport } from "../apis/interfaces";
import { capitalizeFirstLetter } from "../utils/getSportsName";

export interface ActionAreaCardProps {
  id: string;
  name: string;
  location: string;
  amenities: string;
  sports: Sport[];
  price: string;
}

export default function ActionAreaCard({
  id,
  name,
  location,
  amenities,
  sports,
  price,
}: ActionAreaCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Card clicked", id);
    navigate(`/venue/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 2000 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/picture.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Address: {location} <br />
            Sports Available:{" "}
            {sports
              .map((sport) => capitalizeFirstLetter(sport.type))
              .join(", ")}
            <br />
            Amenities {amenities}
            <br />
            Average Price: {price}
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
