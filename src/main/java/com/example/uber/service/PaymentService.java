package com.example.uber.service;

import com.example.uber.model.Drive;
import com.example.uber.model.Passenger;
import com.example.uber.model.response.PaymentResponse;

import java.util.List;

public interface PaymentService {
    void addPayment(Drive drive, Passenger passenger, float totalSumPayed);

    List<PaymentResponse> findAllPayments();
}
