export enum TranslationID {
    /* MEDICAL CARD */
    MEDICAL_CARD_HEADER = "MEDICAL_CARD_HEADER",
    ALL_MEDICAL_CARDS_HEADER = "ALL_MEDICAL_CARDS_HEADER",
    GENERAL_INFO_HEADER = "GENERAL_INFO_HEADER",
    PERSONAL_INFO_HEADER = "PERSONAL_INFO_HEADER",
    LAST_ACTIVITIES_HEADER = "LAST_ACTIVITIES_HEADER",
    CURRENT_PLANS_HEADER = "CURRENT_PLANS_HEADER",
    ACTIVITY_DESCRIPTION = "ACTIVITY_DESCRIPTION",
    ACTIVITY_DATE = "ACTIVITY_DATE",
    NO_CARD_DATA = "NO_CARD_DATA",
    NO_ACTIVE_PLANS = "NO_ACTIVE_PLANS",
    SEARCH_BY_NAME_HINT = "SEARCH_BY_NAME_HINT",

    NAME = "NAME",
    SURNAME = "SURNAME",
    PATRONYMIC = "PATRONYMIC",
    AGE = "AGE",
    SEX = "SEX",
    EMAIL = "EMAIL",
    PHONE = "PHONE",

    /* TREATMENT PLAN */
    CREATE_TREATMENT_PLAN_HEADER = "CREATE_TREATMENT_PLAN_HEADER",
    NEW_PLAN_GENERAL_INFO_SUBHEADER = "NEW_PLAN_GENERAL_INFO_SUBHEADER",
    NEW_PLAN_STEPS_SUBHEADER = "NEW_PLAN_STEPS_SUBHEADER",
    PATIENT_SPECIFICS = "PATIENT_SPECIFICS",

    CHOOSE_PATIENT = "CHOOSE_PATIENT",
    CHOOSE_TREATMENT_CATEGORY = "CHOOSE_TREATMENT_CATEGORY",
    CHOOSE_PLAN_NAME = "CHOOSE_PLAN_NAME",
    CHOOSE_PLAN_START_DATE = "CHOOSE_PLAN_START_DATE",
    CHOOSE_PLAN_END_DATE = "CHOOSE_PLAN_END_DATE",
    DOCTOR = "DOCTOR",
    ADD_PLAN_STEP = "ADD_PLAN_STEP"
}

export const TRANSLATIONS = new Map<TranslationID, Value>([
    [TranslationID.MEDICAL_CARD_HEADER,
        {
            en: "Electronic Medical Card",
            ua: "Електронна Медична Карта"
        }
    ],
    [TranslationID.ALL_MEDICAL_CARDS_HEADER,
        {
            en: "Electronic Medical Cards Register",
            ua: "Реєстр Електронних Медичних Карт"
        }
    ],
    [TranslationID.GENERAL_INFO_HEADER,
        {
            en: "General Info",
            ua: "Загальна Інформація"
        }
    ],
    [TranslationID.PERSONAL_INFO_HEADER,
        {
            en: "Personal Info",
            ua: "Персональна Інформація"
        }
    ],
    [TranslationID.LAST_ACTIVITIES_HEADER,
        {
            en: "Last Activities",
            ua: "Останні Активності"
        }
    ],
    [TranslationID.CURRENT_PLANS_HEADER,
        {
            en: "Current Plans",
            ua: "Поточні Плани"
        }
    ],
    [TranslationID.ACTIVITY_DESCRIPTION,
        {
            en: "Activity Description",
            ua: "Опис Активності"
        }
    ],
    [TranslationID.ACTIVITY_DATE,
        {
            en: "Activity Date",
            ua: "Дата Активності"
        }
    ],
    [TranslationID.NO_CARD_DATA,
        {
            en: "No data for card",
            ua: "Немає даних по карті"
        }
    ],
    [TranslationID.NO_ACTIVE_PLANS,
        {
            en: "There are no treatment plans ongoing",
            ua: "Активних планів лікування немає"
        }
    ],
    [TranslationID.SEARCH_BY_NAME_HINT,
        {
            en: "Input patient's initials...",
            ua: "Введіть ініціали пацієнта..."
        }
    ],
    [TranslationID.NAME,
        {
            en: "Name",
            ua: "Ім'я"
        }
    ],
    [TranslationID.SURNAME,
        {
            en: "Surname",
            ua: "Прізвище"
        }
    ],
    [TranslationID.PATRONYMIC,
        {
            en: "Patronymic",
            ua: "По батькові"
        }
    ],
    [TranslationID.AGE,
        {
            en: "Age",
            ua: "Вік"
        }
    ],
    [TranslationID.SEX,
        {
            en: "Sex",
            ua: "Стать"
        }
    ],
    [TranslationID.EMAIL,
        {
            en: "Email",
            ua: "Електронна пошта"
        }
    ],
    [TranslationID.PHONE,
        {
            en: "Phone",
            ua: "Телефон"
        }
    ],
    [TranslationID.CREATE_TREATMENT_PLAN_HEADER,
        {
            en: "Create New Treatment Plan",
            ua: "Створити новий план лікування"
        }
    ],
    [TranslationID.NEW_PLAN_GENERAL_INFO_SUBHEADER,
        {
            en: "General plan info",
            ua: "Загальна інформація"
        }
    ],
    [TranslationID.NEW_PLAN_STEPS_SUBHEADER,
        {
            en: "Treatments steps",
            ua: "Кроки лікування"
        }
    ],
    [TranslationID.PATIENT_SPECIFICS,
        {
            en: "Patient specifics",
            ua: "Особливості пацієнта"
        }
    ],
    [TranslationID.CHOOSE_PATIENT,
        {
            en: "Choose patient",
            ua: "Оберіть пацієнта"
        }
    ],
    [TranslationID.CHOOSE_TREATMENT_CATEGORY,
        {
            en: "Treatment category",
            ua: "Категорія"
        }
    ],
    [TranslationID.CHOOSE_PLAN_NAME,
        {
            en: "Plan name",
            ua: "Назва плану"
        }
    ],
    [TranslationID.CHOOSE_PLAN_START_DATE,
        {
            en: "Plan start date",
            ua: "Початок плану"
        }
    ],
    [TranslationID.CHOOSE_PLAN_END_DATE,
        {
            en: "Plan end date",
            ua: "Кінець плану"
        }
    ],
    [TranslationID.DOCTOR,
        {
            en: "Doctor",
            ua: "Лікар"
        }
    ],
    [TranslationID.ADD_PLAN_STEP,
        {
            en: "Add plan step",
            ua: "Додати крок лікування"
        }
    ],
])

interface Value {
    en: string;
    ua: string;
}
