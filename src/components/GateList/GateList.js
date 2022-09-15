import React, { useEffect, useState } from 'react'
//import Calender from './Calender'
import Navbar from '../Navbar/navbar'
import Chip from '@material-ui/core/Chip';
//import ViewListIcon from '@material-ui/icons/ViewList';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';

import { GetGateList } from '../../APICalls/gateQR';
import CircularProgress from '@material-ui/core/CircularProgress';
import BootstrapTable from 'react-bootstrap-table-next';
import TextField from '@material-ui/core/TextField';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function GateList() {
  const classes = makeStyles({
    table: {
      width: '100%',
    }
  });

  const [GateLists, setGateLists] = useState("");
  const [filterGateLists, setFilterGateLists] = useState("")
  const [dateValue, setdateValue] = useState(null);

  useEffect(() => {
    const operatorToken = JSON.parse(localStorage.getItem("jwt")).token
    GetGateList(operatorToken)
      .then(res => {
        console.log(res)
        //console.log(res,"result :")yyyy-MM-dd'T'HH:mm:ss
        for (var lists in res) {
          res[lists].scanTime = (res[lists].scanTime.replace('T', ' '));
          //console.log(res[lists].scanTime);
        }
        setGateLists(res)
      })
      .catch(err => console.log(err))

    if (dateValue) {
      //console.log(dateValue + " dateValue")
      const reqData = GateLists.map((gateList, index) => {
        if (dateValue === gateList.scanTime.split(' ')[0]) {
          return GateLists[index];
        };
        return null
      });
      setFilterGateLists(
        reqData.filter(gatelist => {
          if (gatelist) return true;
          return false;
        })
      );
    } else setFilterGateLists(GateLists);

    //console.log(GateList);
  }, [dateValue, GateLists, filterGateLists]);


  const columns = [{
    dataField: 'firstName',
    text: 'Visitor Name',
    formatter: (cell, row) => {
      console.log(row);
      return <div>{`${row.firstName} ${row.lastName}`}</div>;
    }
  },
  {
    dataField: 'phone',
    text: 'Contact'
  }, {
    dataField: 'scanTime',
    text: 'Scan Time',
    sort: true
  },
  /* {
     dataField: '',
     text: 'entry'
   },
   {
     dataField: '',
     text: 'exit'
   },*/
  {
    dataField: 'comingFrom',
    text: 'Coming From'
  },
  {
    dataField: 'goingTo',
    text: 'Going To'
  },


  ];

  const defaultSorted = [{
    dataField: 'scanTime',
    order: 'desc'
  }];
  const marginstyle = {
    marginTop: '80px',
    marginLeft: '100px',
  };

  return (
    <div className='container'>
      <Navbar />
      <div className='row'>
        {/* <div className='col-md-3'><Calender/></div> */}
        <div className='col' style={marginstyle}>
          <div style={{ margin: "20px 10px 0px 80px", width: '100%' }}>
            <h1 style={{ textAlign: "center" }}>Visitors</h1>
            <br /><hr style={{ color: '#eee', stroke: '3px' }} />

            <br />
          </div>
          <br />
          <form noValidate>
            <TextField
              id="date"
              type="date"
              defaultValue=" "
              onChange={(event) => setdateValue(event.target.value)}
            />
          </form>
          <br />
          <Grid container>
            <Grid className="DateHead" item><h5>{DateTime.local().toFormat('dd LLLL yyyy')},</h5></Grid>
            <br />
            <Grid item><h5>{DateTime.local().toFormat('cccc')}</h5></Grid>

          </Grid>
          <br />

          {filterGateLists ? <BootstrapTable keyField='id' data={filterGateLists} columns={columns} defaultSorted={defaultSorted} /> : <center><CircularProgress /></center>}

          {/* <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow >
            <TableCell style= {{color:"#919a9c"}} >#</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Visitor Name</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Contact</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Vehicle No.</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Scan Time</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Coming From</TableCell>
            <TableCell style= {{color:"#919a9c"}} >Going To</TableCell>
            //<TableCell style= {{color:"#919a9c"}} >Signed in</TableCell>
            //<TableCell style= {{color:"#919a9c"}} >Signed out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {GateList && GateList.map((e, i) => {
                            return(
            <TableRow >
              <TableCell>
              {i+1}
              </TableCell>
              <TableCell>
              {e.firstName+e.lastName}
              </TableCell>
              <TableCell >
              {e.phone}
              </TableCell>
              <TableCell >
               {e.vehicleNo}
              </TableCell>
              <TableCell >
               {e.scanTime}
              </TableCell>
              <TableCell >
              {e.comingFrom}
              </TableCell>
              <TableCell >
               {e.goingTo} 
              </TableCell>
            </TableRow>
        )}
        )}
        </TableBody>
      </Table>
    </TableContainer> */}
        </div>
      </div>

    </div>
  )
}

export default GateList
