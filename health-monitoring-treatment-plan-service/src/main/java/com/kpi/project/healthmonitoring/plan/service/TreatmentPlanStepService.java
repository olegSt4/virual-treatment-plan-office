package com.kpi.project.healthmonitoring.plan.service;

import com.kpi.project.healthmonitoring.plan.common.dto.request.CompleteStepRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.request.TreatmentPlanStepRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepTypeResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepResponseDTO;
import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlan;
import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanStep;

import java.util.List;

public interface TreatmentPlanStepService {

    List<TreatmentPlanStepResponseDTO> createNewTreatmentPlanStep(TreatmentPlanStepRequestDTO request);

    List<TreatmentPlanStep> createNewStepsForPlan(TreatmentPlan plan, List<TreatmentPlanStepRequestDTO> requestDTOS);

    TreatmentPlanStepResponseDTO completeStep(Long planId, Long stepId, CompleteStepRequestDTO requestDTO);

    List<TreatmentPlanStepTypeResponseDTO> getAllStepTypes();

    TreatmentPlanStepResponseDTO deleteStepById(Long stepId);
}
