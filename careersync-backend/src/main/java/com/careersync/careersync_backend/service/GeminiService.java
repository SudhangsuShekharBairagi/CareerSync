package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.dto.resume.ResumeAnalysis;
import com.careersync.careersync_backend.dto.resume.ResumeDocument;

public interface GeminiService {
    ResumeAnalysis analyzeResume(String resumeText);

    ResumeDocument buildResume(String description);

}
