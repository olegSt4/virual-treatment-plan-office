package com.kpi.project.healthmonitoring.medicalcard.common.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class PatientSpecificResponseDTO {
    private String name;
    private Boolean isCritical;
}
