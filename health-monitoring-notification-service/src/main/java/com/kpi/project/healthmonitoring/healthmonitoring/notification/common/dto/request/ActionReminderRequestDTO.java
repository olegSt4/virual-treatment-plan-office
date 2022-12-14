package com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class ActionReminderRequestDTO {
    private Long planId;

    private String actionName;
    private String actionDescription;
    private LocalDate actionDate;
}
