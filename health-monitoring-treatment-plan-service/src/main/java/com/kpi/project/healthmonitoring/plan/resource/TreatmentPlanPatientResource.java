package com.kpi.project.healthmonitoring.plan.resource;

import com.kpi.project.healthmonitoring.plan.common.dto.request.CompleteStepRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepResponseDTO;
import com.kpi.project.healthmonitoring.plan.service.TreatmentPlanService;
import com.kpi.project.healthmonitoring.plan.service.TreatmentPlanStepService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/patient/plans")
@RequiredArgsConstructor
public class TreatmentPlanPatientResource {

    private final TreatmentPlanService treatmentPlanService;
    private final TreatmentPlanStepService treatmentPlanStepService;

    @GetMapping("/{planId}")
    public TreatmentPlanResponseDTO getPatientPlan(@PathVariable("planId") Long planId) {
        return treatmentPlanService.getTreatmentPlanById(planId);
    }

    @PutMapping("/{planId}/steps/{stepId}")
    public TreatmentPlanStepResponseDTO completePlanStep(@PathVariable("planId") Long planId,
                                                         @PathVariable("stepId") Long stepId,
                                                         @RequestBody CompleteStepRequestDTO requestDTO) {
        return treatmentPlanStepService.completeStep(planId, stepId, requestDTO);
    }
}
