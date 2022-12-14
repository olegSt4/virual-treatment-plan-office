package com.kpi.project.healthmonitoring.healthmonitoring.state.common.dto.request;

import com.kpi.project.healthmonitoring.healthmonitoring.state.common.model.MetricValueType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class PatientStateMetricRequestDTO {
    private String metricParentName;
    private String metricName;
    private MetricValueType metricType;
    private Object metricValue;
}
