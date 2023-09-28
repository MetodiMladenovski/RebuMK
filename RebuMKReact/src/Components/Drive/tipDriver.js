import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import CenteredContainer from "../UtilComponents/CenteredContainer";
import '../UtilComponents/App.css'

const TipDriver = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, updateFormData] = React.useState({
        driverTipSum : 0,
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        const gradeNum = formData.driverTipSum;
        const paymentId = location.state.paymentId;
        props.onTipDriver(paymentId, gradeNum);
        navigate("/home")
    }

    return (
        <CenteredContainer>
        <div className="card text-center">
        <form onSubmit={onFormSubmit}>
            <div className="form-group" style={{textAlign: 'center'}}>
                <br></br>
                <h3>Tip Driver</h3>
                <input  type="float"
                        className="form-control"
                        id="driverTipSum"
                        name="driverTipSum"
                        required
                        placeholder="Enter tip amount"
                        style={{height: "100%", width: "90%", margin: 'auto'}}
                        onChange={handleChange}
                />
            </div>
            <br></br>
            <button id="submit" type="submit" className="myButton btn btn-primary" style={{backgroundColor: "darkcyan", borderColor: 'black', color: 'white', width: '60%'}}>Confirm</button>
            <hr></hr>
            <a href="/home" className="myButton btn btn-primary" style={{backgroundColor: "darkred", borderColor: 'black', color: 'white', width: '60%'}}>Skip</a>
            <br></br>
            <br></br>
        </form>
        </div>
        </CenteredContainer>
    )
}

export default TipDriver;