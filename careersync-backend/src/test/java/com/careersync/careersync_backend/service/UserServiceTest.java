package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.entity.Users;
import com.careersync.careersync_backend.repository.UsersRepository;
import com.careersync.careersync_backend.security.UserPrincipal;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UsersRepository userRepository;

    @InjectMocks
    private UserService userService;

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void getCurrentUser_usesAuthenticatedPrincipalId() {
        Users user = new Users();
        user.setId(42L);
        user.setEmail("user@example.com");
        user.setPassword("encoded");
        user.setEnabled(true);

        UserPrincipal principal = UserPrincipal.from(user);
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(principal, null, List.of()));

        when(userRepository.findById(42L)).thenReturn(Optional.of(user));

        Users result = userService.getCurrentUser();

        assertEquals(42L, result.getId());
        verify(userRepository).findById(42L);
    }
}
