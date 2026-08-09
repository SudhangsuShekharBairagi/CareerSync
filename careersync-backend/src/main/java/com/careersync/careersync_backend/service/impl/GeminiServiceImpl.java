package com.careersync.careersync_backend.service.impl;

import com.careersync.careersync_backend.dto.gemini.Content;
import com.careersync.careersync_backend.dto.gemini.GeminiRequest;
import com.careersync.careersync_backend.dto.gemini.GeminiResponse;
import com.careersync.careersync_backend.dto.gemini.Part;
import com.careersync.careersync_backend.dto.resume.ResumeAnalysis;
import com.careersync.careersync_backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Service
public class GeminiServiceImpl implements GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public GeminiServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ResumeAnalysis analyzeResume(String resumeText) {

        String url =
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key="
                        + apiKey;

        String prompt = """
                Analyze the following resume.

                Return ONLY valid JSON.

                Do not wrap the response in markdown.

                {
                   "candidateName": "",
                   "candidateSummary": "",
                   "technicalSkills": [],
                   "softSkills": [],
                   "strengths": [],
                   "weaknesses": [],
                   "missingKeywords": [],
                   "recommendedJobs": [],
                   "projectSuggestions": [],
                   "learningRoadmap": [],
                   "experienceLevel": "",
                   "atsScore": 0
                 }

                Resume:
                """ + resumeText;

        Part part = new Part(prompt);

        Content content = new Content();
        content.setParts(List.of(part));

        GeminiRequest request = new GeminiRequest();
        request.setContents(List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GeminiRequest> entity =
                new HttpEntity<>(request, headers);

        ResponseEntity<GeminiResponse> response =
                restTemplate.postForEntity(
                        url,
                        entity,
                        GeminiResponse.class
                );

        GeminiResponse geminiResponse = response.getBody();

        String text = geminiResponse
                .getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();

        ObjectMapper objectMapper = new ObjectMapper();

        ResumeAnalysis analysis =
                objectMapper.readValue(text, ResumeAnalysis.class);

        return analysis;
    }
}