package com.kpi.project.healthmonitoring.healthmonitoring.notification.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

import java.util.Properties;

@Configuration
public class MailConfig {

    @Value("${spring.mail.host}")
    private String host;

    @Value("${spring.mail.username}")
    private String username;

    @Value("${spring.mail.password}")
    private String password;

    @Value("${spring.mail.port}")
    private int port;

    @Value("${spring.mail.debug:false}")
    private boolean debug;

    @Value("${spring.mail.transport.protocol}")
    private String protocol;

    @Value("${spring.mail.smtp.auth}")
    private String auth;

    @Value("${spring.mail.smtp.starttls.enable:true}")
    private String isStarttlsEnable;

    @Value("${spring.mail.smtp.timeout.base:5000}")
    private Integer timeout;

    @Value("${spring.mail.smtp.timeout.write:5000}")
    private Integer writeTimeout;

    @Value("${spring.mail.smtp.timeout.connection:5000}")
    private Integer connectionTimeout;

    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put(ConfigConstants.Mail.MAIL_TRANSPORT_PROTOCOL, protocol);
        props.put(ConfigConstants.Mail.MAIL_SMTP_AUTH, auth);
        props.put(ConfigConstants.Mail.MAIL_SMTP_STARTTLS, isStarttlsEnable);
        props.put(ConfigConstants.Mail.MAIL_DEBUG, debug);
        props.put(ConfigConstants.Mail.MAIL_TIMEOUT, timeout);
        props.put(ConfigConstants.Mail.MAIL_WRITE_TIMEOUT, writeTimeout);
        props.put(ConfigConstants.Mail.MAIL_CONNECTION_TIMEOUT, connectionTimeout);

        return mailSender;
    }
    @Primary
    @Bean
    public FreeMarkerConfigurationFactoryBean factoryBean() {
        FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath("classpath:/mail/");

        return bean;
    }

}
