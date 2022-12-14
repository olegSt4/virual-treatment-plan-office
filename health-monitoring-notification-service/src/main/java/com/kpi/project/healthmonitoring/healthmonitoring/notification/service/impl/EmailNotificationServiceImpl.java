package com.kpi.project.healthmonitoring.healthmonitoring.notification.service.impl;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model.ActionReminderData;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.common.model.PatientStateAlert;
import com.kpi.project.healthmonitoring.healthmonitoring.notification.service.EmailNotificationService;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailNotificationServiceImpl implements EmailNotificationService {

    private final JavaMailSender mailSender;
    private final Configuration configuration;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${static.page.patient.plan}")
    private String treatmentPlanPatientViewUrlPattern;

    @Value("${static.page.doctor.plan}")
    private String treatmentPlanDoctorViewUrlPattern;

    @Value("${static.page.emc}")
    private String patientEMCUrlPattern;

    @Override
    public void sendActionReminderForPatient(String patientMail, ActionReminderData reminderData) {
        String subject = "Action reminder";
        String patientPlanUrl = treatmentPlanPatientViewUrlPattern.replace(
                "{planId}", reminderData.getPlanId().toString());

        final Map<String, Object> properties = new HashMap<>();
        properties.put("patientFullName", reminderData.getPatientFullName());
        properties.put("planId", reminderData.getPlanId());
        properties.put("type", reminderData.getActionType());
        properties.put("description", reminderData.getActionDescription());
        properties.put("date", reminderData.getActionDate());
        properties.put("planPageLink", patientPlanUrl);

        sendNotification(patientMail, subject, properties, "patient-action-reminder-mail-notification.ftl");
    }

    @Override
    public void sendStateAlertForPatient(String patientMail, PatientStateAlert patientStateAlert) {
        String subject = "Patient state alert";

        final Map<String, Object> properties = new HashMap<>();
        properties.put("patientFullName", patientStateAlert.getPatientFullName());
        properties.put("type", patientStateAlert.getAlertType());
        properties.put("description", patientStateAlert.getAlertDescription());
        properties.put("doctorPhone", patientStateAlert.getDoctorPhone());
        properties.put("doctorMail", patientStateAlert.getDoctorMail());

        sendNotification(patientMail, subject, properties, "state-alert-for-patient.ftl");
    }

    @Override
    public void sendPatientStateAlertForDoctor(String doctorMail, PatientStateAlert patientStateAlert) {
        String subject = "Patient state alert";

        String patientPlanUrl = patientStateAlert.getCurrentPlanId() == null
                ? null
                :
                treatmentPlanDoctorViewUrlPattern.replace(
                        "{planId}", patientStateAlert.getCurrentPlanId().toString());
        String patientCardUrl = patientStateAlert.getPatientMedicalCardId() == null
                ? null
                : patientEMCUrlPattern.replace(
                "{cardId}", patientStateAlert.getPatientMedicalCardId().toString());

        final Map<String, Object> properties = new HashMap<>();
        properties.put("doctorFullName", patientStateAlert.getDoctorFullName());
        properties.put("patientFullName", patientStateAlert.getPatientFullName());
        properties.put("type", patientStateAlert.getAlertType());
        properties.put("description", patientStateAlert.getAlertDescription());
        properties.put("patientPhone", patientStateAlert.getPatientPhone());
        properties.put("patientMail", patientStateAlert.getPatientMail());
        properties.put("currentPlanLink", patientPlanUrl);
        properties.put("patientCardLink", patientCardUrl);


        sendNotification(doctorMail, subject, properties, "state-alert-for-doctor.ftl");
    }

    private void sendNotification(String to, String subject, Map<String, Object> properties, String templateName) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            Template t = configuration.getTemplate(templateName);
            String html = FreeMarkerTemplateUtils.processTemplateIntoString(t, properties);

            helper.setFrom(username);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            mailSender.send(message);
        } catch (IOException | MessagingException | TemplateException e) {
            e.printStackTrace();
            log.error(String.format("Send notification %s exception to %s", subject, to));
        }
    }
}
