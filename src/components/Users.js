import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { TextField } from "@material-ui/core";

//making style to the users page
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

//style for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Users() {
  const classes = useStyles();

  //making the state to save the user information
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  useEffect(() => {
    UsersGet();
  }, []);

  //fetching user from the api. it is getting response and saving it to json and
  //setting result to setUsers.
  const UsersGet = () => {
    fetch("https://www.mecallapi.com/api/users")
      .then((res) => res.json())
      .then((result) => {
        //console.log("res:", result);
        setUsers(result);
        setFilterUsers(result);
      });
  };

  //function to update user
  const UpdateUser = (id) => {
    //The window.location object can be used to get
    //the current page address (URL) and to redirect the browser to a new page.
    window.location.href = "/update/" + id;
  };

  //function to delete user
  const UserDelete = (id) => {
    var data = {
      id: id,
    };
    fetch("https://www.mecallapi.com/api/users/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          UsersGet();
        }
      });
  };

  //usestate to bring the data from the modal
  const [nameData, setNameData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
  });

  //handlechange to get the value of text field from modal
  const handleChange = (e) => {
    setNameData({
      ...nameData,
      [e.target.name]: e.target.value,
    });
  };

  //handle click of search button to filter name and last name
  const handleClick = (e) => {
    e.preventDefault();
    const search = users.filter((user) => {
      return (
        (nameData.firstName &&
          user.fname
            .toLowerCase()
            .includes(nameData.firstName.toLowerCase())) ||
        (nameData.lastName &&
          user.lname.toLowerCase().includes(nameData.lastName.toLowerCase())) ||
        (nameData.userName &&
          user.username.toLowerCase().includes(nameData.userName.toLowerCase()))
      );
    });
    setFilterUsers(search);
  };

  //creating modal to input the text.
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                USERS
              </Typography>
            </Box>
            <Box
              marginY={3}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box>
                <Link to="/create">
                  <Button variant="contained" color="primary">
                    CREATE
                  </Button>
                </Link>
              </Box>
              <Box>
                <Button
                  sx={{ flexDirection: "flex-end" }}
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Filter
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style}>
                    <TextField
                      label="First Name "
                      id="outlined-basic"
                      name="firstName"
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      id="outlined-basic"
                      label="Second Name"
                      name="lastName"
                      onChange={handleChange}
                    />
                    <br />
                    <TextField
                      id="outlined-basic"
                      label="User Name"
                      name="userName"
                      onChange={handleChange}
                    />
                    <br />
                    <Button variant="contained" onClick={handleClick}>
                      Search
                    </Button>
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="left">First</TableCell>
                  <TableCell align="left">Last</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterUsers.map((user) => (
                  <TableRow key={user.ID}>
                    <TableCell align="right">{user.id}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center">
                        <Avatar src={user.avatar} />
                      </Box>
                    </TableCell>
                    <TableCell align="left">{user.fname}</TableCell>
                    <TableCell align="left">{user.lname}</TableCell>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <Button onClick={() => UpdateUser(user.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => UserDelete(user.id)}>Del</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}

export default Users;
