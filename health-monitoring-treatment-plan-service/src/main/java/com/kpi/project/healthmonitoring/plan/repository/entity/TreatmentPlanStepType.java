package com.kpi.project.healthmonitoring.plan.repository.entity;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "treatment_plan_step_types")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TreatmentPlanStepType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Size(max = 127)
    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "comment_required", nullable = false)
    private Boolean isCommentRequired = false;

    @Size(max = 60)
    @Column(name = "subtypes_title")
    private String subtypesTitle;

    @OneToMany(mappedBy = "parentType")
    @ToString.Exclude
    private List<TreatmentPlanStepSubtype> subtypes = new ArrayList<>();
}
