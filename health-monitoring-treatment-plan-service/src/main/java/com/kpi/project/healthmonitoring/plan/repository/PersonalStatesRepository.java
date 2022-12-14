package com.kpi.project.healthmonitoring.plan.repository;

import com.kpi.project.healthmonitoring.plan.config.filter.StateEntry;

import java.util.List;

public interface PersonalStatesRepository {

    List<StateEntry> findAll();
}
