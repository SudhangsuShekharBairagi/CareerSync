package com.careersync.careersync_backend.dto.resume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumeDocument {

    private Long id;
    private String name;
    private String title;
    private Map<String, String> contact;
    private String summary;
    private List<Experience> experience;
    private List<String> skills;
    private Education education;
    private String description;
    private LocalDateTime createdAt;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Experience {
        private String role;
        private String company;
        private String period;
        private List<String> bullets;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Education {
        private String degree;
        private String school;
        private String year;
    }
}
