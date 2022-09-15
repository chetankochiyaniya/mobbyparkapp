import React,{useEffect,useState}  from 'react';
import {GetEmployeeById} from '../APICalls/employee'
import Navbar from './Navbar/navbar'

function EmployeeDashboard(){

    const [employeeDetails,setEmmployeeDetails] = useState("");
    const [operatorDetails,setOperatorDetails] = useState("");
    const [operatorID,setOperatorID] = React.useState('');

    useEffect(() => {
        const employeetoken = JSON.parse(localStorage.getItem("jwt")).token;
       const employeeid = JSON.parse(localStorage.getItem("jwt")).employee._id;
        GetEmployeeById(employeetoken,employeeid)
        .then(res => {
            setEmmployeeDetails(res)
            setOperatorID(res.operator);
            //console.log(employeeDetails);
   
            //console.log(" details ")
        })
        .catch(err => console.log(err))
    })

    return (
        <div class="container">
             <Navbar />

        </div>
    )
}

export default EmployeeDashboard;