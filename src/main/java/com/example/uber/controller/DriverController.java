package com.example.uber.controller;

import com.example.uber.model.Driver;
import com.example.uber.model.response.DriverResponse;
import com.example.uber.service.DriverService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/driver")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000/")
public class DriverController {

    private final DriverService driverService;

    private final ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<DriverResponse>> findAllApprovedDrivers() {
        return ResponseEntity.ok(driverService.findAllApprovedDrivers().stream()
                .map(driver -> modelMapper.map(driver, DriverResponse.class)).collect(Collectors.toList()));
    }

    @GetMapping("/unapproved")
    public ResponseEntity<List<DriverResponse>> findAllUnapprovedDrivers() {
        return ResponseEntity.ok(driverService.findAllUnapprovedDrivers().stream()
                .map(driver -> modelMapper.map(driver, DriverResponse.class)).collect(Collectors.toList()));
    }

    @GetMapping("/{driverId}")
    public ResponseEntity<DriverResponse> findDriverById(@PathVariable String driverId) {
        UUID driverUuid = UUID.fromString(driverId);
        Driver driver = driverService.findDriverById(driverUuid);
        DriverResponse driverResponse = modelMapper.map(driver, DriverResponse.class);
        return ResponseEntity.ok(driverResponse);
    }

    @PostMapping("/approve/{driverId}")
    public ResponseEntity<Boolean> approveDriverAccount(@PathVariable String driverId) {
        UUID driverUuid = UUID.fromString(driverId);
        return ResponseEntity.ok(driverService.approveAccount(driverUuid));
    }
}
