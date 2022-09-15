import React, {useState , useEffect} from 'react'
import { css } from "@emotion/core";
import {PropagateLoader} from "react-spinners";
import './add.scss'
import {AddEmployeeAPICall} from '../../APICalls/employee'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';
function AddEmployee(props) {
    const override = css`
    display: block;
    margin-left:50%;
    margin-top:10vh;
   `;


    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [state, setState] = React.useState({
        addvehicle_check: false,
        booking_check: false,
        gateqr_check: false,
        dashboard_check: false,
    });

    useEffect(() => {
        console.log(state)
    })
    

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const operatorToken = JSON.parse(localStorage.getItem("jwt")).token;
        const operatorId = JSON.parse(localStorage.getItem("jwt")).operator._id;
        const user = {
            email:email,
            password:password,
            phone:phone,
            operator:operatorId,
            addvehicle:state.addvehicle_check,
            booking:state.booking_check,
            gate_qr:state.gateqr_check,
            dashboard:state.dashboard_check
        }
        
    
        //console.log(operatorToken)
        AddEmployeeAPICall(operatorToken, user)
            .then(res => {
                console.log(res)
                if(res.errors){
                    setError(res.errors)
                    setLoading(false)
                }
                else{
                    setLoading(false)
                    props.setOpenModal(false)
                }
                
            })
            .catch(err =>{
                console.log(err)
                setLoading(false)
            })
    }
    const renderError = () => {
        if(error){
            return(
                error.map(e => {
                    return (
                        <div>
                             <h6 style={{color:"red"}}>{e.msg}</h6>
                        </div>
                       
                    )
                })
            )
        }
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <div>
        <h1>Add New Employee</h1>
            <form>
                <div className="addEmployeeForm">
                        
                       
                            <div className="form-control-div">
                                <input
                                 autoFocus
                                 required 
                                 type="email" 
                                 placeholder="john@gmail.com"
                                 onChange={(e) => setEmail(e.target.value)}
                                 value={email}

                                 />
                            </div>

                            <div className="form-control-div">
                                <input 
                                required 
                                type="tel" 
                                placeholder="+91- 98xxxxxxxx"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                />
                            </div>

                            <div className="form-control-div">
                                <input 
                                required 
                                type="password" 
                                placeholder="*******"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                />
                            </div>
                            <div className="form-control-div">
                            <h6>Access :</h6>
                            <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="addvehicle_check"
                                        color="primary"
                                    />
                                    }
                                    label="Add Vehicle"
                            />
                            <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="booking_check"
                                        color="primary"
                                    />
                                    }
                                    label="Booking"
                            />
                            <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="gateqr_check"
                                        color="primary"
                                    />
                                    }
                                    label="Gate QR"
                            />
                            <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={state.checkedB}
                                        onChange={handleChange}
                                        name="dashboard_check"
                                        color="primary"
                                    />
                                    }
                                    label="Dashboard"
                            />
                            </div>
                            
                            <button onClick={onSubmit}  className="btn">Add</button>
                            {renderError()}
                            {loading && 
                                <PropagateLoader
                                    css={override}
                                    size={15}
                                    color={"#6C63FE"}
                                    loading={loading}
                                />
                            }
                       
                        
                    </div>
            </form>
        </div>
    )
}

export default AddEmployee
