package com.kpi.project.healthmonitoring.plan.repository.entity;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "treatment_plan_steps")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TreatmentPlanStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Size(max = 255)
    @Column(nullable = false)
    private String description;

    @PositiveOrZero
    @Column(name = "step_order")
    private Integer stepOrder;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Size(max = 255)
    @Column
    private String comment;

    @Column(nullable = false)
    private Boolean finished = false;

    @Column(nullable = false)
    private Boolean failed = false;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    @ToString.Exclude
    private TreatmentPlan treatmentPlan;

    @OneToOne
    @JoinColumn(name = "type_id")
    private TreatmentPlanStepType type;

    @OneToOne
    @JoinColumn(name = "subtype_id")
    private TreatmentPlanStepSubtype subType;

    @OneToMany(mappedBy = "step", cascade = CascadeType.ALL)
    private List<TreatmentPlanStepInput> inputs = new ArrayList<>();
}
