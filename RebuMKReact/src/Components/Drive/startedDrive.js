import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import CenteredContainer from "../UtilComponents/CenteredContainer";
import axios from "../../custom-axios/axios"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import  RoutingMachine from "./routineMachine";
import '../UtilComponents/App.css'

const StartedDrive = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const distanceToTravel = getDistance([location.state.startLatitude, location.state.startLongitude], [location.state.startedDrive.destinationLatitude, location.state.startedDrive.destinationLongitude])

    const finishDrive = () => {
        const driveId = location.state.startedDrive.id
        axios.post(`/drive/finish/${driveId}`, null, { params: {
            kmTravelled: distanceToTravel
          }
        })
        navigate("/home");
    }
    const gradeDrive = () => {
        const driveId = location.state.startedDrive.id 
        navigate("/grade-drive", {state: {driveId: driveId}})
    }

    const payDrive = async () => {
        const driverId = location.state.startedDrive.driver.id
        const requestId = location.state.startedDrive.request.id
        const driverResponse = await axios.get(`/driver/${driverId}`);
        const startedDriveResponse = await axios.get(`/drive/request/${requestId}`)
        const driverPricePerKm = driverResponse.data.pricePerKm
        const kmTravelled = distanceToTravel
        const totalSumToPay = driverPricePerKm * kmTravelled
        navigate("/pay-drive", {state: {driveId: startedDriveResponse.data.id,
                                            driverPricePerKm: driverPricePerKm, 
                                            totalSumToPay: totalSumToPay,
                                            kmTravelled: kmTravelled}})
    }

    let finishDriveButton = <a title={"Finish Drive"} className={"myButton btn btn-primary"}
                                    style={{backgroundColor: "darkcyan", borderColor: "black", color: "white"}}
                                    onClick={() => {finishDrive()}}>
                                        Finish Drive</a> 

    let gradeButton = <a title={"Grade Drive"} className={"myButton btn btn-primary"}
                                      style={{backgroundColor: "darkcyan", borderColor: "black", color: "white"}}
                                      onClick={() => {gradeDrive()}}>
                                          Grade Driver for Drive</a>  
                                          
    let payForDrive = <a title={"Pay Drive"} className={"myButton btn btn-primary"}
                                    style={{backgroundColor: "darkcyan", borderColor: "black", color: "white"}}
                                    onClick={() => {payDrive()}}>
                                        Pay Drive</a>  
    let grade = <h5 className="card-title">Grade: {location.state.startedDrive.grade}</h5>

    let buttonOne;
    let buttonTwo;
    let showGrade;

    if(localStorage.getItem("driverId")){
        buttonOne = finishDriveButton;
    } else if(localStorage.getItem("passengerId")) {
            buttonOne = payForDrive;
            showGrade = grade;
            if(location.state.startedDrive.grade === 0)
            buttonTwo = gradeButton;
    }

    function getDistance(origin, destination) {
        let lon1 = toRadian(origin[1]),
            lat1 = toRadian(origin[0]),
            lon2 = toRadian(destination[1]),
            lat2 = toRadian(destination[0]);
    
        let deltaLat = lat2 - lat1;
        let deltaLon = lon2 - lon1;
    
        let a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let EARTH_RADIUS = 6371;
        let distanceInKm = (c * EARTH_RADIUS);
        return Math.round((distanceInKm + Number.EPSILON) * 100) / 100
    }
    function toRadian(degree) {
        return degree*Math.PI/180;
    }

    return (
        <CenteredContainer style={{width: 'calc(750px - 50vw)', minWidth:'80%', maxWidth: '100%', margin: 'auto'}}>
        <div className="card text-center">
            <div className="card-header">
                {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'medium'})
                    .format(new Date(location.state.startedDrive.startTime))}
                <br></br>
                {location.state.startedDrive.status}
            </div>
            <div className="card-body">
                {showGrade}
                <h5> Kilometers to travel: {distanceToTravel} km</h5>
                <MapContainer className="border border-info rounded-2" center={[41.9943, 21.4309]} zoom={12} scrollWheelZoom={true} style={{width: '100%', position: 'relative', zIndex: 0}}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.state.startedDrive.destinationLatitude, location.state.startedDrive.destinationLongitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup position={[location.state.startedDrive.destinationLatitude, location.state.startedDrive.destinationLongitude]}>
                        <p>Passenger's destination address</p>
                    </Popup>
                    </Marker>
                    <Marker position={[location.state.startLatitude, location.state.startLongitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup position={[location.state.startLatitude, location.state.startLongitude]}>
                        <p>You started your drive here.</p>
                    </Popup>                      
                    </Marker>
                    <RoutingMachine latitudes={{startLat: location.state.startLatitude, startLng: location.state.startLongitude, 
                                            destLat:location.state.startedDrive.destinationLatitude, destLng:location.state.startedDrive.destinationLongitude }}/>
                </MapContainer>
                <h3 style={{color: "green"}}>{location.state.totalSumToPay}</h3>
                {buttonOne}
                <br></br>
                <hr></hr>
                {buttonTwo}
            </div>
        </div>
        </CenteredContainer>
    )
}

export default StartedDrive;