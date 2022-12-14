import NavBar from '../Navbar/navbar';
import "./dashboard.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from "react-dom";
import { Chart } from "react-google-charts";

import React, { useEffect, useState } from "react";
import google from "react-google-charts"

import { GetOperatorEarnings, GetVehicleInfo, GetOperatorEarningsSlot } from '../../APICalls/vehicle'


function Dashboard() {

    const [vehicleInfo, setVehicleInfo] = useState("")
    const [operatorEarnings, setOperatorEarnings] = useState("")
    const [operatorEarningsSlot, setOperatorEarningsSlot] = useState("")


    useEffect(() => {
        const operatorToken = JSON.parse(localStorage.getItem("jwt")).token;
        GetVehicleInfo(operatorToken)
            .then(res => {
                setVehicleInfo(res)
            })
            .catch(err => console.log(err))

        GetOperatorEarnings(operatorToken)
            .then(res => {
                setOperatorEarnings(res)
            })
            .catch(err => console.log(err))

        GetOperatorEarningsSlot(operatorToken)
            .then(res => {
                setOperatorEarningsSlot(res)
            })
            .catch(err => console.log(err))

        //eslint-disable-next-line
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="d-flex">
                        <div className="item chart-bg" style={{ marginTop: '1em' }}>
                            <br /><center><h6>CAR</h6></center>
                            <div className="chart_wrap">
                                <Chart
                                    width={'200px'}
                                    height={'auto'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Category', 'Capacity'],
                                        ['Used', vehicleInfo.carsLeft],   //carsLeft = cars still left in parking
                                        ['UnUsed', vehicleInfo.carCapacity - vehicleInfo.carsLeft],
                                    ]}
                                    options={{
                                        legend: 'none',
                                        pieHole: 0.4,
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </div>
                            <div className="chart-grid-container justify-content-center">
                                <div className="item-a">Total</div>
                                <div className="item-a">Used</div>
                                <div className="item-a">{vehicleInfo.carCapacity}</div>
                                <div className="item-a">{vehicleInfo.carsLeft}</div>
                            </div>
                        </div>
                        <div className="item chart-bg" style={{ marginLeft: '2em', marginTop: '1em' }}>
                            <br /><center><h6>BIKE</h6></center>
                            <div className="chart_wrap">
                                <Chart
                                    width={'200px'}
                                    height={'auto'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Category', 'Capacity'],
                                        ['Used', vehicleInfo.bikesLeft], //bikesLeft = bikes still left in parking
                                        ['UnUsed', vehicleInfo.bikeCapacity - vehicleInfo.bikesLeft],
                                    ]}
                                    options={{
                                        legend: 'none',
                                        pieHole: 0.4,
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </div>
                            <div className="chart-grid-container justify-content-center">
                                <div className="item-a">Total</div>
                                <div className="item-a">Used</div>
                                <div className="item-a">{vehicleInfo.bikeCapacity}</div>
                                <div className="item-a">{vehicleInfo.bikesLeft}</div>
                            </div>
                        </div>
                        <div className="item chart-bg" style={{ marginLeft: '2em', marginTop: '1em' }}>
                            <br /><center><h6>Auto</h6></center>
                            <div className="chart_wrap">
                                <Chart
                                    width={'200px'}
                                    height={'auto'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Category', 'Capacity'],
                                        ['Used', vehicleInfo.carsLeft],   //carsLeft = cars still left in parking
                                        ['UnUsed', vehicleInfo.carCapacity - vehicleInfo.carsLeft],
                                    ]}
                                    options={{
                                        legend: 'none',
                                        pieHole: 0.4,
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </div>
                            <div className="chart-grid-container justify-content-center">
                                <div className="item-a">Total</div>
                                <div className="item-a">Used</div>
                                <div className="item-a">{vehicleInfo.carCapacity}</div>
                                <div className="item-a">{vehicleInfo.carsLeft}</div>
                            </div>
                        </div>
                        <div className="item chart-bg" style={{ marginLeft: '2em', marginTop: '1em' }}>
                            <br /><center><h6>PAYMENT</h6></center>
                            <div className="chart_wrap">
                                <Chart
                                    width={'200px'}
                                    height={'auto'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Mode', 'Count'],
                                        ['Digital', operatorEarnings.digitalPay],
                                        ['Cash', operatorEarnings.cashPay],
                                    ]}
                                    options={{
                                        legend: 'none',
                                        pieHole: 0.4,
                                        backgroundColor: 'transparent',
                                    }}
                                />
                            </div>
                            <div className="chart-grid-container justify-content-center">
                                <div className="item-a">Digital</div>
                                <div className="item-a">Cash</div>
                                <div className="item-a">{operatorEarnings.digitalPay}</div>
                                <div className="item-a">{operatorEarnings.cashPay}</div>
                            </div>
                        </div>
                        <div className="card chart_2" style={{ marginLeft: '3em', marginTop: '1em', borderRadius: '26px' }}>
                            <br /><center><h6>MONTHLY EARNINGS</h6></center>
                            <div className="chart_wrapper">
                                <Chart
                                    width={'300px'}
                                    height={'300px'}
                                    chartType="PieChart"
                                    loader={<div>Loading Chart</div>}
                                    data={[
                                        ['Month', 'Earnings'],
                                        [operatorEarnings.month, operatorEarnings.monthlyEarnings]
                                    ]}
                                    options={{
                                        legend: 'none',
                                        pieHole: 0.5,
                                        backgroundColor: 'transparent',
                                        colors: ["#ffffff", '#855CF8', '#EECC19', '#19EE95']
                                    }}
                                />
                            </div>
                            <div className="chart2-grid-container">
                                <div className="item-a" style={{ color: '#fff', fontSize: '20px' }}>Total</div>
                                <div className="item-a" style={{ color: '#9292C1', fontSize: '20px' }}>{operatorEarnings.monthlyEarnings}</div>
                                <div className="item-a" style={{ color: '#fff', fontSize: '20px' }}>Digital</div>
                                <div className="item-a" style={{ color: '#9292C1', fontSize: '20px' }}>{operatorEarnings.monthly_digitalPay}</div>
                                <div className="item-a" style={{ color: '#fff', fontSize: '20px' }}>Cash</div>
                                <div className="item-a" style={{ color: '#9292C1', fontSize: '20px' }}>{operatorEarnings.monthly_cashPay}</div>
                                <div className="item-a" style={{ color: '#fff', fontSize: '20px' }}>Online</div>
                                <div className="item-a" style={{ color: '#9292C1', fontSize: '20px' }}>{operatorEarnings.monthly_earnings_booking}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="container chart_3 mgt">
            <div className="row">
                    <div className="d-flex">
                <div className="col-10 item chart_3_wrapper ml-3 pr-5"> <br />
                    <center><h6 style={{ color: '#000' }}>Earnings</h6></center>
                    <div className="row">
                <center><h6 style={{ marginLeft: '4em', position: 'absolute' }}> Today's Earnings: {operatorEarnings.earnings}</h6></center>
            </div>
                    <Chart
                        width={'700px'}
                        height={'300px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Day', 'Earnings'],
                            ['Sun', 2000],
                            ['Mon', 3000],
                            ['Tue', 2000],
                            ['Wed', 4000],
                            ['Thu', 2000],
                            ['Fri', 3000],
                            ['Sat', 4000],
                        ]}
                        options={{
                            legend: 'none',
                            backgroundColor: 'transparent',
                            hAxis: {
                                title: 'Day',
                            },
                            vAxis: {
                                title: 'Earnings',
                            },
                        }}
                    />
                </div>
            </div>
            

            <div className="row users_wrap rmgt">
                <center><h6>Booking [ 7 days ]</h6>
                    <div className="user" style={{ color: 'white' }}> <h6><br />Employee Name&nbsp;<span style={{ color: '#666666' }}>90</span></h6></div>
                    <div className="user" style={{ color: 'white' }}> <h6><br />Employee Name&nbsp;<span style={{ color: '#666666' }}>90</span></h6></div>
                    <div className="user" style={{ color: 'white' }}> <h6><br />Employee Name&nbsp;<span style={{ color: '#666666' }}>90</span></h6></div>
                    <div className="user" style={{ color: 'white' }}> <h6><br />Employee Name&nbsp;<span style={{ color: '#666666' }}>90</span></h6></div>

                </center>
            </div>
            </div>
            </div>


            <div className="row weakly-rates">
                <center><h6 style={{ marginLeft: '6em', marginTop: '7px', position: 'absolute', left: '18em' }}> Today's Slot Earnings</h6></center>
                <h6 style={{ marginLeft: '8em', marginTop: '35px', position: 'absolute', }}> 10AM - 10PM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Digital: {operatorEarningsSlot.digitalPay_10am_10pm} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cash: {operatorEarningsSlot.cashPay_10am_10pm}</h6>
                <h6 style={{ marginLeft: '8em', marginTop: '65px', position: 'absolute', }}> 10PM - 10AM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Digital: {operatorEarningsSlot.digitalPay_10pm_10am} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Cash: {operatorEarningsSlot.cashPay_10pm_10am}</h6>
            </div>
        </>
    );

}

export default Dashboard;


