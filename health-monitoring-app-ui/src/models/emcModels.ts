export interface MedicalCardData {
    id: string;

    surname: string;
    name: string;
    middleName: string;
    sex: string;
    dateOfBirth: string;
    age: number;

    address: string;
    mail: string;
    phone: string;

    bloodGroup: string;

    lastActions: PatientAction[];
    currentPlans: CurrentPlanBaseInfo[];

    fluorography: ProcedureResult;
    vaccinations: ProcedureResult[];
    disability: Disability;
    specifics: PatientSpecific[];
}

export interface PatientAction {
    actionName: string;
    actionDate: string;
}

export interface CurrentPlanBaseInfo {
    planId: string;
    planName: string;
    isAvailableToSee: boolean;
}

export interface ProcedureResult {
    name: string;
    date: string;
    result: string;
    needToRefresh?: boolean;
}

export interface Disability {
    name: string;
    level: DisabilityLevel;
}

export enum DisabilityLevel {
    NONE = "NONE",
    I = "I",
    II = "II",
    III = "III"
}

export interface PatientSpecific {
    specificName: string;
    isCritical: boolean;
}

export interface BaseMedicalCardData {
    cardId: string;

    patientName: string;
    patientSurname: string;
    patientMiddleName: string;
}
