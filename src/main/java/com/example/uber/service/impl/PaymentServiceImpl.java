package com.example.uber.service.impl;

import com.example.uber.model.Drive;
import com.example.uber.model.Passenger;
import com.example.uber.model.Payment;
import com.example.uber.model.response.PaymentResponse;
import com.example.uber.repository.PaymentRepository;
import com.example.uber.service.PaymentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final ModelMapper modelMapper;

    @Override
    public void addPayment(Drive drive, Passenger passenger, float totalSumPayed) {
        Payment payment = new Payment(totalSumPayed, drive, passenger);
        paymentRepository.save(payment);
    }

    @Override
    public List<PaymentResponse> findAllPayments() {
        return paymentRepository.findAll()
                .stream()
                .map(payment -> modelMapper.map(payment, PaymentResponse.class))
                .collect(Collectors.toList());
    }
}
