import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { ReactComponent as SignupSvg } from '../../assets/undraw_fingerprint_swrc.svg'
import { css } from "@emotion/react";
import { PropagateLoader } from "react-spinners";
import './login.scss'
import Logo from '../../assets/footer-logo2.png'
import { authenticate, Login, getOperatorById } from '../../APICalls/auth'
import { EmployeeLogin, GetEmployeeById } from '../../APICalls/employee'
import Alert from '@material-ui/lab/Alert';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { SignalCellularNullOutlined } from '@material-ui/icons';

const Signin = () => {
    const override = css`
    display: block;
    margin-left:50%;
   `;
    const [values, setValues] = useState({
        email: '',
        password: '',
        loading: false,
        didRedirect: false,
        employeeRedirect: false,
    })
    const { email, password, loading, didRedirect, employeeRedirect } = values;

    const [error, setError] = useState('')
    const [value, setValue] = React.useState('operator');
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true });


        if (value === 'operator') {
            console.log("operator Login");
            Login({ email, password })
                .then(data => {

                    authenticate(data, () => {
                        if (sessionStorage.getItem("login") === 'true') {
                            sessionStorage.setItem("operator_car_rates", JSON.stringify(data.car_obj));
                            sessionStorage.setItem("operator_bike_rates", JSON.stringify(data.bike_obj));
                            setValues({
                                ...values,
                                didRedirect: true
                            })


                        }
                        else {
                            setValues({
                                ...values,
                                didRedirect: false
                            })
                            console.log(error)
                        }
                        //sessionStorage.removeItem("login")

                    })
                })
        }
        else {
            console.log("Employee Login")
            EmployeeLogin({ email, password })
                .then(data => {
                    authenticate(data, () => {
                        var car_obj = {
                            H0_2_wdcar: 110,
                            H0_2_wecar: 120,
                            H2_4_wdcar: 130,
                            H2_4_wecar: 150,
                            H4_6_wdcar: 200,
                            H4_6_wecar: 250,
                            H6_9_wdcar: 300,
                            H6_9_wecar: 340,
                            H9_12_wdcar: 370,
                            H9_12_wecar: 400,
                            H12_24_wdcar: 450,
                            H12_24_wecar: 500,
                            car_m: 10000,
                            car_w: 2000
                        };
                        var bike_obj = {
                            H0_2_wd: 2,
                            H0_2_we: 10,
                            H2_4_wd: 10,
                            H2_4_we: 20,
                            H4_6_wd: 30,
                            H4_6_we: 40,
                            H6_9_wd: 50,
                            H6_9_we: 60,
                            H9_12_wd: 70,
                            H9_12_we: 80,
                            H12_24_wd: 90,
                            H12_24_we: 100,
                            bike_m: 5000,
                            bike_w: 1000
                        }
                        if (sessionStorage.getItem("login") === 'true') {
                            sessionStorage.setItem("operator_car_rates", JSON.stringify(car_obj));
                            sessionStorage.setItem("operator_bike_rates", JSON.stringify(bike_obj));
                            setValues({
                                ...values,
                                employeeRedirect: true
                            })


                        }
                        else {
                            setValues({
                                ...values,
                                employeeRedirect: false
                            })

                        }
                        //sessionStorage.removeItem("login")

                    })
                })

        }
    }

    const performRedirect = () => {
        if (didRedirect) {
            return <Redirect to='/dashboard'></Redirect>
        }
        else if (employeeRedirect) {
            return <Redirect to='/employee-dashboard'></Redirect>
        }
        else {
            return <h6 style={{ color: '#FF0000' }}>
                {error}
            </h6>
        }
    }


    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };


    return (
        <div>
            <Grid className={"signup-container"} container spacing={0}>
                <Grid className="signup-left" item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <img className="logo-img" src={Logo} alt="" style={{ marginLeft: '3em' }} />

                    <div className="signup-form">
                        <h3 className="join-head">Login to get insights.</h3>
                        <h4 className="join-head-sub">All your parking facility insights on a single page.</h4>
                        <br />
                        <form className="signup-form-form">
                            <div className="form-control-div">
                                <input
                                    autoFocus
                                    required
                                    type="email"
                                    placeholder="john@gmail.com"
                                    onChange={handleChange("email")}
                                    value={email}

                                />
                            </div>

                            <div className="form-control-div">
                                <input
                                    required
                                    type="password"
                                    placeholder="*******"
                                    onChange={handleChange("password")}
                                    value={password}
                                />
                            </div>
                            <div className="form-control-div">
                                <FormControl component="fieldset">
                                    <RadioGroup row value={value} onChange={handleRadioChange}>
                                        <FormControlLabel value="operator" control={<Radio />} label="Operator" />
                                        <FormControlLabel value="employee" control={<Radio />} label="Employee" />
                                    </RadioGroup>
                                </FormControl>
                            </div>



                            <button onClick={onSubmit} className="signup-button">Login</button>
                            {loading &&
                                <PropagateLoader
                                    css={override}
                                    size={25}
                                    color={"#6C63FE"}
                                    loading={loading}
                                />
                            }
                        </form>
                        <br />
                        {performRedirect()

                        }
                    </div>
                </Grid>

                <Grid className="signup-right" item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <SignupSvg className="login-svg" />
                </Grid>
            </Grid>
        </div>
    )
}
export default Signin