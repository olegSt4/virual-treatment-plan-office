package com.kpi.project.healthmonitoring.healthmonitoring.notification.repository;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.StateEntryToPatient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StateEntryToPatientRepository extends CrudRepository<StateEntryToPatient, Long> {

    Optional<StateEntryToPatient> findByStateEntryId(Long stateEntryId);
}
