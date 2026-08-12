package com.careersync.careersync_backend.dto.resume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeAnalysis {
    private Long id;
    private String candidateName;
    private String candidateSummary;
    private List<String> technicalSkills;
    private List<String> softSkills;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> missingKeywords;
    private String resumePath;
    private List<String> recommendedJobs;
    private Integer atsScore;
    private LocalDateTime createdAt;
}
