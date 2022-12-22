package com.example.uber.service;

import com.example.uber.model.request.DriverRegisterRequest;
import com.example.uber.model.request.PassengerRegisterRequest;

public interface UserService {
    void registerPassenger(PassengerRegisterRequest passengerRequest);
    void registerDriver(DriverRegisterRequest driverRequest);
}
