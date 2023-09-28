import './App.css';
import React, {Component} from "react";
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import RebuMKService from "../../repository/rebuRepository";
import Home from "../Home/home";
import Login from '../Login/login';
import Header from "../Header/header";
import Register from "../Register/register";
import RegisterDriver from "../Register/registerDriver";
import RegisterPassenger from "../Register/registerPassenger";
import Requests from "../Requests/requests";
import ConfirmedRequest from '../Requests/confirmedRequest';
import StartedDrive from '../Drive/startedDrive';
import GradeDrive from '../Drive/gradeDrive'
import PayDrive from '../Drive/pay-drive'
import MakeRequest from '../Requests/makeRequest';
import MadeRequest from '../Requests/madeRequest';
import Drivers from '../Drivers/drivers'
import UnapprovedDrivers from '../Drivers/unapprovedDrivers';
import Car from '../Cars/car'
import AddCar from '../Cars/addCar'
import Payments from '../Payments/payments'
import AdminReport from '../Reports/adminReport'
import DriverReport from '../Reports/driverReport'
import PassengerReport from '../Reports/passengerReport'
import Footer from '../Footer/footer'
import DriverProfile from '../Drivers/driverProfile'
import TipDriver from '../Drive/tipDriver';


class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          allCreatedRequests: [],
          allApprovedDrivers: [],
          allUnApprovedDrivers: [],
          payments: [],
          adminReport: [],
          passengerReport: [],
          driverReport: [],
          loggedDriver: null
      }
  }

  render() {
      return (
          <Router>
              <Header/>
              <main>
                  <div className={"container"}>
                      <Routes>
                          <Route path={"/"} element={<Home />}/>
                          <Route path={"/home"} element={<Home />}/>
                          <Route path={"/login"} element={<Login onLogin={this.fetchData} onLoadRequests={this.loadRequests}/>}/>
                          <Route path={"/register"} element={<Register />}/>
                          <Route path={"/registerPassenger"} element={<RegisterPassenger onRegisterPassenger={this.registerPassenger}/>}/>
                          <Route path={"/registerDriver"} element={<RegisterDriver onRegisterDriver={this.registerDriver}/>}/>
                          <Route path={"/registerDriver"} element={<RegisterDriver onRegisterDriver={this.registerDriver}/>}/>
                          <Route path={"/requests"} element={<Requests requests={this.state.allCreatedRequests} />}/>
                          <Route path={"/confirmed-request"} element={<ConfirmedRequest onRefreshPassengersMadeRequest={this.refreshPassengersMadeRequest}/>}/>
                          <Route path={"/started-drive"} element={<StartedDrive />}/>
                          <Route path={"/grade-drive"} element={<GradeDrive />}/>
                          <Route path={"/pay-drive"} element={<PayDrive />}/>
                          <Route path={"/tip-driver"} element={<TipDriver onTipDriver={this.tipDriver}/>}/>
                          <Route path={"/make-request"} element={<MakeRequest />}/>
                          <Route path={"/made-request"} element={<MadeRequest />}/>
                          <Route path={"/drivers"} element={<Drivers drivers={this.state.allApprovedDrivers} />}/>
                          <Route path={"/unapproved-drivers"} element={<UnapprovedDrivers drivers={this.state.allUnApprovedDrivers} onApproveDriver={this.approveDriver} onDenyDriver={this.denyDriver}/>}/>
                          <Route path={"/driver/profile"} element={<DriverProfile driver={this.loggedDriver} onChangeProfilePicture={this.changeProfilePicture}/>}/>
                          <Route path={"/car"} element={<Car />}/>
                          <Route path={"/add-car"} element={<AddCar onAddCar={this.addCar} />}/>
                          <Route path={"/payments"} element={<Payments payments={this.state.payments} />}/>
                          <Route path={"/report/admin"} element={<AdminReport report={this.state.adminReport} onDownloadReport={this.downloadAdminReport}/>}/>
                          <Route path={"/report/driver"} element={<DriverReport report={this.state.driverReport} onDownloadReport={this.downloadDriverReport}/>}/>
                          <Route path={"/report/passenger"} element={<PassengerReport report={this.state.passengerReport} onDownloadReport={this.downloadPassengerReport}/>}/>
                      </Routes>
                  </div>
              </main>
              <Footer/>
          </Router>
      )
  }

  tipDriver = (paymentId, driverTipSum) => {
    RebuMKService.tipDriver(paymentId, driverTipSum).
        then(() => {
            this.fetchData()
        });
  }

  changeProfilePicture = (driverId, profilePicture) => {
    RebuMKService.changeProfilePicture(driverId, profilePicture)
        .then((resp) => {
            this.loggedDriver=resp.data
    })
  }

  getLoggedDriver = (driverId) => {
    RebuMKService.getDriverById(driverId)
        .then((resp) => {
            this.loggedDriver=resp.data
    })
  }

  downloadPassengerReport = (passengerId) => {
    RebuMKService.downloadPassengerReport(passengerId)
        .then((resp) => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", passengerId + ".pdf");
            document.body.appendChild(link);
            link.click();
        })
  }
  downloadDriverReport = (driverId) => {
    RebuMKService.downloadDriverReport(driverId)
        .then((resp) => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", driverId + ".pdf");
            document.body.appendChild(link);
            link.click();
        })
  }
  downloadAdminReport = () => {
    RebuMKService.downloadAdminReport()
        .then((resp) => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download",  "admin.pdf");
            document.body.appendChild(link);
            link.click();
        })
  }
  
  
  loadAdminReport = () => {
      RebuMKService.getAdminReport()
          .then((data) => {
              this.setState({
                  adminReport: data.data
              })
          })
  }

  loadDriverReport = (driverId) => {
      RebuMKService.getDriverReport(driverId)
          .then((data) => {
              this.setState({
                  driverReport: data.data
              })
          })
  }

  loadPassengerReport = (passengerId) => {
      RebuMKService.getPassengerReport(passengerId)
          .then((data) => {
              this.setState({
                  passengerReport: data.data
              })
          })
  }

  approveDriver = (driverId) => {
    RebuMKService.approveDriver(driverId)
    .then(() => {
        this.fetchData()
    })
  }
  denyDriver = (driverId) => {
    RebuMKService.denyDriver(driverId)
    .then(() => {
        this.fetchData()
    })
  }

  addCar = (driverId, licensePlate, make, model, year) => {
    RebuMKService.addCarForDriver(driverId, licensePlate, make, model, year)
    .then(() => {
        this.fetchData()
    })
  }

  refreshPassengersMadeRequest = () => {
    <MadeRequest />
  }

  loadRequests = (driverId) => {
      RebuMKService.getAllCreatedRequests(driverId)
          .then((data) => {
              this.setState({
                  allCreatedRequests: data.data
              })
          })
  }

  loadPayments = () => {
    RebuMKService.getAllPayments()
        .then((data) => {
            this.setState({
                payments: data.data
            })
        })
  }

  loadApprovedDrivers = () => {
    RebuMKService.getAllDrivers()
        .then((data) => {
            this.setState({
                allApprovedDrivers: data.data
            })
        })
  }

  loadUnApprovedDrivers = () => {
    RebuMKService.getUnapprovedDrivers()
        .then((data) => {
            this.setState({
                allUnApprovedDrivers: data.data
            })
        })
  }

  registerDriver = (firstName, surname, email, password, pricePerKm) => {
    RebuMKService.registerDriver(firstName, surname, email, password, pricePerKm)
        .then(() => {
            this.fetchData()
        })
  }
  registerPassenger = (firstName, surname, email, password) => {
    RebuMKService.registerPassenger(firstName, surname, email, password)
        .then(() => {
            this.fetchData();
        })
  }

  componentDidMount() {
    document.body.style.backgroundColor = "#f1faee"
    this.fetchData();
  }

  fetchData = () =>  {
    if(localStorage.getItem("driverId")){
        const driverId = localStorage.getItem("driverId");
        this.loadRequests(driverId);
        this.loadDriverReport(driverId);
        this.getLoggedDriver(driverId);
    } else if(localStorage.getItem("passengerId")){
        this.loadApprovedDrivers()
        this.loadPassengerReport(localStorage.getItem("passengerId"))
    } else if(localStorage.getItem("adminId")){
        this.loadUnApprovedDrivers()
        this.loadPayments()
        this.loadAdminReport()
    }
  }
}

export default App;