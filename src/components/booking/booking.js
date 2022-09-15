import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Modal } from "react-responsive-modal";
import bike from "./icons/scooter.svg";
import car from "./icons/car.svg";
import { Link } from "react-router-dom";

import Navbar from "../Navbar/navbar";
import classNames from "classnames";
import { AddVehicleAPICall } from "../../APICalls/vehicle";
import { getOperatorById } from "../../APICalls/auth";
import { DateTime } from "luxon";
import { useStyles } from "./bookingStyles";
import Box from "@material-ui/core/Box";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./btnchng.css";

export default function Booking(props) {
  const classes = useStyles();
  const [vehicleNo, setVehicleNo] = useState("123 FQ");
  const [vehicleType, setVehicleType] = useState("Car");
  const [duration, setDuration] = useState(2);
  const [name, setName] = useState("Others");
  const [phone, setPhone] = useState("12345678");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [parkingName, setParkingName] = useState("NULL");
  const [parkingAddress, setParkingAddress] = useState("NULL");
  const [operator, setOperator] = useState("");
  const onOpenModal = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  let today = DateTime.local().toISO();
  //console.log(today);
  let cur = today.split("T")[1];
  //console.log(cur);
  var hr = cur.substring(0, 2);
  //console.log(hr);
  var rest = cur.substring(2, 12);
  //console.log(rest);
  hr = parseInt(hr);
  hr = String(hr % 24);
  //console.log(hr);
  var time = hr + rest;
  //console.log(time);
  var endDate;
  if (parseInt(parseInt(hr) + parseInt(duration)) >= 24) {
    endDate = DateTime.local().plus({ hours: 24 }).toISODate();
  } else {
    endDate = DateTime.local().toISODate();
  }

  var ISO_inTime = today.split("T")[0] + " " + cur.substring(0, 12);

  var ISO_expOutTime = endDate + " " + time;

  var pricing = 0;

  let checkweek = DateTime.now().weekday;

  if (vehicleType === "Car") {
    if (checkweek < 6) {
      pricing = JSON.parse(localStorage.getItem("jwt")).operator.B_wdcar;
    } else {
      pricing = JSON.parse(localStorage.getItem("jwt")).operator.B_wecar;
    }
  } else {
    if (checkweek < 6) {
      pricing = JSON.parse(localStorage.getItem("jwt")).operator.B_wdbike;
    } else {
      pricing = JSON.parse(localStorage.getItem("jwt")).operator.B_webike;
    }
  }

  useEffect(() => {
    setAmount(pricing);
    if (
      JSON.parse(localStorage.getItem("jwt")) !== null &&
      JSON.parse(localStorage.getItem("jwt")) !== undefined
    ) {
      if (
        JSON.parse(localStorage.getItem("jwt")).operator !== null &&
        JSON.parse(localStorage.getItem("jwt")).operator !== undefined
      ) {
        setParkingName(
          JSON.parse(localStorage.getItem("jwt")).operator.parking_name
        );
        setParkingAddress(
          JSON.parse(localStorage.getItem("jwt")).operator.parking_addr
        );
      }
    }
  });

  const printReceipt = (e) => {
    e.preventDefault();
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const user = {
      name: name,
      contact_no: phone,
      vehicle_no: vehicleNo,
      vehicle_type: vehicleType,
      in_time: ISO_inTime,
      exp_out_time: ISO_expOutTime,
      pricing: pricing,
    };

    const operatorToken = JSON.parse(localStorage.getItem("jwt")).token;
    console.log(operatorToken);
    AddVehicleAPICall(operatorToken, user)
      .then((res) => {
        console.log(res);

        if (res.errors) {
          setError(res.errors);
          setLoading(false);
        } else {
          setLoading(false);
          setOpenModal(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const marginstyle = {
    marginTop: "0px",
  };

  return (
    <>
      <Navbar />

      <Button
        variant="info"
        className="titleopt1"
        style={{ fontSize: "3.5vh" }}
        active
      >
        Get In
      </Button>

      <Link to="checkout">
        <Button
          variant="text"
          className="titleopt2"
          style={{ fontSize: "3.5vh", border: "1px solid #117a8b" }}
        >
          Checkout
        </Button>
      </Link>
      <div className={classes.container}>
        <div className="row" style={marginstyle}>
          <div className="col-lg-8">
            <br />

            <div className={classes.formDetails}>
              <Form>
                <Form.Row>
                  <Form.Group className="col-md-5">
                    <Form.Label>Vehicle Number</Form.Label>
                    <Form.Control
                      placeholder="User vehicle number"
                      onChange={(e) => setVehicleNo(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="col-md-6">
                    <Form.Label>Vehicle Name</Form.Label>
                    <div className={classNames(classes.prices1, "row")}>
                      <div>
                        <Button
                          className={classes.b6}
                          variant="outline-primary"
                          className={classes.activeTime}
                          onClick={(e) => {
                            e.preventDefault();
                            setName("Others");
                          }}
                        >
                          Others
                        </Button>
                      </div>
                      <div>
                        <Button
                          className={classes.b6}
                          variant="outline-primary"
                          className={classes.activeTime}
                          onClick={(e) => {
                            e.preventDefault();
                            setName("BMW");
                          }}
                        >
                          BMW
                        </Button>
                      </div>
                      <div>
                        <Button
                          className={classes.b6}
                          variant="outline-primary"
                          className={classes.activeTime}
                          onClick={(e) => {
                            e.preventDefault();
                            setName("Audi");
                          }}
                        >
                          Audi
                        </Button>
                      </div>
                      <div>
                        <Button
                          className={classes.b6}
                          variant="outline-primary"
                          className={classes.activeTime}
                          onClick={(e) => {
                            e.preventDefault();
                            setName("Mercedes");
                          }}
                        >
                          Mercedes
                        </Button>
                      </div>
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group className="col-md-5">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="phone"
                      placeholder="User phone number(optional)"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                </Form.Row>
              </Form>
            </div>

            <br />
            <h3> Select a vehicle</h3>

            <div className={classNames(classes.vehicles, "row")}>
              <div className="col-2 col-sm-2 ">
                <Button
                  variant="text"
                  style={{ background: "white" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setVehicleType("Bike");
                  }}
                  className={{
                    [classes.activeVehicle]: vehicleType === "Bike",
                  }}
                >
                  <div className={classes.bike}>
                    <img src={bike} alt="Bike Logo" />
                  </div>
                </Button>

                <p>Bike</p>
              </div>

              <div className="col-2 col-sm-2 carsel">
                <Button
                  variant="text"
                  style={{ background: "white" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setVehicleType("Car");
                  }}
                  className={{ [classes.activeVehicle]: vehicleType === "Car" }}
                >
                  <div className={classes.car}>
                    <img src={car} alt="Car Logo" />
                  </div>
                </Button>
                <p>Car</p>
              </div>
            </div>
            <br />

            <br />
            {/* <div className="buttonss">
                <Button   className="col-md-4 active">
                        <h4>Get IN</h4> 
                </Button>
                <Button  className="col-md-4">

                    <h4>Get OUT</h4> 
                </Button>
                <Button className="col-md-3">

                    <h4>Exit</h4> 
                    </Button>
                </div> */}
          </div>
          <div className="col-lg-4 bookings">
            <br />
            <h1>Booking</h1>
            <br />
            <br />
            <Button className={classes.amount}>
              <h4>Total Amount: &ensp; ₹ {amount}</h4>
            </Button>

            <hr />

            <br />

            <br />
            <Button onClick={onSubmit} className={classes.ticket}>
              <h5>Book</h5>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        showCloseIcon={false}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        open={openModal}
        onClose={onCloseModal}
        center
        styles={{ modal: { background: "#eee" } }}
      >
        <iframe
          title="Booking Receipt"
          id="ifmcontentstoprint"
          style={{ height: "0px", width: "0px", position: "absolute" }}
        >
          <div id="divcontents" class={classes.receipt}>
            <center>
              <span>{`${parkingName}`}</span>
            </center>
            <center>
              <span>{`${parkingAddress}`}</span>
            </center>
            <br />
            <center>
              <p>======================================</p>
            </center>
            <center>
              <p> PARKING RECEIPT</p>
            </center>
            <center>
              <p>======================================</p>
            </center>
            <br />
            <div>
              <span style={{ float: "left" }}>{`${vehicleType}`} PARK:</span>{" "}
              <span
                style={{ float: "right", marginLeft: "100px" }}
              >{`${vehicleNo}`}</span>
              <br />
              <span style={{ float: "left" }}>Vehicle Name</span>{" "}
              <span
                style={{ float: "right", marginLeft: "100px" }}
              >{`${name}`}</span>
              <br />
              <span style={{ float: "left" }}>DATE:</span>{" "}
              <span style={{ float: "right", marginLeft: "100px" }}>{`${today.split("T")[0]
                }`}</span>
              <br />
              <span style={{ float: "left" }}>FROM:</span>{" "}
              <span
                style={{ float: "right", marginLeft: "50px" }}
              >{`${ISO_inTime.replace("T", " ")}`}</span>
              <br />
              <span style={{ float: "left" }}>TO:</span>{" "}
              <span
                style={{ float: "right", marginLeft: "50px" }}
              >{`${ISO_expOutTime.replace("T", " ")}`}</span>
              <br />
              <br />
              <span style={{ float: "left" }}>PAID:</span>{" "}
              <span style={{ float: "right", marginLeft: "100px" }}>
                {" "}
                &#8377; {`${pricing}`}
              </span>
              <br />
            </div>{" "}
            <br /> <br />
            <center>
              <p style={{ fontWeight: "bold" }}>THANK YOU AND DRIVE SAFELY!</p>
            </center>
          </div>
          <br /> <br />
        </iframe>
        <div class={classes.receipt}>
          <center>
            <span>{`${parkingName}`}</span>
          </center>
          <center>
            <span>{`${parkingAddress}`}</span>
          </center>
          <br />
          <center>
            <p>======================================</p>
          </center>
          <center>
            <p> PARKING RECEIPT</p>
          </center>
          <center>
            <p>======================================</p>
          </center>
          <br />
          <div>
            <span style={{ float: "left" }}>{`${vehicleType}`} PARK:</span>{" "}
            <span
              style={{ float: "right", marginLeft: "100px" }}
            >{`${vehicleNo}`}</span>
            <br />
            <span style={{ float: "left" }}>Vehicle Name</span>{" "}
            <span
              style={{ float: "right", marginLeft: "100px" }}
            >{`${name}`}</span>
            <br />
            <span style={{ float: "left" }}>DATE:</span>{" "}
            <span style={{ float: "right", marginLeft: "100px" }}>{`${today.split("T")[0]
              }`}</span>
            <br />
            <span style={{ float: "left" }}>FROM:</span>{" "}
            <span
              style={{ float: "right", marginLeft: "50px" }}
            >{`${ISO_inTime.replace("T", " ")}`}</span>
            <br />
            <span style={{ float: "left" }}>TO:</span>{" "}
            <span
              style={{ float: "right", marginLeft: "50px" }}
            >{`${ISO_expOutTime.replace("T", " ")}`}</span>
            <br />
            <br />
            <span style={{ float: "left" }}>PAID:</span>{" "}
            <span style={{ float: "right", marginLeft: "100px" }}>
              {" "}
              &#8377; {`${pricing}`}
            </span>
            <br />
          </div>{" "}
          <br /> <br />
          <center>
            <p style={{ fontWeight: "bold" }}>THANK YOU AND DRIVE SAFELY!</p>
          </center>
        </div>
        <br /> <br />
        <center>
          <p style={{ fontWeight: "bold", color: "green" }}>
            Booking Successfull !!!
          </p>
          <button onClick={printReceipt} className="btn btn-primary">
            Print
          </button>
        </center>
        <button
          onClick={onCloseModal}
          className="btn btn-danger"
          style={{ float: "right" }}
        >
          Close
        </button>
      </Modal>
    </>
  );
}
