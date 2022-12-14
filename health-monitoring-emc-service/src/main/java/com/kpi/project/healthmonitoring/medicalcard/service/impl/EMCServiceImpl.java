package com.kpi.project.healthmonitoring.medicalcard.service.impl;

import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardBaseDataResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientSpecificResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.model.PatientSpecific;
import com.kpi.project.healthmonitoring.medicalcard.repository.MedicalCardRepository;
import com.kpi.project.healthmonitoring.medicalcard.service.EMCService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EMCServiceImpl implements EMCService {

    private final MedicalCardRepository medicalCardRepository;

    @Override
    public PatientMedicalCardResponseDTO getPatientMedicalCard(Long patientCardId) {
        return medicalCardRepository.findById(patientCardId);
    }

    @Override
    public List<PatientMedicalCardResponseDTO> getAllPatientsMedicalCards() {
        return medicalCardRepository.findAll();
    }

    @Override
    public List<PatientMedicalCardBaseDataResponseDTO> getAllPatientsMedicalCardsBaseData() {
        return medicalCardRepository.findAll().stream().map(this::mapCardToBaseCardData).collect(Collectors.toList());
    }

    @Override
    public List<PatientSpecificResponseDTO> getPatientSpecifics(Long patientCardId) {
        List<PatientSpecific> patientSpecifics = Optional.ofNullable(medicalCardRepository.findById(patientCardId))
                .map(PatientMedicalCardResponseDTO::getSpecifics)
                .orElse(Collections.emptyList());

        return patientSpecifics.stream().map(this::mapSpecificToSpecificDTO).collect(Collectors.toList());
    }

    private PatientMedicalCardBaseDataResponseDTO mapCardToBaseCardData(PatientMedicalCardResponseDTO cardData) {
        return new PatientMedicalCardBaseDataResponseDTO(){{
            setCardId(cardData.getId());
            setPatientName(cardData.getName());
            setPatientSurname(cardData.getSurname());
            setPatientMiddleName(cardData.getMiddleName());
        }};
    }

    private PatientSpecificResponseDTO mapSpecificToSpecificDTO(PatientSpecific patientSpecific) {
        return new PatientSpecificResponseDTO(){{
            setName(patientSpecific.getName());
            setIsCritical(patientSpecific.getIsCritical());
        }};
    }
}
