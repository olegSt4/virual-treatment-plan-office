export const ALL_PATIENTS_CARDS_URL = "/cabinet/doctor/cards";
export const ALL_TREATMENT_PLANS_URL = "/cabinet/doctor/plans";
export const PATIENT_TREATMENT_PLAN_URL = "/cabinet/doctor/plans/:id";
export const CREATE_PATIENT_TREATMENT_PLAN_URL = "/cabinet/doctor/plans/create";

export const getPatientTreatmentPlan = (planId: string) => {
    return PATIENT_TREATMENT_PLAN_URL.replace(":id", planId);
}
