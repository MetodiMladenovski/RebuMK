import React from "react";
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const header = (props) => {
    
    let register = (<Nav.Link style={{backgroundColor: "white", borderColor: "black", color: 'black', padding: '5px', height: '100%'}} className="myButton btn btn-primary" href={"/register"}>Register</Nav.Link>);
    let login = (<Nav.Link style={{backgroundColor: "white", borderColor: "black", color: 'black', padding: '5px', height: '90%'}} className="myButton btn btn-primary" href={"/login"} type="submit">Log in</Nav.Link>);
    let adminReport = (<Nav.Link href={"/report/admin"}>Check Report</Nav.Link>);
    let driverReport = (<Nav.Link href={"/report/driver"}>Check Report</Nav.Link>);
    let passengerReport = (<Nav.Link href={"/report/passenger"}>Check Report</Nav.Link>);

    let isLoggedIn = false
    let showRegister = register
    let report
        
    if(localStorage.getItem("driverId")){
        report = driverReport;
        isLoggedIn = true;
        showRegister = "";
    } else if(localStorage.getItem("passengerId")) {
        report = passengerReport;
        isLoggedIn = true;
        showRegister = "";
    } else if(localStorage.getItem("adminId")){
        report = adminReport
        isLoggedIn = true
        showRegister = ""
    }

    const logoutUser = () => {
        localStorage.clear()
    }

    let logout = (<a style={{backgroundColor: "white", borderColor: "black", color: 'black'}} onClick={() => logoutUser()} className="myButton btn btn-primary" href={"/home"}>Logout</a>);

    return (
        <>
            <Navbar key="md" expand="md" className="mb-3 rounded-bottom" style={{ width: 'calc(750px - 50vw)', minWidth:'80%', maxWidth: '100%', height:'100px', margin: 'auto', backgroundColor: '#0dbfd3'}}>
              <Container fluid>
                <Navbar.Brand href="/home">
                    <img
                    alt=""
                    src={require("../../images/logo.PNG")}
                    width="150"
                    height="50"
                    className="d-inline-block align-center rounded"
                    />{' '}
                    RebuMK
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-md`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                  placement="end"
                  style={{backgroundColor: '#0dbfd3'}}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                      RebuMK
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/home" >Home</Nav.Link>
                      {report}
                    </Nav>
                    <Form className="d-flex" style={{marginBottom: '5px', marginRight: '10px',}}>
                      {showRegister}
                    </Form>
                    <Form className="d-flex">
                      {isLoggedIn ? logout : login}
                    </Form>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
        </>
      );
}

export default header;