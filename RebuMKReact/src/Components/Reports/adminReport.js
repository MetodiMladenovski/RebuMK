import React from "react";
import '../UtilComponents/App.css'

const AdminReport = (props) => {

    return(
        <div style={{width: "85%", margin: 'auto'}} className={"container mm-4 mt-5"}>
            <h2 style={{textAlign: "center", color: "darkcyan"}}>Report for every driver</h2>      
            <hr></hr>
            <div className={"row table-responsive"}>
                <div className={"row"} style={{margin: 'auto'}}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Driver Email</th>
                            <th scope={"col"}>Driver Full Name</th>
                            <th scope={"col"}>Car make</th>
                            <th scope={"col"}>Car model</th>
                            <th scope={"col"}>Driver Grade</th>
                            <th scope={"col"}>Number Of Drives</th>
                            <th scope={"col"}>Total Money Made</th>
                            <th scope={"col"}>Number Of Different Requests</th>
                            <th scope={"col"}>Number Of Different Passengers</th>
                            <th scope={"col"}>Money Per Request</th>
                            <th scope={"col"}>Total kilometers driven</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.report.map((term) => {
                            return(
                                <tr>
                                    <td>{term.driverEmail}</td>
                                    <td>{term.driverName} {term.driverSurname}</td>
                                    <td>{term.make}</td>
                                    <td>{term.model}</td>
                                    <td>{(Math.round(term.driverGrade * 100) / 100).toFixed(2)}</td>
                                    <td>{term.numberOfDrives} drives</td>
                                    <td>{(Math.round(term.totalMoneyMade * 100) / 100).toFixed(2)} MKD</td>
                                    <td>{term.numberOfDifferentRequests} requests</td>
                                    <td>{term.numberOfDifferentPassengers} passengers</td>
                                    <td>{(Math.round(term.averageMoneyPerRequest * 100) / 100).toFixed(2)} MKD</td>
                                    <td>{(Math.round(term.totalKmTravelled * 100) / 100).toFixed(2)} km</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <a className="myButton btn btn-primary" onClick={() => props.onDownloadReport()} style={{borderColor: 'black', backgroundColor: 'cyan', color: "black"}}>Download Report</a>
            </div>  
        </div>
    )
}

export default AdminReport;