import React,{useEffect,useState} from 'react'
import { Nav, Navbar } from 'react-bootstrap'

function Header (){
    return (
        <div>
            <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">MobbyPark</Navbar.Brand>
            <Nav className="ml-auto">
            <Nav.Link href="#home" >Logout</Nav.Link>
            </Nav>
            </Navbar>
        </div>
    )
}

export default Header
