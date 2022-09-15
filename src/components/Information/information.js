import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { fade, createMuiTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import "./information.scss";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Navbar from "../Navbar/navbar";
import { GetAllVehicles, GetAllVehiclesByDate } from "../../APICalls/vehicle";
import { CSVLink } from "react-csv";
import Button from '@mui/material/Button';

import { GetEmployeeById } from "../../APICalls/employee";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import TextField from "@material-ui/core/TextField";

import CircularProgress from "@material-ui/core/CircularProgress";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
const moment = require("moment");
// import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';
// import dateFormat from 'dateformat';

// const customTotal = (from, to, size) => (
//   <span className="react-bootstrap-table-pagination-total">
//     Showing {from} to {to} of {size} Results
//   </span>
// );

// const options = {
//   paginationSize: 2,
//   pageStartIndex: 0,
//   // alwaysShowAllBtns: true, // Always show next and previous button
//   // withFirstAndLast: false, // Hide the going to First and Last page button
//   // hideSizePerPage: true, // Hide the sizePerPage dropdown always
//   // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
//   firstPageText: "First",
//   prePageText: "Back",
//   nextPageText: "Next",
//   lastPageText: "Last",
//   showTotal: true,
//   paginationvwTotalRenderer: customTotal,
//   sizePerPageList: [
//     {
//       text: "50",
//       value: 50,
//     },
//     {
//       text: "25",
//       value: 25,
//     },
//     {
//       text: "10",
//       value: 10,
//     },
//   ],
// };

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
    },
    secondary: {
      main: "#f44336",
    },
    processing: {
      main: "#ff3d00",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "50vw",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.dark, 0.9),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    "&::placeholder": {
      color: "white",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "0ch",
        color: "white",
      },
    },
    "&::placeholder": {
      color: "white",
    },
  },
}));

const headers = [
  { label: "Vehicle No.", key: "vehicle_no" },
  { label: "Vehicle Type", key: "vehicle_type" },
  { label: "Contact Number", key: "contact_no" },
  { label: "IN Time", key: "in_time" },
  { label: "Expected OUT Time", key: "exp_out_time" },
  { label: "Pricing", key: "pricing" },
  { label: "Payment Method", key: "payment_method" },
  { label: "Total", key: "totalPrice" },
  { label: "Total Time (in hrs)", key: "out_time" },
];

