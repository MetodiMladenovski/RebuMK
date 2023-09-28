import React from "react";
import CenteredContainer from "../UtilComponents/CenteredContainer";
import '../UtilComponents/App.css'

const register = (props) => {
    
    let registerDriver = (<a style={{backgroundColor: "cyan", float: "center",  borderColor: "black", color:'black'}} className="myButton btn btn-primary" href="/registerDriver">REGISTER DRIVER</a>);
    let registerPassenger = (<a style={{backgroundColor: "darkcyan", float: "center", borderColor: "black", color:'white'}} className="myButton btn btn-primary" href="/registerPassenger">REGISTER PASSENGER</a>);
    let login = (<a style={{backgroundColor: "#dce1de", borderColor: "black", color:'black'}} className="myButton link" href="/login">here</a>)

    return (
        <CenteredContainer>
            <h4 style={{textAlign:'center'}}>Choose as what would you like to register:</h4>
            <hr></hr>
            <div className="d-grid gap-2 col-6 mx-auto">
                {registerDriver}
            </div>
            <hr></hr>
            <div className="d-grid gap-2 col-6 mx-auto">
                {registerPassenger}
            </div>
            <hr></hr>
            <hr></hr>
            <p style={{textAlign: 'center'}}> Or you can login {login}.</p>
        </CenteredContainer>
    )
}

export default register;