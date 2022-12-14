package com.kpi.project.healthmonitoring.healthmonitoring.notification.service;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model.ActionReminderData;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model.PatientStateAlert;

public interface EmailNotificationService {

    void sendActionReminderForPatient(String patientMail, ActionReminderData reminderData);

    void sendStateAlertForPatient(String patientMail, PatientStateAlert patientStateAlert);

    void sendPatientStateAlertForDoctor(String doctorMail, PatientStateAlert patientStateAlert);
}
