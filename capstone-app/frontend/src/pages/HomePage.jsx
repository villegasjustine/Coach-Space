import Leaderboard from "../components/Leaderboard";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";

export default function HomePage() {
  // const [user, setUser] = useState(users);
  const {currentUser} = useUserContext;
  console.log(currentUser)

  // function updateUsers(newUsers) {
  //   setUser(newUsers)
  //   console.log(user)
  // }

  return (
    <>
      <div className="HomePage">

      Welcome {cookies.user.firstName}
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
