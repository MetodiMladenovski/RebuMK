package com.example.uber.service.impl;

import com.example.uber.model.Driver;
import com.example.uber.model.enums.DriverStatus;
import com.example.uber.repository.DriverRepository;
import com.example.uber.service.DriverService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DriverServiceImpl implements DriverService {
    private final DriverRepository driverRepository;

    public void changeStatusForDriver(UUID driverId, DriverStatus status) {
        Driver driver = driverRepository.findById(driverId).orElseThrow(IllegalAccessError::new);
        Driver driverWithChangedStatus = driver.withStatus(status);
        driverRepository.save(driverWithChangedStatus);
    }

    @Override
    public Driver findDriverById(UUID driverId) {
        return driverRepository.findById(driverId).orElseThrow(IllegalAccessError::new);
    }

    @Override
    public List<Driver> findAllApprovedDrivers() {
        return driverRepository.findAll().stream().filter(Driver::isApproved).collect(Collectors.toList());
    }

    @Override
    public Boolean approveAccount(UUID driverId) {
        Driver driver = findDriverById(driverId).withApproved(true);
        driverRepository.save(driver);
        return true;
    }

    @Override
    public List<Driver> findAllUnapprovedDrivers() {
        return driverRepository.findAllByIsApproved(false);
    }
}
