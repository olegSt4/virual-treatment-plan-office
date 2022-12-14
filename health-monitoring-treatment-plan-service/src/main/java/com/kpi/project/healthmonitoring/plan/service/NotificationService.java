package com.kpi.project.healthmonitoring.plan.service;

import com.kpi.project.healthmonitoring.plan.config.filter.StateEntry;
import com.kpi.project.healthmonitoring.plan.config.filter.SuspiciousStateEntry;

import java.util.List;

public interface NotificationService {

    void initiateAlertsForStateEntries(List<SuspiciousStateEntry> suspiciousStateEntries);
}
