import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useNavigate } from "react-router-dom";

export interface ActionAreaCardProps {
  id: string;
  name: string;
  location: string;
  amenities: string;
  price: number;
}

export default function ActionAreaCard({
  id,
  name,
  location,
  amenities,
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
          image="/assets/picture.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Address: {location} <br />
            Amenities {amenities}
            <br />
            Price: {price}
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
