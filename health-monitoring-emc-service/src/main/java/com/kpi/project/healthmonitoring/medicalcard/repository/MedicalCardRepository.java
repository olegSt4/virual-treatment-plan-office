package com.kpi.project.healthmonitoring.medicalcard.repository;

import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardResponseDTO;

import java.util.List;

public interface MedicalCardRepository {

    PatientMedicalCardResponseDTO findById(Long cardId);

    List<PatientMedicalCardResponseDTO> findAll();
}
