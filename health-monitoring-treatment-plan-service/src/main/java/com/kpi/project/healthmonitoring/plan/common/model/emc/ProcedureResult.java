package com.kpi.project.healthmonitoring.plan.common.model.emc;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProcedureResult {
    private String name;
    private String date;
    private String result;
    private Boolean needToRefresh;
}
