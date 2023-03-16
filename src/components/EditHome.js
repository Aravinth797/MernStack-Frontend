import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditHome = () => {
  const params = useParams();
  console.log("params", params);
  const editHomeId = params.id;

  console.log("editHomeId",editHomeId);

  const useStyles = makeStyles({
    drawer: {
      width: 250,
    },
  });

  const [fname, setfname] = useState("");
  const [lname, setLname] = useState("");
  const [mnumber, setMnumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [cname, setCname] = useState("");
  const [file, setFile] = useState();
  const [rows, setRows] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    getUserById();
    async function fetchData() {
      const { data } = await axios.get("http://localhost:5001/employee/get");
      setRows(data);
    }
    fetchData();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5001/employee/get/${editHomeId}`);
    console.log("response", response.data);
    setfname(response.data.fname);
    setLname(response.data.lname);
    setMnumber(response.data.mnumber);
    setEmail(response.data.email);
    setAddress(response.data.address);
    setAddress2(response.data.address2);
    setCity(response.data.city);
    setState(response.data.state);
    setPincode(response.data.pincode);
    setCname(response.data.cname);
    setFile(response.data.photo);
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "fname",
      headerName: "First name",
      flex: 1,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lname",
      headerName: "Last name",
      flex: 1,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "mnumber",
      headerName: "Mobile",
      flex: 1,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "photo",
      headerName: "Photo",
      flex: 1,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    
  ];

  const editHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    console.log("formData-->", fd);
    fd.append("fname", fname);
    fd.append("lname", lname);
    fd.append("mnumber", mnumber);
    fd.append("email", email);
    fd.append("address", address);
    fd.append("address2", address2);
    fd.append("city", city);
    fd.append("state", state);
    fd.append("pincode", pincode);
    fd.append("cname", cname);
    fd.append("file", file);

    const {data} = await axios.put(`http://localhost:5001/employee/update/${editHomeId}`, fd);
    console.log("response", data);
    if(data) {
      window.confirm("Employee Details Updated SuccessFully!!");
      setfname("");
      setLname("");
      setMnumber("");
      setEmail("");
      setAddress("");
      setAddress2("");
      setCity("");
      setState("");
      setPincode("");
      setCname("");
      setFile("");
    }
  }

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <>
    <AppBar variant="outlined">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Employee Management Application</Typography>

        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <List className={classes.drawer}>
            <ListItem button>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button>
              <ListItemText primary="About" />
            </ListItem>

            <ListItem button>
              <ListItemText primary="Contact" />
            </ListItem>

            <ListItem button>
              <ListItemText primary="Services" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>

    <Box sx={{ mt: 20 }} onSubmit={editHandler}>
      <h1>Employee Portal</h1>
      <Box component="form" sx={{ m: 5, p: 2 }}>
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="First Name"
          value={fname}
          onChange={(e) => setfname(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="Mobile Number"
          value={mnumber}
          onChange={(e) => setMnumber(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="Address 2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="Pin Code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          label="Company Name"
          value={cname}
          onChange={(e) => setCname(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mr: 4 }}
          id="margin-normal"
          type="file"
          onChange={handleChange}
          margin="normal"
        />

        <Button sx={{ mt: 10 }} type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>

    <Box
      sx={{
        height: 560,
        width: "100%",

        "& .super-app-theme--header": {
          backgroundColor: "#808080",
          color: "#ffffff",
        },
        "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
          fontSize: 16,
        },
        ".css-o8hwua-MuiDataGrid-root .MuiDataGrid-cellContent": {
          fontSize: 13,
        },
        ".css-bfht93-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
          {
            backgroundColor: "#330033",
            color: "#ffffff",
          },
        ".css-h4y409-MuiList-root": {
          display: "grid",
        },
        ".css-1omg972-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
          {
            backgroundColor: "#808080",
          },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(rows) => rows._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  </>
  );
};

export default EditHome;
