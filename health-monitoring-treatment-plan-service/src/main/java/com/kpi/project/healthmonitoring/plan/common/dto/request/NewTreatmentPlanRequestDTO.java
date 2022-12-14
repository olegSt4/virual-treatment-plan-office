package com.kpi.project.healthmonitoring.plan.common.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kpi.project.healthmonitoring.plan.common.constants.Constants;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class NewTreatmentPlanRequestDTO {
    private Long patientCardId;

    private String planName;
    private String planCategory;

    @Valid
    @JsonFormat(pattern = Constants.DATE_FORMAT)
    @DateTimeFormat(pattern = Constants.DATE_FORMAT)
    private LocalDate planStartDate;

    @Valid
    @JsonFormat(pattern = Constants.DATE_FORMAT)
    @DateTimeFormat(pattern = Constants.DATE_FORMAT)
    private LocalDate planEndDate;

    private List<TreatmentPlanStepRequestDTO> planSteps = new ArrayList<>();
}
