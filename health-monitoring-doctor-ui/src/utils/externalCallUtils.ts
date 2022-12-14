import {BaseMedicalCardData, MedicalCardData, PatientSpecific} from "@src/models/emcModels";
import {
    NewPlanStep,
    NewTreatmentPlanData,
    NewTreatmentPlanInitialData,
    PlanStepType
} from "@src/models/newTreatmentPlanModels";
import {CompleteStep, PlanStep, TreatmentPlan} from "@src/models/planManagementModels";
import {fetchJSON, Method} from "@src/utils/fetchUtils";

// EMC API
export const ALL_PATIENTS_CARDS_ENDPOINT = "http://localhost:8080/healthmonitoring/api/medicalCards";
export const ALL_PATIENTS_CARDS_BASE_DATA_ENDPOINT = "http://localhost:8080/healthmonitoring/api/medicalCards/base";
export const PATIENT_SPECIFICS_ENDPOINT = "http://localhost:8080/healthmonitoring/api/medicalCards/:id/specifics";

// PLAN API
export const ALL_PATIENTS_PLANS_ENDPOINT = "http://localhost:8081/healthmonitoring/api/doctor/plans";
export const COMPLETE_PATIENTS_PLAN_ENDPOINT = "http://localhost:8081/healthmonitoring/api/doctor/plans/:id/complete";
export const NEW_PLAN_INITIAL_DATA_ENDPOINT = "http://localhost:8081/healthmonitoring/api/doctor/plans/initialData"
export const ALL_TREATMENT_PLAN_STEP_TYPES_ENDPOINT = "http://localhost:8081/healthmonitoring/api/doctor/plans/steps/types";
export const TREATMENT_PLAN_STEP_ENDPOINT = "http://localhost:8081/healthmonitoring/api/doctor/plans/steps/:id";
export const ALL_TREATMENT_PLAN_STEPS_ENDPOINT = "http://localhost:8081/healthmonitoring/api/doctor/plans/steps";

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

export const getAllAvailablePlansForDoctor = (): Promise<TreatmentPlan[]> => {
    return fetchJSON(ALL_PATIENTS_PLANS_ENDPOINT);
}

export const getAllTreatmentPlanStepTypes = (): Promise<PlanStepType[]> => {
    return fetchJSON(ALL_TREATMENT_PLAN_STEP_TYPES_ENDPOINT);
}

export const addNewTreatmentPlanStep = (stepToAdd: NewPlanStep): Promise<PlanStep[]> => {
    return fetchJSON(ALL_TREATMENT_PLAN_STEPS_ENDPOINT, Method.POST, {body: JSON.stringify(stepToAdd)});
}

export const saveNewTreatmentPlan = (newPlan: NewTreatmentPlanData) => {
    return fetchJSON(ALL_PATIENTS_PLANS_ENDPOINT, Method.POST, {body: JSON.stringify(newPlan)});
};

export const completeTreatmentPlan = (completeStep: CompleteStep): Promise<void> => {
    return fetchJSON(COMPLETE_PATIENTS_PLAN_ENDPOINT, Method.PUT, {body: JSON.stringify(completeStep)});
}

export const deleteTreatmentPlanStepById = (stepId: string): Promise<PlanStep> => {
    return fetchJSON(TREATMENT_PLAN_STEP_ENDPOINT.replace(":id", stepId), Method.DELETE);
}
