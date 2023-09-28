import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import CenteredContainer from "../UtilComponents/CenteredContainer";
import axios from "../../custom-axios/axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import '../UtilComponents/App.css'

const MadeRequest = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [formData, updateFormData] = React.useState({
        status : location.state.madeRequest.status,
        cityAddress : location.state.madeRequest.cityAddress,
        numberAddress : location.state.madeRequest.numberAddress,
        streetAddress : location.state.madeRequest.streetAddress,
        latitude: location.state.madeRequest.latitude,
        longitude : location.state.madeRequest.longitude,
        confirmedByDriver: "",
    })

    const updateMadeRequest = async () => {
        const requestId = location.state.madeRequest.id
        const response = await axios.get(`/request/${requestId}`)
        updateFormData({
            status : response.data.status,
            cityAddress : response.data.cityAddress,
            numberAddress : response.data.numberAddress,
            streetAddress : response.data.streetAddress,
            latitude: response.data.latitude,
            longitude : response.data.longitude,
            confirmedByDriver: response.data.confirmedByDriver
        })
    }

    const joinDriveForPassenger = async () => {
        const requestId = location.state.madeRequest.id
        const response = await axios.get(`/drive/request/${requestId}`)
        .catch(function (error) {
            if (error.response) {
              alert("Wait for the driver to pick you up and start the drive. Then you can join.");
            }
          });
        localStorage.removeItem("madeRequestId")
        const startLatitude = formData.latitude;
        const startLongitude = formData.longitude;
        navigate("/started-drive", {state: {startedDrive: response.data, startLatitude: startLatitude, startLongitude: startLongitude}})
    }

    let messageAfterConfirmation1 = ""
    let messageAfterConfirmation2 = ""
    let joinDrive = ""

    if(formData.status === "CONFIRMED"){
        messageAfterConfirmation1 = <p style={{color: "darkgreen", fontStyle: "bold"}}>Your request has been confirmed, 
            please wait for the driver on the provided address.</p>
        messageAfterConfirmation2 = <p style={{color: "darkred", fontStyle: "bold"}}>After your driver picks you up and starts the drive,
        you should start the drive too.</p>
        joinDrive = <a title={"Start Drive"} className={"myButton btn btn-danger"} 
                style={{backgroundColor: "cyan", borderColor: "black", color: "black", width: '90%'}} 
                onClick={() => joinDriveForPassenger()} >
                Join Drive
                </a>
    }

    let confirmedByDriver = ""
    if(formData.confirmedByDriver){
        confirmedByDriver = <h6 className="card-text">
            Confirmed by Driver: {formData.confirmedByDriver.name} {formData.confirmedByDriver.surname}</h6>                
    }

    return (
        <CenteredContainer>
        <div className="card text-center">
            <div className="card-header" style={{color : "darkcyan"}}>
                {formData.status}
            </div>
            <div className="card-body">
                <h6 className="card-title" style={{color : "darkcyan"}}>You have created your request, please wait until some driver confirms it</h6>
                <h5 className="card-title">{formData.cityAddress}, {formData.streetAddress}, {formData.numberAddress}</h5>
                {confirmedByDriver}
            </div>
            <br></br>
            {messageAfterConfirmation1}
            {messageAfterConfirmation2}
            <p style={{textAlign: 'center'}}>
            <a style={{backgroundColor: "darkcyan", color: 'white', borderColor: 'black', width: '90%'}} className="myButton btn btn-primary" 
            onClick={() => updateMadeRequest()}>Refresh</a>
            </p>
            <p style={{textAlign: 'center'}}>
            {joinDrive}
            </p>
        </div>
        <MapContainer className="border border-info rounded-2" center={[formData.latitude, formData.longitude]} zoom={16} scrollWheelZoom={true} style={{width: '100%', marginTop: '50px', position: 'relative', zIndex: 0}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[formData.latitude, formData.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup position={[formData.latitude, formData.longitude]}>
                        <p>Pick up location. Wait here.</p>
                    </Popup>
                </Marker>
        </MapContainer>
        </CenteredContainer>
    )
}

export default MadeRequest;