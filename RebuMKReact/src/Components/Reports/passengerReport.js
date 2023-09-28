import React from "react";
import '../UtilComponents/App.css'

const PassengerReport = (props) => {

    return(
        <div style={{width: "85%", margin: 'auto'}} className={"container mm-4 mt-5"}>
            <h2 style={{textAlign: "center", color: "darkcyan"}}>Report on your drivers and drives</h2>      
            <hr></hr>
            <div className={"row table-responsive"}>
                <div className={"row"} style={{margin: 'auto'}}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Driver Name Surname</th>
                            <th scope={"col"}>Kilometers travelled with driver</th>
                            <th scope={"col"}>Total price paid to driver</th>
                            <th scope={"col"}>Price per kilometer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.report.map((term) => {
                            return(
                                <tr>
                                    <td>{term.driverName} {term.driverSurname}</td>
                                    <td>{(Math.round(term.kmTravelledWithDriver * 100) / 100).toFixed(2)} km</td>
                                    <td>{(Math.round(term.totalPricePaid * 100) / 100).toFixed(2)} MKD</td>
                                    <td>{(Math.round(term.pricePerKm * 100) / 100).toFixed(2)} MKD per km</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <a className="myButton btn btn-primary" onClick={() => props.onDownloadReport(localStorage.getItem("passengerId"))} style={{borderColor: 'black', backgroundColor: 'cyan', color: "black"}}>Download Report</a>
            </div>      
        </div>
    )
}

export default PassengerReport;