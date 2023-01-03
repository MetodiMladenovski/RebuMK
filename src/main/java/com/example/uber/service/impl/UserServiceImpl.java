package com.example.uber.service.impl;

import com.example.uber.model.Driver;
import com.example.uber.model.Passenger;
import com.example.uber.model.enums.Role;
import com.example.uber.model.request.DriverRegisterRequest;
import com.example.uber.model.request.PassengerRegisterRequest;
import com.example.uber.repository.DriverRepository;
import com.example.uber.repository.PassengerRepository;
import com.example.uber.service.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final ModelMapper modelMapper;
    private final PassengerRepository passengerRepository;
    private final DriverRepository driverRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void registerPassenger(PassengerRegisterRequest passengerRequest) {
        Passenger passenger = modelMapper.map(passengerRequest, Passenger.class);
        Passenger passengerWithEncryptedPassword = passenger.withEncryptedPassword(this.encodePassword(passengerRequest.getPassword()));
        passengerRepository.save(passengerWithEncryptedPassword);
    }

    @Override
    public void registerDriver(DriverRegisterRequest driverRequest) {
        Driver driver = modelMapper.map(driverRequest, Driver.class);
        Driver driverWithEncryptedPassword = driver.withEncryptedPassword(this.encodePassword(driverRequest.getPassword()));
        driverRepository.save(driverWithEncryptedPassword);
    }

    private String encodePassword(String password){
        return passwordEncoder.encode(password);
    }
}
