package com.kpi.project.healthmonitoring.plan.common.dto.response.plan;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class TreatmentPlanResponseDTO {

    private Long planId;
    private Long patientCardId;
    private String patientFullName;

    private String name;
    private String category;
    private LocalDate startDate;
    private LocalDate endDate;

    private List<TreatmentPlanStepResponseDTO> steps = new ArrayList<>();
}
