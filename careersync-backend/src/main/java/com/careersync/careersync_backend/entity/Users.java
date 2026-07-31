package com.careersync.careersync_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    // @OneToMany(
    //         mappedBy = "user",
    //         cascade = CascadeType.ALL,
    //         orphanRemoval = true,
    //         fetch = FetchType.LAZY
    // )
    // private List<ResumeAnalysisEntity> resumes = new ArrayList<>();



}