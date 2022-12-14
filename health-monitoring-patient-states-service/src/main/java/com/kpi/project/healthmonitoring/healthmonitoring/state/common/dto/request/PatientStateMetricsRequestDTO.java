package com.kpi.project.healthmonitoring.healthmonitoring.state.common.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class PatientStateMetricsRequestDTO {
    private List<PatientStateMetricRequestDTO> metrics = new ArrayList<>();
}
