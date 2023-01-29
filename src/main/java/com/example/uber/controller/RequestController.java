package com.example.uber.controller;

import com.example.uber.model.request.RequestDriveRequest;
import com.example.uber.model.response.RequestDriveResponse;
import com.example.uber.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/request")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000/")
public class RequestController {
    private RequestService requestService;

    @PostMapping("/make/{passengerId}")
    public ResponseEntity<RequestDriveResponse> makeRequest(@PathVariable String passengerId,
                                                            @RequestBody RequestDriveRequest requestDriveRequest) {
        UUID passengerUuid = UUID.fromString(passengerId);
        RequestDriveResponse response;
        if (requestDriveRequest.getChosenDriverId() != null) {
            UUID chosenDriverUuid = UUID.fromString(requestDriveRequest.getChosenDriverId());
            response = requestService.makeRequestForSpecificDriver(passengerUuid, chosenDriverUuid, requestDriveRequest);
        } else {
            response = requestService.makeRequestForAllDrivers(passengerUuid, requestDriveRequest);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/confirm/{driverId}/{requestId}")
    public ResponseEntity<RequestDriveResponse> confirmRequest(@PathVariable String driverId, @PathVariable String requestId) {
        UUID driverUUID = UUID.fromString(driverId);
        UUID requestUUID = UUID.fromString(requestId);
        RequestDriveResponse requestDriveResponse = requestService.confirmRequest(driverUUID, requestUUID);
        return ResponseEntity.ok(requestDriveResponse);
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<RequestDriveResponse>> getAllCreatedRequests(@PathVariable String driverId) {
        UUID driverUuid = UUID.fromString(driverId);
        List<RequestDriveResponse> allCreatedRequests = requestService.getAllCreatedRequests(driverUuid);
        return ResponseEntity.ok(allCreatedRequests);
    }

    @GetMapping("/{requestId}")
    public ResponseEntity<RequestDriveResponse> getRequestById(@PathVariable String requestId) {
        UUID requestUuid = UUID.fromString(requestId);
        return ResponseEntity.ok(requestService.getRequestById(requestUuid));
    }
}
