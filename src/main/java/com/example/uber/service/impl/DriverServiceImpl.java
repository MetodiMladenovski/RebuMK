package com.example.uber.service.impl;

import com.example.uber.model.Driver;
import com.example.uber.model.enums.DriverStatus;
import com.example.uber.repository.DriverRepository;
import com.example.uber.service.DriverService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.InstanceNotFoundException;
import java.util.UUID;

@Service
@AllArgsConstructor
public class DriverServiceImpl implements DriverService {
    private final DriverRepository driverRepository;

    public void changeStatusForDriver(UUID driverId, DriverStatus status){
        Driver driver = driverRepository.findById(driverId).orElseThrow(IllegalAccessError::new);
        Driver driverWithChangedStatus = driver.withStatus(status);
        driverRepository.save(driverWithChangedStatus);
    }

    @Override
    public Driver findDriverById(UUID driverId) {
        return driverRepository.findById(driverId).orElseThrow(IllegalAccessError::new);
    }
}
