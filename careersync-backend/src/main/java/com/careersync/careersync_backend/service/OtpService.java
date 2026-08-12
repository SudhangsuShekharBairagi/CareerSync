package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.entity.EmailOtp;
import com.careersync.careersync_backend.repository.EmailOtpRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class OtpService {

    private final EmailOtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Value("${app.otp.expiry-minutes:5}")
    private int expiryMinutes;

    @Value("${app.otp.length:6}")
    private int otpLength;

    private final SecureRandom random = new SecureRandom();

    public OtpService(EmailOtpRepository otpRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Transactional
    public void sendOtp(String email) {
        String normalized = email.trim().toLowerCase();
        String otp = generateOtp();
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(expiryMinutes);

        otpRepository.deleteByEmail(normalized);

        EmailOtp entry = EmailOtp.builder()
                .email(normalized)
                .otpHash(passwordEncoder.encode(otp))
                .expiresAt(expiresAt)
                .build();
        otpRepository.save(entry);

        emailService.sendOtpEmail(normalized, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        EmailOtp entry = otpRepository.findByEmail(email.trim().toLowerCase()).orElse(null);
        if (entry == null) {
            return false;
        }
        if (entry.getExpiresAt().isBefore(LocalDateTime.now())) {
            otpRepository.delete(entry);
            return false;
        }
        return passwordEncoder.matches(otp, entry.getOtpHash());
    }

    @Transactional
    public void clearOtp(String email) {
        otpRepository.deleteByEmail(email.trim().toLowerCase());
    }

    private String generateOtp() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < otpLength; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
}
