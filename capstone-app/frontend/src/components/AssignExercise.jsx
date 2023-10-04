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

  const dataDisplay = [];

  const [dataSent, setDataSent] = useState([]);
  console.log("Selected exercises:", selectedExercises);
  console.log("Selected users:", selectedUsers);
  // console.log("Start date:", assignedDate);
  // console.log("End Date:", endDate)
  console.log("Data Display", dataDisplay);

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
      <div className="AssignExercise">
        <Container>
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
            borderColor: "white",
            color: "whitesmoke",
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
                  This is the program you have made anything
                </Typography>
                <Typography>anything </Typography>
              </>
             : 
              <>
                <Typography sx={{ color: "black" }}>
                  This is the program you have made correct:
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
