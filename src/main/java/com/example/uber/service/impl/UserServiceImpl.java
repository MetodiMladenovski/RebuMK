package com.example.uber.service.impl;

import com.example.uber.model.Admin;
import com.example.uber.model.Driver;
import com.example.uber.model.Passenger;
import com.example.uber.model.enums.DriverLevel;
import com.example.uber.model.enums.DriverStatus;
import com.example.uber.model.request.DriverRegisterRequest;
import com.example.uber.model.request.LoginRequest;
import com.example.uber.model.request.PassengerRegisterRequest;
import com.example.uber.repository.AdminRepository;
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

    private final AdminRepository adminRepository;

    @Override
    public void registerPassenger(PassengerRegisterRequest passengerRequest) {
        if(passengerRepository.existsByEmail(passengerRequest.getEmail())){
            throw new IllegalStateException();
        }
        Passenger passenger = modelMapper.map(passengerRequest, Passenger.class);
        Passenger passengerWithEncryptedPassword = passenger.withEncryptedPassword(this.encodePassword(passengerRequest.getPassword()));
        passengerRepository.save(passengerWithEncryptedPassword);
    }

    @Override
    public void registerDriver(DriverRegisterRequest driverRequest) {
        if(driverRepository.existsByEmail(driverRequest.getEmail())){
            throw new IllegalStateException();
        }
        Driver driver = modelMapper.map(driverRequest, Driver.class);
        Driver driverWithEncryptedPassword = driver.withLevel(DriverLevel.BEGINNER)
                .withStatus(DriverStatus.NOT_WORKING)
                .withEncryptedPassword(this.encodePassword(driverRequest.getPassword()));
        driverRepository.save(driverWithEncryptedPassword);
    }

    @Override
    public String login(LoginRequest loginRequest) {
        String loggedUser = "false";
        if(driverRepository.existsByEmail(loginRequest.getEmail())){
            Driver driver = driverRepository.findByEmail(loginRequest.getEmail());
            if(passwordEncoder.matches(loginRequest.getPassword(), driver.getEncryptedPassword())){
                loggedUser = "Driver";
            }
        } else if(passengerRepository.existsByEmail(loginRequest.getEmail())){
            Passenger passenger = passengerRepository.findByEmail(loginRequest.getEmail());
            if(passwordEncoder.matches(loginRequest.getPassword(), passenger.getEncryptedPassword())){
                loggedUser = "Passenger";
            }
        } else if (adminRepository.existsByEmail(loginRequest.getEmail())){
            Admin admin = adminRepository.findByEmail(loginRequest.getEmail());
            if(passwordEncoder.matches(loginRequest.getPassword(), admin.getEncryptedPassword())){
                loggedUser = "Admin";
            }
        }
        return loggedUser;
    }

    private String encodePassword(String password){
        return passwordEncoder.encode(password);
    }
}
