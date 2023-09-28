import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import CenteredContainer from "../UtilComponents/CenteredContainer";
import axios from "../../custom-axios/axios";
import '../UtilComponents/App.css'

const PayDrive = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const payDrive = async () => {
        const driveId = location.state.driveId
        const totalPriceToPay = location.state.totalSumToPay
        const response = await axios.post(`/drive/pay/${driveId}`, null, { params: {
            totalPriceToPay
          }
        });
        const paymentId = response.data;  
        navigate("/tip-driver", {state: {paymentId: paymentId}})
    }

    return (
        <CenteredContainer>
        <div className="card text-center">
            <h4>You have travelled <br></br>
            {location.state.kmTravelled} km <br></br>
            with a price per km <br></br>
            {location.state.driverPricePerKm} MKD</h4>
            <br></br>
            <h3 style={{color: "green"}}>Your total price to pay is <br></br>
            {(Math.round(location.state.totalSumToPay * 100) / 100).toFixed(2)} MKD</h3>
            <hr></hr>
            <p style={{textAlign: 'center'}}>
            <a type="submit" className="myButton btn btn-primary" style={{backgroundColor: "darkcyan", borderColor: 'black', color: 'white', width: '90%'}} onClick={() => payDrive()}>Pay Drive</a>
            </p>
        </div>
        </CenteredContainer>
    )
}

export default PayDrive;