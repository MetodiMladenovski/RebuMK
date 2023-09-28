import React, { useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import CenteredContainer from "../UtilComponents/CenteredContainer";
import axios from "../../custom-axios/axios";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import '../UtilComponents/App.css'

const MakeRequest = () => {

    const location = useLocation();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, updateFormData] = React.useState({
        cityAddress : "",
        streetAddress : "",
        numberAddress : ""
    })
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [position, setPosition] = useState(null)

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const cityAddress = formData.cityAddress;
        const streetAddress = formData.streetAddress;
        const numberAddress = formData.numberAddress;
        const passengerId = localStorage.getItem("passengerId");
        let chosenDriverId = null
        if(location.state){
            chosenDriverId = location.state.driverId
        }
        if(!(latitude && longitude)){
            alert("You must pick a location on the map")
        }
        const response = await axios.post(`/request/make/${passengerId}`, {
            "cityAddress" : cityAddress,
            "streetAddress" : streetAddress,
            "numberAddress" : numberAddress,
            "latitude" : latitude,
            "longitude" : longitude,
            "chosenDriverId" : chosenDriverId
        })
        localStorage.setItem("madeRequestId", response.data.id)
        navigate("/made-request", {state: {madeRequest: response.data}})
    }

    let showChosenDriver
    if(location.state){
        showChosenDriver = <p style={{color: "green", fontStyle: "bold"}}>You picked the driver with name {location.state.driverName}. 
        <br></br>
        Add your address to complete the request.</p>
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
            <Popup>You are here</Popup>
          </Marker>
        )
      }

    return(
        <CenteredContainer>
            <h2 style={{textAlign: "center", color: "darkcyan"}}>Make Request</h2>
            <hr></hr>
            {showChosenDriver}
            <br></br>
            <h6 style={{textAlign: "center"}}>Your current(pick up) address:</h6>
            <br></br>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="cityAddress">City</label>
                        <input type="text"
                               className="form-control"
                               id="cityAddress"
                               name="cityAddress"
                               required
                               placeholder="E.g: Skopje"
                               style={{height: 100 + "%"}}
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="streetAddress">Street</label>
                        <input type="text"
                               className="form-control"
                               id="streetAddress"
                               name="streetAddress"
                               required
                               placeholder="E.g: Jordan Mijalkov"
                               style={{height: 100 + "%"}}
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="numberAddress">Number</label>
                        <input type="number"
                               className="form-control"
                               id="numberAddress"
                               name="numberAddress"
                               placeholder="E.g: 2"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <label htmlFor="MapContainer" style={{color: 'red'}}>Choose your location on the map</label>
                    <label htmlFor="MapContainer" style={{color: 'darkcyan'}}>You can double click for the app to try and locate you on it's own, 
                    or click once to mark your precise location</label>
                    <MapContainer
                        className="border border-info rounded-2" center={[41.9943, 21.4309]}
                        style={{width: '100%', position:'relative', zIndex: 0}}
                        zoom={13}
                        scrollWheelZoom={true}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>
                    <br></br>
                    <p style={{textAlign: 'center'}}>
                        <button id="submit" type="submit" className="myButton btn btn-primary" style={{backgroundColor: "cyan", borderColor: "black", color: 'black'}}>Submit</button>
                    </p> 
                </form>
        </CenteredContainer>
    )

}

export default MakeRequest;