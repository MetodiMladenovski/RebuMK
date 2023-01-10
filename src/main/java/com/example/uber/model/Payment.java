package com.example.uber.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "payment")
@Getter
@Setter
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue
    @Column(name = "payment_id")
    private UUID id;

    @Column(name = "total_sum_payed")
    private float totalSumPayed;

    @ManyToOne
    @JoinColumn(name = "drive_id", nullable = false)
    private Drive drive;

    @ManyToOne
    @JoinColumn(name = "passenger_id")
    private Passenger passenger;

    public Payment(float totalSumPayed, Drive drive, Passenger passenger) {
        this.totalSumPayed = totalSumPayed;
        this.drive = drive;
        this.passenger = passenger;
    }

    public Payment() {
    }
}
