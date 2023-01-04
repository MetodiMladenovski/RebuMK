package com.example.uber.service;

import com.example.uber.model.request.RequestDriveRequest;
import com.example.uber.model.response.RequestDriveResponse;

import java.util.List;
import java.util.UUID;

public interface RequestService {
    RequestDriveResponse makeRequest(RequestDriveRequest request);
    List<RequestDriveResponse> getAllCreatedRequests();

    void confirmRequest(UUID driverId, UUID requestToConfirmId);
}
