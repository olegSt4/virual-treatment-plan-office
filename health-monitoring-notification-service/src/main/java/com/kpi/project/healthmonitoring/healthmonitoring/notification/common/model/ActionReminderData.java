package com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Data
public class ActionReminderData {
    private Long planId;
    private String patientFullName;

    private String actionType;
    private String actionDescription;
    private LocalDate actionDate;
}
