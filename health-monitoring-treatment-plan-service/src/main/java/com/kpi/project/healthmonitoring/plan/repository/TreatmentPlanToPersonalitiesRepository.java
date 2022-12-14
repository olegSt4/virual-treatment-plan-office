package com.kpi.project.healthmonitoring.plan.repository;

import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanToPersonalities;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TreatmentPlanToPersonalitiesRepository extends CrudRepository<TreatmentPlanToPersonalities, Long> {

    List<TreatmentPlanToPersonalities> findByDoctorId(Long doctorId);

    Optional<TreatmentPlanToPersonalities> findByPlanId(Long planId);
}
