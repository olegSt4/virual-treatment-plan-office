package com.kpi.project.healthmonitoring.plan.common.mapper;

import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanResponseDTO;
import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlan;
import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanCategory;
import com.kpi.project.healthmonitoring.plan.util.DateUtils;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.time.LocalDate;
import java.util.Optional;

@Mapper(componentModel = "spring", uses = {TreatmentPlanStepMapper.class, DateUtils.class})
public abstract class TreatmentPlanMapper {

    @Mapping(target = "planId", source = "id")
    @Mapping(source = "treatmentPlan", target = "category", qualifiedByName = "categoryName")
    @Mapping(source = "treatmentPlan", target = "startDate", qualifiedByName = "startDate" )
    @Mapping(source = "treatmentPlan", target = "endDate", qualifiedByName = "endDate")
    public abstract TreatmentPlanResponseDTO toResponseDTO(TreatmentPlan treatmentPlan);

    @Named("categoryName")
    public String getCategoryName(TreatmentPlan treatmentPlan) {
        return Optional.ofNullable(treatmentPlan.getCategory())
                .map(TreatmentPlanCategory::getName)
                .orElse(null);
    }

    @Named("startDate")
    public LocalDate getStartDate(TreatmentPlan treatmentPlan) {
        return DateUtils.convertToLocalDateSafe(treatmentPlan.getStartDate());
    }

    @Named("endDate")
    public LocalDate getEndDate(TreatmentPlan treatmentPlan) {
        return DateUtils.convertToLocalDateSafe(treatmentPlan.getStartDate());
    }
}
