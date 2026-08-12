package com.careersync.careersync_backend.controller;

import com.careersync.careersync_backend.dto.auth.ApiResponse;
import com.careersync.careersync_backend.dto.auth.LoginRequest;
import com.careersync.careersync_backend.dto.auth.OtpRequest;
import com.careersync.careersync_backend.dto.auth.RegisterRequest;
import com.careersync.careersync_backend.dto.auth.UserResponse;
import com.careersync.careersync_backend.entity.Users;
import com.careersync.careersync_backend.service.AuthService;
import com.careersync.careersync_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:*", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse<Void>> sendOtp(@Valid @RequestBody OtpRequest request) {
        authService.sendOtp(request.getEmail());
        return ResponseEntity.ok(ApiResponse.ok("OTP sent to your email", null));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpRequest) {
        UserResponse user = authService.register(request, httpRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Account created successfully", user));
    }

//    @PostMapping("/login")
//    public ResponseEntity<ApiResponse<UserResponse>> login(
//            @Valid @RequestBody LoginRequest request,
//            HttpServletRequest httpRequest) {
//        try {
//            UserResponse user = authService.login(request, httpRequest);
//            return ResponseEntity.ok(ApiResponse.ok("Logged in successfully", user));
//        } catch (BadCredentialsException ex) {
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
//        } catch (DisabledException ex) {
//            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Please verify your email first");
//        } catch (Exception ex) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Login failed: " + ex.getMessage());
//        }
//    }
//
//    @PostMapping("/logout")
//    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest httpRequest) {
//        authService.logout(httpRequest);
//        return ResponseEntity.ok(ApiResponse.ok("Logged out successfully", null));
//    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {

        try {

            // Authenticate user using existing AuthService
            UserResponse user =
                    authService.login(request, httpRequest);

            /*
             * Get authentication created by AuthService.
             *
             * This is important for session-based authentication.
             */
            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            if (authentication != null &&
                    authentication.isAuthenticated()) {

                /*
                 * Create SecurityContext
                 */
                SecurityContext context =
                        SecurityContextHolder.createEmptyContext();

                context.setAuthentication(authentication);

                SecurityContextHolder.setContext(context);

                /*
                 * Save SecurityContext inside HTTP session.
                 */
                HttpSessionSecurityContextRepository
                        securityContextRepository =
                        new HttpSessionSecurityContextRepository();

                securityContextRepository.saveContext(
                        context,
                        httpRequest,
                        null
                );
            }

            return ResponseEntity.ok(
                    ApiResponse.ok(
                            "Logged in successfully",
                            user
                    )
            );

        } catch (BadCredentialsException ex) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );

        } catch (DisabledException ex) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Please verify your email first"
            );

        } catch (Exception ex) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Login failed: " + ex.getMessage()
            );
        }
    }

    // =========================
    // LOGOUT
    // =========================

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
            HttpServletRequest httpRequest) {

        authService.logout(httpRequest);

        /*
         * Clear Spring Security authentication
         */
        SecurityContextHolder.clearContext();

        return ResponseEntity.ok(
                ApiResponse.ok(
                        "Logged out successfully",
                        null
                )
        );
    }
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> me() {
        Users user = userService.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.ok(UserResponse.from(user)));
    }
}
