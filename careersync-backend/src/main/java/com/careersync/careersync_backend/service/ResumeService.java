package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.dto.gemini.GeminiResponse;
import com.careersync.careersync_backend.dto.resume.ResumeAnalysis;
import com.careersync.careersync_backend.entity.ResumeAnalysisEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ResumeService {
    List<String> uploadResume(MultipartFile file) throws IOException;
//    String extractText(MultipartFile file) throws IOException;

    ResumeAnalysisEntity saveAnalyzeResume(ResumeAnalysis dto, String resumePath);


    ResumeAnalysis getResumeById(Long id);

    List<ResumeAnalysis> getAll();
}
