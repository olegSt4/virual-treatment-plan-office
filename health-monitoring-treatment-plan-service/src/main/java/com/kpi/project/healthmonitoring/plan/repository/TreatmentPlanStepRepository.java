package com.kpi.project.healthmonitoring.plan.repository;

import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanStep;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreatmentPlanStepRepository extends CrudRepository<TreatmentPlanStep, Long> {
}
