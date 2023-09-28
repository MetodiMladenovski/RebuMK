import React from "react";
import axios from "../../custom-axios/axios";
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import '../UtilComponents/App.css'

const Requests = (props) => {
    const navigate = useNavigate();

    const toConfirmedRequest = async (driverId, requestId) => {
        const response = await axios.post(`/request/confirm/${driverId}/${requestId}`)
        navigate('/confirmed-request', {state: {confirmedRequest: response.data}})
    };

    return(
        <div className={"container mm-4 mt-5"} style={{width: "85%", margin: 'auto'}}>
            <h2 style={{textAlign: 'center', color: "darkcyan"}}>Requests</h2>    
            <hr></hr>  
            <div className={"row table-responsive"}>
                <div className={"row"} style={{margin: 'auto'}}>
                    <table className={"table table-hover"} >
                        <thead>
                        <tr>
                            <th scope={"col"}>City</th>
                            <th scope={"col"}>Street</th>
                            <th scope={"col"}>Number</th>
                            <th scope={"col"}>Passenger</th>
                            <th scope={"col"}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.requests.map((term) => {
                            return(
                                <tr style={ term.chosenDriver != null ? { backgroundColor:'lightgreen'} : {}}>
                                    <td>{term.cityAddress}</td>
                                    <td>{term.streetAddress}</td>
                                    <td>{term.numberAddress}</td>
                                    <td>{term.passenger.name} {term.passenger.surname}</td>
                                    <td className={"text-right"}>
                                        <a title={"Confirm"} id="submit" className={"myButton btn btn-primary"}
                                            style={{backgroundColor: "darkcyan", borderColor: "black", color: 'white'}}
                                            onClick={() => toConfirmedRequest(localStorage.getItem("driverId"), term.id)}>Confirm</a>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <MapContainer className="border border-info rounded-2" center={[41.9943, 21.4309]} zoom={13} scrollWheelZoom={true} style={{width: 'calc(750px - 50vw)', minWidth:'80%', maxWidth: '100%', margin: 'auto', position: 'relative', zIndex: 0, marginBottom: "50px"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {props.requests.map((term) => {
                    return(
                        <Marker position={[term.latitude, term.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                            <Popup position={[term.latitude, term.longitude]}>
                                <p>{term.passenger.name} {term.passenger.surname}</p>
                                <p>{term.cityAddress}, {term.streetAddress}, {term.numberAddress}</p>
                                <a title={"Confirm"} id="submit" className={"myButton btn btn-primary"}
                                            style={{backgroundColor: "darkcyan", borderColor: "black", color: 'white'}}
                                            onClick={() => toConfirmedRequest(localStorage.getItem("driverId"), term.id)}>Confirm</a>
                            </Popup>
                        </Marker>
                    )
                })}       
            </MapContainer>
        </div>
    )
}

export default Requests;