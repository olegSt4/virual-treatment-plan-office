package com.kpi.project.healthmonitoring.medicalcard.common.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class PatientMedicalCardBaseDataResponseDTO {
    private Long cardId;

    private String patientName;
    private String patientSurname;
    private String patientMiddleName;
}
