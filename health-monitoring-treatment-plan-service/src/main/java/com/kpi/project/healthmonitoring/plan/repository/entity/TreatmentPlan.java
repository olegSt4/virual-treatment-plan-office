package com.kpi.project.healthmonitoring.plan.repository.entity;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "treatment_plans")
@Accessors(chain = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TreatmentPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Size(max = 255)
    @Column(nullable = false)
    private String name;

    @Column(name = "start_date", nullable = false)
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(nullable = false)
    private Boolean finished = false;

    @Size(max = 255)
    private String conclusion;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private TreatmentPlanCategory category;

    @OneToMany(mappedBy = "treatmentPlan", cascade = CascadeType.ALL)
    private List<TreatmentPlanStep> steps = new ArrayList<>();
}
