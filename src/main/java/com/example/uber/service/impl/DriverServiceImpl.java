package com.example.uber.service.impl;

import com.example.uber.model.Drive;
import com.example.uber.model.Driver;
import com.example.uber.model.enums.DriverStatus;
import com.example.uber.model.response.DriverResponse;
import com.example.uber.repository.DriverRepository;
import com.example.uber.service.DriverService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DriverServiceImpl implements DriverService {
    private final DriverRepository driverRepository;
    private final ModelMapper modelMapper;

    @Override
    public Driver getDriverById(UUID driverId) {
        return driverRepository.findById(driverId).orElseThrow(IllegalAccessError::new);
    }

    @Override
    public List<Driver> findAllApprovedAndAvailableDrivers() {
        return driverRepository.findAll().stream()
                .filter(driver -> driver.getStatus().equals(DriverStatus.AVAILABLE) && driver.isApproved())
                .collect(Collectors.toList());
    }

    @Override
    public Boolean approveAccount(UUID driverId) {
        Driver driver = getDriverById(driverId).withApproved(true);
        driverRepository.save(driver);
        return true;
    }

    @Override
    public List<Driver> findAllUnapprovedDrivers() {
        return driverRepository.findAllByIsApproved(false);
    }

    @Override
    public Driver save(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public void updateGradeForDriver(UUID driverId, float grade, List<Drive> drives) {
        Driver driver = getDriverById(driverId);
        List<Float> gradesForDriver = drives.stream().map(Drive::getGrade).collect(Collectors.toList());
        driver.updateGrade(gradesForDriver, grade);
        driverRepository.save(driver);
    }

    @Override
    public DriverResponse changeProfilePicture(UUID driverUuid, MultipartFile picture) {
        Driver driver = getDriverById(driverUuid);
        try {
            Driver driverWithPicture = driver.withProfilePicture(picture.getBytes());
            driverRepository.save(driverWithPicture);
            return modelMapper.map(driverWithPicture, DriverResponse.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Resource getProfilePicture(UUID driverId) {
        Driver driver = getDriverById(driverId);
        if(driver.getProfilePicture()==null){
            throw new IllegalArgumentException();
        }
        byte[] profilePictureBytes = driver.getProfilePicture();
        return new ByteArrayResource(profilePictureBytes);
    }

    public void changeStatusForDriver(UUID driverId, DriverStatus status) {
        Driver driver = driverRepository.findById(driverId).orElseThrow(IllegalAccessError::new);
        Driver driverWithChangedStatus = driver.withStatus(status);
        driverRepository.save(driverWithChangedStatus);
    }
}
