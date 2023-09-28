import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import axios from "../../custom-axios/axios";
import CenteredContainer from "../UtilComponents/CenteredContainer";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import '../UtilComponents/App.css';


const ConfirmedRequest = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [destinationLatitude, setLatitude] = useState(null)
    const [destinationLongitude, setLongitude] = useState(null)
    const [position, setPosition] = useState(null)

    const startDrive = async () => {
        const requestId = location.state.confirmedRequest.id;
        const driverId = localStorage.getItem("driverId");
        if(!(destinationLatitude && destinationLongitude)){
            alert("Must choose destination address for passenger on the map.");
            return;
        }
        const response = await axios.post(`/drive/start/${requestId}/${driverId}`, {
            "destinationLatitude" : destinationLatitude,
            "destinationLongitude" : destinationLongitude
        })
        const startLatitude = location.state.confirmedRequest.latitude;
        const startLongitude = location.state.confirmedRequest.longitude;
        props.onRefreshPassengersMadeRequest();
        navigate('/started-drive', {state: {startedDrive: response.data, startLatitude: startLatitude, startLongitude: startLongitude}})
    }

    function LocationMarker() {      
        const map = useMapEvents({
            dblclick(){
                map.locate()
            },
            click(e) {
              setLatitude(e.latlng.lat)
              setLongitude(e.latlng.lng) 
              setPosition(e.latlng)
              map.flyTo(e.latlng, map.getZoom())
            },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
              }
          })
        return position === null ? null : (
          <Marker position={position}  icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup><p>This is the passenger's 
                <br></br>
                destination location.</p></Popup>
          </Marker>
        )
      }

    return (
        <CenteredContainer style={{width: 'calc(750px - 50vw)', minWidth:'80%', maxWidth: '100%', margin: 'auto'}}>
        <div className="card text-center">
            <div className="card-header">
                {location.state.confirmedRequest.status}
            </div>
            <div className="card-body">
                <h5 className="card-title">{location.state.confirmedRequest.cityAddress}, {location.state.confirmedRequest.streetAddress}, {location.state.confirmedRequest.numberAddress}</h5>
                <p className="card-text">Passenger: {location.state.confirmedRequest.passenger.name} {location.state.confirmedRequest.passenger.surname}</p>                
                <br></br>
                <label htmlFor="MapContainer" style={{color: 'red'}}>After picking your passenger, 
                pick the destination location on the map where the passenger wants to go</label>
                <MapContainer className="border border-info rounded-2" center={[location.state.confirmedRequest.latitude, location.state.confirmedRequest.longitude]} zoom={14} scrollWheelZoom={true} style={{position: 'relative', zIndex: 0, marginBottom: '20px'}}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[location.state.confirmedRequest.latitude, location.state.confirmedRequest.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                    <Popup position={[location.state.confirmedRequest.latitude, location.state.confirmedRequest.longitude]}>
                        <p>Pick your passenger 
                        <br></br>
                        {location.state.confirmedRequest.passenger.name} {location.state.confirmedRequest.passenger.surname} from here.</p>
                    </Popup>
                    <LocationMarker />                        
                </Marker>
                </MapContainer>
                <button id="submit" title={"Start Drive"} className={"myButton btn btn-danger"} type="submit"
                    style={{backgroundColor: "cyan", borderColor: "black", color: 'black'}} onClick={() => startDrive()}>
                    Start Drive
                </button>       
            </div>
        </div>
        </CenteredContainer>
    )
}

export default ConfirmedRequest;