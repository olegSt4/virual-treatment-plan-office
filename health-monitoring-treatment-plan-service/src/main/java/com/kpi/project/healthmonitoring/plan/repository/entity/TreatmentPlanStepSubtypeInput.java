package com.kpi.project.healthmonitoring.plan.repository.entity;

import com.kpi.project.healthmonitoring.plan.common.model.plan.PatientInputType;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "treatment_plan_step_subtype_inputs")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TreatmentPlanStepSubtypeInput {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Size(max = 127)
    @Column(nullable = false)
    private String name;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private PatientInputType type;

    @Size(max = 60)
    @Column(name = "unit_name")
    private String unitName;

    @ManyToOne
    @JoinColumn(name = "step_subtype_id")
    @ToString.Exclude
    private TreatmentPlanStepSubtype stepSubtype;

    @OneToMany(mappedBy = "stepSubtype")
    private List<TreatmentPlanStepSubtypeInputOption> options = new ArrayList<>();
}
