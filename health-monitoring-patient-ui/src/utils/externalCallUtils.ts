import {MedicalCardData} from "@src/models/emcModels";
import {CompletedStep, PlanStep, TreatmentPlan} from "@src/models/planManagementModels";
import {fetchJSON, Method} from "@src/utils/fetchUtils";

// EMC API
export const PATIENT_CARD_ENDPOINT = "http://localhost:8080/healthmonitoring/api/medicalCards/:id";

// PLAN API
export const TREATMENT_PLAN_ENDPOINT = "http://localhost:8081/healthmonitoring/api/patient/plans/:id";
export const COMPLETE_PLAN_STEP_ENDPOINT = "http://localhost:8081/healthmonitoring/api/patient/plans/:planId/steps/:stepId";

export const getMedicalCardDataById = (id: string): Promise<MedicalCardData> => {
    return fetchJSON(PATIENT_CARD_ENDPOINT.replace(":id", id));
};

export const getPersonalTreatmentPlan = (planId: string): Promise<TreatmentPlan> => {
    return fetchJSON(TREATMENT_PLAN_ENDPOINT.replace(":id", planId));
};

export const completePlanStep = (planId: string, stepToComplete: CompletedStep): Promise<PlanStep> => {
    return fetchJSON(COMPLETE_PLAN_STEP_ENDPOINT.replace(":planId", planId)
        .replace(":stepId", stepToComplete.stepId), Method.PUT, {body: JSON.stringify(stepToComplete)});
}
