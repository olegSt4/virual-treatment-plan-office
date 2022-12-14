package com.kpi.project.healthmonitoring.healthmonitoring.notification.repository;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.TreatmentPlanToPersonalities;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TreatmentPlanToPersonalitiesRepository extends CrudRepository<TreatmentPlanToPersonalities, Long> {

    Optional<TreatmentPlanToPersonalities> findByPlanId(Long planId);
}
