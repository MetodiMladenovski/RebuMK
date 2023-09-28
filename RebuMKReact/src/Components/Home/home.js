import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../custom-axios/axios';
import CenteredContainer from '../UtilComponents/CenteredContainer';
import '../UtilComponents/App.css'

const Home = (props) => {

    const navigate = useNavigate();

    const goToOngoingRequest = async () => {
        const madeRequestId = localStorage.getItem("madeRequestId")
        const response = await axios.get(`/request/${madeRequestId}`);
        navigate("/made-request", {state : {madeRequest: response.data}})
    }

    let drivers = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/drivers"}>See drivers</Link>);
    let unapprovedDrivers = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/unapproved-drivers"}>Unapproved drivers</Link>);
    let payments = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/payments"}>Payments</Link>);
    let makeRequest = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/make-request"}>Make Request</Link>);
    let ongoingRequest = (<a style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" onClick={() => goToOngoingRequest()}>Ongoing Request</a>);
    let requests = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/requests"}>See Requests</Link>)
    let register = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/register"}>Register</Link>);
    let login = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/login"}>Login</Link>);
    let profile = (<Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "55%"}} className="myButton btn btn-primary" to={"/driver/profile"}>Profile</Link>);

    let buttonOne
    let buttonTwo

    if(localStorage.getItem("driverId")){
        buttonOne = requests;
        buttonTwo = profile;
    } else if(localStorage.getItem("passengerId")) {
        buttonOne = drivers
        if(localStorage.getItem("madeRequestId")){
            buttonTwo = ongoingRequest
        } else {
            buttonTwo = makeRequest
        }
    } else if(localStorage.getItem("adminId")){
        buttonOne = unapprovedDrivers
        buttonTwo = payments
    } else {
        buttonOne = login
        buttonTwo = register
    }


    return (
        <CenteredContainer>
            <h2 style={{textAlign: "center", color: "darkcyan"}}>Welcome to RebuMK</h2>       
            <hr></hr>
            <p style={{textAlign: "center"}}> {buttonOne}</p>   
            <hr></hr> 
            <p style={{textAlign: "center"}}> {buttonTwo}</p> 
        </CenteredContainer>
    )
}

export default Home;