function Information() {
  const classes = useStyles();
  const [allVehicles, setAllVehicles] = React.useState("");
  const [searchVal, setSearchVal] = useState(null);
  const [filterVehicles, setFilterVehicles] = useState("");
  const [dateValue, setdateValue] = React.useState("");
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  // const priorDate = moment().subtract(30, 'days').format("YYYY-MM-DD HH:mm:ss");

  useEffect(() => {
    const operatorToken = JSON.parse(localStorage.getItem("jwt")).token;
    GetAllVehicles(operatorToken, limit, skip)
      .then((res) => {
        setAllVehicles(res.vehicles);
        setTotal(res.total);
      })
      .catch((err) => console.log(err));

    // if (dateValue) {
    //   GetAllVehiclesByDate(operatorToken, dateValue)
    //     .then((res) => {
    //       setFilterVehicles(res);
    //       // console.log(filterVehicles)
    //     })
    //     .catch((err) => console.log(err));
    //   // const requiredData = allVehicles.map((vehicles, index) => {
    //   //   // console.log(dateValue)
    //   //   //console.log(vehicles.in_time.split(' ')[0] + ' in time')
    //   //   if (dateValue === vehicles.in_time.split(" ")[0]) {
    //   //     return allVehicles[index];
    //   //   }
    //   //   return null;
    //   // }
    //   // );
    //   // setFilterVehicles(

    //   //   // requiredData.filter((vehicle) => {
    //   //   //   if (vehicle) return true;
    //   //   //   return false;
    //   //   // })
    //   // );
    // } else setFilterVehicles(allVehicles);

    // if (searchVal) {
    //   const reqData = allVehicles.map((vehicle, index) => {
    //     if (
    //       vehicle.vehicle_no.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
    //     ) {
    //       return allVehicles[index];
    //     }
    //     return null;
    //   });
    //   setFilterVehicles(
    //     reqData.filter((vehicle) => {
    //       if (vehicle) return true;
    //       return false;
    //     })
    //   );
    // } else setFilterVehicles(allVehicles);

    if (dateValue || searchVal) {
      if (dateValue) {
        GetAllVehiclesByDate(operatorToken, dateValue)
          .then((res) => {
            setFilterVehicles(res);
            // console.log(res.total)
          })
          .catch((err) => console.log(err));
      }
      else {
        const reqData = allVehicles.map((vehicle, index) => {
          if (
            vehicle.vehicle_no.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
          ) {
            return allVehicles[index];
          }
          return null;
        });
        setFilterVehicles(
          reqData.filter((vehicle) => {
            if (vehicle) return true;
            return false;
          })
        );
      }
    } else setFilterVehicles(allVehicles);

    //eslint-disable-next-line
  }, [dateValue, searchVal, allVehicles]);
  // filterVehicles

  const nextPage = () => {
    if ((skip + limit) < total) {
      setSkip(skip + limit)
    }
  }

  const previousPage = () => {
    if (skip > 0) {
      setSkip(skip - limit)
    }
  }

  var i = 0;
  const columns = [
    {
      dataField: "i",
      text: "#",
      formatter: (cell) => {
        i = i + 0.5;
        return i.toFixed(0);
      },
      sort: true,
      headerStyle: () => {
        return { width: "2.5vw" };
      },
    },
    {
      dataField: "booking_id",
      text: "Booking ID",
      headerStyle: () => {
        return { width: "6vw" };
      },
    },
    {
      dataField: "vehicle_no",
      text: "Vehicle No.",
      headerStyle: () => {
        return { width: "6vw" };
      },
    },
    {
      dataField: "vehicle_type",
      text: "Vehicle Type",
      headerStyle: () => {
        return { width: "5.5vw" };
      },
    },
    {
      dataField: "contact_no",
      text: "Contact Number",
      headerStyle: () => {
        return { width: "5.5vw" };
      },
    },
    {
      dataField: "in_time",
      text: "IN Time",
      headerStyle: () => {
        return { width: "8.5vw" };
      },
    },
    {
      dataField: "exp_out_time",
      text: "Expected OUT Time",
      headerStyle: () => {
        return { width: "8.5vw" };
      },
    },
    {
      dataField: "pricing",
      text: "Pricing",
      headerStyle: () => {
        return { width: "4vw" };
      },
    },
    {
      dataField: "payment_method",
      text: "Payment Method",
      headerStyle: () => {
        return { width: "7vw" };
      },
    },
    {
      dataField: "totalPrice",
      text: "Total",
      headerStyle: () => {
        return { width: "4vw" };
      },
    },
    // {
    //   dataField: "out_time",
    //   text: "Total Time (in hrs)",
    //   headerStyle: () => {
    //     return { width: "4vw" };
    //   },
    // },
    // {
    //   dataField: "name",
    //   text: "Vehicle Name",
    // },
  ];

  // const defaultSorted = [
  //   {
  //     dataField: "exp_out_time",
  //     order: "desc",
  //   },
  // ];

  const marginstyle = {
    marginTop: "80px",
    marginLeft: "5vw",
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col" style={marginstyle}>
            <div className="alignment">
              <h1 style={{ textAlign: "center" }}>Vehicle List</h1>
              <br />
              <hr style={{ color: "#eee", stroke: "3px" }} />

              <br />
              <form noValidate>
                <TextField
                  id="date"
                  type="date"
                  defaultValue=" "
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  onChange={(event) => setdateValue(event.target.value)}
                />
              </form>
              <br />
              {/* {(dateValue < priorDate) ? (
                <div></div>
              ) : ( */}
              <Button variant="contained" style={{ background: "white" }}>
                <CSVLink data={filterVehicles} headers={headers} filename={dateValue ? dateValue : new Date().toLocaleString()}>
                  Download as CSV
                </CSVLink>
              </Button>
              {/* )} */}

              <br />
              <br />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(event) => setSearchVal(event.target.value)}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <br />

              {filterVehicles ? (
                <BootstrapTable
                  classes="tabletest"
                  keyField="id"
                  data={filterVehicles}
                  columns={columns}
                  // defaultSorted={defaultSorted}
                  // pagination={paginationFactory(options)}
                  wrapperClasses="table-responsive"
                />
              ) : (
                <center>
                  <CircularProgress />
                </center>
              )}

              <div>
                Showing {skip} - {skip + limit} of {total}
              </div>
              <br />
              <div>
                <button onClick={previousPage} className='btn' style={{ background: "#4169E1" }}> Previous Page </button>
                &nbsp;&nbsp;
                <button onClick={nextPage} className='btn' style={{ background: "#4169E1" }}> Next Page </button>
              </div>
            </div>
          </div>
        </div>

        {/* <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow >
            
            <TableCell style= {{color:"#919a9c"}} >#</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Vehicle No.</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Vehicle Type</TableCell>
            <TableCell style= {{color:"#919a9c"}} >IN Time</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Expected OUT Time</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Pricing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {filterVehicles && filterVehicles.map((e, i) => {
                            return(
            <TableRow>
              <TableCell> 
                {i+1}  
              </TableCell>
              <TableCell >
                {e.vehicle_no}
              </TableCell>
              <TableCell >{e.vehicle_type}</TableCell>
              <TableCell >{e.in_time}</TableCell>
              <TableCell >{e.exp_out_time}</TableCell>
              <TableCell >{e.pricing}</TableCell>
            </TableRow>
                            )}
            )}
        </TableBody>
      </Table>
    </TableContainer> */}
      </div>
    </div>
  );
}

export default Information;

// import React, {useEffect, useState} from 'react'
//     import NavBar from '../Navbar/navbar'
//     import {getOperatorById} from '../../APICalls/auth'
//     import {Grid} from '@material-ui/core'
//     import LocalParkingIcon from '@material-ui/icons/LocalParking';
//     import LocationOnIcon from '@material-ui/icons/LocationOn';
//     import DriveEtaIcon from '@material-ui/icons/DriveEta';
//     import MotorcycleIcon from '@material-ui/icons/Motorcycle';
//     import {Table} from 'react-bootstrap';

