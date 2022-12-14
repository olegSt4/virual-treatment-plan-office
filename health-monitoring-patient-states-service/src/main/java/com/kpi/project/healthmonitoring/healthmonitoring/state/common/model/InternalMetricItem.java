package com.kpi.project.healthmonitoring.healthmonitoring.state.common.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class InternalMetricItem {
    private String name;
    private MetricValueType type;
    private Object value;
}
