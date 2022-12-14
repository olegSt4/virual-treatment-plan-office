package com.kpi.project.healthmonitoring.plan.service.impl;

import com.kpi.project.healthmonitoring.plan.common.dto.request.CompleteTreatmentPlanRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.request.NewTreatmentPlanRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.emc.PatientMedicalCardResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.NewTreatmentPlanInitialDataResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.mapper.TreatmentPlanMapper;
import com.kpi.project.healthmonitoring.plan.common.model.plan.PatientInputType;
import com.kpi.project.healthmonitoring.plan.repository.TreatmentPlanCategoryRepository;
import com.kpi.project.healthmonitoring.plan.repository.TreatmentPlanRepository;
import com.kpi.project.healthmonitoring.plan.repository.TreatmentPlanToPersonalitiesRepository;
import com.kpi.project.healthmonitoring.plan.repository.entity.*;
import com.kpi.project.healthmonitoring.plan.service.EMCService;
import com.kpi.project.healthmonitoring.plan.service.TreatmentPlanService;
import com.kpi.project.healthmonitoring.plan.service.TreatmentPlanStepService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.kpi.project.healthmonitoring.plan.util.DateUtils.convertToDateSafe;

@Slf4j
@Service
@RequiredArgsConstructor
public class TreatmentPlanServiceImpl implements TreatmentPlanService {

    private static final Long HARDCODED_DOCTOR_ID = 1L;

    private final TreatmentPlanRepository treatmentPlanRepository;
    private final TreatmentPlanCategoryRepository treatmentPlanCategoryRepository;
    private final TreatmentPlanToPersonalitiesRepository treatmentPlanToPersonalitiesRepository;

    private final TreatmentPlanStepService treatmentPlanStepService;
    private final EMCService emcService;

    private final TreatmentPlanMapper treatmentPlanMapper;

    @Override
    public TreatmentPlanResponseDTO createNewTreatmentPlan(NewTreatmentPlanRequestDTO request) {
        PatientMedicalCardResponseDTO patientCard = emcService.getPatientMedicalCard(request.getPatientCardId());

        TreatmentPlan newTreatmentPlan = new TreatmentPlan();

        newTreatmentPlan.setName(request.getPlanName());
        newTreatmentPlan.setStartDate(convertToDateSafe(request.getPlanStartDate()));
        newTreatmentPlan.setEndDate(convertToDateSafe(request.getPlanEndDate()));
        newTreatmentPlan.setCategory(treatmentPlanCategoryRepository.findByName(request.getPlanCategory())
                .orElse(null));

        if (!request.getPlanSteps().isEmpty()) {
            newTreatmentPlan.setSteps(treatmentPlanStepService.createNewStepsForPlan(newTreatmentPlan, request.getPlanSteps()));
        }

        treatmentPlanRepository.save(newTreatmentPlan);

        TreatmentPlanToPersonalities newPlanToPersonsMapping = new TreatmentPlanToPersonalities();
        newPlanToPersonsMapping.setPlanId(newTreatmentPlan.getId());
        newPlanToPersonsMapping.setDoctorId(HARDCODED_DOCTOR_ID);
        newPlanToPersonsMapping.setPatientCardId(patientCard.getId());
        newPlanToPersonsMapping.setPatientId(patientCard.getId());

        treatmentPlanToPersonalitiesRepository.save(newPlanToPersonsMapping);

        TreatmentPlanResponseDTO result = treatmentPlanMapper.toResponseDTO(newTreatmentPlan);
        fillInPatientData(result, patientCard);
        fillInStepsInputOptions(result, newTreatmentPlan);

        return result;
    }

    @Override
    public void completeTreatmentPlan(Long planId, CompleteTreatmentPlanRequestDTO requestDTO) {
        TreatmentPlan existingPlan = treatmentPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Cannot find plan with id {" + planId + "}"));

        existingPlan.setConclusion(requestDTO.getConclusion());
        existingPlan.setFinished(true);

        treatmentPlanRepository.save(existingPlan);
    }

