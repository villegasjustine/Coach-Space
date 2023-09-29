import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";



export default function FormDialog({handleRefresh}) {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState("");
  const { currentUser, handleUpdateUser } = useUserContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setOpen(false);

    // convert form data to object and post to backend
    axios
      .post(
        "http://localhost:8080/api/users/register",
        Object.fromEntries(data.entries())
      )
      .then((response) => {
        let result = response.data.result;
        let user = response.data.data;
        console.log(user);

        setResult(result);
        if (user) {
          handleUpdateUser(user);
          alert("Successfully created a new user!") // use toast if have time
          handleRefresh()
        }
      })
      .catch((err) => {
        console.log(err);
        setResult(err.message + ": " + err.response.data.result);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create New User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Enter your details: 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            autoComplete="given-name"
            name="firstName"
            id="firstName"
            label="First Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            autoComplete="last-name"
            name="lastName"
            id="lastName"
            label="Last Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            autoComplete="username"
            name="username"
            id="username"
            label="Username"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="email"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="avatar"
            name="avatar"
            label="Avatar"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            name="group"
            id="group"
            label="Group"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="role"
            id="role"
            label="Role"
            fullWidth
            variant="standard"
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type = "submit">Submit</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

