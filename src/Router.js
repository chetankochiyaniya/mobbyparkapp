import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import Login from './components/login/login'
import Dashboard from './components/Dashboard/dashboard'
import ParkingArea from './components/ParkingArea/parkingArea'
import Information from './components/Information/information'
import PrivateRoute from './APICalls/PrivateRoutes'
import Schedule from './components/schedule/schedule'
import Employee from './components/employee/employee'
import GateList from './components/GateList/GateList'
import booking from './components/booking/booking'
import Resident from './components/Resident/Resident'
import EmployeeDashboard from './components/Employee-dashboard'
import { GetEmployeeById } from './APICalls/employee'
import checkout from './components/booking/checkout'
export default function Router() {


    const [employeeDetails, setEmmployeeDetails] = useState("");
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("jwt")) !== null && JSON.parse(localStorage.getItem("jwt")) !== undefined) {
            if (JSON.parse(localStorage.getItem("jwt")).employee !== null && JSON.parse(localStorage.getItem("jwt")).employee !== undefined) {
                console.log("test --")
                const employeetoken = JSON.parse(localStorage.getItem("jwt")).token;
                const employeeid = JSON.parse(localStorage.getItem("jwt")).employee._id;
                GetEmployeeById(employeetoken, employeeid)
                    .then(res => {
                        setEmmployeeDetails(res)
                    })
                    .catch(err => console.log(err))

            }
        }

    })
    if (JSON.parse(localStorage.getItem("jwt")) !== null && JSON.parse(localStorage.getItem("jwt")) !== undefined) {
        if (JSON.parse(localStorage.getItem("jwt")).employee !== null && JSON.parse(localStorage.getItem("jwt")).employee !== undefined) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        {employeeDetails.booking ? <PrivateRoute exact path="/booking" component={booking} /> : null}
                        {employeeDetails.checkout ? <PrivateRoute exact path="/checkout" component={checkout} /> : null}
                        {employeeDetails.dashboard ? <PrivateRoute exact path="/dashboard" component={Dashboard} /> : null}
                        {employeeDetails.addvehicle ? <PrivateRoute exact path="/information" component={Information} /> : null}
                        {employeeDetails.gate_qr ? <PrivateRoute exact path="/gatelist" component={GateList} /> : null}
                        <PrivateRoute exact path="/parking" component={ParkingArea} />
                        <PrivateRoute exact path="/schedule" component={Schedule} />
                        <PrivateRoute exact path="/employee-dashboard" component={EmployeeDashboard} />
                    </Switch>
                </BrowserRouter>

            )
        }
        else {
            return (
                <BrowserRouter>
                    <Switch>

                        <Route exact path="/" component={Login} />
                        <PrivateRoute exact path="/booking" component={booking} />
                        <PrivateRoute exact path="/checkout" component={checkout} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/information" component={Information} />
                        <PrivateRoute exact path="/gatelist" component={GateList} />
                        <PrivateRoute exact path="/parking" component={ParkingArea} />
                        <PrivateRoute exact path="/schedule" component={Schedule} />
                        <PrivateRoute exact path="/employee" component={Employee} />
                        <PrivateRoute exact path="/resident" component={Resident} />
                        <PrivateRoute exact path="/employee-dashboard" component={EmployeeDashboard} />
                    </Switch>
                </BrowserRouter>

            )
        }
    }

    else {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                </Switch>
            </BrowserRouter>
        )
    }
}