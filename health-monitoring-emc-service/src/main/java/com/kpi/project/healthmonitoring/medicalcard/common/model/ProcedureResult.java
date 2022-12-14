package com.kpi.project.healthmonitoring.medicalcard.common.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class ProcedureResult {
    private String name;
    private String date;
    private String result;
    private Boolean needToRefresh;
}
