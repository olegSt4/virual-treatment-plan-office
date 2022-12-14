package com.kpi.project.healthmonitoring.healthmonitoring.notification.config;

public final class ConfigConstants {
    private ConfigConstants() {}

    public static class Mail {
        public static final String MAIL_TRANSPORT_PROTOCOL = "mail.transport.protocol";
        public static final String MAIL_SMTP_AUTH = "mail.smtp.auth";
        public static final String MAIL_SMTP_STARTTLS = "mail.smtp.starttls.enable";
        public static final String MAIL_DEBUG = "mail.debug";
        public static final String MAIL_TIMEOUT = "mail.properties.mail.smtp.timeout";
        public static final String MAIL_WRITE_TIMEOUT = "mail.properties.mail.smtp.writetimeout";
        public static final String MAIL_CONNECTION_TIMEOUT = "mail.properties.mail.smtp.connectiontimeout";
    }
}
