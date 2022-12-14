import {BaseMedicalCardData, MedicalCardData, PatientSpecific} from "@src/models/emcModels";
import {
    NewPlanStep,
    NewTreatmentPlanData,
    NewTreatmentPlanInitialData,
    PlanStepType
} from "@src/models/newTreatmentPlanModels";
import {CompletedStep, PlanStep, PlanStepInputType, TreatmentPlan} from "@src/models/planManagementModels";
import {fetchJSON, Method} from "@src/utils/fetchUtils";

// EMC API
export const PATIENT_CARD_ENDPOINT = "http://localhost:8080/healthmonitoring/api/cards/:id";
export const ALL_PATIENTS_CARDS_ENDPOINT = "http://localhost:8080/healthmonitoring/api/cards";
export const ALL_PATIENTS_CARDS_BASE_DATA_ENDPOINT = "http://localhost:8080/healthmonitoring/api/cards/base";
export const PATIENT_SPECIFICS_ENDPOINT = "http://localhost:8080/healthmonitoring/api/cards/:id/specifics";

// PATIENT API
export const PATIENT_PLAN_ENDPOINT = "http://localhost:8080/healthmonitoring/api/patient/plans/:id";
export const COMPLETE_PLAN_STEP_ENDPOINT = "http://localhost:8080/healthmonitoring/api/patient/plans/:planId/steps/:stepId";

// DOCTOR API
export const ALL_PATIENTS_PLANS_ENDPOINT = "http://localhost:8080/healthmonitoring/api/doctor/plans";
export const NEW_PLAN_INITIAL_DATA_ENDPOINT = "http://localhost:8080/healthmonitoring/api/doctor/plans/initialData"
export const ALL_TREATMENT_PLAN_STEP_TYPES_ENDPOINT = "http://localhost:8080/healthmonitoring/api/doctor/plans/steps/types";
export const TREATMENT_PLAN_STEP_ENDPOINT = "http://localhost:8080/healthmonitoring/api/doctor/plans/steps/:id";
export const ALL_TREATMENT_PLAN_STEPS_ENDPOINT = "http://localhost:8080/healthmonitoring/api/doctor/plans/steps";

export const getMedicalCardDataById = (id: string): Promise<MedicalCardData> => {
    return fetchJSON(PATIENT_CARD_ENDPOINT.replace(":id", id));
};

export const getAllPatientsCards = (): Promise<MedicalCardData[]> => {
    return fetchJSON(ALL_PATIENTS_CARDS_ENDPOINT);
};

export const getAllPatientsBaseCardData = (): Promise<BaseMedicalCardData[]> => {
    return fetchJSON(ALL_PATIENTS_CARDS_BASE_DATA_ENDPOINT);
};

export const getPatientSpecifics = (patientId: string): Promise<PatientSpecific[]> => {
    return fetchJSON(PATIENT_SPECIFICS_ENDPOINT.replace(":id", patientId));
};

export const getNewPlanInitialData = (): Promise<NewTreatmentPlanInitialData> => {
    return fetchJSON(NEW_PLAN_INITIAL_DATA_ENDPOINT);
};

export const saveNewPlan = (newPlan: NewTreatmentPlanData) => {
    return fetchJSON(ALL_PATIENTS_PLANS_ENDPOINT, Method.POST, {body: JSON.stringify(newPlan)});
};

export const getAllAvailablePlansForDoctor = (): Promise<TreatmentPlan[]> => {
    return fetchJSON(ALL_PATIENTS_PLANS_ENDPOINT);
}

export const getPatientPersonalTreatmentPlan = (planId: string): Promise<TreatmentPlan> => {
    return fetchJSON(PATIENT_PLAN_ENDPOINT.replace(":id", planId));
};

export const getAllTreatmentPlanStepTypes = (): Promise<PlanStepType[]> => {
    return fetchJSON(ALL_TREATMENT_PLAN_STEP_TYPES_ENDPOINT);
}

export const deleteTreatmentPlanStepById = (stepId: string): Promise<PlanStep> => {
    return fetchJSON(TREATMENT_PLAN_STEP_ENDPOINT.replace(":id", stepId), Method.DELETE);
}

export const addNewTreatmentPlanStep = (stepToAdd: NewPlanStep): Promise<PlanStep[]> => {
    return fetchJSON(ALL_TREATMENT_PLAN_STEPS_ENDPOINT, Method.POST, {body: JSON.stringify(stepToAdd)});
}

export const completePlanStep = (planId: string, stepToComplete: CompletedStep): Promise<PlanStep> => {
    return fetchJSON(COMPLETE_PLAN_STEP_ENDPOINT.replace(":planId", planId)
        .replace(":stepId", stepToComplete.stepId), Method.PUT, {body: JSON.stringify(stepToComplete)});
}
