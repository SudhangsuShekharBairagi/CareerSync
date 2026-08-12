package com.careersync.careersync_backend.service.impl;

import com.careersync.careersync_backend.dto.resume.ResumeDocument;
import com.careersync.careersync_backend.entity.ResumeDocumentEntity;
import com.careersync.careersync_backend.entity.Users;
import com.careersync.careersync_backend.repository.ResumeDocumentRepository;
import com.careersync.careersync_backend.service.GeminiService;
import com.careersync.careersync_backend.service.ResumeBuilderService;
import com.careersync.careersync_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Service
public class ResumeBuilderServiceImpl implements ResumeBuilderService {

    private final GeminiService geminiService;
    private final ResumeDocumentRepository resumeDocumentRepository;
    private final UserService userService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ResumeBuilderServiceImpl(
            GeminiService geminiService,
            ResumeDocumentRepository resumeDocumentRepository,
            UserService userService) {
        this.geminiService = geminiService;
        this.resumeDocumentRepository = resumeDocumentRepository;
        this.userService = userService;
    }

    @Override
    public ResumeDocument generate(String description) {
        Users user = userService.getCurrentUser();

        ResumeDocument document = geminiService.buildResume(description);

        ResumeDocumentEntity entity = ResumeDocumentEntity.builder()
                .user(user)
                .name(document.getName())
                .description(description)
                .dataJson(writeJson(document))
                .build();

        ResumeDocumentEntity saved = resumeDocumentRepository.save(entity);

        document.setId(saved.getId());
        document.setCreatedAt(saved.getCreatedAt());
        document.setDescription(description);

        return document;
    }

    @Override
    public ResumeDocument getById(Long id) {
        ResumeDocumentEntity entity = findOwned(id);
        return readJson(entity);
    }

    @Override
    public List<ResumeDocument> getHistory() {
        Users user = userService.getCurrentUser();

        return resumeDocumentRepository
                .findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(this::readJson)
                .toList();
    }

    @Override
    public void delete(Long id) {
        resumeDocumentRepository.delete(findOwned(id));
    }

    @Override
    public void deleteAll() {
        resumeDocumentRepository.deleteByUserId(userService.getCurrentUser().getId());
    }

    private ResumeDocumentEntity findOwned(Long id) {
        Users user = userService.getCurrentUser();

        ResumeDocumentEntity entity = resumeDocumentRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resume not found"));

        if (!entity.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resume not found");
        }

        return entity;
    }

    private String writeJson(ResumeDocument document) {
        try {
            return objectMapper.writeValueAsString(document);
        } catch (Exception e) {
            throw new RuntimeException("Failed to serialize resume", e);
        }
    }

    private ResumeDocument readJson(ResumeDocumentEntity entity) {
        try {
            ResumeDocument document =
                    objectMapper.readValue(entity.getDataJson(), ResumeDocument.class);

            document.setId(entity.getId());
            document.setCreatedAt(entity.getCreatedAt());
            document.setDescription(entity.getDescription());

            return document;
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse resume", e);
        }
    }
}
