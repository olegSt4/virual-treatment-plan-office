package com.kpi.project.healthmonitoring.healthmonitoring.state.resource;

import com.kpi.project.healthmonitoring.healthmonitoring.state.common.dto.request.PatientStateMetricsRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.state.common.model.InternalMetricItem;
import com.kpi.project.healthmonitoring.healthmonitoring.state.service.StateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patient/state")
@RequiredArgsConstructor
public class PatientStateMetricsResource {

    private final StateService stateService;


    @GetMapping
    public Map<Long, List<InternalMetricItem>> getAllEntries() {
        return stateService.getAllMetrics();
    }

    @PostMapping
    public Long createNewStateEntry(@RequestBody PatientStateMetricsRequestDTO requestDTO) {
        return stateService.createNewStateEntry(requestDTO);
    }

    @PutMapping("/{entryId}")
    public Long updateExistingStateEntry(@PathVariable("entryId") Long entryId, PatientStateMetricsRequestDTO requestDTO) {
        return stateService.updateExistingStateEntry(entryId, requestDTO);
    }
}
