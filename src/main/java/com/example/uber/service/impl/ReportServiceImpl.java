package com.example.uber.service.impl;

import com.example.uber.model.immutable.AdminReport;
import com.example.uber.model.immutable.DriverReport;
import com.example.uber.model.immutable.PassengerReport;
import com.example.uber.repository.immutable.AdminReportRepository;
import com.example.uber.repository.immutable.DriverReportRepository;
import com.example.uber.repository.immutable.PassengerReportRepository;
import com.example.uber.service.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final PassengerReportRepository passengerReportRepository;
    private final AdminReportRepository adminReportRepository;
    private final DriverReportRepository driverReportRepository;

    @Override
    public List<PassengerReport> getReportForPassenger(UUID passengerId) {
        return passengerReportRepository.findByPassengerId(passengerId);
    }

    @Override
    public List<AdminReport> getReportForAdmin() {
        return adminReportRepository.findAll();
    }

    @Override
    public List<DriverReport> getReportForDriver(UUID driverId) {
        return driverReportRepository.findByDriverId(driverId);
    }


}
