package com.kpi.project.healthmonitoring.plan.repository;

import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanStepSubtype;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TreatmentPlanStepSubtypeRepository extends CrudRepository<TreatmentPlanStepSubtype, Long> {

    Optional<TreatmentPlanStepSubtype> findByName(String name);
}
