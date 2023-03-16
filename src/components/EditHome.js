import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { deepPurple, red } from "@material-ui/core/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const useMediaQuery = (
  query: string,
  defaultState: boolean = false
): boolean => {
  const [state, setState] = React.useState(defaultState);

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) return;
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};
const usePrevious = (value) => {
  const ref = React.useRef(null);
  React.useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};

const EditHome = () => {
  const params = useParams();
  const editHomeId = params.id;

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

  useEffect(() => {
    getUserById();
    async function fetchData() {
      const { data } = await axios.get("http://localhost:5001/employee/get");
      setRows(data);
    }
    fetchData();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(
      `http://localhost:5001/employee/get/${editHomeId}`
    );
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

    const { data } = await axios.put(
      `http://localhost:5001/employee/update/${editHomeId}`,
      fd
    );
    console.log("response", data);
    if (data) {
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
  };

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const isBigScreen = useMediaQuery("(min-width: 1140px)", false);
  const prevBigScreen = usePrevious(isBigScreen);
  React.useEffect(() => {
    if (isBigScreen !== prevBigScreen && isBigScreen !== open) {
      setOpen((prev) => !prev);
    }
  }, [isBigScreen, prevBigScreen, open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Mini variant drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Box onSubmit={editHandler}>
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
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </main>
      </div>
    </>
  );
};

export default EditHome;
