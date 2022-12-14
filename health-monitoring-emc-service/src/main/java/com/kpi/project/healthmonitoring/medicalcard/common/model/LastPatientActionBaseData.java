package com.kpi.project.healthmonitoring.medicalcard.common.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@Data
@NoArgsConstructor
public class LastPatientActionBaseData {
    private String actionName;
    private String actionDate;
}
