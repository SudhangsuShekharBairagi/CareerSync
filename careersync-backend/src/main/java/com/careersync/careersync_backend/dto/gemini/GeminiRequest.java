package com.careersync.careersync_backend.dto.gemini;


import java.util.List;

public class GeminiRequest {

    private List<Content> contents;

    public List<Content> getContents() {
        return contents;
    }

    public void setContents(List<Content> contents) {
        this.contents = contents;
    }
}
