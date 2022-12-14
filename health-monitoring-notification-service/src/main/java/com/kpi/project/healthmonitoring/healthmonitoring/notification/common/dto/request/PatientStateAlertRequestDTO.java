package com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PatientStateAlertRequestDTO {
    private Long stateEntryId;
    private String alertType;
    private String description;
}
