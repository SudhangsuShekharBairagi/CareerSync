package com.careersync.careersync_backend.dto.gemini;

import java.util.List;

public class Content {

    private List<Part> parts;

    public List<Part> getParts() {
        return parts;
    }

    public void setParts(List<Part> parts) {
        this.parts = parts;
    }
}