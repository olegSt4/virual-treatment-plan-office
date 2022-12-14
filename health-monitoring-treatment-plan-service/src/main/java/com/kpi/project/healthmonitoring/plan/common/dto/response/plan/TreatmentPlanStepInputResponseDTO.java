package com.kpi.project.healthmonitoring.plan.common.dto.response.plan;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class TreatmentPlanStepInputResponseDTO {

    private Long id;
    private String name;
    private Object inputValue;
    private String type;
    private String inputUnit;
    private List<String> options = new ArrayList<>();
}
