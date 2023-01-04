package com.example.uber.controller;

import com.example.uber.model.request.RequestDriveRequest;
import com.example.uber.model.response.RequestDriveResponse;
import com.example.uber.service.RequestService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/request")
@AllArgsConstructor
public class RequestController {
    private RequestService requestService;

    @PostMapping("/make")
    public ResponseEntity<RequestDriveResponse> makeRequest(@RequestBody RequestDriveRequest requestDriveRequest){
        return ResponseEntity.ok(requestService.makeRequest(requestDriveRequest));
    }

    @PostMapping("/confirm/{driverId}/{requestId}")
    public ResponseEntity<Boolean> confirmRequest(@PathVariable String driverId, @PathVariable String requestId){
        UUID driverUUID = UUID.fromString(driverId);
        UUID requestUUID = UUID.fromString(requestId);
        requestService.confirmRequest(driverUUID, requestUUID);
        return ResponseEntity.ok(true);
    }
}
