package com.kpi.project.healthmonitoring.healthmonitoring.state.service.impl;

import com.kpi.project.healthmonitoring.healthmonitoring.state.common.dto.request.PatientStateMetricsRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.state.common.model.InternalMetricItem;
import com.kpi.project.healthmonitoring.healthmonitoring.state.service.ExternalToInternalMetricMappingService;
import com.kpi.project.healthmonitoring.healthmonitoring.state.service.StateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StateServiceMockedImpl implements StateService {

    private static Long ID_GENERATOR = 1L;

    private static final Map<Long, List<InternalMetricItem>> METRICS = new HashMap<>();

    private final ExternalToInternalMetricMappingService externalToInternalMetricMappingService;


    @Override
    public Long createNewStateEntry(PatientStateMetricsRequestDTO requestDTO) {
        Long nextId = ID_GENERATOR++;
        METRICS.put(nextId, externalToInternalMetricMappingService.mapToInternalMetric(requestDTO.getMetrics()));

        return nextId;
    }

    @Override
    public Long updateExistingStateEntry(Long entryId, PatientStateMetricsRequestDTO requestDTO) {
        if (!METRICS.containsKey(entryId)) {
            throw new RuntimeException(String.format("No entry for key [%d]", entryId));
        }

        METRICS.get(entryId).addAll(externalToInternalMetricMappingService.mapToInternalMetric(requestDTO.getMetrics()));

        return entryId;
    }

    @Override
    public Map<Long, List<InternalMetricItem>> getAllMetrics() {
        return METRICS;
    }
}
