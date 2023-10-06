import ExerciseGroupDisplay from "../components/leaderboard/ExerciseGroupDisplay";
import { Container } from "@mui/material";

import Leaderboard from "../components/leaderboard/Leaderboard";
import axios from "axios";

import { useUserContext } from "../context/UserContext";
import { useState, useEffect } from "react";
import RandomExerciseGenerator from "../components/exercises/RandomExerciseGenerator";

export default function HomePage() {
  const [groupUsers, setGroupUsers] = useState([]);
  const { currentUser } = useUserContext();
  const [handleRefresh, setHandleRefresh] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0); 

  useEffect(() => {
    console.log(currentUser.group);
    if (currentUser.group) {
      const apiUrl = `http://localhost:8080/api/users/groups/${currentUser.group}`;

      axios
        .get(apiUrl)
        .then((response) => {
          const fetchedUsers = response.data.data;
          setGroupUsers(fetchedUsers);
          console.log("Fetched Users", fetchedUsers);
        })
        .catch((error) => {
          console.error("Error fetching group members:", error);
        });
    }
  }, []);

  const handlePointsUpdate = () => {
  
    const updatedUsers = groupUsers.map((student) => {
      if (currentUser.id == student.id) {
        console.log('student', student)
        let currentPoints = parseInt(student["SUM(CAE.totalPoints)"]) + 10;
        console.log('sum', student["SUM(CAE.totalPoints)"])
        console.log('currentpoints', currentPoints)
        return { ...student, "SUM(CAE.totalPoints)": currentPoints }
        } else {return student}
      
      }
    );
    console.log('updatedusers', updatedUsers)
    setGroupUsers(updatedUsers);
  };

  return (
    <>
      <div className="HomePage">
        <br></br>
        Welcome {currentUser.username}
        <Container sx={{ justifyContent: "center" }}>
          <Leaderboard groupUsers={groupUsers} />
          <ExerciseGroupDisplay
            groupUsers={groupUsers}
            onPointsUpdate={handlePointsUpdate}
            handleRefresh={handleRefresh}
            setHandleRefresh={setHandleRefresh}
          />
        </Container>
        <RandomExerciseGenerator/>
      </div>
    </>
  );
}
