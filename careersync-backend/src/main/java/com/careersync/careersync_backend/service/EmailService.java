package com.careersync.careersync_backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.host:}")
    private String mailHost;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String to, String otp) {
        if (mailHost == null || mailHost.isBlank()) {
            log.info("====================================================================");
            log.info("SMTP is not configured. OTP for {} is: {}", to, otp);
            log.info("====================================================================");
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("CareerSync - Email Verification OTP");
            message.setText(
                    "Your CareerSync verification OTP is: " + otp + "\n\n" +
                            "This code expires in 5 minutes. Do not share it with anyone.\n\n" +
                            "If you didn't request this, you can safely ignore this email."
            );
            mailSender.send(message);
            log.info("OTP email sent to {}", to);
        } catch (Exception e) {
            log.warn("Failed to send email to {}. OTP is: {}", to, otp, e);
        }
    }
}
