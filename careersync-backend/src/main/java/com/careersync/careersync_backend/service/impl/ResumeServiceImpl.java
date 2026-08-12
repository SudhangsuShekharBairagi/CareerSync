package com.careersync.careersync_backend.service.impl;
import com.careersync.careersync_backend.dto.gemini.GeminiResponse;
import com.careersync.careersync_backend.dto.resume.ResumeAnalysis;
import com.careersync.careersync_backend.entity.ResumeAnalysisEntity;
import com.careersync.careersync_backend.entity.Users;
import com.careersync.careersync_backend.repository.ResumeAnalysisEntityRepository;
import com.careersync.careersync_backend.service.ResumeService;
import com.careersync.careersync_backend.service.UserService;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class ResumeServiceImpl implements ResumeService {

    private static final String UPLOAD_DIR = "uploads/";

    private final UserService userService;

    private final ResumeAnalysisEntityRepository resumeAnalysisEntityRepository;

    public ResumeServiceImpl(UserService userService, ResumeAnalysisEntityRepository resumeAnalysisEntityRepository){
        this.userService = userService;
        this.resumeAnalysisEntityRepository = resumeAnalysisEntityRepository;
    }

    @Override
    public List<String> uploadResume(MultipartFile file) throws IOException {

        List<String> data = new ArrayList<>();

        // 1. Check if file is null
        if (file == null) {
            throw new IllegalArgumentException("No file uploaded.");
        }

        // 2. Check if file is empty
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty.");
        }

        // 3. Validate PDF
        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null ||
                !originalFilename.toLowerCase().endsWith(".pdf")) {

            throw new IllegalArgumentException("Only PDF files are allowed.");
        }

        // Optional: Validate MIME type as well
        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
            throw new IllegalArgumentException("Invalid file type.");
        }

        // 4. Create upload directory
        Path uploadPath = Paths.get(UPLOAD_DIR);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 5. Rename file
        String fileName = originalFilename.substring(0,
                originalFilename.lastIndexOf('.'));

        String extension = originalFilename.substring(
                originalFilename.lastIndexOf('.'));

        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss_SSS"));

        String newFilename = fileName + "_" + timestamp + extension;

        // 6. Save file
        Path filePath = uploadPath.resolve(newFilename);
        data.add(filePath.toString());
//        System.out.println(filePath);

        Files.copy(file.getInputStream(),
                filePath,
                StandardCopyOption.REPLACE_EXISTING);

        try (PDDocument document = Loader.loadPDF(file.getBytes())) {

            PDFTextStripper stripper = new PDFTextStripper();

            data.add(stripper.getText(document));

        }

        return data;
    }

    @Override
    public ResumeAnalysisEntity saveAnalyzeResume(ResumeAnalysis dto, String resumePath) {
        Users user = userService.getCurrentUser();
//        System.out.println(user);
        ResumeAnalysisEntity entity = ResumeAnalysisEntity.builder()
                .user(user)
                .resumePath(resumePath)
                .candidateName(dto.getCandidateName())
                .summary(dto.getCandidateSummary())
                .technicalSkills(dto.getTechnicalSkills())
                .softSkills(dto.getSoftSkills())
                .strengths(dto.getStrengths())
                .weaknesses(dto.getWeaknesses())
                .missingKeywords(dto.getMissingKeywords())
                .recommendedJobs(dto.getRecommendedJobs())
                .atsScore(dto.getAtsScore())
                .build();
        return resumeAnalysisEntityRepository.save(entity);
    }

    @Override
    public ResumeAnalysis getResumeById(Long id) {

        ResumeAnalysisEntity entity = resumeAnalysisEntityRepository
                .findById(id).orElseThrow(() -> new RuntimeException("Resume not found"));

        return ResumeAnalysis.builder()
                .candidateName(entity.getCandidateName())
                .candidateSummary(entity.getSummary())
                .strengths(entity.getStrengths())
                .technicalSkills(entity.getTechnicalSkills())
                .softSkills(entity.getSoftSkills())
                .missingKeywords(entity.getMissingKeywords())
                .weaknesses(entity.getMissingKeywords())
                .recommendedJobs(entity.getRecommendedJobs())
                .atsScore(entity.getAtsScore())
                .build();
    }
    private ResumeAnalysis convertToDto(ResumeAnalysisEntity entity) {

        return ResumeAnalysis.builder()
                .id(entity.getId())
                .candidateName(entity.getCandidateName())
                .candidateSummary(entity.getSummary())
                .technicalSkills(entity.getTechnicalSkills())
                .softSkills(entity.getSoftSkills())
                .strengths(entity.getStrengths())
                .weaknesses(entity.getWeaknesses())
                .missingKeywords(entity.getMissingKeywords())
                .recommendedJobs(entity.getRecommendedJobs())
                .atsScore(entity.getAtsScore())
                .resumePath(entity.getResumePath())
                .createdAt(entity.getCreatedAt())
                .build();
    }
    @Override
    public List<ResumeAnalysis> getAll() {

        Users user = userService.getCurrentUser();

        return resumeAnalysisEntityRepository.findByUserId(user.getId())
                .stream()
                .map(this::convertToDto)
                .toList();
    }


//    @Override
//    public String extractText(MultipartFile file) throws IOException {
//
//        if (file.isEmpty()) {
//            throw new IllegalArgumentException("File is empty");
//        }
//
//        if (!"application/pdf".equals(file.getContentType())) {
//            throw new IllegalArgumentException("Only PDF files are allowed");
//        }
//
//        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
//
//            PDFTextStripper stripper = new PDFTextStripper();
//
//            return stripper.getText(document);
//
//        }
//    }
}