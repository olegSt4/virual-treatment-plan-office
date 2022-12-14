package com.kpi.project.healthmonitoring.plan.service;

import com.kpi.project.healthmonitoring.plan.common.dto.request.FilledInputRequestDTO;
import com.kpi.project.healthmonitoring.plan.config.filter.StateEntry;
import com.kpi.project.healthmonitoring.plan.config.filter.SuspiciousStateEntry;

import java.util.List;

public interface PersonalStateService {

    void updatePatientStateMetrics(Long planId, List<FilledInputRequestDTO> inputs);

    List<SuspiciousStateEntry> findSuspiciousEntries(List<StateEntry> allEntries);
}
