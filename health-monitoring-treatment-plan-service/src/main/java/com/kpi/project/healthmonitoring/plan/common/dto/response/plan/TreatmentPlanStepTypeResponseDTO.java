package com.kpi.project.healthmonitoring.plan.common.dto.response.plan;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class TreatmentPlanStepTypeResponseDTO {

    private String name;
    private Boolean commentRequired;
    private String subtypesTitle;
    private List<String> subtypes = new ArrayList<>();
}
