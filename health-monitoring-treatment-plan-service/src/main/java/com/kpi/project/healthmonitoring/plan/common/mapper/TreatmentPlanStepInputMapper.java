package com.kpi.project.healthmonitoring.plan.common.mapper;

import com.kpi.project.healthmonitoring.plan.common.dto.response.plan.TreatmentPlanStepInputResponseDTO;
import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanStepInput;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public abstract class TreatmentPlanStepInputMapper {

    @Mapping(target = "inputValue", expression = " java( stepInput.getValue() ) ")
    @Mapping(target = "type", expression = " java( stepInput.getType().toString() ) ")
    public abstract TreatmentPlanStepInputResponseDTO toResponseDTO(TreatmentPlanStepInput stepInput);
}
