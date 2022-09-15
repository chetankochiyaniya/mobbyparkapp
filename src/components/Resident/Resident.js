import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/navbar';
import axios from 'axios';
import { API } from '../../backend';
import { GetResidents } from '../../APICalls/resident'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import BootstrapTable from 'react-bootstrap-table-next';
import QRCode from "qrcode.react";

const useStyles = makeStyles((theme) => ({
    qrcode: {
        display: 'inline-block',
        position: 'absolute',
        bottom: '25%',
        top: '50%',
        right: '20%',
    },
    qrcodecanvas: {
        display: 'none',
    }
}));

export default function Resident() {

    const classes = useStyles();
    var operatortoken = JSON.parse(localStorage.getItem("jwt")).token

    // const [selectedFile , setSelectedFile] = useState('');

    // const handleInputChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    // }
    const [residents, setResidents] = useState("");

    const [resident, setResident] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        vehicleNo: "",
        company: "",
        flatNum: "",
    });

    const {
        firstName,
        lastName,
        phone,
        vehicleNo,
        company,
        flatNum,
    } = resident

    const [ResidentQr, setResidentQr] = useState('')

    useEffect(() => {

        GetResidents(operatortoken)
            .then(res => {
                setResidents(res)
            })
            .catch(err => console.log(err))

        //eslint-disable-next-line
    }, []);

    const GetResidentQr = (data) => {
        // console.log(true)
        return fetch(`${API}/api/operator/auth/operator/getResidentQR`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": operatortoken
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                // console.log(response)
                return response.json()
            })
            .catch(err => console.log(err))
    }

    const downloadQRCode = (data) => {
        GetResidentQr(data)
            .then(res => {
                console.log(res.encyString);
                setResidentQr(res.encyString);
                const canvas = document.getElementById("qr-download");
                const pngUrl = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");
                let downloadLink = document.createElement("a");
                downloadLink.href = pngUrl;
                downloadLink.download = `residentQR.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            })
            .catch(err => console.log(err))
    };

    // const downloadButton = (cell, row, rowIndex, formatExtraData) => {
    //     // console.log("ROW:", row.vehicleNo)
    //     return (
    //         <div>
    //             <input
    //                 type='submit'
    //                 value='Download'
    //                 className='btn'
    //                 style={{
    //                     background: "#f9b401",
    //                     margin: "auto",
    //                     display: "block",
    //                 }}
    //                 onClick={() => {
    //                     console.log(row)
    //                     downloadQRCode(row);
    //                 }}
    //             />
    //         </div>
    //     );
    // };

    var i = 0;
    const columns = [
        {
            dataField: 'i',
            text: '#',
            formatter: (cell) => {
                i = i + 0.5;
                return (i.toFixed(0));
            },
            sort: true
        },
        {
            dataField: 'firstName',
            text: 'First Name',
        },
        {
            dataField: 'lastName',
            text: 'Last Name',
        },
        {
            dataField: 'phone',
            text: 'Phone'
        },
        {
            dataField: 'vehicleNo',
            text: 'Vehicle Number',
        },
        {
            dataField: 'company',
            text: 'Company'
        },
        {
            dataField: 'flatNum',
            text: 'Flat Number'
        },
        //QR code for every resident
        {
            dataField: "Download QR",
            text: "Download QR",
            isDummyField: true,
            formatter: (cell, row) => {
                return (
                    <div>
                        <input
                            type='submit'
                            value='Download'
                            className='btn'
                            style={{
                                background: "#f9b401",
                                margin: "auto",
                                display: "block",
                            }}
                            onClick={() => {
                                console.log(row)
                                downloadQRCode(row);
                            }}
                        />
                    </div>
                );
            }
            // downloadButton
        }
    ];

    const onChange = (e) => {
        setResident({
            ...resident,
            [e.target.name]: e.target.value
        })
    };

    const submit = async (e) => {
        e.preventDefault();
        var form = new FormData();
        // var file = document.querySelector('#file');
        // form.append("file", file.files[0], { type: 'text/csv' });
        // await axios.post(`${API}/api/operator/auth/operator/uploadcsv`, form, { 
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         'x-auth-token': operatortoken,
        //     },
        // })
        // .then(res => { 
        //     console.log("uploaded")
        //     console.log(res);
        // })
        // .catch((error) => {
        //     console.log("error")
        //     console.log(error.response)
        // })

        form.append("firstName", firstName);
        form.append("lastName", lastName);
        form.append("phone", phone);
        form.append("vehicleNo", vehicleNo);
        form.append("company", company);
        form.append("flatNum", flatNum);

        try {
            const result = await axios.post(`${API}/api/operator/auth/operator/addResident`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': operatortoken,
                },
            })
            console.log(result);

        } catch (err) {
            console.log("error")
            console.log(err.response)
        }

    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row" style={{ marginLeft: '7em' }}>
                    {/* <div className="col-md-6 offset-md-3"> */}
                    <br /><br />
                    <br />
                    <form onSubmit={submit}>
                        {/* <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <fieldset>
                                        <label className="text-white">Select File :</label>
                                        <input id="file" type="file" className="form-control" name="file" accept=".csv" onChange={(e) => handleInputChange(e)} />
                                    </fieldset>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <button type="submit" className="btn btn-dark">UploadCSV</button>
                                    </div>
                                </div>
                                 */}
                        <div className="form-row">
                            <label htmlFor='firstName'>
                                First Name
                                {/* {" "}
                                <span style={{ color: "red", fontSize: "20px" }}>*</span> */}
                            </label>
                            <input
                                type='text'
                                name='firstName'
                                className='form-control'
                                value={firstName}
                                onChange={onChange}
                            />
                            <label htmlFor='lastName'>
                                Last Name
                                {/* {" "}
                                <span style={{ color: "red", fontSize: "20px" }}>*</span> */}
                            </label>
                            <input
                                type='text'
                                name='lastName'
                                className='form-control'
                                value={lastName}
                                onChange={onChange}
                            />
                            <label htmlFor='phone'>
                                Mobile Number{" "}
                                <span style={{ color: "red", fontSize: "20px" }}>*</span>
                            </label>
                            <input
                                type='number'
                                name='phone'
                                className='form-control'
                                value={phone}
                                onChange={onChange}
                            />
                            <label htmlFor='vehicleNo'>
                                Vehicle Number{" "}
                                <span style={{ color: "red", fontSize: "20px" }}>*</span>
                            </label>
                            <input
                                type='text'
                                name='vehicleNo'
                                className='form-control'
                                value={vehicleNo}
                                onChange={onChange}
                            />
                            <label htmlFor='company'>
                                Company
                                {/* {" "}
                                <span style={{ color: "red", fontSize: "20px" }}>*</span> */}
                            </label>
                            <input
                                type='text'
                                name='company'
                                className='form-control'
                                value={company}
                                onChange={onChange}
                            />
                            <label htmlFor='flatNum'>
                                Flat Number
                                {/* {" "}
                                <span style={{ color: "red", fontSize: "20px" }}>*</span> */}
                            </label>
                            <input
                                type='text'
                                name='flatNum'
                                className='form-control'
                                value={flatNum}
                                onChange={onChange}
                            />
                        </div>
                        <div className='spacer2'></div>
                        <input
                            type='submit'
                            value='Add'
                            className='btn'
                            style={{
                                background: "#f9b401",
                                margin: "auto",
                                display: "block",
                                width: "40%",
                                marginTop: "1em"
                            }}
                        />
                        <hr />
                    </form>
                    <BootstrapTable keyField='id' data={residents} columns={columns} />
                    <div id="qrcode">
                        <QRCode
                            id="qr-download"
                            value={ResidentQr}
                            size={250}
                            level={"H"}
                            includeMargin={true}
                            className={classes.qrcodecanvas}
                        />
                        {/* {console.log(ResidentQr)} */}
                    </div>
                    {/* </div> */}
                </div>

            </div>
        </div>
    )
}