package com.kpi.project.healthmonitoring.healthmonitoring.notification.repository;

import com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity.UserFakeEntity;
import org.springframework.stereotype.Service;

@Service
public class UserFakeRepository implements UserRepository {

    @Override
    public UserFakeEntity getUserById(Long userId) {
        return null;
    }
}
