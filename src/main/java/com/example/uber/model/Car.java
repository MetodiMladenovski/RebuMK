package com.example.uber.model;

import lombok.Getter;

import javax.persistence.*;
import java.util.UUID;


@Entity
@Table(name = "car")
@Getter
public class Car {

    @Id
    @GeneratedValue
    @Column(name = "car_id")
    private UUID id;

    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "make")
    private String make;

    @Column(name = "car_year")
    private int year;

    @Column(name = "model")
    private String model;

    @OneToOne
    @JoinColumn(name = "id", nullable = false)
    private Driver driverId;

    public Car() {
    }

    public Car(String licensePlate, String make, int year, String model, Driver driverId) {
        this.licensePlate = licensePlate;
        this.make = make;
        this.year = year;
        this.model = model;
        this.driverId = driverId;
    }
}
