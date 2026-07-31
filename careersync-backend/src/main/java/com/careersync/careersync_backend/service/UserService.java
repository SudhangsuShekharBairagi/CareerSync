package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.entity.Users;
import com.careersync.careersync_backend.repository.UsersRepository;
import org.springframework.stereotype.Service;

// Change when the authentication implemented

@Service
public class UserService {

    private final UsersRepository userRepository;

    public UserService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Users getCurrentUser() {
        return userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}