package com.example.uber.service;

import com.example.uber.model.Drive;
import com.example.uber.model.request.DriveRequest;
import com.example.uber.model.response.DriveResponse;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface DriveService {

    DriveResponse startDrive(UUID requestUuid, UUID driverUuid, DriveRequest driveRequest);

    Boolean finishDrive(UUID driveId);

    Drive findById(UUID driveId);

    DriveResponse getDriveByRequestId(UUID requestUuid);
}
