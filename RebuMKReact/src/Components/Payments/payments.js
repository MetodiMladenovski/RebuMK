import React from "react";

const Payments = (props) => {

    return(
        <div className={"container mm-4 mt-5"} style={{width: "85%", margin: 'auto'}}>
            <h2 style={{textAlign: "center", color: "darkcyan"}}>Payments</h2>      
            <hr></hr>
            <div className={"row table-responsive"}>
                <div className={"row"} style={{margin: 'auto'}}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Drive Km Travelled</th>
                            <th scope={"col"}>Driver Who Executed Drive</th>
                            <th scope={"col"}>Passenger</th>
                            <th scope={"col"}>Sum payed</th>
                            <th scope={"col"}>Sum tipped</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.payments.map((term) => {
                            return(
                                <tr>
                                    <td>{term.drive.kmTravelled} km</td>
                                    <td>{term.drive.driver.name} {term.drive.driver.surname}</td>
                                    <td>{term.passenger.name} {term.passenger.surname}</td>
                                    <td>{term.totalSumPayed} MKD</td>
                                    <td>{term.driverTip} MKD</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Payments;