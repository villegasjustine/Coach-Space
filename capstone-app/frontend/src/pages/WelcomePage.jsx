
import SignIn from "../components/user/SignIn";
import { Box, Button } from "@mui/material";


export default function WelcomePage() {

   
  return (
    <>
    
    <Box >
      <div className="WelcomePage">
        Welcome Page
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
      <button>Sign in</button> <button>Sign Up</button>
      </Box>
    </>
  );
}
