package com.kpi.project.healthmonitoring.plan.resource;

import com.kpi.project.healthmonitoring.plan.common.dto.request.CompleteTreatmentPlanRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.request.NewTreatmentPlanRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.request.TreatmentPlanStepRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.NewTreatmentPlanInitialDataResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepTypeResponseDTO;
import com.kpi.project.healthmonitoring.plan.service.TreatmentPlanService;
import com.kpi.project.healthmonitoring.plan.service.TreatmentPlanStepService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/doctor/plans")
@RequiredArgsConstructor
public class TreatmentPlanDoctorResource {

    private final TreatmentPlanService treatmentPlanService;
    private final TreatmentPlanStepService treatmentPlanStepService;

    @PostMapping
    public TreatmentPlanResponseDTO createNewTreatmentPlan(@RequestBody NewTreatmentPlanRequestDTO request) {
        return treatmentPlanService.createNewTreatmentPlan(request);
    }

    @PutMapping("/{planId}/complete")
    public void completeTreatmentPlan(@PathVariable("planId") Long planId, @RequestBody CompleteTreatmentPlanRequestDTO requestDTO) {
        treatmentPlanService.completeTreatmentPlan(planId, requestDTO);
    }

    @GetMapping
    public List<TreatmentPlanResponseDTO> getAllAvailableTreatmentPlans() {
        return treatmentPlanService.getAllAvailableTreatmentPlans();
    }

    @GetMapping("/initialData")
    public NewTreatmentPlanInitialDataResponseDTO getAvailablePlanCategories() {
        return treatmentPlanService.getNewPlanInitialData();
    }

    @GetMapping("/steps/types")
    public List<TreatmentPlanStepTypeResponseDTO> getAllTreatmentPlanStepTypes() {
        return treatmentPlanStepService.getAllStepTypes();
    }

    @PostMapping("/steps")
    public List<TreatmentPlanStepResponseDTO> addNewTreatmentPlanStep(@RequestBody TreatmentPlanStepRequestDTO request) {
        return treatmentPlanStepService.createNewTreatmentPlanStep(request);
    }

    @DeleteMapping("/steps/{stepId}")
    public TreatmentPlanStepResponseDTO deletePlanStepById(@PathVariable("stepId") Long stepId) {
        return treatmentPlanStepService.deleteStepById(stepId);
    }

}
