package com.kpi.project.healthmonitoring.plan.repository.entity;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "treatment_plan_step_subtypes")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TreatmentPlanStepSubtype {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Size(max = 127)
    @Column(nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "parent_type_id")
    @ToString.Exclude
    private TreatmentPlanStepType parentType;

    @OneToMany(mappedBy = "stepSubtype")
    private List<TreatmentPlanStepSubtypeInput> inputs;
}
