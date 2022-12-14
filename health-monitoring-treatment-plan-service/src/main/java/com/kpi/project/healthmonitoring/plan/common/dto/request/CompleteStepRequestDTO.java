package com.kpi.project.healthmonitoring.plan.common.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class CompleteStepRequestDTO {
    private Long stepId;
    private String comment;
    private List<FilledInputRequestDTO> inputs = new ArrayList<>();
}
