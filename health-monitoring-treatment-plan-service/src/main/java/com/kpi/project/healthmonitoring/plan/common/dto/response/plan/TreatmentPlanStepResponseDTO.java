package com.kpi.project.healthmonitoring.plan.common.dto.response.plan;

import com.kpi.project.healthmonitoring.plan.common.model.plan.StepFrequencyType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class TreatmentPlanStepResponseDTO {

    private Long id;
    private String type;
    private String subtype;

    private Boolean isFinished;
    private Boolean isFailed;
    private Boolean isActive;

    private String description;
    private StepFrequencyType frequencyType;
    private LocalDate startPeriod;
    private LocalDate endPeriod;
    private String comment;

    private List<TreatmentPlanStepInputResponseDTO> inputs = new ArrayList<>();

}
