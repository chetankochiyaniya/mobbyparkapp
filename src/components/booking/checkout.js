import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { GetAllVehicles } from "../../APICalls/vehicle";
import "./btnchng.css";
import "./checkout.css";
import CheckoutCard from "./CheckoutCard";;



const Checkout = () => {

  const [allVehicles, setAllVehicles] = useState([]);

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


  


  useEffect(() => {
    const operatorToken = JSON.parse(localStorage.getItem("jwt")).token;
    GetAllVehicles(operatorToken)
      .then((res) => {
        setAllVehicles(res);
      })
      .catch((err) => console.log(err));
  }, []);


  console.log(allVehicles);
  return (
    <div>
      <Navbar />

      <Link to="booking">
        <Button
          variant="text"
          className="titleopt1"
          style={{ fontSize: "3.5vh", border: "1px solid #117a8b" }}
        >
          Get In
        </Button>
      </Link>

      <Button
        variant="info"
        className="titleopt2"
        style={{ fontSize: "3.5vh" }}
        active
      >
        Checkout
      </Button>

      <br />
      <br />
      <br />

      <Container className="leftcol">
        <div>
          <div className={SearchIcon}>
            <SearchIcon />
          </div>
          <InputBase
          
                  placeholder="Search…"
                  
                  inputProps={{ "aria-label": "search" }}
                />

                
        </div>
        <br />
        <br />
        <CheckoutCard />

       {/*} {filterVehicles? (filterVehicles.items.map((vehicle)=>{
   <CheckoutCard vehicle_no={vehicle.vehicle_no} />
})): (<CheckoutCard/>)}*/}


        
        
        </Container>
        
    </div>
  );
};

export default Checkout;
