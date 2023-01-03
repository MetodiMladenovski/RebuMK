package com.example.uber.model;

import com.example.uber.model.enums.DriverLevel;
import com.example.uber.model.enums.DriverStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.With;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "driver")
@Getter
@Setter
@AllArgsConstructor
public class Driver {

    @Id
    @Column(name = "driver_id")
    @GeneratedValue
    private UUID id;

    @Column(name = "email")
    private String email;

    @Column(name = "encrypted_password")
    @With
    private String encryptedPassword;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Lob
    @Column(name = "profile_picture")
    private byte[] profilePicture;

    @Column(name = "price_per_km")
    private float pricePerKm;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private DriverStatus status;

    @Column(name = "is_approved")
    private boolean isApproved;

    @Column(name = "driver_level")
    @Enumerated(EnumType.STRING)
    private DriverLevel level;

    @Column(name = "num_grades")
    private int numGrades;

    @Column(name = "grade")
    private float grade;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin adminId;

    public Driver() {
    }
}
