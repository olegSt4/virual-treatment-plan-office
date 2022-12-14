package com.kpi.project.healthmonitoring.plan.service.impl;
import com.kpi.project.healthmonitoring.plan.common.dto.request.CompleteStepRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.request.TreatmentPlanStepRequestDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepTypeResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepResponseDTO;
import com.kpi.project.healthmonitoring.plan.common.mapper.TreatmentPlanStepMapper;
import com.kpi.project.healthmonitoring.plan.common.model.plan.StepFrequencyType;
import com.kpi.project.healthmonitoring.plan.repository.TreatmentPlanRepository;
import com.kpi.project.healthmonitoring.plan.repository.TreatmentPlanStepRepository;
import com.kpi.project.healthmonitoring.plan.repository.TreatmentPlanStepSubtypeRepository;
import com.kpi.project.healthmonitoring.plan.repository.TreatmentPlanStepTypeRepository;
import com.kpi.project.healthmonitoring.plan.repository.entity.*;
import com.kpi.project.healthmonitoring.plan.service.PersonalStateService;
import com.kpi.project.healthmonitoring.plan.service.TreatmentPlanStepService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.kpi.project.healthmonitoring.plan.util.DateUtils.convertToDateSafe;

@Service
@RequiredArgsConstructor
@Slf4j
public class TreatmentPlanStepServiceImpl implements TreatmentPlanStepService {

    private final TreatmentPlanRepository treatmentPlanRepository;
    private final TreatmentPlanStepTypeRepository treatmentPlanStepTypeRepository;
    private final TreatmentPlanStepSubtypeRepository treatmentPlanStepSubtypeRepository;
    private final TreatmentPlanStepRepository treatmentPlanStepRepository;

    private final PersonalStateService personalStateService;

    private final TreatmentPlanStepMapper treatmentPlanStepMapper;


