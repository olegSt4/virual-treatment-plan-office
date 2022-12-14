// Doctor URLs
export const ALL_PATIENTS_CARDS_URL = "/cabinet/doctor/cards";
export const ALL_TREATMENT_PLANS_URL = "/cabinet/doctor/plans";
export const PATIENT_TREATMENT_PLAN_FOR_DOCTOR_URL = "/cabinet/doctor/plans/:id";
export const CREATE_PATIENT_TREATMENT_PLAN_URL = "/cabinet/doctor/plans/create";

// Patient URLs
export const PATIENT_CARD_URL = "/cabinet/cards/:id";
export const PATIENT_TREATMENT_PLAN_URL = "/cabinet/patient/plans/:id";

export const getPatientCardURLById = (cardId: string) => {
    return PATIENT_CARD_URL.replace(":id", cardId);
};

export const getPatientTreatmentPlanForDoctor = (planId: string) => {
    return PATIENT_TREATMENT_PLAN_FOR_DOCTOR_URL.replace(":id", planId);
}

export const getPatientTreatmentPlan = (planId: string) => {
    return PATIENT_TREATMENT_PLAN_URL.replace(":id", planId);
}
