package com.kpi.project.healthmonitoring.healthmonitoring.notification.service;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request.ActionReminderRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request.PatientStateAlertRequestDTO;

public interface NotificationManagementService {

    void sendNextActionReminderNotification(ActionReminderRequestDTO actionReminderRequest);

    void sendPatientStateAlert(PatientStateAlertRequestDTO patientStateAlertRequest);
}
