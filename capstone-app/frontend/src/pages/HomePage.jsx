import ExerciseGroupDisplay from "../components/leaderboard/ExerciseGroupDisplay";
import { Container } from "@mui/material";

import Leaderboard from "../components/leaderboard/Leaderboard";
import axios from "axios";

import { useUserContext } from "../context/UserContext";
import { useState, useEffect } from "react";


export default function HomePage() {
  const [groupUsers, setGroupUsers] = useState([]);
  const { currentUser } = useUserContext();

  useEffect(() => {
    console.log(currentUser.group)
      if (currentUser.group) {
        const apiUrl = `http://localhost:8080/api/users/groups/${currentUser.group}`;
        
  
        axios
          .get(apiUrl)
          .then((response) => {
            const fetchedUsers = response.data.data;
            setGroupUsers(fetchedUsers);
            console.log('Fetched Users',fetchedUsers)
          })
          .catch((error) => {
            console.error('Error fetching group members:', error);
          });
      }
    }, []); 

  const handlePointsUpdate = (newPoints) => {
    const updatedUsers = 
    groupUsers.map((student) => (
      currentUser.id == student.id ? {...student, 'SUM(CAE.totalPoints)' : newPoints} : student
    ))
      setGroupUsers(updatedUsers)

  }

  return (
    <>
      <div className="HomePage">
        Welcome {currentUser.username}
        <Container sx={{justifyContent: 'center'}}>
        <Leaderboard groupUsers={groupUsers} />
        <ExerciseGroupDisplay groupUsers={groupUsers} onPointsUpdate={handlePointsUpdate} />
        </Container>  
       
      </div>
    </>
  );
}
