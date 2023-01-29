package com.example.uber.service;

import com.example.uber.model.Driver;
import com.example.uber.model.enums.DriverStatus;

import java.util.List;
import java.util.UUID;

public interface DriverService {
    void changeStatusForDriver(UUID driverId, DriverStatus status);

    Driver findDriverById(UUID driverId);

    List<Driver> findAllApprovedAndAvailableDrivers();

    Boolean approveAccount(UUID driverId);

    List<Driver> findAllUnapprovedDrivers();

    Driver save(Driver driver);

    void updateGradeForDriver(UUID driverId, float grade);
}
