package com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity;


import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;

@Entity
@Table(name = "state_entries_to_patients")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class StateEntryToPatient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(name = "state_entry_id", nullable = false)
    private Long stateEntryId;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;
}
