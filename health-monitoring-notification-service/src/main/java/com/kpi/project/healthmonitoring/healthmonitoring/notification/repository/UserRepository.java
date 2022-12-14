package com.kpi.project.healthmonitoring.healthmonitoring.notification.repository;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.UserFakeEntity;

public interface UserRepository {

    UserFakeEntity getUserById(Long userId);
}
