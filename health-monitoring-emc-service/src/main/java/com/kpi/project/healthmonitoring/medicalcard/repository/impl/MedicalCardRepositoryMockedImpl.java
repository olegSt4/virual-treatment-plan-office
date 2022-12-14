package com.kpi.project.healthmonitoring.medicalcard.repository.impl;

import com.kpi.project.healthmonitoring.medicalcard.common.dto.response.PatientMedicalCardResponseDTO;
import com.kpi.project.healthmonitoring.medicalcard.common.model.*;
import com.kpi.project.healthmonitoring.medicalcard.repository.MedicalCardRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MedicalCardRepositoryMockedImpl implements MedicalCardRepository {

    private final static Map<Long, PatientMedicalCardResponseDTO> MOCKED_PATIENTS_CARDS;

    static {
        PatientMedicalCardResponseDTO firstPatient = new PatientMedicalCardResponseDTO();
        firstPatient.setId(1L);
        firstPatient.setSurname("Іваненко");
        firstPatient.setName("Іван");
        firstPatient.setMiddleName("Іванович");
        firstPatient.setSex(PatientSex.MALE);
        firstPatient.setDateOfBirth("10-10-1998");
        firstPatient.setAge(24);

        firstPatient.setAddress("Київ, вул. Металістів, 333");
        firstPatient.setMail("ivanenko.ivan@gmail.com");
        firstPatient.setPhone("+380982323232");

        firstPatient.setBloodGroup("AII(+)");

        firstPatient.setLastActions(List.of(
                new LastPatientActionBaseData(){{
                    setActionName("Аналіз крові");
                    setActionDate("13-11-2022");
                }},
                new LastPatientActionBaseData(){{
                    setActionName("Візит до терапевта");
                    setActionDate("14-11-2022");
                }}
        ));
        firstPatient.setCurrentPlans(Collections.singletonList(
                new PatientTreatmentPlanBaseData(){{
                    setPlanId("1");
                    setPlanName("Лікування спини");
                    setIsAvailableToSee(true);
                }}
        ));

        firstPatient.setFluorography(
                new ProcedureResult(){{
                    setName("Флюрографія");
                    setDate("10-09-2022");
                    setResult("Ніяких патологій та відхилень не виявлено");
                    setNeedToRefresh(false);
                }}
        );
        firstPatient.setVaccinations(Arrays.asList(
                new ProcedureResult(){{
                    setName("Щеплення дифтерії і правця");
                    setDate("11-08-2018");
                }},
                new ProcedureResult(){{
                    setName("Вакцинація від Covid-19 (Pfizer)");
                    setDate("11-11-2021");
                }}
        ));
        firstPatient.setDisability(
                new Disability(){{
                    setLevel(DisabilityLevel.NONE);
                }}
        );
        firstPatient.setSpecifics(Arrays.asList(
                new PatientSpecific(){{
                    setName("Часткова серцева недостатність");
                    setIsCritical(true);
                }},
                new PatientSpecific(){{
                    setName("Низька фізична активність");
                    setIsCritical(false);
                }}
        ));


        PatientMedicalCardResponseDTO secondPatient = new PatientMedicalCardResponseDTO();
        secondPatient.setId(2L);
        secondPatient.setName("Петренко");
        secondPatient.setSurname("Петро");
        secondPatient.setMiddleName("Петрович");
        secondPatient.setDateOfBirth("3-3-1995");
        secondPatient.setAge(28);
        secondPatient.setSex(PatientSex.MALE);

        secondPatient.setAddress("Київ, вул. Львівська, 999");
        secondPatient.setMail("petrenko.petro@gmail.com");
        secondPatient.setPhone("+380985757575");

        secondPatient.setBloodGroup("AII(-)");

        secondPatient.setLastActions(List.of(
                new LastPatientActionBaseData(){{
                    setActionName("Аналіз крові");
                    setActionDate("13-11-2022");
                }},
                new LastPatientActionBaseData(){{
                    setActionName("Рентген променевої кістки лівої руки");
                    setActionDate("13-11-2022");
                }},
                new LastPatientActionBaseData(){{
                    setActionName("Профілактичний візит до дентиста");
                    setActionDate("17-11-2022");
                }}
        ));
        secondPatient.setCurrentPlans(Collections.singletonList(
                new PatientTreatmentPlanBaseData(){{
                    setPlanId("2");
                    setPlanName("Лікування виразки шлунку");
                    setIsAvailableToSee(true);
                }}
        ));
        secondPatient.setDisability(
                new Disability(){{
                    setName("Набута відустність двох вальців лівої руки");
                    setLevel(DisabilityLevel.II);
                }}
        );


        PatientMedicalCardResponseDTO thirdPatient = new PatientMedicalCardResponseDTO();
        thirdPatient.setId(3L);
        thirdPatient.setName("Ігнатенко");
        thirdPatient.setSurname("Ірина");
        thirdPatient.setMiddleName("Володимирівна");
        thirdPatient.setDateOfBirth("1-1-1991");
        thirdPatient.setAge(32);
        thirdPatient.setSex(PatientSex.FEMALE);

        thirdPatient.setAddress("Київ, пр. Перемоги, 1012");
        thirdPatient.setMail("ignatenko.iryna@gmail.com");
        thirdPatient.setPhone("+380989797979");

        thirdPatient.setBloodGroup("AIII(+)");

        MOCKED_PATIENTS_CARDS = Map.of(
                1L, firstPatient,
                2L, secondPatient,
                3L, thirdPatient
        );
    }

    @Override
    public PatientMedicalCardResponseDTO findById(Long cardId) {
        return Optional.of(MOCKED_PATIENTS_CARDS.get(cardId)).orElse(MOCKED_PATIENTS_CARDS.get(1L));
    }

    @Override
    public List<PatientMedicalCardResponseDTO> findAll() {
        return new ArrayList<>(MOCKED_PATIENTS_CARDS.values());
    }
}
