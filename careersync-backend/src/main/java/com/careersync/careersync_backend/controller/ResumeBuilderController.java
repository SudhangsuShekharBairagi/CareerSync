package com.careersync.careersync_backend.controller;

import com.careersync.careersync_backend.dto.auth.ApiResponse;
import com.careersync.careersync_backend.dto.resume.ResumeBuilderRequest;
import com.careersync.careersync_backend.dto.resume.ResumeDocument;
import com.careersync.careersync_backend.service.ResumeBuilderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume-builder")
@CrossOrigin(origins = "http://localhost:*", allowCredentials = "true")
public class ResumeBuilderController {

    private final ResumeBuilderService resumeBuilderService;

    public ResumeBuilderController(ResumeBuilderService resumeBuilderService) {
        this.resumeBuilderService = resumeBuilderService;
    }

    @PostMapping("/generate")
    public ResponseEntity<ResumeDocument> generate(@Valid @RequestBody ResumeBuilderRequest request) {
        return ResponseEntity.ok(resumeBuilderService.generate(request.getDescription()));
    }

    @GetMapping("/history")
    public ResponseEntity<List<ResumeDocument>> history() {
        return ResponseEntity.ok(resumeBuilderService.getHistory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeDocument> getById(@PathVariable Long id) {
        return ResponseEntity.ok(resumeBuilderService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        resumeBuilderService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Resume deleted", null));
    }

    @DeleteMapping("/all")
    public ResponseEntity<ApiResponse<Void>> deleteAll() {
        resumeBuilderService.deleteAll();
        return ResponseEntity.ok(ApiResponse.ok("All resumes deleted", null));
    }
}
