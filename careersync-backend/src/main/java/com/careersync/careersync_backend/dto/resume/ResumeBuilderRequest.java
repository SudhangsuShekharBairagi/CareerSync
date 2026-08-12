package com.careersync.careersync_backend.dto.resume;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeBuilderRequest {

    @NotBlank(message = "Description is required")
    private String description;
}
