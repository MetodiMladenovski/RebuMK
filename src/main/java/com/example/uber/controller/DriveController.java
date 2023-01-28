package com.example.uber.controller;

import com.example.uber.model.request.DriveRequest;
import com.example.uber.model.response.DriveResponse;
import com.example.uber.service.DriveService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/drive")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000/")
public class DriveController {

    private final DriveService driveService;

    @PostMapping("/start/{requestId}/{driverId}")
    public ResponseEntity<DriveResponse> startDrive(@PathVariable String requestId, @PathVariable String driverId, @RequestBody DriveRequest driveRequest) {
        UUID requestUuid = UUID.fromString(requestId);
        UUID driverUuid = UUID.fromString(driverId);
        return ResponseEntity.ok(driveService.startDrive(requestUuid, driverUuid, driveRequest));
    }

    @PostMapping("/finish/{driveId}")
    public ResponseEntity<Boolean> finishDrive(@PathVariable String driveId, @RequestParam float kmTravelled) {
        UUID driveUuid = UUID.fromString(driveId);
        return ResponseEntity.ok(driveService.finishDrive(driveUuid, kmTravelled));
    }

    @GetMapping("/request/{requestId}")
    public ResponseEntity<DriveResponse> getDriveByRequestId(@PathVariable String requestId) {
        UUID requestUuid = UUID.fromString(requestId);
        return ResponseEntity.ok(driveService.getDriveByRequestId(requestUuid));
    }

    @PostMapping("/grade/{driveId}")
    public ResponseEntity<DriveResponse> gradeDrive(@PathVariable String driveId, @RequestParam float gradeNum) {
        UUID driveUuid = UUID.fromString(driveId);
        DriveResponse driveResponse = driveService.gradeDrive(driveUuid, gradeNum);
        return ResponseEntity.ok(driveResponse);
    }
    @PostMapping("/pay/{driveId}")
    public ResponseEntity<Boolean> payDrive(@PathVariable String driveId, @RequestParam float totalPriceToPay) {
        UUID driveUuid = UUID.fromString(driveId);
        Boolean driveResponse = driveService.payDrive(driveUuid, totalPriceToPay);
        return ResponseEntity.ok(driveResponse);
    }
}
