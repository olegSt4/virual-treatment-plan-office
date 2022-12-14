package com.kpi.project.healthmonitoring.plan.util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

public final class DateUtils {

    private DateUtils() {}

    public static Date convertToDateSafe(LocalDate localDateToConvert) {
        return Optional.ofNullable(localDateToConvert)
                .map(date -> Date.from(localDateToConvert.atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .orElse(null);
    }

    public static LocalDate convertToLocalDateSafe(Date dateToConvert) {
        return Optional.ofNullable(dateToConvert)
                .map(date -> date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate())
                .orElse(null);
    }
}
