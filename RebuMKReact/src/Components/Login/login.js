import React from 'react';
import { useNavigate } from 'react-router-dom';
import RebuMKService from "../../repository/rebuRepository";
import CenteredContainer from '../UtilComponents/CenteredContainer';
import '../UtilComponents/App.css'

const Login = (props) => {

    const navigate = useNavigate();
    const [formData, updateFormData] = React.useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        RebuMKService.login(formData.username, formData.password).then(resp => {
            if(resp.data.typeOfLoggedUser === "Driver"){
                localStorage.setItem("driverId", resp.data.idOfLoggedUser)
                props.onLogin();
                props.onLoadRequests(resp.data.idOfLoggedUser)
                navigate("/home");
            } else if(resp.data.typeOfLoggedUser === "Passenger"){
                localStorage.setItem("passengerId", resp.data.idOfLoggedUser)
                props.onLogin();
                navigate("/home");
            } else if(resp.data.typeOfLoggedUser === "Admin"){
                localStorage.setItem("adminId", resp.data.idOfLoggedUser)
                props.onLogin();
                navigate("/home");
            }
            else {
                alert("Login unsucessfull, wrong password or email, try again.")
            }
        })

    }

    return (
        <CenteredContainer>
            <h3 style={{textAlign: "center", color: "darkcyan"}}>RebuMK</h3>
            <h5 style={{textAlign: "center", color: "darkcyan"}}>Login to your account</h5>
            <hr></hr>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               className="form-control"
                               name="username"
                               id="username"
                               required
                               placeholder="Enter username"
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="price">Password</label>
                        <input type="password"
                               className="form-control"
                               name="password"
                               id="password"
                               placeholder="Enter password"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button id="submit" type="submit" className="myButton btn btn-primary" style={{backgroundColor: "darkcyan", borderColor: "black"}}>Login</button>
                    </div>
                </form>
        </CenteredContainer>
    )
}

export default Login;