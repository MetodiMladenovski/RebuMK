package com.example.uber.controller;

import com.example.uber.service.DriveService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/drive")
@AllArgsConstructor
public class DriveController {

    private final DriveService driveService;

    @PostMapping("/start/{requestId}/{driverId}")
    public ResponseEntity<Boolean> startDrive(@PathVariable String requestId, @PathVariable String driverId){
        UUID requestUuid = UUID.fromString(requestId);
        UUID driverUuid = UUID.fromString(driverId);
        return ResponseEntity.ok(driveService.startDrive(requestUuid, driverUuid));
    }
}
