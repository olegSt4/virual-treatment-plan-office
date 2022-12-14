package com.kpi.project.healthmonitoring.medicalcard.service;

import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardBaseDataResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientSpecificResponseDTO;

import java.util.List;

public interface EMCService {

    PatientMedicalCardResponseDTO getPatientMedicalCard(Long patientId);

    List<PatientMedicalCardResponseDTO> getAllPatientsMedicalCards();

    List<PatientMedicalCardBaseDataResponseDTO> getAllPatientsMedicalCardsBaseData();

    List<PatientSpecificResponseDTO> getPatientSpecifics(Long patientCardId);
}
