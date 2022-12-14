package com.kpi.project.healthmonitoring.plan.common.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kpi.project.healthmonitoring.plan.common.constants.Constants;
import com.kpi.project.healthmonitoring.plan.common.model.plan.StepFrequencyType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.Valid;
import java.time.LocalDate;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class TreatmentPlanStepRequestDTO {
    private Integer id;
    private Long planId;
    private String type;
    private String subtype;
    private StepFrequencyType frequency;

    private String description;

    @Valid
    @JsonFormat(pattern = Constants.DATE_FORMAT)
    @DateTimeFormat(pattern = Constants.DATE_FORMAT)
    private LocalDate stepPeriodStart;

    @Valid
    @JsonFormat(pattern = Constants.DATE_FORMAT)
    @DateTimeFormat(pattern = Constants.DATE_FORMAT)
    private LocalDate stepPeriodEnd;

    private Integer spaceBetweenRepeat;
}
