import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar/navbar'
import {getOperatorById} from '../../APICalls/auth'

import {Grid} from '@material-ui/core'
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';


import './parkingarea.scss'
const ParkingArea = () => {
    const [operator, setOperator] = useState("")
    useEffect(() => {
        const operatorId = JSON.parse(localStorage.getItem("jwt")).operator._id
        getOperatorById(operatorId)
           .then(res => {
               setOperator(res)
               console.log(res)
           })
           .catch(err => console.log(err))
    }, [])
    return (
        <div className="parkingArea">
            <Navbar />
            <div style={{marginLeft:"0px"}}>      
            <h1 style={{marginLeft:"280px"}}>Parking Area Real Time Stats</h1>   
            <div className="dashboard-container">
                <div className="capacity" >
                <h2>Vacant Space</h2>
                    <Grid container>
                        <Grid item >
                            <div className="car">
                            <DriveEtaIcon  style={{fontSize:"40"}}/>
                            <h4>{operator.vacant_car_space}</h4>
                            </div>
                        </Grid>

                        <Grid item >
                            <div className="bike">
                            <MotorcycleIcon  style={{fontSize:"40"}}/>
                            <h4>{operator.vacant_bike_space}</h4>
                            </div>
                        </Grid>
                    </Grid>
                </div>


                <div className="capacity">
                <h2>Weekly Report</h2>
                    <Grid container>
                        <Grid item >
                            <div className="car">
                            <DriveEtaIcon  style={{fontSize:"40"}}/>
                            <h4>{operator.car_w}</h4>
                            </div>
                        </Grid>

                        <Grid item >
                            <div className="bike">
                            <MotorcycleIcon  style={{fontSize:"40"}}/>
                            <h4>{operator.bike_w}</h4>
                            </div>
                        </Grid>
                    </Grid>
                </div>


                <div className="capacity">
                <h2>Monthly Report</h2>
                    <Grid container>
                        <Grid item >
                            <div className="car">
                            <DriveEtaIcon  style={{fontSize:"40"}}/>
                            <h4>{operator.car_m}</h4>
                            </div>
                        </Grid>

                        <Grid item >
                            <div className="bike">
                            <MotorcycleIcon  style={{fontSize:"40"}}/>
                            <h4>{operator.bike_m}</h4>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ParkingArea
