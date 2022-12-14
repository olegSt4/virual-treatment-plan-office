package com.kpi.project.healthmonitoring.healthmonitoring.notification.repository.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserFakeEntity {
    private String name;
    private String surname;
    private String middleName;

    private String email;
}
