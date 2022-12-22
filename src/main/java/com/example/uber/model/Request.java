package com.example.uber.model;

import com.example.uber.model.enums.RequestStatus;
import lombok.Getter;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "request")
@Getter
public class Request {

    @Id
    @GeneratedValue
    @Column(name = "request_id")
    private UUID id;

    @Column(name = "status")
    private RequestStatus status;

    @Column(name = "city_address")
    private String cityAddress;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "number_address")
    private int numberAddress;

    @Column(name = "latitude")
    private float latitude;

    @Column(name = "longitude")
    private float longitude;

    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private Passenger passengerId;

    @ManyToOne
    @JoinColumn(name = "driver_id", updatable = false, insertable = false)
    private Driver chosenDriverId;

    @ManyToOne
    @JoinColumn(name = "driver_id", updatable = false, insertable = false)
    private Driver confirmedByDriverId;

    public Request() {
    }

    public Request(RequestStatus status, String cityAddress, String streetAddress, int numberAddress, float latitude, float longitude, Passenger passengerId, Driver chosenDriverId) {
        this.status = status;
        this.cityAddress = cityAddress;
        this.streetAddress = streetAddress;
        this.numberAddress = numberAddress;
        this.latitude = latitude;
        this.longitude = longitude;
        this.passengerId = passengerId;
        this.chosenDriverId = chosenDriverId;
    }
}
