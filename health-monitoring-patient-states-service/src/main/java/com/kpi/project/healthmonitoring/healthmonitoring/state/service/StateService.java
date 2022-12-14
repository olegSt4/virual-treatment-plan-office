package com.kpi.project.healthmonitoring.healthmonitoring.state.service;

import com.kpi.project.healthmonitoring.healthmonitoring.state.common.dto.request.PatientStateMetricsRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.state.common.model.InternalMetricItem;

import java.util.List;
import java.util.Map;

public interface StateService {

    Long createNewStateEntry(PatientStateMetricsRequestDTO requestDTO);

    Long updateExistingStateEntry(Long entryId, PatientStateMetricsRequestDTO requestDTO);

    Map<Long, List<InternalMetricItem>> getAllMetrics();
}
