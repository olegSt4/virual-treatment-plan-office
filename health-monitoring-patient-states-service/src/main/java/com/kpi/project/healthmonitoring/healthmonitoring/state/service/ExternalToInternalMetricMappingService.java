package com.kpi.project.healthmonitoring.healthmonitoring.state.service;

import com.kpi.project.healthmonitoring.healthmonitoring.state.common.dto.request.PatientStateMetricRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.state.common.model.InternalMetricItem;

import java.util.List;

public interface ExternalToInternalMetricMappingService {

    List<InternalMetricItem> mapToInternalMetric(List<PatientStateMetricRequestDTO> externalMetrics);
}
