export interface TreatmentPlan {
    planId: string;
    patientCardId: string;
    patientFullName: string;

    name: string;
    category: string;
    startDate: string;
    endDate: string;
    steps: PlanStep[];
}

export interface PlanStep {
    id: string;
    type: string;
    subtype?: string;

    isFinished: boolean;
    isFailed: boolean;
    isActive: boolean;

    description: string;
    frequencyType: string;
    startPeriod: string;
    endPeriod?: string;
    comment?: string;
    inputs?: PlanStepInput[];
}

export interface PlanStepInput {
    type: PlanStepInputType;
    name: string;
    inputValue?: string;
    inputUnit?: string;
    options?: string[];
}

export enum PlanStepInputType {
    NUMBER = "NUMBER",
    OPTION = "OPTION"
}

export interface CompletedStep {
    stepId: string;
    comment?: string;
    inputs: FilledInput[];
}

export interface FilledInput {
    name: string;
    type: string;
    value: string | number;
}