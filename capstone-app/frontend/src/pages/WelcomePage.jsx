import SignUp from "../components/user/SignUp";
import SignIn from "../components/user/SignIn";

import { Box, Button } from "@mui/material";
import { useState } from "react";



export default function WelcomePage() {
  const [showSignIn, setShowSignIn] = useState(false); 
  const [showSignUp, setShowSignUp] = useState(false);
  const [showNavBar, setShowNavBar] = useState(false);

  const handleSignIn = () => {
    setShowSignIn(!showSignIn); 
    setShowSignUp(false);
  };


  const handleSignUp = () => {
    setShowSignUp(!showSignUp);
    setShowSignIn(false) 
  };


   
  return (
    <>
    
    <Box >
      <div className="WelcomePage">
        
        <div className="waviy"
        >
          <span style={{ animationDelay: "calc(.2s * 1)" }}>C</span>
          <span style={{ animationDelay: "calc(.2s * 2)" }}>o</span>
          <span style={{ animationDelay: "calc(.2s * 3)" }}>a</span>
          <span style={{ animationDelay: "calc(.2s * 4)" }}>c</span>
          <span style={{ animationDelay: "calc(.2s * 5)" }}>h</span>
          <span style={{ animationDelay: "calc(.2s * 6)" }}> - </span>
          <span style={{ animationDelay: "calc(.2s * 7)" }}></span>
          <span style={{ animationDelay: "calc(.2s * 8)" }}>S</span>
          <span style={{ animationDelay: "calc(.2s * 9)" }}>P</span>
          <span style={{ animationDelay: "calc(.2s * 10)" }}>A</span>
          <span style={{ animationDelay: "calc(.2s * 11)" }}>C</span>
          <span style={{ animationDelay: "calc(.2s * 12)" }}>E</span>
          
        </div>
        <div className="welcome-justine">
          with Justine
        </div>
      </div>
      <button onClick={handleSignIn} className="welcomeButton">Sign in</button> 
      <button onClick={handleSignUp} className="welcomeButton">Sign Up</button>

    
      {showSignIn && <SignIn/>}
      {showSignUp && <SignUp/>}
      
      </Box>
    </>
  );
}
