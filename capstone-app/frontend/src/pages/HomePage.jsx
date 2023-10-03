import ExerciseGroupDisplay from "../components/ExerciseGroupDisplay";

import Leaderboard from "../components/Leaderboard";
import FormDialog from "../components/user/FormDialog";

import { useUserContext } from "../context/UserContext";
import { useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState("");
  const { currentUser } = useUserContext();

  function updateUsers(newUsers) {
    setUser(newUsers);
    console.log(user);
  }

  return (
    <>
      <div className="HomePage">
        Welcome {currentUser.firstName}
        <br></br>
        <Leaderboard users={user}/>
        <ExerciseGroupDisplay />
       
      </div>
    </>
  );
}
