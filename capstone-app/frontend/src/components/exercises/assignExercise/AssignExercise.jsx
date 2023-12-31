import axios from "axios";
import { useState, useEffect } from "react";
import ExerciseUserGrid from "./ExerciseUserGrid";
import { DatePicker } from "@mui/x-date-pickers";
import { Container, Typography, Card, CardContent } from "@mui/material";
import ExerciseGridSelect from "./ExerciseGridSelect";
import { useUserContext } from "../../../context/UserContext";
import Grid from "@mui/material/Grid";

export default function AssignExercise() {
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignedData, setAssignedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedDate, setAssignedDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { currentUser } = useUserContext();

  const dataDisplay = [];

  const [dataSent, setDataSent] = useState([]);

  const handleCheckValues = () => {
    console.log(selectedExercises);
    console.log(selectedUsers);
  };

  const handleSelectedExercisesUpdate = (updatedExercises) => {
    setSelectedExercises(updatedExercises);
  };

  let assignedExercises = [];

  const handleAssignedExercises = () => {
    setIsLoading(true);

    // create an object to store assigned exercises and users
      assignedExercises = selectedUsers
      .map((userId) =>
        selectedExercises.map((exercise) => ({
          UserId: userId,
          ExerciseId: exercise,
          startDate: assignedDate,
          endDate: endDate,
          totalPoints: 0,
        }))
      )
      .flat();

    

    axios
      .post(
        "http://localhost:8080/api/assignedexercises/create",
        assignedExercises
      )

      .then((response) => {
        console.log("Assigned exercises saved:", response.data);
        // setAssignedData(response.data);
        setAssignedData(assignedExercises);
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
      <div className="gridComponent">
        <Container>
          <Container>
        
          <DatePicker
          label="Start Date"
          value={assignedDate}
          onChange={(newDate) => setAssignedDate(newDate)}
        ></DatePicker>

        <DatePicker
        label='End Date'
          value={endDate}
          onChange={(newDate) => setEndDate(newDate)}
          sx={{
            borderColor: "white",
            color: "whitesmoke",
          }}
        ></DatePicker>
          </Container>

        <Card
           variant="outlined"
           sx={{
           //   display: "flex",
             alignItems: "center",
             border: "3px solid",
             color: "grey.800",
             
           }}
        ><Typography variant="h5">Exercises</Typography></Card>
          <ExerciseGridSelect
            selectedExercises={selectedExercises}
            setSelectedExercises={handleSelectedExercisesUpdate}
          />
          <Card
           variant="outlined"
           sx={{
           //   display: "flex",
             alignItems: "center",
             border: "3px solid",
             color: "grey.800",
             
           }}
        ><Typography variant="h5">Users</Typography></Card>
           <ExerciseUserGrid
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        </Container>

        <button onClick={handleAssignedExercises} disabled={isLoading}>
          {isLoading ? "Assigning..." : "Assign Exercises"}
        </button>

        {assignedData.length > 0 && (
          <div>
            <h2>Assigned Exercises:</h2>
            <ul>
              {assignedData.map((item) =>
               (
                
                <li key={item.id}>
                  User ID: {item.UserId}, Exercise ID: {item.ExerciseId}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="VerticalBox" style={{ textAlign: "center" }}>
        <Card sx={{ color: "rgba(255, 255, 255, 0.50)" }}>
          <CardContent>
            <Typography variant="h4" sx={{ color: "black" }}>
              Hello {currentUser.firstName}
            </Typography>
            <Typography variant="h6" sx={{ color: "black" }}>
              You are currently making a program.
            </Typography>
            {/* <Typography sx={{ color: "black" }}>
              This is the program you have made.
            </Typography> */}

            {/* {console.log(assignedExercises.map((item) => item.userId))} */}
            {!assignedData.length > 0? 
              <>
                <Typography sx={{ color: "black" }}>
                  Remember! 
                </Typography>
                <Typography sx={{ color: "black" }}>
                 Start Date - End Date
                </Typography>
                <Typography sx={{ color: "black" }}>
                Exercises
                </Typography>
                <Typography sx={{ color: "black" }}>
                Users
                </Typography>
                
              </>
             : 
              <>
                <Typography sx={{ color: "black" }}>
                  This is the program you have made:
                  {assignedData.map((item) => (
                      <li key={item.id}>
                        User ID: {item.UserId}, Exercise ID: {item.ExerciseId}
                      </li>
                    ))}
                </Typography>
                
                </>}
             
          </CardContent>
        </Card>
      </div>
    </container>
  );
}
