package com.example.uber.repository;

import com.example.uber.model.Drive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DriveRepository extends JpaRepository<Drive, UUID> {
    Optional<Drive> findByRequestId(UUID requestId);
}
