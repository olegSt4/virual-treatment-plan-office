package com.kpi.project.healthmonitoring.plan.common.dto.response.emc;

import com.kpi.project.healthmonitoring.plan.common.model.emc.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.ArrayList;
import java.util.List;

@Accessors(chain = true)
@NoArgsConstructor
@Data
public class PatientMedicalCardResponseDTO {

    private Long id;

    private String surname;
    private String name;
    private String middleName;
    private PatientSex sex;
    private String dateOfBirth;
    private Integer age;

    private String address;
    private String mail;
    private String phone;

    private String bloodGroup;

    private List<LastPatientActionBaseData> lastActions = new ArrayList<>();
    private List<PatientTreatmentPlanBaseData> currentPlans = new ArrayList<>();

    private ProcedureResult fluorography;
    private List<ProcedureResult> vaccinations = new ArrayList<>();
    private Disability disability;
    private List<PatientSpecific> specifics = new ArrayList<>();
}
