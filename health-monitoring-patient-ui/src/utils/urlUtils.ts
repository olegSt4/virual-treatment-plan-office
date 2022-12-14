export const MEDICAL_CARD_URL = "/cabinet/cards/:id";
export const TREATMENT_PLAN_URL = "/cabinet/patient/plans/:id";

export const getPatientCardURLById = (cardId: string) => {
    return MEDICAL_CARD_URL.replace(":id", cardId);
};

export const getTreatmentPlanURL = (planId: string) => {
    return TREATMENT_PLAN_URL.replace(":id", planId);
}
