import Leaderboard from "../components/Leaderboard";

import { useUserContext } from "../context/UserContext";
import { useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState("");
  const {currentUser} = useUserContext();

  return (
    <>
      <div className="HomePage">

      Welcome {currentUser.firstName}
      <br></br>
      <Leaderboard></Leaderboard>
     
r
        Home Page
        <li>Welcome the user that has been signed in</li>
        <li>the page that users enter after they have successfully logged in</li>
        <br/>
        <li>Leaderboard</li>
        <li>Exercises Assigned</li>
        <li>History of exercises</li>
        <li>Weekly Challenge</li>
      </div>

      
    </>
  );
}
