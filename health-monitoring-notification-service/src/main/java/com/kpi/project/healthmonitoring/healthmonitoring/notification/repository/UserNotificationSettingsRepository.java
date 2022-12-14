package com.kpi.project.healthmonitoring.healthmonitoring.notification.repository;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.UserNotificationsSettings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserNotificationSettingsRepository extends CrudRepository<UserNotificationsSettings, Long> {

    Optional<UserNotificationsSettings> findByUserId(Long userId);
}