    @Override
    public List<TreatmentPlanStepResponseDTO> createNewTreatmentPlanStep(TreatmentPlanStepRequestDTO request) {
        TreatmentPlan existingPlan = treatmentPlanRepository.findById(request.getPlanId()).orElseThrow(() ->
            new RuntimeException("No treatment plan found with id {" + request.getPlanId() + "}"
        ));

        List<TreatmentPlanStep> createdSteps = createNewStep(existingPlan, request);

        existingPlan.getSteps().addAll(createdSteps);
        treatmentPlanRepository.save(existingPlan);

        return createdSteps.stream()
                .map(treatmentPlanStepMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TreatmentPlanStep> createNewStepsForPlan(TreatmentPlan plan, List<TreatmentPlanStepRequestDTO> requestDTOS) {
        return requestDTOS.stream()
                .map(dto -> createNewStep(plan, dto))
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
    }

    @Override
    public List<TreatmentPlanStepTypeResponseDTO> getAllStepTypes() {
        return treatmentPlanStepTypeRepository.findAll().stream()
                .map(this::mapStepTypeToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TreatmentPlanStepResponseDTO completeStep(Long planId, Long stepId, CompleteStepRequestDTO requestDTO) {
        log.info("Completing step [{}] of plan [{}]", stepId, planId);

        TreatmentPlanStep stepToComplete = treatmentPlanStepRepository.findById(stepId).orElseThrow(() ->
                new RuntimeException(String.format("No step found with id [%s]", stepId)));

        stepToComplete.setComment(requestDTO.getComment());
        if (!stepToComplete.getInputs().isEmpty()) {
            stepToComplete.getInputs().forEach(input -> requestDTO.getInputs().stream()
                        .filter(fi -> fi.getName().equals(input.getName()))
                        .findFirst()
                        .ifPresent(fi -> input.setValue(String.valueOf(fi.getValue()))));

            personalStateService.updatePatientStateMetrics(planId, requestDTO.getInputs());
        }

        Boolean isStepFinished = stepToComplete.getInputs().isEmpty() || stepToComplete.getInputs().stream()
                .allMatch(i -> i.getValue() != null);
        stepToComplete.setFinished(isStepFinished);

        treatmentPlanStepRepository.save(stepToComplete);


        return treatmentPlanStepMapper.toResponseDTO(stepToComplete);
    }

    @Override
    public TreatmentPlanStepResponseDTO deleteStepById(Long stepId) {
        Optional<TreatmentPlanStep> stepToDelete = treatmentPlanStepRepository.findById(stepId);

        if (stepToDelete.isEmpty()) {
            throw new RuntimeException("No step with id {" + stepId + "} found!");
        } else {
            treatmentPlanStepRepository.deleteById(stepId);

            return treatmentPlanStepMapper.toResponseDTO(stepToDelete.get());
        }
    }

    private List<TreatmentPlanStep> createNewStep(TreatmentPlan plan, TreatmentPlanStepRequestDTO requestDTO) {
        TreatmentPlanStepType type = treatmentPlanStepTypeRepository.findByName(requestDTO.getType()).orElse(null);
        TreatmentPlanStepSubtype subtype = Optional.ofNullable(requestDTO.getSubtype())
                .map(treatmentPlanStepSubtypeRepository::findByName)
                .flatMap(opt -> opt)
                .orElse(null);

        LocalDate startDate = requestDTO.getStepPeriodStart();
        LocalDate endDate = requestDTO.getStepPeriodEnd();

        List<TreatmentPlanStep> newSteps = StepFrequencyType.N_TIMES_PER_PERIOD.equals(requestDTO.getFrequency())
                ? getStepDates(startDate, endDate, requestDTO.getSpaceBetweenRepeat()).stream()
                .map(date -> createNewStepEntity(convertToDateSafe(date), null, requestDTO, type, subtype))
                .collect(Collectors.toList())
                : Collections.singletonList(createNewStepEntity(convertToDateSafe(requestDTO.getStepPeriodStart()),
                convertToDateSafe(requestDTO.getStepPeriodEnd()), requestDTO, type, subtype));

        newSteps.forEach(step -> step.setTreatmentPlan(plan));

        return newSteps;
    }

    private List<LocalDate> getStepDates(LocalDate startDate, LocalDate endDate, Integer spaceBetweenSteps) {
        List<LocalDate> result = new ArrayList<>(Collections.singletonList(startDate));

        LocalDate day = startDate.plusDays(spaceBetweenSteps);
        while (day.isBefore(endDate) || day.isEqual(endDate)) {
            result.add(day);
            day = day.plusDays(spaceBetweenSteps);
        }

        return result;
    }

    private TreatmentPlanStep createNewStepEntity(Date startDate, Date endDate, TreatmentPlanStepRequestDTO requestDTO,
                                                  TreatmentPlanStepType type, TreatmentPlanStepSubtype subtype) {
        TreatmentPlanStep newStep = new TreatmentPlanStep();

        newStep.setDescription(requestDTO.getDescription());
        newStep.setStepOrder(requestDTO.getId());
        newStep.setStartDate(startDate);
        newStep.setEndDate(endDate);
        newStep.setType(type);
        newStep.setSubType(subtype);
        newStep.setInputs(createStepInputs(newStep, subtype));

        return newStep;
    }

    private List<TreatmentPlanStepInput> createStepInputs(TreatmentPlanStep step, TreatmentPlanStepSubtype subtype) {
        if (subtype == null) {
            return Collections.emptyList();
        }

        return subtype.getInputs().stream()
                .map(input -> {
                    TreatmentPlanStepInput stepInput = new TreatmentPlanStepInput();
                    stepInput.setStep(step);
                    stepInput.setName(input.getName());
                    stepInput.setType(input.getType());
                    stepInput.setInputUnit(input.getUnitName());

                    return stepInput;
                })
                .collect(Collectors.toList());
    }

    private TreatmentPlanStepTypeResponseDTO mapStepTypeToDTO(TreatmentPlanStepType entity) {
        List<String> stepSubtypes = entity.getSubtypes().stream()
                .map(TreatmentPlanStepSubtype::getName)
                .collect(Collectors.toList());


        return new TreatmentPlanStepTypeResponseDTO(){{
            setName(entity.getName());
            setCommentRequired(entity.getIsCommentRequired());
            setSubtypesTitle(entity.getSubtypesTitle());
            setSubtypes(stepSubtypes);
        }};
    }
}
