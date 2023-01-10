package com.example.uber.model.response;

import com.example.uber.model.Admin;
import com.example.uber.model.enums.DriverLevel;
import com.example.uber.model.enums.DriverStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class DriverResponse {
    private UUID id;
    private String email;
    private String name;
    private String surname;
    private byte[] profilePicture;
    private float pricePerKm;
    private DriverStatus status;
    private DriverLevel level;
    private int numGrades;
    private float grade;
}
