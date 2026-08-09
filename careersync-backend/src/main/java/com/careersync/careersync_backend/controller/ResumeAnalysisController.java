package com.careersync.careersync_backend.controller;

import com.careersync.careersync_backend.entity.ResumeAnalysis;
import com.careersync.careersync_backend.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeAnalysis> uploadResume(@RequestParam("file") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        ResumeAnalysis analysis = resumeAnalysisService.analyzeAndSaveResume(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(analysis);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ResumeAnalysis>> getResumeHistory() {
        List<ResumeAnalysis> history = resumeAnalysisService.getAllResumeHistory();
        return ResponseEntity.ok(history);
    }

    @GetMapping("/{resumeId}")
    public ResponseEntity<ResumeAnalysis> getResumeAnalysisById(@PathVariable("resumeId") Long resumeId) {
        ResumeAnalysis analysis = resumeAnalysisService.getResumeAnalysisById(resumeId);
        return ResponseEntity.ok(analysis);
    }
}
