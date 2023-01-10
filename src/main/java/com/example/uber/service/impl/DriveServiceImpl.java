package com.example.uber.service.impl;

import com.example.uber.model.Car;
import com.example.uber.model.Drive;
import com.example.uber.model.Driver;
import com.example.uber.model.Request;
import com.example.uber.model.enums.DriveStatus;
import com.example.uber.model.request.DriveRequest;
import com.example.uber.model.response.DriveResponse;
import com.example.uber.repository.DriveRepository;
import com.example.uber.service.CarService;
import com.example.uber.service.DriveService;
import com.example.uber.service.DriverService;
import com.example.uber.service.RequestService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.UUID;

@Service
@AllArgsConstructor
public class DriveServiceImpl implements DriveService {

    private final CarService carService;
    private final DriverService driverService;
    private final RequestService requestService;
    private final DriveRepository driveRepository;
    private final ModelMapper modelMapper;

    @Override
    public DriveResponse startDrive(UUID requestUuid, UUID driverUuid, DriveRequest driveRequest) {
        Car car = carService.findCarByDriverId(driverUuid);
        Driver driver = driverService.findDriverById(driverUuid);
        Request request = requestService.findById(requestUuid);
        Drive drive = new Drive(car, driver, request, driveRequest.getDestinationLatitude(), driveRequest.getDestinationLongitude());
        driveRepository.save(drive);
        return modelMapper.map(drive, DriveResponse.class);
    }

    @Override
    public Boolean finishDrive(UUID driveId) {
        Drive drive = findById(driveId);
        driveRepository.save(drive.withStatus(DriveStatus.FINISHED));
        return true;
    }

    @Override
    public Drive findById(UUID driveId) {
        return driveRepository.findById(driveId).orElseThrow(IllegalAccessError::new);
    }
}
