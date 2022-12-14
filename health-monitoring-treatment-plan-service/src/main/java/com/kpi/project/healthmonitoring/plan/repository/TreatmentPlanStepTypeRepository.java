package com.kpi.project.healthmonitoring.plan.repository;

import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanStepType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TreatmentPlanStepTypeRepository extends CrudRepository<TreatmentPlanStepType, Long> {

    Optional<TreatmentPlanStepType> findByName(String name);

    List<TreatmentPlanStepType> findAll();
}
