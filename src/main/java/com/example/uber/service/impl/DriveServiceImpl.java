package com.example.uber.service.impl;

import com.example.uber.service.DriveService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DriveServiceImpl implements DriveService {
    @Override
    public Boolean startDrive(UUID requestUuid, UUID driverUuid) {
        return null;
    }
}
