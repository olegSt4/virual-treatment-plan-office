package com.kpi.project.healthmonitoring.plan.common.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class FilledInputRequestDTO {
    private String name;
    private String type;
    private Object value;
}
