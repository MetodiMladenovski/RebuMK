package com.example.uber.service.impl;

import com.example.uber.model.Request;
import com.example.uber.model.enums.DriverStatus;
import com.example.uber.model.enums.RequestStatus;
import com.example.uber.model.request.RequestDriveRequest;
import com.example.uber.model.response.RequestDriveResponse;
import com.example.uber.repository.RequestRepository;
import com.example.uber.service.DriverService;
import com.example.uber.service.RequestService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RequestServiceImpl  implements RequestService {

    private final RequestRepository requestRepository;
    private final DriverService driverService;
    private final ModelMapper modelMapper;

    @Override
    public RequestDriveResponse makeRequest(RequestDriveRequest request) {
        Request requestDrive = modelMapper.map(request, Request.class).withStatus(RequestStatus.CREATED);
        Request savedRequest = requestRepository.save(requestDrive);
        return modelMapper.map(savedRequest, RequestDriveResponse.class);
    }

    @Override
    public List<RequestDriveResponse> getAllCreatedRequests() {
        List<Request> requests = requestRepository.findAllByStatus(RequestStatus.CREATED);
        return requests.stream().map(request -> modelMapper.map(request, RequestDriveResponse.class)).collect(Collectors.toList());
    }

    @Override
    public void confirmRequest(UUID driverId, UUID requestToConfirmId) {
        Request request = requestRepository.findById(requestToConfirmId).orElseThrow(IllegalAccessError::new);
        requestRepository.save(request.withStatus(RequestStatus.CONFIRMED));
        driverService.changeStatusForDriver(driverId, DriverStatus.BUSY);
    }

}
