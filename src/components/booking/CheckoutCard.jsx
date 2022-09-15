import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import bike from "./icons/scooter.svg";
import car from "./icons/car.svg";
import "./checkout.css";
import { DateTime } from "luxon";


function CheckoutCard(props) {
  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onCheckout = () => {setCheck(true)};
  
  {/*let checkin = props.in_time
  //console.log(checkin);
  
  let dur1 = DateTime.now().diff(checkin, ["minutes"]);
  let dur2 = DateTime.now().diff(checkin, ["hours"]);
  //console.log(dur1);
  //console.log(dur2);
  let durhr = dur2.hours;
  //console.log(durhr);
  let durmin = dur1.minutes;
  //console.log(durmin);
  
  let mindur = Math.trunc(durmin);
  let hrdur = Math.trunc(durhr);
  
  //console.log(mindur);
  //console.log(hrdur);
  
  let adcost = 0;
  
  if (mindur % 60 < 5) {
    if (hrdur != 0) {
      hrdur = hrdur - 1;
    }
  }
  
  if (mindur % 60 == 59) {
    hrdur = hrdur + 1;
  }
  
  if (props.vehicle_type == "Car") {
    if (hrdur >= 12) {
      if (DateTime.now().weekday <= 5) {
        adcost =
          JSON.parse(localStorage.getItem("jwt")).car_obj.hr24_wdcar -
          JSON.parse(localStorage.getItem("jwt")).car_obj.B_wdcar;
      } else {
        adcost =
          JSON.parse(localStorage.getItem("jwt")).car_obj.hr24_wecar -
          JSON.parse(localStorage.getItem("jwt")).car_obj.B_wecar;
      }
    } else {
      let basehr = JSON.parse(localStorage.getItem("jwt")).car_obj.B_hourcar;
      if (hrdur <= basehr) {
        adcost = 0;
      } else {
        let time = 1;
        while (
          time * JSON.parse(localStorage.getItem("jwt")).car_obj.IncRate_hourcar <
          hrdur - basehr
        ) {
          time = time + 1;
        }
        adcost =
          time * JSON.parse(localStorage.getItem("jwt")).car_obj.IncRate_costcar;
      }
    }
  } else {
    if (hrdur >= 12) {
      if (DateTime.now().weekday <= 5) {
        adcost =
          JSON.parse(localStorage.getItem("jwt")).bike_obj.hr24_wdbike -
          JSON.parse(localStorage.getItem("jwt")).bike_obj.B_wdbike;
      } else {
        adcost =
          JSON.parse(localStorage.getItem("jwt")).bike_obj.hr24_webike -
          JSON.parse(localStorage.getItem("jwt")).bike_obj.B_webike;
      }
    } else {
      let basehr = JSON.parse(localStorage.getItem("jwt")).bike_obj.B_hourcar;
      if (hrdur <= basehr) {
        adcost = 0;
      } else {
        let time = 1;
        while (
          time *
            JSON.parse(localStorage.getItem("jwt")).bike_obj.IncRate_hourbike <
          hrdur - basehr
        ) {
          time = time + 1;
        }
        adcost =
          time *
          JSON.parse(localStorage.getItem("jwt")).bike_obj.IncRate_costbike;
      }
    }
  }
  
let totalcost=adcost+props.pricing;*/}
 

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Col>
        <Card style={{border: check ? '1px solid green' : '1px solid black'}} sx={{ minWidth: 100 }} variant="outlined">
          <CardContent >
            <Typography variant="h5" component="div">
              {props.vehicle_no}
            </Typography>
            <Typography variant="body2">
              <strong>In-Time:</strong> {props.in_time}
              <br />
              <strong>Vehicle Type: </strong> {props.vehicle_type}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleOpen} size="small">
              DETAILS
            </Button>
          </CardActions>
        </Card>
      </Col>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Vehicle Number: {props.vehicle_no}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              In Time:&nbsp; &nbsp; &nbsp; {props.in_time}
              <br />
              Expected Out Time: {props.exp_out_time}
            </p>
            <div className="car">
              <img src={props.vehicle_type==="Bike" ? bike : car} alt="Car Logo" />
            </div>
            <div style={{ fontSize: "2.5vh" }}>
              {props.name}
              <br />
              <br />
              <p>Base Charge: {props.pricing}</p>
              <p>Additional Cost: {/*totalcost - props.pricing*/}</p>
              <p>
                <strong>Total: {/*totalcost*/}</strong>
              </p>
            </div>
            <Form style={{ fontSize: "2.5vh" }}>
              <Form.Check inline label="Cash" name="group1" type="radio" />
              <Form.Check
                inline
                label="Digital Payment"
                name="group1"
                type="radio"
              />
            </Form>
            <br />
            <Button onClick={onCheckout} variant="success">Checkout</Button>&nbsp;
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default CheckoutCard;
