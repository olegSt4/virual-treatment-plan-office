package com.kpi.project.healthmonitoring.plan.repository;

import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TreatmentPlanRepository extends CrudRepository<TreatmentPlan, Long> {

    List<TreatmentPlan> findByIdIn(Set<Long> plansIds);
}
