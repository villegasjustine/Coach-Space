import axios from "axios";
import { useState, useEffect } from "react";
import IconChipsTest from "./IconChipsTest";
import ExerciseUserGrid from "./ExerciseUserGrid";
import { DatePicker } from "@mui/x-date-pickers";
import { Container, Typography, Card, CardContent } from "@mui/material";
import ExerciseGridSelect from "./ExerciseGridSelect";
import { useUserContext } from "../context/UserContext";


export default function AssignExercise() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedDate, setAssignedDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { currentUser } = useUserContext();


  const [dataSent, setDataSent] = useState([]);
  console.log("Selected exercises:", selectedExercises);
  console.log("Selected users:", selectedUsers);
  // console.log("Start date:", assignedDate);
  // console.log("End Date:", endDate)
  console.log(assignedData)

  const handleCheckValues = () => {
    console.log(selectedExercises);
    console.log(selectedUsers);
  };

  const handleSelectedExercisesUpdate = (updatedExercises) => {
    setSelectedExercises(updatedExercises);
  };

  const handleAssignedExercises = () => {
    setIsLoading(true);

    // create an object to store assigned exercises and users
    const assignedExercises = selectedUsers
      .map((userId) =>
        selectedExercises.map((exercise) => (
        // console.log(exercise)
           {
          UserId: userId,
          ExerciseId: exercise,
          startDate: assignedDate,
          endDate: endDate,
          totalPoints: 0,
        }
        ))
      )
      .flat();


    axios
      .post(
        "http://localhost:8080/api/assignedexercises/create",
        assignedExercises
      )

      .then((response) => {
        console.log("Assigned exercises saved:", response.data);
        setAssignedData(response.data); 
      })
      .catch((error) => {
        console.error("Error saving assigned exercises:", error);
      })
      .finally(() => {
        setIsLoading(false);
        // setSelectedExercises([]); // clear exercises
        // setSelectedUsers([]); // clear users
      
      });


  };

  return (
    <container className="AssignExerciseContainer">
    <div className="AssignExercise">
     
      <Container >
      {/* <IconChipsTest
        selectedExercises={selectedExercises}
        setSelectedExercises={handleSelectedExercisesUpdate}
      /> */}

      <ExerciseGridSelect
        selectedExercises={selectedExercises}
        setSelectedExercises={handleSelectedExercisesUpdate}
      />

      </Container>
      <ExerciseUserGrid
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
      />

      <DatePicker
        value={assignedDate}
        onChange={(newDate) => setAssignedDate(newDate)}
      ></DatePicker>

    <DatePicker
        value={endDate}
        onChange={(newDate) => setEndDate(newDate)}
        sx={{
          borderColor: 'white',
          color: 'whitesmoke'
        }}
      ></DatePicker>


      <button onClick={handleAssignedExercises} disabled={isLoading}>
        {isLoading ? "Assigning..." : "Assign Exercises"}
      </button>


      {assignedData.length > 0 && (
        <div>
          <h2>Assigned Exercises:</h2>
          <ul>
            {assignedData.map((item) => (
              <li key={item.id}>
                User ID: {item.UserId}, Exercise ID: {item.ExerciseId}
              </li>
            ))}
          </ul>
        </div>
      )}
    

     
    </div>
    <div className="VerticalBox" style={{textAlign: 'center'}}>
      <Card sx={{color: "rgba(255, 255, 255, 0.50)"}}>
        <CardContent>
        <Typography variant="h4" sx={{color: 'black'}}>Hello {currentUser.firstName}</Typography>
      <Typography variant='h6' sx={{color: 'black'}}>You are currently making a program.</Typography>
      {/* <Typography sx={{color: 'black'}}>This is the program you have made.</Typography> */}

       {assignedData == [] ? 
              <>
                <Typography sx={{ color: "black" }}>
                  This is the program you have made
                </Typography>
                <Typography>anything </Typography>
               
              </> : <>
                <Typography sx={{ color: "black" }}>
                  This is the program you have made:
                </Typography>
                <Typography><ul>
                  {assignedData.forEach((item) => (
                    <li key={item.id}>
                      User ID: {item.UserId}, Exercise ID: {item.ExerciseId}
                    </li>
                  ))}
                </ul></Typography>
               
              </> 
            }
        </CardContent>
      </Card>
      
    </div>
    </container>
  );
}
