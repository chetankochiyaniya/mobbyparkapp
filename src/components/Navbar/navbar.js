import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import PinDropTwoToneIcon from '@material-ui/icons/PinDropTwoTone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import { useHistory } from "react-router-dom";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../../../node_modules/react-responsive-modal/styles.css';
// import ConfirmDialog from "../ConfirmDialog"; 
import { API } from '../../backend'
import QRCode from "qrcode.react";
import { isAuthenticated, Logout } from '../../APICalls/auth';
import { Link, Redirect } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './navbar-media.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import { GetEmployeeById } from '../../APICalls/employee';
import Logo from '../../assets/logo.png';




var CryptoJS = require("crypto-js");
const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#4169E1',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: '#4169E1',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuButtonL: {
    marginRight: theme.spacing(2),
  },
  menuButtonR: {
    marginLeft: theme.spacing(2),
  },
  textColor: {
    color: '#000000'
  },
  qrcode: {
    display: 'inline-block',
    position: 'absolute',
    bottom: '25%',
    top: '50%',
    right: '20%',
  },
  qrcodecanvas: {
    display: 'none',
  },
  diabledLink: {
    pointerEvents: 'none !important',
    cursor: 'default !important',
  }
}));




export default function MiniDrawer(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false)
  var CryptoJS = require("crypto-js");
  //const {ConfirmDialog,setConfirmDialog} =useState({title:"",subTitle:""})

  const [employeeDetails, setEmmployeeDetails] = useState("");
  const [operatorDetails, setOperatorDetails] = useState("");
  const [operatorID, setOperatorID] = React.useState('');



  // const handleProfile = (event) => {

  // };5ff8354fd4c3ec187c67fdf0
  const GetParkingQr = (operatorToken) => {
    //console.log(true)
    return fetch(`${API}/api/operator/auth/operator/getEncryptData`, {
      method: "Post",
      headers: {
        "x-auth-token": operatorToken
      },
    })
      .then(response => {
        //console.log(response)
        return response.json()
      })
      .catch(err => console.log(err))
  }
  const [ParkingQr, setParkingQr] = useState('')

  const downloadQRCode = () => {
    const operatorToken = JSON.parse(localStorage.getItem("jwt")).token
    //console.log(operatorId + " Id")
    GetParkingQr(operatorToken)
      .then(res => {
        setParkingQr(res.encyString)
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `parkingQR.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch(err => console.log(err))
  };




  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm to logout?',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => Logout(() => {


            setRedirect(true)
          })
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    })
  };



  const handleRedirect = () => {
    if (redirect) {
      return (
        <Redirect to="/" />
      )
    }
  }

  const handleDrawer = () => {
    open ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {


    if (JSON.parse(localStorage.getItem("jwt")) !== null && JSON.parse(localStorage.getItem("jwt")) !== undefined) {
      if (JSON.parse(localStorage.getItem("jwt")).employee !== null && JSON.parse(localStorage.getItem("jwt")).employee !== undefined) {
        console.log("test --")
        const employeetoken = JSON.parse(localStorage.getItem("jwt")).token;
        const employeeid = JSON.parse(localStorage.getItem("jwt")).employee._id;
        GetEmployeeById(employeetoken, employeeid)
          .then(res => {
            setEmmployeeDetails(res)
            setOperatorID(res.operator);
            console.log(employeeDetails);

            console.log(" details ")
          })
          .catch(err => console.log(err))

      }
    }

  })


  if (employeeDetails) {

    return (
      <div className={classes.root}>
        <CssBaseline />
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
            <IconButton onClick={handleDrawer}>
              {open ? <ChevronLeftIcon fontSize="large" style={{ color: 'white' }} /> : <MenuIcon fontSize="large" style={{ color: 'white' }} />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.textColor}>

            {employeeDetails.booking ? <Link to="booking" >
              <ListItem button>
                <ListItemIcon><HomeOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Booking</h5></ListItemText>
              </ListItem>
            </Link> : <Link to="booking" className={classes.diabledLink} >
              <ListItem button>
                <ListItemIcon><HomeOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Booking</h5></ListItemText>
              </ListItem>
            </Link>}

            {employeeDetails.dashboard ? <Link to="dashboard" >
              <ListItem button>
                <ListItemIcon><DashboardOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Dashboard</h5></ListItemText>
              </ListItem>
            </Link> : <Link className={classes.diabledLink}>
              <ListItem button>
                <ListItemIcon><DashboardOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Dashboard</h5></ListItemText>
              </ListItem>
            </Link>}

            {/* 
        <Link to="parking" >
            <ListItem button>
              <ListItemIcon><PinDropTwoToneIcon fontSize="large" /></ListItemIcon>
              <ListItemText>Parking Area</ListItemText>
            </ListItem>
        </Link>
          */}
            {employeeDetails.gate_qr ? <Link to="gateList">
              <ListItem button>
                <ListItemIcon><ListAltOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>GateList</h5></ListItemText>
              </ListItem>
            </Link> : <Link className={classes.diabledLink}>
              <ListItem button>
                <ListItemIcon><ListAltOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>GateList</h5></ListItemText>
              </ListItem>
            </Link>}




            {/* <Link to="schedule" >
        <ListItem button>
        <ListItemIcon><img src="https://img.icons8.com/color/48/000000/calendar--v1.png"/></ListItemIcon>
            <ListItemText><h5>Schedule</h5></ListItemText>
          </ListItem>
        </Link> */}

            {/* <Link to="payments">
            <ListItem button>
              <ListItemIcon><AccountBalanceWalletTwoToneIcon /></ListItemIcon>
              <ListItemText>Payments</ListItemText>
            </ListItem>
          </Link> */}


            {employeeDetails.addvehicle ? <Link to="information">
              <ListItem button>
                <ListItemIcon><InfoOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Vehicle Info</h5></ListItemText>
              </ListItem>
            </Link> : <Link className={classes.diabledLink}>
              <ListItem button>
                <ListItemIcon><InfoOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Vehicle Info</h5></ListItemText>
              </ListItem>
            </Link>}

            <ListItem style={{ marginTop: `2em` }} button onClick={downloadQRCode}>
              <ListItemIcon><GetAppIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
              <ListItemText style={{ color: 'white' }}><h5>Download QR</h5></ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ExitToAppIcon fontSize="large" style={{ color: 'white' }} onClick={handleLogout} />
              </ListItemIcon>
              <ListItemText style={{ color: 'white' }}><h5>Logout</h5></ListItemText>
            </ListItem>

            <ListItem button style={{ marginTop: `1em` }}>
              <ListItemIcon ><img src={Logo} alt="Mobby Park" width="30" height="40" style={{ color: 'white' }} /></ListItemIcon>
              <ListItemText style={{ color: 'white' }}><h5>Mobby Park</h5></ListItemText>
            </ListItem>
          </List>
          <div id="qrcode">
            <QRCode
              id="qr-gen"
              value={ParkingQr}
              size={250}
              level={"H"}
              includeMargin={true}
              className={classes.qrcodecanvas}
            />
          </div>

          {handleRedirect()}
        </Drawer>


      </div>
    );

  }
  else {
    return (
      <div className={classes.root}>
        <CssBaseline />
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
            <IconButton onClick={handleDrawer}>
              {open ? <ChevronLeftIcon fontSize="large" style={{ color: 'white' }} /> : <MenuIcon fontSize="large" style={{ color: 'white' }} />}
            </IconButton>
          </div>
          <Divider />
          <List className={classes.textColor}>

            <Link to="booking" >
              <ListItem button>
                <ListItemIcon><HomeOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Booking</h5></ListItemText>
              </ListItem>
            </Link>

            <Link to="dashboard" >
              <ListItem button>
                <ListItemIcon><DashboardOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Dashboard</h5></ListItemText>
              </ListItem>
            </Link>

            {/* 
          <Link to="parking" >
              <ListItem button>
                <ListItemIcon><PinDropTwoToneIcon fontSize="large" /></ListItemIcon>
                <ListItemText>Parking Area</ListItemText>
              </ListItem>
          </Link>
            */}
            <Link to="gateList">
              <ListItem button>
                <ListItemIcon><ListAltOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>GateList</h5></ListItemText>
              </ListItem>
            </Link>




            {/* <Link to="schedule" >
          <ListItem button>
          <ListItemIcon><img src="https://img.icons8.com/color/48/000000/calendar--v1.png"/></ListItemIcon>
              <ListItemText><h5>Schedule</h5></ListItemText>
            </ListItem>
          </Link> */}

            {/* <Link to="payments">
              <ListItem button>
                <ListItemIcon><AccountBalanceWalletTwoToneIcon /></ListItemIcon>
                <ListItemText>Payments</ListItemText>
              </ListItem>
            </Link> */}


            <Link to="information">
              <ListItem button>
                <ListItemIcon><InfoOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Vehicle Info</h5></ListItemText>
              </ListItem>
            </Link>


            <Link to="employee">
              <ListItem button>
                <ListItemIcon><ContactMailOutlinedIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Employees</h5></ListItemText>
              </ListItem>
            </Link>

            <Link to="resident">
              <ListItem button>
                <ListItemIcon><AccountCircleIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
                <ListItemText style={{ color: 'white' }}><h5>Resident</h5></ListItemText>
              </ListItem>
            </Link>


            <ListItem style={{ marginTop: `2em` }} button onClick={downloadQRCode}>
              <ListItemIcon><GetAppIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
              <ListItemText style={{ color: 'white' }}><h5>Download QR</h5></ListItemText>
            </ListItem>

            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon fontSize="large" style={{ color: 'white' }} onClick={handleLogout} />
              </ListItemIcon>
              <ListItemText style={{ color: 'white' }}><h5>Logout</h5></ListItemText>
            </ListItem>

            <a href="https://mobbypark.com" target="_blank" rel="noopener noreferrer"><ListItem button style={{ marginTop: `3em` }}>
              <ListItemIcon ><img src={Logo} alt="Mobby Park" width="30" height="40" style={{ color: 'white' }} /></ListItemIcon>
              <ListItemText style={{ color: 'white' }}><h5>Mobby Park</h5></ListItemText>
            </ListItem></a>


          </List>
          <div id="qrcode" className={classes.qrcode}>
            <QRCode
              id="qr-gen"
              value={ParkingQr}
              size={250}
              level={"H"}
              includeMargin={true}
              className={classes.qrcodecanvas}
            />
          </div>

          {handleRedirect()}
        </Drawer>


      </div>
    );
  }
}


