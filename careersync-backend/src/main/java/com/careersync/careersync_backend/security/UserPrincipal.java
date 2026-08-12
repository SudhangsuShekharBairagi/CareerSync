package com.careersync.careersync_backend.security;

import com.careersync.careersync_backend.entity.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails, Serializable {

    private final Long id;
    private final String email;
    private final String password;
    private final boolean enabled;

    public UserPrincipal(Long id, String email, String password, boolean enabled) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
    }

    public static UserPrincipal from(Users user) {
        return new UserPrincipal(user.getId(), user.getEmail(), user.getPassword(), user.getEnabled());
    }

    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
