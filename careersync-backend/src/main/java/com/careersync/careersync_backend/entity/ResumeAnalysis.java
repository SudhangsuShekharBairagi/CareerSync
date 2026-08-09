package com.careersync.careersync_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "resume_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateName;

    @Column(length = 2000)
    private String candidateSummary;

    private Integer atsScore;

    private String fileName;

    private LocalDateTime createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "technical_skills", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "skill")
    @Builder.Default
    private List<String> technicalSkills = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "soft_skills", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "skill")
    @Builder.Default
    private List<String> softSkills = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "strengths", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "strength")
    @Builder.Default
    private List<String> strengths = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "weaknesses", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "weakness")
    @Builder.Default
    private List<String> weaknesses = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "missing_keywords", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "keyword")
    @Builder.Default
    private List<String> missingKeywords = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "recommended_jobs", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "job")
    @Builder.Default
    private List<String> recommendedJobs = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