    @Override
    public TreatmentPlanResponseDTO getTreatmentPlanById(Long planId) {
        Optional<TreatmentPlan> treatmentPlanOpt = treatmentPlanRepository.findById(planId);

        if (treatmentPlanOpt.isEmpty()) {
            throw new RuntimeException("Cannot find plan with id {" + planId + "}");
        } else {
            TreatmentPlanResponseDTO result = treatmentPlanMapper.toResponseDTO(treatmentPlanOpt.get());
            TreatmentPlanToPersonalities mapping = treatmentPlanToPersonalitiesRepository.findByPlanId(planId)
                    .orElseThrow(() -> new RuntimeException("Cannot find mapping for plan {" + planId + "}!"));

            fillInPatientData(result, emcService.getPatientMedicalCard(mapping.getPatientCardId()));
            fillInStepsInputOptions(result, treatmentPlanOpt.get());

            return result;
        }
    }

    @Override
    public NewTreatmentPlanInitialDataResponseDTO getNewPlanInitialData() {
        NewTreatmentPlanInitialDataResponseDTO result = new NewTreatmentPlanInitialDataResponseDTO();

        result.setAllCategories(treatmentPlanCategoryRepository.findAll().stream()
                .map(TreatmentPlanCategory::getName)
                .collect(Collectors.toList()));
        result.setAllStepTypes(treatmentPlanStepService.getAllStepTypes());

        return result;
    }

    @Override
    public List<TreatmentPlanResponseDTO> getAllAvailableTreatmentPlans() {
        List<TreatmentPlanToPersonalities> allPlansToDoctorMapping = treatmentPlanToPersonalitiesRepository.findByDoctorId(HARDCODED_DOCTOR_ID);

        if (allPlansToDoctorMapping.isEmpty()) {
            return Collections.emptyList();
        }

        Map<Long, TreatmentPlanToPersonalities> planIdToMappingMap = allPlansToDoctorMapping.stream()
                .collect(Collectors.toMap(TreatmentPlanToPersonalities::getPlanId, Function.identity()));
        Map<Long, PatientMedicalCardResponseDTO> cardIdToCardMap = allPlansToDoctorMapping.stream()
                .map(TreatmentPlanToPersonalities::getPatientCardId)
                .distinct()
                .map(emcService::getPatientMedicalCard)
                .collect(Collectors.toMap(PatientMedicalCardResponseDTO::getId, Function.identity()));

        return treatmentPlanRepository.findByIdIn(planIdToMappingMap.keySet()).stream()
                    .filter(plan -> !plan.getFinished())
                    .map(treatmentPlanMapper::toResponseDTO)
                    .peek(response -> {
                        Long patientCardId = planIdToMappingMap.get(response.getPlanId()).getPatientCardId();
                        PatientMedicalCardResponseDTO patientCard = cardIdToCardMap.get(patientCardId);

                        response.setPatientCardId(patientCardId);
                        response.setPatientFullName(String.format("%s %s %s", patientCard.getSurname(),
                                patientCard.getName(), patientCard.getMiddleName()));
                    })
                    .collect(Collectors.toList());
    }

    private void fillInPatientData(TreatmentPlanResponseDTO planDTO, PatientMedicalCardResponseDTO patientCard) {
        planDTO.setPatientCardId(patientCard.getId());
        planDTO.setPatientFullName(String.format("%s %s %s", patientCard.getSurname(), patientCard.getName(), patientCard.getMiddleName()));
    }

    private void fillInStepsInputOptions(TreatmentPlanResponseDTO planDTO, TreatmentPlan newTreatmentPlan) {
        List<TreatmentPlanStep> planSteps = newTreatmentPlan.getSteps();

        planDTO.getSteps().forEach(step -> {
            if (step.getSubtype() != null) {
                TreatmentPlanStep correspondingStep = planSteps.stream()
                        .filter(s -> s.getId().equals(step.getId()))
                        .findFirst()
                        .orElse(null);

                if (correspondingStep != null) {
                    List<TreatmentPlanStepSubtypeInput> stepInputs = correspondingStep.getSubType().getInputs();

                    step.getInputs().forEach(input -> {
                        if (PatientInputType.OPTION.toString().equals(input.getType())) {
                            stepInputs.stream()
                                    .filter(i -> i.getName().equals(input.getName()))
                                    .findFirst()
                                    .ifPresent(correspondingInput -> input.setOptions(correspondingInput.getOptions().stream()
                                            .map(TreatmentPlanStepSubtypeInputOption::getName)
                                            .collect(Collectors.toList())));

                        }
                    });
                }
            }
        });
    }
}
