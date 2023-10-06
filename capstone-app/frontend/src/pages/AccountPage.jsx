import { useUserContext } from "../context/UserContext";
import { Card, CardContent, Grid, Typography } from "@mui/material";


export default function AccountPage() {
  const { currentUser } = useUserContext();

    return (
      <>
        <div className="AccountPage">
          {currentUser.firstName}
          <Grid 
            container
            justifyContent="center"
          >
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
          <Typography> {currentUser.firstName}</Typography>
          <Typography> {currentUser.lastName}</Typography>
          <Typography> {currentUser.username}</Typography>
          <Typography> {currentUser.email}</Typography>
          <Typography> {currentUser.group}</Typography>  
          </CardContent>
        </Card>
        </Grid>

        </div>
      </>
    );
  }
  