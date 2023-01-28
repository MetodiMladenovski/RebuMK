package com.example.uber.controller;

import com.example.uber.model.Car;
import com.example.uber.model.request.CarRequest;
import com.example.uber.model.response.CarResponse;
import com.example.uber.service.CarService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/car")
@AllArgsConstructor
@CrossOrigin("http://localhost:3000/")
public class CarController {
    private final CarService carService;
    private final ModelMapper modelMapper;

    @PostMapping("/add/{driverId}")
    public ResponseEntity<Car> addCarForDriver(@RequestBody CarRequest carRequest, @PathVariable String driverId) {
        UUID driverUUID = UUID.fromString(driverId);
        Car savedCar = carService.addCarForDriver(carRequest, driverUUID);
        return ResponseEntity.ok(savedCar);
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<CarResponse> getCarForDriver(@PathVariable String driverId){
        UUID driverUuid = UUID.fromString(driverId);
        Car car = carService.findCarByDriverId(driverUuid);
        return ResponseEntity.ok(modelMapper.map(car, CarResponse.class));
    }
}
