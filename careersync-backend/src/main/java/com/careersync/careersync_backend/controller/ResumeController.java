package com.careersync.careersync_backend.controller;

import com.careersync.careersync_backend.dto.resume.ResumeAnalysis;
import com.careersync.careersync_backend.entity.ResumeAnalysisEntity;
import com.careersync.careersync_backend.repository.ResumeAnalysisEntityRepository;
import com.careersync.careersync_backend.service.GeminiService;
import com.careersync.careersync_backend.service.ResumeService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequestMapping("/api/resume")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class ResumeController {

    private final ResumeService resumeService;
    private final GeminiService geminiService;
    private final Path uploadDir = Paths.get("uploads");

    public ResumeController(ResumeService resumeService, GeminiService geminiService) {
        this.resumeService = resumeService;
        this.geminiService = geminiService;
    }



    @PostMapping("/upload")
    public ResponseEntity<ResumeAnalysis> upload(
            @RequestParam MultipartFile file) throws IOException {

        List<String> data = resumeService.uploadResume(file);
//        data = resumeService.uploadResume(file);


        ResumeAnalysis analysis =
                geminiService.analyzeResume(data.get(1));
        ResumeAnalysisEntity saveDB = resumeService.saveAnalyzeResume(analysis, data.get(0));
        return ResponseEntity.ok(analysis);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResumeAnalysis> getResumeById(@PathVariable Long id){

         ResumeAnalysis response =
                resumeService.getResumeById(id);

         return ResponseEntity.ok(response);
    }
    @GetMapping("/history")
    public ResponseEntity<List<ResumeAnalysis>> getAll() {

        return ResponseEntity.ok(
                resumeService.getAll()
        );
    }

    @GetMapping("/file/{filename:.+}")
    public ResponseEntity<Resource> getResume(
            @PathVariable String filename
    ) throws IOException {

        Path filePath = uploadDir.resolve(filename).normalize();

        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }
//    @PostMapping("/extract")
//    public ResponseEntity<String> extractResume(
//            @RequestParam("file") MultipartFile file)
//            throws IOException {
//
//        String text = resumeService.extractText(file);
//
//        return ResponseEntity.ok(text);
//    }
}