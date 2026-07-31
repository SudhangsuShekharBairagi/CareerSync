package com.careersync.careersync_backend.repository;

import com.careersync.careersync_backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}