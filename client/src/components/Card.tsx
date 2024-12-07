import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";
import { Sport } from "../apis/interfaces";
import { capitalizeFirstLetter } from "../utils/getSportsName";
import { getSportImage } from "../utils/getSportImage";

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

  const sportImage = getSportImage(sports);

  return (
    <Card
      sx={{ width: "calc(33.33% - 16px)", marginBottom: 2 }}
      onClick={handleClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={sportImage}
          alt={`/${sports[0].type} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Address: {location} <br />
            <br />
            Sports Available:{" "}
            {sports
              .map((sport) => capitalizeFirstLetter(sport.type))
              .join(", ")}
            <br />
            <br />
            Amenities {amenities}
            <br />
            <br />
            Average Price: {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
