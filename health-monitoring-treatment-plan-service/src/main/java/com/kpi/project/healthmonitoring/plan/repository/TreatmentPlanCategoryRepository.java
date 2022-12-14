package com.kpi.project.healthmonitoring.plan.repository;

import com.kpi.project.healthmonitoring.plan.repository.entity.TreatmentPlanCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TreatmentPlanCategoryRepository extends CrudRepository<TreatmentPlanCategory, Long> {

    Optional<TreatmentPlanCategory> findByName(String categoryName);

    List<TreatmentPlanCategory> findAll();
}
