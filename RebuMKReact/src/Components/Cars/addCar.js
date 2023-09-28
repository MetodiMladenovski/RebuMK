import React from "react";
import {useNavigate} from "react-router-dom";
import CenteredContainer from "../UtilComponents/CenteredContainer";
import '../UtilComponents/App.css'

const AddCar = (props) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, updateFormData] = React.useState({
        licensePlate : "",
        make : "",
        model : "",
        year : "",
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const licensePlate = formData.licensePlate
        const make = formData.make
        const model = formData.model
        const year = formData.year
        const driverId = localStorage.getItem("driverId");
        props.onAddCar(driverId, licensePlate, make, model, year);
        navigate("/home")
    }

    return(
        <CenteredContainer>
            <h3 style={{textAlign: "center", color: "darkcyan"}}>Add a car</h3>
            <br></br>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="licensePlate">License Plate</label>
                        <input type="text"
                               className="form-control"
                               id="licensePlate"
                               name="licensePlate"
                               required
                               placeholder="E.g: SK-321-MK"
                               style={{height: 100 + "%"}}
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="make">Make</label>
                        <input type="text"
                               className="form-control"
                               id="make"
                               name="make"
                               required
                               placeholder="E.g: Opel"
                               style={{height: 100 + "%"}}
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text"
                               className="form-control"
                               id="model"
                               name="model"
                               placeholder="E.g: Astra"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input type="number"
                               className="form-control"
                               id="year"
                               name="year"
                               placeholder="E.g: 2013"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <br></br>
                    <div className="d-grid gap-2 col-6 mx-auto">
                    <button id="submit" type="submit" className="myButton btn btn-primary" style={{backgroundColor: "darkcyan", borderColor: "black", color:'white'}}>Add Car</button>
                    </div>
                </form>
        </CenteredContainer>
    )

}

export default AddCar;