//     import './information.scss'
//     const Dashboard = () => {
//          const [operator, setOperator] = useState("")
//          useEffect(() => {
//              const operatorId = JSON.parse(localStorage.getItem("jwt")).operator._id
//              getOperatorById(operatorId)
//                 .then(res => {
//                     setOperator(res)
//                     console.log(res)
//                 })
//                 .catch(err => console.log(err))
//          }, [])
//         // to set the dynamic data use the useState property
//         return (
//             <div>
//                 <NavBar />
//                 <div className="dashboard-container">
//                     <div className="operator">
//                     <h2 style={{textTransform:"uppercase"}}> <LocalParkingIcon /> {operator.parking_name}</h2>
//                     <h2> <LocationOnIcon /> {operator.parking_addr}</h2>
//                     </div>
//                     <div className="box">
//                     <div className="capacity">
//                     <h2>Capacity</h2>
//                         <Grid container>
//                             <div className="box">
//                             <Grid item >
//                                 <div className="car">
//                                 <DriveEtaIcon  style={{fontSize:"40"}}/>
//                                 <h4>20/{operator.car_capacity}</h4>

//                                 </div>
//                             </Grid>

//                             <Grid item >
//                                 <div className="bike">
//                                 <MotorcycleIcon  style={{fontSize:"40"}}/>
//                                 <h4>20/{operator.bike_capacity}</h4>
//                                 </div>
//                             </Grid>

//                             </div>

//                         </Grid>
//                     </div>

//                     </div>
//                 </div>

//                 <div className="pricing">
//                 <h2>Pricing</h2>

//                 <div className="weekend">
//                 <h3>Weekend Pricing </h3>
//                     <Table responsive striped bordered hover variant="dark">
//                         <thead>
//                             <tr>
//                             <th>#</th>
//                             <th>Timing</th>
//                             <th>Car</th>
//                             <th>Bike</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                             <td>1</td>
//                             <td>0-2 hrs</td>
//                             <td>{operator.H0_2_wecar}</td>
//                             <td>{operator.H0_2_we}</td>

//                             </tr>

//                             <tr>
//                             <td>2</td>
//                             <td>2-4 hrs</td>
//                             <td>{operator.H2_4_wecar}</td>
//                             <td>{operator.H2_4_we}</td>

//                             </tr>

//                             <tr>
//                             <td>3</td>
//                             <td>4-6 hrs</td>
//                             <td>{operator.H4_6_wecar}</td>
//                             <td>{operator.H4_6_we}</td>
//                             </tr>

//                             <tr>
//                             <td>4</td>
//                             <td>6-9 hrs</td>
//                             <td>{operator.H6_9_wecar}</td>
//                             <td>{operator.H6_9_we}</td>
//                             </tr>

//                             <tr>
//                             <td>5</td>
//                             <td>9-12 hrs</td>
//                             <td>{operator.H9_12_wecar}</td>
//                             <td>{operator.H9_12_we}</td>
//                             </tr>

//                             <tr>
//                             <td>6</td>
//                             <td>12-24 hrs</td>
//                             <td>{operator.H12_24_wecar}</td>
//                             <td>{operator.H12_24_we}</td>
//                             </tr>
//                         </tbody>
//                         </Table>
//                   </div>

//                   <div className="weekend">
//                 <h3>Week Day Pricing </h3>
//                     <Table responsive striped bordered hover variant="dark">
//                         <thead>
//                             <tr>
//                             <th>#</th>
//                             <th>Rules</th>
//                             <th>Car</th>
//                             <th>Bike</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                             <td>1</td>
//                             <td>0-2 hrs</td>
//                             <td>{operator.H0_2_wdcar}</td>
//                             <td>{operator.H0_2_wd}</td>

//                             </tr>

//                             <tr>
//                             <td>2</td>
//                             <td>2-4 hrs</td>
//                             <td>{operator.H2_4_wdcar}</td>
//                             <td>{operator.H2_4_wd}</td>

//                             </tr>

//                             <tr>
//                             <td>3</td>
//                             <td>4-6 hrs</td>
//                             <td>{operator.H4_6_wdcar}</td>
//                             <td>{operator.H4_6_wd}</td>
//                             </tr>

//                             <tr>
//                             <td>4</td>
//                             <td>6-9 hrs</td>
//                             <td>{operator.H6_9_wdcar}</td>
//                             <td>{operator.H6_9_wd}</td>
//                             </tr>

//                             <tr>
//                             <td>5</td>
//                             <td>9-12 hrs</td>
//                             <td>{operator.H9_12_wdcar}</td>
//                             <td>{operator.H9_12_wd}</td>
//                             </tr>

//                             <tr>
//                             <td>6</td>
//                             <td>12-24 hrs</td>
//                             <td>{operator.H12_24_wdcar}</td>
//                             <td>{operator.H12_24_wd}</td>
//                             </tr>
//                         </tbody>
//                         </Table>
//                   </div>
//                 </div>
//             </div>

//         )
//     }
//     export default Dashboard
