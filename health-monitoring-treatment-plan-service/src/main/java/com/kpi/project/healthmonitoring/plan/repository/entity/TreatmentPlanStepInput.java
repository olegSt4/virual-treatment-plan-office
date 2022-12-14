package com.kpi.project.healthmonitoring.plan.repository.entity;

import com.kpi.project.healthmonitoring.plan.common.model.plan.PatientInputType;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "treatment_plan_step_inputs")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TreatmentPlanStepInput {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Size(max = 127)
    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PatientInputType type;

    @Size(max = 127)
    @Column
    private String value;

    @Size(max = 40)
    @Column(name = "unit_name")
    private String inputUnit;

    @ManyToOne
    @JoinColumn(name = "step_id")
    @ToString.Exclude
    private TreatmentPlanStep step;
}
