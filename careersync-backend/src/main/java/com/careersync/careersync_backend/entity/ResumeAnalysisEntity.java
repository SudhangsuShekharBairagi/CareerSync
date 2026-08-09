package com.careersync.careersync_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "resume_analysis")
public class ResumeAnalysisEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many Resume Analyses belong to one User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(nullable = false)
    private String resumePath;

    private String candidateName;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @ElementCollection
    @CollectionTable(
            name = "resume_technical_skills",
            joinColumns = @JoinColumn(name = "resume_analysis_id")
    )
    @Column(name = "skill")
    private List<String> technicalSkills = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "resume_soft_skills",
            joinColumns = @JoinColumn(name = "resume_analysis_id")
    )
    @Column(name = "skill")
    private List<String> softSkills = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "resume_strengths",
            joinColumns = @JoinColumn(name = "resume_analysis_id")
    )
    @Column(name = "strength")
    private List<String> strengths = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "resume_weaknesses",
            joinColumns = @JoinColumn(name = "resume_analysis_id")
    )
    @Column(name = "weakness")
    private List<String> weaknesses = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "resume_missing_keywords",
            joinColumns = @JoinColumn(name = "resume_analysis_id")
    )
    @Column(name = "keyword")
    private List<String> missingKeywords = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "resume_recommended_jobs",
            joinColumns = @JoinColumn(name = "resume_analysis_id")
    )
    @Column(name = "job")
    private List<String> recommendedJobs = new ArrayList<>();

    private Integer atsScore;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
}
