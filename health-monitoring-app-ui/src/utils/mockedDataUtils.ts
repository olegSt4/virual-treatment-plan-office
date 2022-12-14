import {DisabilityLevel, MedicalCardData} from "@src/models/emcModels";

export const firstPatientCardMock: MedicalCardData = {
    id: "1",
    name: "Іван",
    surname: "Іваненко",
    middleName: "Іванович",
    dateOfBirth: "10-10-1998",
    age: 24,
    sex: "MALE",

    address: "Київ, вул. Металістів, 333",
    phone: "+380982323232",
    mail: "ivanenko.ivan@gmail.com",

    bloodGroup: "A(II)+",

    lastActions: [
        {
            actionName: "Аналіз крові",
            actionDate: "13-11-2022"
        },
        {
            actionName: "Візит терапевта",
            actionDate: "14-11-2022"
        }
    ],
    currentPlans: [
        {
            planId: "1",
            planName: "Лікування спини",
            isAvailableToSee: true
        }
    ],

    fluorography: {
        name: "Флюрографія",
        date: "14-11-2022",
        result: "Ніяких патологій чи відхилень не виявлено",
        needToRefresh: false
    },
    vaccinations: [
        {
            name: "Щеплення від девтерії",
            date: "14-11-2022",
            result: "",
            needToRefresh: false
        },
        {
            name: "Щеплення від правця",
            date: "14-11-2022",
            result: "",
            needToRefresh: true
        },
    ],
    disability: {
        name: "",
        level: DisabilityLevel.NONE
    },
    specifics: [
        {
            specificName: "Часткова серцева недостатність",
            isCritical: true
        },
        {
            specificName: "Слабкий спортивний рівень",
            isCritical: false
        }
    ]
};

export const secondPatientCardMock: MedicalCardData = {
    id: "2",
    name: "Петро",
    surname: "Петренко",
    middleName: "Петрович",
    dateOfBirth: "3-3-1995",
    age: 28,
    sex: "MALE",

    address: "Київ, вул. Львівська, 111",
    phone: "+380985757575",
    mail: "petrenko.petro@gmail.com",

    bloodGroup: "AII(-)",

    lastActions: [
        {
            actionName: "Аналіз крові",
            actionDate: "13-11-2022"
        },
        {
            actionName: "Рентген променевої кістки лівої руки",
            actionDate: "13-11-2022"
        },
        {
            actionName: "Візит до стоматолога",
            actionDate: "17-11-2022"
        }
    ],
    currentPlans: [
        {
            planId: "2",
            planName: "Лікування виразки шлунка",
            isAvailableToSee: true
        }
    ],

    fluorography: {
        name: "Флюрографія",
        date: "14-11-2022",
        result: "Ніяких відхилень чи патологій не виявлено",
        needToRefresh: false
    },
    vaccinations: [],
    disability: {
        name: "Відсутність двох пальців на лівій руці",
        level: DisabilityLevel.II
    },
    specifics: []
};

export const thirdPatientCardMock: MedicalCardData = {
    id: "3",
    name: "Ірина",
    surname: "Ігнатенко",
    middleName: "Volodymyryvna",
    dateOfBirth: "1-1-1991",
    age: 32,
    sex: "FEMALE",

    address: "Kyiv, Peremohy av., 112",
    phone: "+380989797979",
    mail: "ignatenko.iryna@gmail.com",

    bloodGroup: "AIII(+)",

    lastActions: [],
    currentPlans: [],

    fluorography: {
        name: "Flourography",
        date: "14-11-2022",
        result: "No bad things detected",
        needToRefresh: false
    },
    vaccinations: [
        {
            name: "Devtery",
            date: "14-11-2022",
            result: "",
            needToRefresh: false
        },
        {
            name: "Pravetsz",
            date: "14-11-2022",
            result: "",
            needToRefresh: true
        },
    ],
    disability: {
        name: "",
        level: DisabilityLevel.NONE
    },
    specifics: [
        {
            specificName: "Weak heart",
            isCritical: true
        },
        {
            specificName: "Low sport",
            isCritical: false
        }
    ]
};

export const getAllPatientsCardsMock = (): MedicalCardData[] => {
    return [firstPatientCardMock, secondPatientCardMock, thirdPatientCardMock]
};
