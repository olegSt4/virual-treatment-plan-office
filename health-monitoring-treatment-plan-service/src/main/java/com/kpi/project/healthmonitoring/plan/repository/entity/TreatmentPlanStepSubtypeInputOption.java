package com.kpi.project.healthmonitoring.plan.repository.entity;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "treatment_plan_step_subtype_input_options")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TreatmentPlanStepSubtypeInputOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Size(max = 127)
    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "input_id")
    @ToString.Exclude
    private TreatmentPlanStepSubtypeInput stepSubtype;
}
