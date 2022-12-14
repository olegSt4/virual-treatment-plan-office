package com.kpi.project.healthmonitoring.plan.config.filter;

import lombok.RequiredArgsConstructor;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StateAnalyzer {

    @Value("${application.jobs.analyzeStatesJob.cronExpression: */5 * * * *}")
    private String cronExpression;

    @Bean("analyzeStatesJobDetails")
    public JobDetail analyzeStatesJobDetails() {
        return JobBuilder.newJob(AnalyzeStatesJob.class)
                .withIdentity("AnalyzeStatesJob")
                .storeDurably(true)
                .build();
    }

    @Bean("analyzeStatesJobTrigger")
    public Trigger analyzeStatesJobTrigger(@Autowired @Qualifier("analyzeStatesJobDetails") JobDetail analyzeStatesJobDetails) {
        return TriggerBuilder.newTrigger()
                .forJob(analyzeStatesJobDetails)
                .withIdentity("AnalyzeStatesTrigger")
                .withSchedule(CronScheduleBuilder.cronSchedule(cronExpression))
                .build();
    }
}
