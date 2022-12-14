package com.kpi.project.healthmonitoring.medicalcard.resource;

import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardBaseDataResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientSpecificResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.service.EMCService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/medicalCards")
@RequiredArgsConstructor
public class ElectronicMedicalCardResource {

    private final EMCService emcService;

    @GetMapping
    public List<PatientMedicalCardResponseDTO> getAllPatientsCards() {
        return emcService.getAllPatientsMedicalCards();
    }

    @GetMapping("/{id}")
    public PatientMedicalCardResponseDTO getPatientMedicalCard(@PathVariable("id") Long medicalCardId) {
        return emcService.getPatientMedicalCard(medicalCardId);
    }

    @GetMapping("/base")
    public List<PatientMedicalCardBaseDataResponseDTO> getAllPatientsCardsBaseData() {
        return emcService.getAllPatientsMedicalCardsBaseData();
    }

    @GetMapping("/{cardId}/specifics")
    public List<PatientSpecificResponseDTO> getPatientSpecifics(@PathVariable("cardId") Long cardId) {
        return emcService.getPatientSpecifics(cardId);
    }
}
