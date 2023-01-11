package com.example.uber.controller;


import com.example.uber.model.request.DriverRegisterRequest;
import com.example.uber.model.request.LoginRequest;
import com.example.uber.model.request.PassengerRegisterRequest;
import com.example.uber.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register/passenger")
    public ResponseEntity<Boolean> registerPassenger(@RequestBody PassengerRegisterRequest passenger) {
        userService.registerPassenger(passenger);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/register/driver")
    public ResponseEntity<Boolean> registerDriver(@RequestBody DriverRegisterRequest driver) {
        userService.registerDriver(driver);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/login")
    public ResponseEntity<Boolean> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }
}
