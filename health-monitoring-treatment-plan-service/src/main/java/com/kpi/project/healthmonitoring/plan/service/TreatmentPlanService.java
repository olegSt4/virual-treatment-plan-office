package com.kpi.project.healthmonitoring.plan.service;

import com.kpi.project.healthmonitoring.plan.common.dto.request.CompleteTreatmentPlanRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.request.NewTreatmentPlanRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.NewTreatmentPlanInitialDataResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanResponseDTO;

import java.util.List;

public interface TreatmentPlanService {

    TreatmentPlanResponseDTO createNewTreatmentPlan(NewTreatmentPlanRequestDTO request);

    void completeTreatmentPlan(Long planId, CompleteTreatmentPlanRequestDTO requestDTO);

    TreatmentPlanResponseDTO getTreatmentPlanById(Long planId);

    List<TreatmentPlanResponseDTO> getAllAvailableTreatmentPlans();


    NewTreatmentPlanInitialDataResponseDTO getNewPlanInitialData();
}
