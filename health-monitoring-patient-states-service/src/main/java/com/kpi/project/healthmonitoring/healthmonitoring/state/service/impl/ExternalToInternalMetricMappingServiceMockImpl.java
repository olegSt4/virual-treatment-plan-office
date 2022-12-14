package com.kpi.project.healthmonitoring.healthmonitoring.state.service.impl;

import com.kpi.project.healthmonitoring.healthmonitoring.state.common.dto.request.PatientStateMetricRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.state.common.model.InternalMetricItem;
import com.kpi.project.healthmonitoring.healthmonitoring.state.service.ExternalToInternalMetricMappingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExternalToInternalMetricMappingServiceMockImpl implements ExternalToInternalMetricMappingService {


    private static final Map<String, Map<String, String>> MOCKED_MAPPING = Map.of(
            "Загальний аналіз крові", Map.of(
                    "Параметр 1", "blood_p1",
                    "Параметр 2", "blood_p2",
                    "Параметр 3", "blood_p3",
                    "Параметр 4", "blood_p4"
            ),
            "Тест на COViD-19", Map.of(
                    "Результат", "covid_res"
            ),
            "Кардіограма", Map.of(
                    "Параметр 1", "cardio_p1",
                    "Параметр 2", "cardio_p2"
            ),
            "Сердцебиття у стані спокою", Map.of(
                    "Темп сердцебиття", "heart_rate_peace"
            ),
            "Рівень цукру в крові", Map.of(
                    "Рівень цукру", "sugar_level"
            )
    );

    @Override
    public List<InternalMetricItem> mapToInternalMetric(List<PatientStateMetricRequestDTO> externalMetrics) {
        return externalMetrics.stream().map(externalMetric -> {
                    Map<String, String> parentTypeInputsMapping = MOCKED_MAPPING.get(externalMetric.getMetricParentName());
                    if (parentTypeInputsMapping == null || parentTypeInputsMapping.isEmpty()) {
                        throw new RuntimeException(String.format("No mapping for type: [%s]", externalMetric.getMetricParentName()));
                    }

                    String targetParamId = parentTypeInputsMapping.get(externalMetric.getMetricName());
                    if (targetParamId == null || targetParamId.isEmpty()) {
                        throw new RuntimeException(String.format("No mapping for type-input: [%s]-[%s]",
                                externalMetric.getMetricParentName(), externalMetric.getMetricName()));
                    }

                    return new InternalMetricItem() {{
                       setName(targetParamId);
                       setType(externalMetric.getMetricType());
                       setValue(externalMetric.getMetricValue());
                    }};
                })
                .collect(Collectors.toList());
    }
}
