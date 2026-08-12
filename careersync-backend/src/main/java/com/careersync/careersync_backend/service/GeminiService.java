package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.dto.resume.ResumeAnalysis;

public interface GeminiService {
    ResumeAnalysis analyzeResume(String resumeText);


}
