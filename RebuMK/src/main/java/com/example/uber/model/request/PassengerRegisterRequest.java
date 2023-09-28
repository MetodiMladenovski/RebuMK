package com.example.uber.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PassengerRegisterRequest {
    private String email;
    private String password;
    private String name;
    private String surname;
}
