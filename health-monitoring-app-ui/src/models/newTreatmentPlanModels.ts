export interface NewTreatmentPlanInitialData {
    allCategories: string[];
    allStepTypes: PlanStepType[];
}

export interface PlanStepType {
    name: string;
    subtypesTitle?: string;
    subtypes?: string[];
}

export interface NewTreatmentPlanData {
    patientCardId: string;

    planName: string;
    planCategory: string;
    planStartDate: string;
    planEndDate: string;

    planSteps: NewPlanStep[];
}

export interface NewPlanStep {
    id: number;
    planId?: string;
    type: string;
    subtype?: string;
    frequency: string;

    description: string;
    stepPeriodStart: string;
    stepPeriodEnd?: string;
    spaceBetweenRepeat?: number;
}

export enum PlanStepFrequency {
    PARTICULAR_DAY = "PARTICULAR_DAY",
    ONCE_PER_PERIOD = "ONCE_PER_PERIOD",
    N_TIMES_PER_PERIOD = "N_TIMES_PER_PERIOD"
}