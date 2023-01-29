package com.example.uber.service;

import com.example.uber.model.immutable.AdminReport;
import com.example.uber.model.immutable.DriverReport;
import com.example.uber.model.immutable.PassengerReport;

import java.util.List;
import java.util.UUID;

public interface ReportService {
    List<PassengerReport> getReportForPassenger(UUID passengerId);

    List<AdminReport> getReportForAdmin();

    List<DriverReport> getReportForDriver(UUID driverId);

}
