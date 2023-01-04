package com.example.uber.model.response;

import com.example.uber.model.enums.RequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RequestDriveResponse {

    private UUID id;
    private RequestStatus status;
    private String cityAddress;
    private String streetAddress;
    private int numberAddress;
    private float latitude;
    private float longitude;
    private String passengerId;
    private String chosenDriverId;
    private String confirmedByDriverId;
}
