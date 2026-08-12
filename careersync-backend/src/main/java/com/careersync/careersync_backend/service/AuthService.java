package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.dto.auth.LoginRequest;
import com.careersync.careersync_backend.dto.auth.RegisterRequest;
import com.careersync.careersync_backend.dto.auth.UserResponse;
import com.careersync.careersync_backend.entity.Users;
import com.careersync.careersync_backend.repository.UsersRepository;
import com.careersync.careersync_backend.security.UserPrincipal;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final OtpService otpService;

    public AuthService(UsersRepository usersRepository, PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager, OtpService otpService) {
        this.usersRepository = usersRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.otpService = otpService;
    }

    public void sendOtp(String email) {
        if (usersRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        otpService.sendOtp(email);
    }

    @Transactional
    public UserResponse register(RegisterRequest request, HttpServletRequest httpRequest) {
        String email = request.getEmail().trim().toLowerCase();

        if (usersRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        if (!otpService.verifyOtp(email, request.getOtp())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired OTP");
        }

        Users user = new Users();
        user.setUsername(request.getUsername().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        usersRepository.save(user);

        otpService.clearOtp(email);

        createSession(user, httpRequest);
        return UserResponse.from(user);
    }

    public UserResponse login(LoginRequest request, HttpServletRequest httpRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().trim(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        httpRequest.getSession(true);

        Users user = usersRepository.findByEmailIgnoreCase(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        return UserResponse.from(user);
    }

    public void logout(HttpServletRequest httpRequest) {
        SecurityContextHolder.clearContext();
        HttpSession session = httpRequest.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    private void createSession(Users user, HttpServletRequest httpRequest) {
        UserPrincipal principal = UserPrincipal.from(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                principal, null, principal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        httpRequest.getSession(true);
    }
}
