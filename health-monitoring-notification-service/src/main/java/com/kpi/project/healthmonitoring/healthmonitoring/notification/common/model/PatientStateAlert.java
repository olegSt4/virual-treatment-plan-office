package com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PatientStateAlert {
    private String alertType;
    private String alertDescription;

    private Long patientMedicalCardId;
    private Long currentPlanId;

    private String patientFullName;
    private String patientPhone;
    private String patientMail;

    private String doctorFullName;
    private String doctorPhone;
    private String doctorMail;
}
