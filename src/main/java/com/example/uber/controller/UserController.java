package com.example.uber.controller;


import com.example.uber.model.request.DriverRegisterRequest;
import com.example.uber.model.request.PassengerRegisterRequest;
import com.example.uber.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/register")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/passenger")
    private ResponseEntity<Boolean> registerPassenger(@RequestBody PassengerRegisterRequest passenger){
        userService.registerPassenger(passenger);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/driver")
    private ResponseEntity<Boolean> registerDriver(@RequestBody DriverRegisterRequest driver){
        userService.registerDriver(driver);
        return ResponseEntity.ok(true);
    }
}
