package com.kpi.project.healthmonitoring.plan.service;

import com.kpi.project.healthmonitoring.plan.common.dto.response.emc.PatientMedicalCardResponseDTO;

public interface EMCService {

    PatientMedicalCardResponseDTO getPatientMedicalCard(Long patientCardId);
}
