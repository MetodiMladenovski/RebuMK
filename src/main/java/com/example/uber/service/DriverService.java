package com.example.uber.service;

import com.example.uber.model.Drive;
import com.example.uber.model.Driver;
import com.example.uber.model.enums.DriverStatus;
import com.example.uber.model.response.DriverResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface DriverService {
    void changeStatusForDriver(UUID driverId, DriverStatus status);

    Driver findDriverById(UUID driverId);

    List<Driver> findAllApprovedAndAvailableDrivers();

    Boolean approveAccount(UUID driverId);

    List<Driver> findAllUnapprovedDrivers();

    Driver save(Driver driver);

    void updateGradeForDriver(UUID driverId, float grade, List<Drive> drives);

    DriverResponse changeProfilePicture(UUID driverUuid, MultipartFile picture);

    Resource getProfilePicture(UUID driverId);
}
