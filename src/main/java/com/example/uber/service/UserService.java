package com.example.uber.service;

import com.example.uber.model.request.DriverRegisterRequest;
import com.example.uber.model.request.LoginRequest;
import com.example.uber.model.request.PassengerRegisterRequest;
import org.springframework.http.ResponseEntity;

public interface UserService {
    void registerPassenger(PassengerRegisterRequest passengerRequest);
    void registerDriver(DriverRegisterRequest driverRequest);

    String login(LoginRequest loginRequest);
}
