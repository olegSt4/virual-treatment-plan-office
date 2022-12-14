package com.kpi.project.healthmonitoring.plan.common.mapper;

import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepResponseDTO;
import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanStep;
import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanStepSubtype;
import com.kpi.project.healthmonitoring.plan.util.DateUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Mapper(componentModel = "spring", uses = {TreatmentPlanStepInputMapper.class, DateUtils.class})
public abstract class TreatmentPlanStepMapper {

    @Mapping(target = "type", expression = " java( planStep.getType().getName() ) ")
    @Mapping(source = "planStep", target = "subtype", qualifiedByName = "subtypeName")
    @Mapping(target = "isFinished", expression = " java( planStep.getFinished() )")
    @Mapping(target = "isFailed", expression = " java( planStep.getFailed() )")
    @Mapping(source = "planStep", target = "isActive", qualifiedByName = "isActive")
    @Mapping(source = "planStep", target = "startPeriod", qualifiedByName = "startPeriod")
    @Mapping(source = "planStep", target = "endPeriod", qualifiedByName = "endPeriod")
    public abstract TreatmentPlanStepResponseDTO toResponseDTO(TreatmentPlanStep planStep);

    @Named("subtypeName")
    public String getSubtypeName(TreatmentPlanStep planStep) {
        return Optional.ofNullable(planStep.getSubType())
                .map(TreatmentPlanStepSubtype::getName)
                .orElse(null);
    }

    @Named("startPeriod")
    public LocalDate getStartPeriod(TreatmentPlanStep planStep) {
        return DateUtils.convertToLocalDateSafe(planStep.getStartDate());
    }

    @Named("endPeriod")
    public LocalDate getEndPeriod(TreatmentPlanStep planStep) {
        return DateUtils.convertToLocalDateSafe(planStep.getEndDate());
    }

    @Named("isActive")
    public Boolean isStepActive (TreatmentPlanStep planStep) {
        if (planStep.getFailed() || planStep.getFinished()) {
            return false;
        }


        LocalDate currentDate = LocalDate.now();
        LocalDate stepStartDate = DateUtils.convertToLocalDateSafe(planStep.getStartDate());
        LocalDate stepEndDate = planStep.getEndDate() == null ? null : DateUtils.convertToLocalDateSafe(planStep.getEndDate());
        if (stepEndDate == null) {
            return currentDate.equals(stepStartDate);
        } else {
            return (currentDate.equals(stepStartDate) || currentDate.isAfter(stepStartDate))
                    && (currentDate.isBefore(stepEndDate) || currentDate.isEqual(stepEndDate));
        }
    }
}
