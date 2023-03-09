package com.example.uber.service.impl;

import com.example.uber.model.*;
import com.example.uber.model.enums.DriveStatus;
import com.example.uber.model.enums.DriverStatus;
import com.example.uber.model.enums.RequestStatus;
import com.example.uber.model.request.DriveRequest;
import com.example.uber.model.response.DriveResponse;
import com.example.uber.model.response.PaymentResponse;
import com.example.uber.repository.DriveRepository;
import com.example.uber.service.*;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DriveServiceImpl implements DriveService {

    private final CarService carService;
    private final DriverService driverService;
    private final RequestService requestService;
    private final PaymentService paymentService;
    private final PassengerService passengerService;
    private final DriveRepository driveRepository;
    private final ModelMapper modelMapper;

    @Override
    public DriveResponse startDrive(UUID requestUuid, UUID driverUuid, DriveRequest driveRequest) {
        Car car = carService.getCarByDriverId(driverUuid);
        Driver driver = driverService.getDriverById(driverUuid);
        Request request = requestService.getById(requestUuid);
        if(driveRepository.existsByRequestId(requestUuid)){
            throw new IllegalArgumentException();
        }
        Drive drive = new Drive(car, driver, request, driveRequest.getDestinationLatitude(), driveRequest.getDestinationLongitude());
        driveRepository.save(drive);
        return modelMapper.map(drive, DriveResponse.class);
    }

    @Override
    public Boolean finishDrive(UUID driveId, float kmTravelled) {
        Drive drive = getById(driveId);
        requestService.updateStatus(drive.getRequest().getId(), RequestStatus.FINISHED);
        driverService.changeStatusForDriver(drive.getDriver().getId(), DriverStatus.AVAILABLE);
        driveRepository.save(drive.withStatus(DriveStatus.FINISHED).withKmTravelled(kmTravelled));
        return true;
    }

    @Override
    public Drive getById(UUID driveId) {
        return driveRepository.findById(driveId).orElseThrow(IllegalAccessError::new);
    }

    @Override
    public DriveResponse getDriveByRequestId(UUID requestUuid) {
        Drive drive = driveRepository.findByRequestId(requestUuid).orElseThrow(IllegalAccessError::new);
        return modelMapper.map(drive, DriveResponse.class);
    }
    @Override
    public List<Drive> getAllDrivesByDriverId(UUID driverId) {
        List<Drive> drivesForDriver = driveRepository.findAllByDriverId(driverId).orElseThrow(IllegalAccessError::new);
        return drivesForDriver;
    }

    @Override
    public DriveResponse gradeDrive(UUID driveUuid, float grade) {
        Drive drive = getById(driveUuid);
        Drive gradedDrive = drive.withGrade(grade);
        List<Drive> drivesForDriver = getAllDrivesByDriverId(drive.getDriver().getId())
                .stream()
                .filter(drive1 -> drive1.getGrade() != 0.0)
                .collect(Collectors.toList());
        driverService.updateGradeForDriver(gradedDrive.getDriver().getId(), grade, drivesForDriver);
        driveRepository.save(gradedDrive);
        return modelMapper.map(gradedDrive, DriveResponse.class);
    }

    @Override
    public UUID payDrive(UUID driveUuid, float totalPriceToPay) {
        Drive drive = getById(driveUuid);
        UUID passengerId = drive.getRequest().getPassenger().getId();
        Passenger passenger = passengerService.getById(passengerId);
        driveRepository.save(drive.withStatus(DriveStatus.PAYED));
        PaymentResponse savedPayment = paymentService.addPayment(drive, passenger, totalPriceToPay);
        return savedPayment.getId();
    }
}
