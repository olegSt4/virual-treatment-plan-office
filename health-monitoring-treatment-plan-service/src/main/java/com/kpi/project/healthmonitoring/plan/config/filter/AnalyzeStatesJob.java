package com.kpi.project.healthmonitoring.plan.config.filter;

import com.kpi.project.healthmonitoring.plan.repository.PersonalStatesRepository;
import com.kpi.project.healthmonitoring.plan.service.NotificationService;
import com.kpi.project.healthmonitoring.plan.service.PersonalStateService;
import lombok.RequiredArgsConstructor;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AnalyzeStatesJob implements Job {

    private final PersonalStateService personalStateService;
    private final NotificationService notificationService;

    private final PersonalStatesRepository personalStatesRepository;

    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {

        List<StateEntry> allEntries = personalStatesRepository.findAll();

        List<SuspiciousStateEntry> suspiciousEntries = personalStateService.findSuspiciousEntries(allEntries);

        if (!suspiciousEntries.isEmpty()) {
            notificationService.initiateAlertsForStateEntries(suspiciousEntries);
        }
    }
}
