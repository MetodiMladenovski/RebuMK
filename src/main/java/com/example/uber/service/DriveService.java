package com.example.uber.service;

import com.example.uber.model.Drive;
import com.example.uber.model.request.DriveRequest;
import com.example.uber.model.response.DriveResponse;

import java.util.List;
import java.util.UUID;

public interface DriveService {

    DriveResponse startDrive(UUID requestUuid, UUID driverUuid, DriveRequest driveRequest);

    Boolean finishDrive(UUID driveId, float kmTravelled);

    Drive getById(UUID driveId);

    DriveResponse getDriveByRequestId(UUID requestUuid);

    DriveResponse gradeDrive(UUID driveUuid, float grade);

    UUID payDrive(UUID driveUuid, float totalPriceToPay);

    List<Drive> getAllDrivesByDriverId(UUID driverId);
}
