package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.entity.ResumeAnalysis;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResumeAnalysisService {
    ResumeAnalysis analyzeAndSaveResume(MultipartFile file);
    List<ResumeAnalysis> getAllResumeHistory();
    ResumeAnalysis getResumeAnalysisById(Long id);
}
