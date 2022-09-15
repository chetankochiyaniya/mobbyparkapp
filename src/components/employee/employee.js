import React, {useEffect} from 'react'
import Navbar from '../Navbar/navbar'
import AddEmployee from '../AddEmployeeModal/addEmployee';
import { Modal } from 'react-responsive-modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {GetAllEmployees} from '../../APICalls/employee';
import {Table} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import Notification from "../Notification";
import {API} from "../../backend";
import axios from 'axios'
import "./employee-media.css";
import CircularProgress from '@material-ui/core/CircularProgress';

function Employee() {

    const [openModal, setOpenModal] = React.useState(false)
    const [allEmployees, setAllEmployees] = React.useState("")

    useEffect(() => {
      const operatorToken = JSON.parse(localStorage.getItem("jwt")).token;
      GetAllEmployees(operatorToken)
        .then(res => {
          console.log(res)
          setAllEmployees(res)
        })
        .catch(err => console.log(err))
    }, [openModal,allEmployees])
    
    const onOpenModal = () => {
        setOpenModal(true );
      };
     
     const onCloseModal = () => {
        setOpenModal(false);
      };

      function deleteEmployee(id){
        const operatorToken = JSON.parse(localStorage.getItem("jwt")).token;
        axios.delete(`${API}/api/operator/auth/operator/employee/${id}`,{
          headers:{
            "x-auth-token" :operatorToken
          }
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err))
      }

      const columns = [  
      {
        dataField: 'email',
        text: 'Email',
      },
      {
        dataField: 'phone',
        text: 'Phone'
      }, 
      {
        dataField: 'addvehicle',
        text: 'Add Vehicle',
        formatter:(cell,row) =>{
          return <div>{(`${row.addvehicle}` === 'true')? <span>&#9989;</span> : <span>&#10060;</span>}</div>
        }
      }, 
      {
        dataField: 'booking',
        text: 'Booking',
        formatter:(cell,row) =>{
          return <div>{(`${row.booking}` === 'true')? <span>&#9989;</span> : <span>&#10060;</span>}</div>
        }
      }, 
      {
        dataField: 'gate_qr',
        text: 'Gate QR',
        formatter:(cell,row) =>{
          return <div>{(`${row.gate_qr}` === 'true')? <span>&#9989;</span> : <span>&#10060;</span>}</div>
        }
      }, 
      {
        dataField: 'dashboard',
        text: 'Dashboard',
        formatter:(cell,row) =>{
          return <div>{(`${row.dashboard}` === 'true')? <span>&#9989;</span> : <span>&#10060;</span>}</div>
        }
      },
      {
        dataField: '_id',
        text: '',
        formatter:(cell,row) =>{
          return <center><button className="btn btn-danger" onClick={() => deleteEmployee(row._id)}>Delete</button></center>
        }
      }
    ];
    
    return (
        <div class="container"> 
            <Navbar />
            <div style={{marginLeft:"70px", marginTop:"80px"}}>
                <h1 style={{textAlign:"center"}}>Employee Management</h1>
                <br /><hr style={{color:'#eee',stroke:'3px'}}/>
                <Button onClick={onOpenModal} style={{float:"right", marginRight:"10vw", marginTop:"4vh",marginBottom:"3vh"}} variant="contained" color="primary">
                    Add Employee
                </Button>


                <br /><br />
              {allEmployees?<BootstrapTable stripped hover keyField='id' data={ allEmployees } columns={ columns }  /> : <center><CircularProgress /></center>}
                {/* <Table style={{marginTop: "20px", width:"80%", marginLeft:"10%"}} responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          allEmployees && 
                          allEmployees.map((e, i) => {
                            return(
                              <tr>
                                <td>{i+1}</td>
                                <td>{e.email}</td>
                                <td>{e.phone}</td>
                              </tr>
                            )
                          })
                        }

                       
                    </tbody>
                    </Table> */}
             
            </div>

               






                 {/* Add Employee Modal */}

            <Modal closeOnEsc={false} closeOnOverlayClick={false} open={openModal} onClose={onCloseModal} center>
                <AddEmployee setOpenModal={setOpenModal} onCloseModal={onCloseModal} />
            </Modal>
        </div>
    )
}

export default Employee
