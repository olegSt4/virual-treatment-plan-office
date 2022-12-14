package com.kpi.project.healthmonitoring.healthmonitoring.notification.resource;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request.ActionReminderRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request.PatientStateAlertRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.service.NotificationManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notification/")
@RequiredArgsConstructor
public class NotificationTriggerResource {

    private final NotificationManagementService notificationManagementService;

    @PostMapping("/nextAction")
    public void triggerPatientNextAction(@RequestBody ActionReminderRequestDTO requestDTO) {
        notificationManagementService.sendNextActionReminderNotification(requestDTO);
    }

    @PostMapping("/stateAlert")
    public void testTrigger(PatientStateAlertRequestDTO requestDTO) {
        notificationManagementService.sendPatientStateAlert(requestDTO);
    };
}
