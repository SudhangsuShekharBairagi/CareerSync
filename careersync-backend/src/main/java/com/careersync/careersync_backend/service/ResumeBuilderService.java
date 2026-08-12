package com.careersync.careersync_backend.service;

import com.careersync.careersync_backend.dto.resume.ResumeDocument;

import java.util.List;

public interface ResumeBuilderService {

    ResumeDocument generate(String description);

    ResumeDocument getById(Long id);

    List<ResumeDocument> getHistory();

    void delete(Long id);

    void deleteAll();
}
