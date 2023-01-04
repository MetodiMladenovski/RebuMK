package com.example.uber.model;

import com.example.uber.model.enums.DriveStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "drive")
@Getter
@Setter
@AllArgsConstructor
public class Drive {

    @Id
    @GeneratedValue
    @Column(name = "drive_id")
    private UUID id;

    @Column(name = "grade")
    private float grade;

    @Column(name = "km_travelled")
    private float kmTravelled;

    @Column(name = "start_time")
    private Timestamp startTime;

    @Column(name = "end_time")
    private Timestamp endTime;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private DriveStatus status;

    @ManyToOne
    @JoinColumn(name = "car_id", nullable = false)
    private Passenger carId;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private Driver driverId;

    @OneToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request requestId;

    public Drive() {
    }

    public Drive(float grade, float kmTravelled, Timestamp startTime, Timestamp endTime, DriveStatus status, Passenger carId, Driver driverId, Request requestId) {
        this.grade = grade;
        this.kmTravelled = kmTravelled;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.carId = carId;
        this.driverId = driverId;
        this.requestId = requestId;
    }
}
