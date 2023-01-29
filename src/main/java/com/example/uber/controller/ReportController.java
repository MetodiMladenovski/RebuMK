package com.example.uber.controller;

import com.example.uber.model.immutable.AdminReport;
import com.example.uber.model.immutable.DriverReport;
import com.example.uber.model.immutable.PassengerReport;
import com.example.uber.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reports")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000/")
public class ReportController {
    private final ReportService reportService;

    @GetMapping("/passenger/{passengerId}")
    public ResponseEntity<List<PassengerReport>> getReportForPassenger(@PathVariable UUID passengerId){
        List<PassengerReport> passengerReport = reportService.getReportForPassenger(passengerId);
        return ResponseEntity.ok(passengerReport);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<AdminReport>> getReportForAdmin(){
        List<AdminReport> passengerReport = reportService.getReportForAdmin();
        return ResponseEntity.ok(passengerReport);
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<DriverReport>> getReportForDriver(@PathVariable UUID driverId){
        List<DriverReport> driverReport = reportService.getReportForDriver(driverId);
        return ResponseEntity.ok(driverReport);
    }

}
