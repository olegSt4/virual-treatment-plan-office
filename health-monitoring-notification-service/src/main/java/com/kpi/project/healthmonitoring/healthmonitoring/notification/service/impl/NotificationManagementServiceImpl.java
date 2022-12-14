package com.kpi.project.healthmonitoring.healthmonitoring.notification.service.impl;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request.ActionReminderRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.dto.request.PatientStateAlertRequestDTO;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model.ActionReminderData;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model.PatientStateAlert;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.StateEntryToPatientRepository;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.TreatmentPlanToPersonalitiesRepository;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.UserNotificationSettingsRepository;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.UserRepository;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.StateEntryToPatient;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.TreatmentPlanToPersonalities;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.UserFakeEntity;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.UserNotificationsSettings;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.service.EmailNotificationService;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.service.NotificationManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationManagementServiceImpl implements NotificationManagementService {

    private final TreatmentPlanToPersonalitiesRepository treatmentPlanToPersonalitiesRepository;
    private final UserNotificationSettingsRepository userNotificationSettingsRepository;
    private final UserRepository userRepository;
    private final StateEntryToPatientRepository stateEntryToPatientRepository;

    private final EmailNotificationService emailNotificationService;

    @Override
    public void sendNextActionReminderNotification(ActionReminderRequestDTO actionReminderRequest) {
        TreatmentPlanToPersonalities planToUsersMapping = treatmentPlanToPersonalitiesRepository.findByPlanId(
                actionReminderRequest.getPlanId())
                .orElseThrow(() -> new RuntimeException(String.format("Cannot find mapping for planId [%d]", actionReminderRequest.getPlanId())));

        if (isEmailNotificationEnabledForUser(planToUsersMapping.getPatientId())) {
            UserFakeEntity patient = userRepository.getUserById(planToUsersMapping.getPatientId());

            emailNotificationService.sendActionReminderForPatient(patient.getEmail(), new ActionReminderData(){{
                setPatientFullName(getFullUserName(patient));
                setPlanId(actionReminderRequest.getPlanId());
                setActionType(actionReminderRequest.getActionName());
                setActionDescription(actionReminderRequest.getActionDescription());
                setActionDate(actionReminderRequest.getActionDate());
            }});
        }
    }

    @Override
    public void sendPatientStateAlert(PatientStateAlertRequestDTO patientStateAlertRequest) {
        StateEntryToPatient stateEntryToPatientMapping = stateEntryToPatientRepository.findByStateEntryId(patientStateAlertRequest.getStateEntryId())
                .orElseThrow(() -> new RuntimeException(String.format("Cannot find mapping for EntryId [%d]", patientStateAlertRequest.getStateEntryId())));

        if (isEmailNotificationEnabledForUser(stateEntryToPatientMapping.getPatientId())) {
            UserFakeEntity patient = userRepository.getUserById(stateEntryToPatientMapping.getPatientId());

            emailNotificationService.sendStateAlertForPatient(patient.getEmail(), new PatientStateAlert(){{
                setPatientFullName(getFullUserName(patient));
                setAlertType(patientStateAlertRequest.getAlertType());
                setAlertDescription(patientStateAlertRequest.getDescription());
            }});
        }
    }

    private Boolean isEmailNotificationEnabledForUser(Long userId) {
        return userNotificationSettingsRepository.findByUserId(userId)
                .map(UserNotificationsSettings::getIsEmailNotificationEnabled)
                .orElseThrow(() -> new RuntimeException(String.format("Cannot find notification settings for user [%d]", userId)));
    }

    private String getFullUserName(UserFakeEntity user) {
        return String.format("%s %s %s", user.getSurname(), user.getName(), user.getMiddleName());
    }
}
