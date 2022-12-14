package com.kpi.project.healthmonitoring.plan.common.dto.response.plan;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class NewTreatmentPlanInitialDataResponseDTO {

    private List<String> allCategories = new ArrayList<>();
    private List<TreatmentPlanStepTypeResponseDTO> allStepTypes = new ArrayList<>();
}
