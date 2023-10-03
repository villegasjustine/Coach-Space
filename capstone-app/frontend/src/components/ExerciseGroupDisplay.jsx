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
import {Button} from '@mui/material';

export default function ExerciseGroupDisplay() {
  const { currentUser } = useUserContext();
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [points, setPoints] = useState([]);

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


  useEffect(() => {
    axios.get(`http://localhost:8080/api/assignedexercises/user/weekly/${currentUser.id}`)
      .then((response) => {
        setAssignedExercises(response.data.data);
        console.log("Data fetched", response.data.data)
      // console.log(assignedExercises)
      })
      .catch((error) => {
        console.error('Error fetching assigned exercises:', error);
      });
  }, []);


  // useEffect(() => {
  //   const exerciseIds = assignedExercises.map((assignedExercise) => assignedExercise.ExerciseId);


  //   axios.get(`http://localhost:8080/api/exercises/`)
  //     .then((response) => {
  //       const userExercises = (response.data.data.filter((exercise) => exerciseIds.includes(exercise.id)))
  //       setExerciseData(userExercises);
  //       console.log(response.data.data)
  //       console.log(exerciseData)
  //       console.log(exerciseIds)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching exercise data:', error);
  //     });
  // }, [assignedExercises]);


  // useEffect(() => {
  //   axios.get(`http://localhost:8080/api/points/user/weekly/${currentUser.id}`)
  //     .then((response) => {
  //       setPoints(response.data.data);
  //       console.log("Points data fetched", response.data.data)
  //        console.log(points)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching points:', error);
  //     });
  // }, []);

  const handlePoints = async(id) => {
    let data = await axios.get(`http://localhost:8080/api/assignedexercises/${id}`)
    console.log(data.data.data.totalPoints)
    let currentPoints = data.data.data.totalPoints
    let updatedPoints = currentPoints += 10

    console.log("current points", currentPoints)
    axios.put(`http://localhost:8080/api/assignedexercises/${id}`,
        {"totalPoints": updatedPoints}

    )

 
  }



  return (
    <div>
      
      <ul>
       
        {assignedExercises.length >  0 ?  (assignedExercises.map((exercise) => (
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
              <Button  onClick={() => handlePoints(exercise.id)}>points</Button>
              <Typography>{exercise.category}</Typography>
              <Typography>{exercise.name}</Typography>
            </CardContent>
            <CardActions onClick={handleExpandClick}>
              <ExpandMore
               expand={expanded}
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
         )  :( <h2>Exercises not yet assigned.</h2>
          
        )}
      
      </ul>
    </div>
  );
}
