package com.kpi.project.healthmonitoring.plan.service.impl;

import com.kpi.project.healthmonitoring.plan.common.dto.response.emc.PatientMedicalCardResponseDTO;
import com.kpi.project.healthmonitoring.plan.service.EMCService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class EMCServiceImpl implements EMCService {

    private final RestTemplate restTemplate;

    @Value("${external.api.healthmonitoring.emc.patricular}")
    private String patientCardApiUrl;

    @Override
    public PatientMedicalCardResponseDTO getPatientMedicalCard(Long patientCardId) {
        String targetUrl = patientCardApiUrl.replace("{cardId}", patientCardId.toString());

        return restTemplate.getForObject(targetUrl, PatientMedicalCardResponseDTO.class);
    }
}
