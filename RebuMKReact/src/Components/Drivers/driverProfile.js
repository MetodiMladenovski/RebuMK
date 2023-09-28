import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import CenteredContainer from "../UtilComponents/CenteredContainer";
import axios from "../../custom-axios/axios";
import '../UtilComponents/App.css'

const DriverProfile = (props) => {

    const navigate = useNavigate();

    const [profilePicture, setProfilePicture] = useState(null)

    const uploadProfilePicture = async (driverId) => {
        await props.onChangeProfilePicture(driverId, profilePicture);
        navigate("/home");
    }
    
    const onFileChange = (e) => {
        e.preventDefault();
        const fileData = new FormData();
        fileData.append('picture', e.target.files[0]);
        setProfilePicture(fileData);
    }
    const checkDriversCar = async () => {
        const driverId = localStorage.getItem("driverId")
        const carResponse = await axios.get(`/car/driver/${driverId}`).catch(function (error) {
            if (error.response) {
                alert("You haven't registered a car yet. Click on Add Car to do so.")
            } 
          })
        navigate("/car", {state: {car: carResponse.data}})
    }

    const IMAGE_SRC = `http://localhost:8080/driver/${props.driver.id}/profile/picture`;

    return(
        <CenteredContainer>
            <h3 style={{textAlign: "center", color: "darkcyan"}}>Welcome to your profile</h3>
            <div class="col">
                    <div class="card" >
                    <img src={IMAGE_SRC} class="card-img-top" alt="NOT AVAILABLE" style={{height: '285px', padding: '15px'}}/>
                    <div class="card-body">
                        <h5 class="card-title">{props.driver.name} {props.driver.surname}</h5>
                        <p style={props.driver.status !== 'AVAILABLE' ? { color: 'red' } : {color: 'green'}}>
                            Status: {props.driver.status}</p>
                        <p class="card-text">
                            Price per kilometer: {props.driver.pricePerKm} MKD
                        <br></br>
                        Level: {props.driver.level}
                        <br></br>
                        Number of grades: {props.driver.numGrades}
                        <br></br>
                        Grade: {(Math.round(props.driver.grade * 100) / 100).toFixed(2)}
                        </p>
                        <hr></hr>
                        Upload or change your profile picture:
                        <br></br>
                        <span style={{fontSize: '12px'}}>Supported files .png and .jpeg</span>
                        <input
                            style={{backgroundColor: 'cyan'}}
                            type="file"
                            name="myImage"
                            onChange={onFileChange}
                            />
                        <a 
                        style={{backgroundColor: "cyan", borderColor: "black", color: "black", marginTop: "10px"}} 
                        className="myButton btn btn-primary" 
                        onClick={() => uploadProfilePicture(props.driver.id)}>
                            Change picture
                        </a>
                        <hr></hr>
                        <Link style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "45%"}} 
                        className="myButton btn btn-primary" to={"/add-car"}>Add car</Link>
                        <a style={{backgroundColor: "#00CED1", borderColor: "black", color: "black", width: "45%", float: 'right'}}
                         className="btn btn-primary" onClick={() => checkDriversCar()}>Check car</a>
                    </div>
                    </div>
                </div>
        </CenteredContainer>
    )
}

export default DriverProfile;