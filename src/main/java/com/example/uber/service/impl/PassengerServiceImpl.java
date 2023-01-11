package com.example.uber.service.impl;

import com.example.uber.model.Passenger;
import com.example.uber.repository.PassengerRepository;
import com.example.uber.service.PassengerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class PassengerServiceImpl implements PassengerService {
    private final PassengerRepository passengerRepository;

    @Override
    public Passenger findById(UUID passengerId) {
        return passengerRepository.findById(passengerId).orElseThrow(IllegalAccessError::new);
    }
}
