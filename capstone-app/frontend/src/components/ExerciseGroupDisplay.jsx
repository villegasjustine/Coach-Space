import axios from 'axios';

import { useUserContext } from "../context/UserContext";
import { useState, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardContent, Typography, IconButton, Grid } from '@mui/material';
import Collapse from "@mui/material/Collapse";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

export default function ExerciseGroupDisplay() {
  const { currentUser } = useUserContext();
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showDescription, setShowDescription] = useState({});
  

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

  const handlePoints = () => {

  }

  useEffect(() => {
    axios.get(`http://localhost:8080/api/assignedexercises/user/weekly/${currentUser.id}`)
      .then((response) => {
        setAssignedExercises(response.data.data);
        console.log("Data fetched", response.data.data)
      console.log(assignedExercises)
      })
      .catch((error) => {
        console.error('Error fetching assigned exercises:', error);
      });
  }, []);



  useEffect(() => {
    const exerciseIds = assignedExercises.map((assignedExercise) => assignedExercise.ExerciseId);


    axios.get(`http://localhost:8080/api/exercises/`)
      .then((response) => {
        const userExercises = (response.data.data.filter((exercise) => exerciseIds.includes(exercise.id)))
        setExerciseData(userExercises);
        console.log(response.data.data)
        console.log(exerciseData)
        console.log(exerciseIds)
      })
      .catch((error) => {
        console.error('Error fetching exercise data:', error);
      });
  }, [assignedExercises]);


  return (
    <div>
      
      <ul>
       
        {exerciseData.length >  0 ?  (exerciseData.map((exercise) => (
           <Grid>
           <Card 
           key={exercise.id} 
           variant="outlined"
           sx={{
            display:"flex",
            alignItems: "center",
            border: "3px solid",
            color: "grey.800",
          }} >
            <CardContent>
              <Typography>{exercise.category}</Typography>
              <Typography>{exercise.name}</Typography>
            </CardContent>
            <CardActions>
              <ExpandMore
               expand={expanded}
               onClick={handleExpandClick}
               aria-expanded={expanded}
               aria-label="show more" >
                <ExpandMoreIcon/>
               </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>{exercise.description}</CardContent>
                </Collapse>

           </Card>
           </Grid>
        ))
         )  :( <h2>Exercises not assigned yet.</h2>
          
        )}
      
      </ul>
    </div>
  );
}
