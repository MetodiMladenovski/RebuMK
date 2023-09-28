import React from "react";
import '../UtilComponents/App.css'

const DriverReport = (props) => {

    return(
        <div style={{width: "85%", margin: 'auto'}} className={"container mm-4 mt-5"}>
            <h2 style={{textAlign: "center", color: "darkcyan"}}>Report on your passengers</h2>      
            <hr></hr>
            <div className={"row table-responsive"}>
                <div className={"row"} style={{margin: 'auto'}}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Passenger Email</th>
                            <th scope={"col"}>Passenger Name Surname</th>
                            <th scope={"col"}>Kilometers Travelled With Passenger</th>
                            <th scope={"col"}>Total Earnings from passenger</th>
                            <th scope={"col"}>Earnings Per Kilometer</th>
                            <th scope={"col"}>Average Grade Received Per Drive</th>
                            <th scope={"col"}>Number Of Drives</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.report.map((term) => {
                            return(
                                <tr>
                                    <td>{term.passengerEmail}</td>
                                    <td>{term.passengerName} {term.passengerSurname}</td>
                                    <td>{(Math.round(term.kmTravelledWithPassenger * 100) / 100).toFixed(2)} km</td>
                                    <td>{(Math.round(term.totalEarnings * 100) / 100).toFixed(2)} MKD</td>
                                    <td>{(Math.round(term.earningsPerKm * 100) / 100).toFixed(2)} MKD per km</td>
                                    <td>{(Math.round(term.averageGradeReceivedPerDrive * 100) / 100).toFixed(2)}</td>
                                    <td>{term.numberOfDrives} drives</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <a className="myButton btn btn-primary" onClick={() => props.onDownloadReport(localStorage.getItem("driverId"))} style={{borderColor: 'black', backgroundColor: 'cyan', color: "black"}}>Download Report</a>
            </div>   
        </div>
    )
}

export default DriverReport;