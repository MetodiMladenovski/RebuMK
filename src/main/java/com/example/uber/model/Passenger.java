package com.example.uber.model;

import com.example.uber.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.With;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "passenger")
@Getter
@AllArgsConstructor
public class Passenger {

    @Id
    @GeneratedValue
    @Column(name = "passenger_id")
    private UUID id;

    @Column(name="email")
    private String email;

    @Column(name="encrypted_password")
    @With
    private String encryptedPassword;

    @Column(name="name")
    private String name;

    @Column(name="surname")
    private String surname;

    @Column(name="role")
    @Enumerated(EnumType.STRING)
    private Role role;

    public Passenger() {
    }

}
