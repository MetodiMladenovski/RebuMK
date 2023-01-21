package com.example.uber.service.impl;

import com.example.uber.model.Car;
import com.example.uber.model.Driver;
import com.example.uber.model.request.CarRequest;
import com.example.uber.repository.CarRepository;
import com.example.uber.service.CarService;
import com.example.uber.service.DriverService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;
    private final ModelMapper modelMapper;
    private final DriverService driverService;

    @Override
    public Car addCarForDriver(CarRequest carRequest, UUID driverId) {
        Car car = modelMapper.map(carRequest, Car.class);
        Driver driver = driverService.findDriverById(driverId);
        Car carWithAddedDriver = car.withDriver(driver);
        return carRepository.save(carWithAddedDriver);
    }

    @Override
    public Car findCarByDriverId(UUID driverId) {
        return carRepository.findByDriverId(driverId).orElseThrow(IllegalAccessError::new);
    }

    @Override
    public Car findCarById(UUID carId) {
        return carRepository.findById(carId).orElseThrow(IllegalAccessError::new);
    }
}
