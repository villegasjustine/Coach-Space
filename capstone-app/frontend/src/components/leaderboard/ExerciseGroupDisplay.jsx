import axios from "axios";

import { useUserContext } from "../../context/UserContext";
import { useState, useEffect } from "react";
import ExerciseCard from "../exercises/ExerciseCard";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardContent, Typography, IconButton, Grid } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";


export default function ExerciseGroupDisplay({onPointsUpdate, handleRefresh, setHandleRefresh}) {
  const { currentUser } = useUserContext();
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [expanded, setExpanded] = useState(false);
 


  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/assignedexercises/user/weekly/${currentUser.id}`
      )
      .then((response) => {
        setAssignedExercises(response.data.data);
       
        console.log("Data fetched", response.data.data);
        // console.log(assignedExercises)
      })
      .catch((error) => {
        console.error("Error fetching assigned exercises:", error);
      });
  }, []);


  const handlePoints = async (id) => {

    let data = await axios.get(
      `http://localhost:8080/api/assignedexercises/${id}`
    );
    console.log(data.data.data.totalPoints);
    let currentPoints = data.data.data.totalPoints;
    let updatedPoints = (currentPoints += 10);

    console.log("current points", currentPoints);
    axios.put(`http://localhost:8080/api/assignedexercises/${id}`, {
      totalPoints: updatedPoints,
    });

    onPointsUpdate();
    setHandleRefresh(!handleRefresh)

  };

  return (
    <div>
      <ul>
        {assignedExercises.length > 0 ? (
          assignedExercises.map((exercise) => (
            <Grid>
              <Card
                key={exercise.id}
                variant="outlined"
                sx={{
                  // display: "flex",
                  alignItems: "center",
                  border: "3px solid",
                  color: "grey.800",
                  maxWidth: 500,
                }}
              >
                <Typography letterSpacing='3' variant="caption">{exercise.category}</Typography>
                <CardContent>
                <Button 
                onClick={() => handlePoints(exercise.id)}
                key={exercise.id}
                variant="outlined"
                sx={{
                  maxWidth: 200,
                  minWidth: 200,
                  alignItems: "left",
                  border: "3px solid",
                  color: "grey.800",
                }}>
                  <Typography>{exercise.name}</Typography>
                </Button>

                
                </CardContent>
                <CardActions onClick={handleExpandClick}>
                  <ExpandMore
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>{exercise.description}</CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))
        ) : (
          <h2>Exercises not yet assigned.</h2>
        )}
      </ul>
    </div>
  );
}
