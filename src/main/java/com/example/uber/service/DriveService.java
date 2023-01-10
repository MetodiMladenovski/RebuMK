package com.example.uber.service;

import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface DriveService {

    Boolean startDrive(UUID requestUuid, UUID driverUuid);
}
