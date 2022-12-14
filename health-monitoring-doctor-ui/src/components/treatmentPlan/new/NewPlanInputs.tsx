import React, {useEffect, useState} from "react";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import {Button} from "semantic-ui-react";
import {BaseMedicalCardData, PatientSpecific} from "@src/models/emcModels";
import {
    getAllPatientsBaseCardData,
    getNewPlanInitialData,
    getPatientSpecifics,
    saveNewTreatmentPlan
} from "@src/utils/externalCallUtils";
import PatientsSpecificsBlock from "@src/components/treatmentPlan/new/blocks/PatientsSpecificsBlock";
import {NewPlanStep, NewTreatmentPlanData, NewTreatmentPlanInitialData} from "@src/models/newTreatmentPlanModels";
import NewStepBlock from "@src/components/treatmentPlan/new/blocks/NewStepBlock";
import {DropdownSearchOption} from "@src/models/commonModels";
import styles from "@src/styles/App.module.scss";
import DateInput from "@src/components/treatmentPlan/new/inputs/DateInput";
import TextInput from "@src/components/treatmentPlan/new/inputs/TextInput";
import OptionsChooseInput from "@src/components/treatmentPlan/new/inputs/OptionsChooseInput";

interface NewPlanInputsProps {
    lang?: string;
}

const NewPlanInputs = (props: NewPlanInputsProps) => {
    const lang = props.lang;

    const [allPatientCards, setAllPatientCards] = useState<BaseMedicalCardData[]>([]);
    const [planInitialData, setPlanInitialData] = useState<NewTreatmentPlanInitialData>();

    const [patientSpecifics, setPatientSpecifics] = useState<PatientSpecific[]>([]);

    const [newPlanData, setNewPlanData] = useState<NewTreatmentPlanData>({
        patientCardId: "",
        planName: "",
        planCategory: "",
        planStartDate: "",
        planEndDate: "",
        planSteps: []
    });

    useEffect(() => {
        getAllPatientsBaseCardData().then(allCards => setAllPatientCards(allCards));
        getNewPlanInitialData().then(initialData => setPlanInitialData(initialData));
    }, []);

    const generatePatientSearchOptions = (): DropdownSearchOption[] => {
        return allPatientCards.map(card => {
            return {
                key: card.cardId,
                value: card.cardId,
                text: `${card.patientSurname} ${card.patientName} ${card.patientMiddleName}`
            };
        });
    };
    const generateCategoriesSearchOptions = (): DropdownSearchOption[] => {
        return planInitialData?.allCategories ? planInitialData.allCategories.map((category, index) => {
            return {
                key: index,
                value: category,
                text: category
            };
        }) : [];
    };

    const onPatientChoose = (e: any, data: any) => {
        onNewPlanDataChange("patientCardId", data.value);
        getPatientSpecifics(data.value).then(specifics => setPatientSpecifics(specifics));
    };
    const onNewPlanDataChange = (fieldName: string, fieldValue: any) => {
        setNewPlanData({
            ...newPlanData,
            [fieldName]: fieldValue
        });
    };

    const addNewPlanStep = () => {
        const newStepId: number = newPlanData.planSteps.map(step => step.id).sort().pop() || 0;

        if (newPlanData.planSteps.length < 10) {
            setNewPlanData({
                ...newPlanData,
                planSteps: [
                    ...newPlanData.planSteps,
                    {
                        id: newStepId + 1,
                        type: "",
                        frequency: "",
                        description: "",
                        stepPeriodStart: "",
                        stepPeriodEnd: ""
                    }
                ]
            });
        }
    };

    const saveStep = (stepToSave: NewPlanStep) => {
        setNewPlanData({
            ...newPlanData,
            planSteps: [
                ...newPlanData.planSteps.map(step => {
                    if (step.id === stepToSave.id) {
                        step = stepToSave;
                    }

                    return step;
                })
            ]
        });
    };
    const deleteStep = (id: number) => {
        setNewPlanData({
            ...newPlanData,
            planSteps: [...newPlanData.planSteps.filter(step => step.id !== id)]
        });
    };
    const renderPlanSteps = () => {
        return newPlanData.planSteps.map(stepData =>
            <NewStepBlock
                initialData={stepData}
                availableStepTypes={planInitialData && planInitialData.allStepTypes || []}
                saveStep={saveStep}
                deleteStep={deleteStep}
            />
        );
    };

    const onSavePlanClick = () => {
        saveNewTreatmentPlan(newPlanData);
    };

    return (
        <>
            <div className={styles.NewPlanContainer}>
                <div>
                    <div>
                        <div className={styles.NewPlanSubheader}>
                            <span>{getTranslation(TranslationID.NEW_PLAN_GENERAL_INFO_SUBHEADER, lang)}</span>
                        </div>
                        <div className={styles.NewPlanInputs} >
                            <OptionsChooseInput
                                title={getTranslation(TranslationID.CHOOSE_PATIENT, lang) || ""}
                                placeholder={getTranslation(TranslationID.CHOOSE_PATIENT, lang) || ""}
                                options={generatePatientSearchOptions()}
                                value={newPlanData.patientCardId}
                                onOptionChange={onPatientChoose}
                            />
                            <OptionsChooseInput
                                title={getTranslation(TranslationID.CHOOSE_TREATMENT_CATEGORY, lang) || ""}
                                placeholder={getTranslation(TranslationID.CHOOSE_TREATMENT_CATEGORY, lang) || ""}
                                options={generateCategoriesSearchOptions()}
                                value={newPlanData.planCategory}
                                onOptionChange={(e: any, data: any) => onNewPlanDataChange(
                                    "planCategory", data.value
                                )}
                            />
                            <TextInput
                                title={getTranslation(TranslationID.CHOOSE_PLAN_NAME, lang) || ""}
                                value={newPlanData.planName}
                                onChange={e => onNewPlanDataChange("planName", e.target.value)}
                            />
                            <DateInput
                                title={getTranslation(TranslationID.CHOOSE_PLAN_START_DATE, lang) || ""}
                                value={newPlanData.planStartDate}
                                onChange={e => onNewPlanDataChange("planStartDate", e.target.value)}
                            />
                            <DateInput
                                title={getTranslation(TranslationID.CHOOSE_PLAN_END_DATE, props.lang) || ""}
                                value={newPlanData.planEndDate}
                                onChange={e => onNewPlanDataChange("planEndDate", e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={styles.NewPlanSubheader}>
                            <span>{getTranslation(TranslationID.PATIENT_SPECIFICS, lang)}</span>
                        </div>
                        <div className={styles.NewPlanInputs}>
                            <PatientsSpecificsBlock
                                patientCardId={newPlanData.patientCardId}
                                specificsList={patientSpecifics}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.NewPlanSteps}>
                    <div>
                        <div className={styles.NewPlanSubheader}>
                            <span>{getTranslation(TranslationID.NEW_PLAN_STEPS_SUBHEADER, lang)}</span>
                        </div>
                        {renderPlanSteps()}
                        <div className={styles.AddPlanButton}>
                            <Button onClick={addNewPlanStep}>{getTranslation(TranslationID.ADD_PLAN_STEP, lang)}+</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.SaveButton}>
                <Button className={styles.Button} onClick={onSavePlanClick}>Зберегти план!</Button>
            </div>
        </>
    )
};

export default NewPlanInputs;
