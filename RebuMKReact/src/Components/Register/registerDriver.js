import React from "react";
import {useNavigate} from "react-router-dom";
import CenteredContainer from "../UtilComponents/CenteredContainer";
import '../UtilComponents/App.css'

const registerDriver = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, updateFormData] = React.useState({
        firstName : "",
        surname : "",
        email : "",
        password : "",
        repeatedPassword: "",
        pricePerKm : ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const firstName = formData.firstName
        const surname = formData.surname
        const email = formData.email
        const password = formData.password
        const repetedPassword = formData.repeatedPassword
        const pricePerKm = formData.pricePerKm

        if(password !== repetedPassword)
            alert("Passwords don't match");

        props.onRegisterDriver(firstName, surname, email, password, pricePerKm);
        navigate("/login")
    }

    return(
        <CenteredContainer>
            <h3 style={{textAlign: "center", color: "darkcyan"}}>Register Driver</h3>
            <br></br>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First name</label>
                        <input type="text"
                               className="form-control"
                               id="firstName"
                               name="firstName"
                               required
                               placeholder="E.g: John"
                               style={{height: 100 + "%"}}
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text"
                               className="form-control"
                               id="surname"
                               name="surname"
                               required
                               placeholder="E.g: Doe"
                               style={{height: 100 + "%"}}
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                               className="form-control"
                               id="email"
                               name="email"
                               placeholder="E.g: johndoe@email.com"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               name="password"
                               placeholder="E.g: moreCharacters@123"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="repeatedPassword">Repeat Password</label>
                        <input type="password"
                               className="form-control"
                               id="repeatedPassword"
                               name="repeatedPassword"
                               placeholder="E.g: moreCharacters@123"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="pricePerKm">Price Per Kilometar</label>
                        <input type="number"
                               className="form-control"
                               id="pricePerKm"
                               name="pricePerKm"
                               placeholder="E.g: 50"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button id="submit" type="submit" className="myButton btn btn-primary" style={{backgroundColor: "darkcyan", float: "center",  borderColor: "black", color:'white'}}>Register</button>
                    </div>
                </form>
        </CenteredContainer>
    )

}

export default registerDriver;