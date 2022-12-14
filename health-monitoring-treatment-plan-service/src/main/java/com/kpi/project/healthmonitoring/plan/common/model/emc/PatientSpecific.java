package com.kpi.project.healthmonitoring.plan.common.model.emc;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class PatientSpecific {
    private String name;
    private Boolean isCritical;
}
