import React, {useState} from "react";
import {NewPlanStep, PlanStepFrequency, PlanStepType} from "@src/models/newTreatmentPlanModels";
import {Button, Dropdown, Input} from "semantic-ui-react";
import {DropdownSearchOption} from "@src/models/commonModels";
import styles from "../../../../styles/App.module.scss";

interface NewStepBlockProps {
    initialData: NewPlanStep;
    availableStepTypes: PlanStepType[];
    saveStep: Function;
    deleteStep: Function;
}

const NewStepBlock = (props: NewStepBlockProps) => {
    const [newStepData, setNewStepData] = useState<NewPlanStep>(props.initialData);
    const [isSaveButtonActive, setIsSaveButtonActive] = useState<boolean>(false);

    const generateStepTypeSearchOptions = (): DropdownSearchOption[] => {
        return props.availableStepTypes.map((type, index) => {
            return {
                key: index,
                text: type.name,
                value: type.name
            }
        })
    };

    const generateStepSubtypeSearchOptions = (): DropdownSearchOption[] => {
        return getSubtypes().map((subtype, index) => {
            return {
                key: index,
                text: subtype,
                value: subtype
            }
        });
    };

    const getSubtypesTitle = () => {
        return props.availableStepTypes
            .filter(type => type.name === newStepData.type)
            .pop()?.subtypesTitle || "";
    }
    const getSubtypes = () => {
        return props.availableStepTypes
            .filter(type => type.name === newStepData.type)
            .pop()?.subtypes || [];
    }

    const stepFrequenciesSearchOptions: DropdownSearchOption[] = [
        {
            key: 1,
            text: PlanStepFrequency.PARTICULAR_DAY,
            value: PlanStepFrequency.PARTICULAR_DAY
        },
        {
            key: 2,
            text: PlanStepFrequency.ONCE_PER_PERIOD,
            value: PlanStepFrequency.ONCE_PER_PERIOD
        },
        {
            key: 3,
            text: PlanStepFrequency.N_TIMES_PER_PERIOD,
            value: PlanStepFrequency.N_TIMES_PER_PERIOD
        }
    ];

    const onDataChange = (data: any, dataFieldName: string) => {
        setNewStepData({
            ...newStepData,
            [dataFieldName]: data
        })

        const allRequiredDataFilled = newStepData.planId
            && newStepData.type
            && newStepData.frequency
            && newStepData.description
            && newStepData.stepPeriodStart;

        setIsSaveButtonActive(!!allRequiredDataFilled);
    };
    const onSaveClick = () => {
        setIsSaveButtonActive(false);
        props.saveStep(newStepData);
    }

    const renderDateChoose = () => {
        if (newStepData.frequency === PlanStepFrequency.ONCE_PER_PERIOD) {
            return (
                <>
                    <div className={styles.NewPlanStepInput}>
                        <div className={styles.NewPlanStepInputName}>
                            <span>Виберіть стартову дату періоду: </span>
                        </div>
                        <div className={styles.NewPlanStepInputOption}>
                            <Input
                                type="date"
                                input={newStepData.stepPeriodStart}
                                onChange={(e) => onDataChange(e.target.value, "stepPeriodStart")}
                            />
                        </div>
                    </div>
                    <div className={styles.NewPlanStepInput}>
                        <div className={styles.NewPlanStepInputName}>
                            <span>Виберіть кінцеву дату періоду: </span>
                        </div>
                        <div className={styles.NewPlanStepInputOption}>
                            <Input
                                type="date"
                                input={newStepData.stepPeriodEnd}
                                onChange={(e) => onDataChange(e.target.value, "stepPeriodEnd")}
                            />
                        </div>
                    </div>
                </>
            );
        }

        if (newStepData.frequency === PlanStepFrequency.N_TIMES_PER_PERIOD) {
            return (
                <>
                    <div className={styles.NewPlanStepInput}>
                        <div className={styles.NewPlanStepInputName}>
                            <span>Виберіть стартову дату періоду: </span>
                        </div>
                        <div className={styles.NewPlanStepInputOption}>
                            <Input
                                type="date"
                                input={newStepData.stepPeriodStart}
                                onChange={(e) => onDataChange(e.target.value, "stepPeriodStart")}
                            />
                        </div>
                    </div>
                    <div className={styles.NewPlanStepInput}>
                        <div className={styles.NewPlanStepInputName}>
                            <span>Виберіть кінцеву дату періоду: </span>
                        </div>
                        <div className={styles.NewPlanStepInputOption}>
                            <Input
                                type="date"
                                input={newStepData.stepPeriodEnd}
                                onChange={(e) => onDataChange(e.target.value, "stepPeriodEnd")}
                            />
                        </div>
                    </div>
                    <div className={styles.NewPlanStepInput}>
                        <div className={styles.NewPlanStepInputName}>
                            <span>Виберіть інтервал між повторами: </span>
                        </div>
                        <div className={styles.NewPlanStepInputOption}>
                            <Input
                                type="number"
                                input={newStepData.spaceBetweenRepeat}
                                onChange={(e) => onDataChange(e.target.value, "spaceBetweenRepeat")}
                            />
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <div className={styles.NewPlanStepInput}>
                    <div className={styles.NewPlanStepInputName}>
                        <span>Оберіть дату: </span>
                    </div>
                    <div className={styles.NewPlanStepInputOption}>
                        <Input
                            type="date"
                            input={newStepData.stepPeriodStart}
                            onChange={(e) => onDataChange(e.target.value, "stepPeriodStart")}
                        />
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className={styles.NewPlanStep}>
            <div className={styles.NewPlanStepInput}>
                <div className={styles.NewPlanStepInputName}>
                    <span>Оберіть тип: </span>
                </div>
                <div className={styles.NewPlanStepInputOption}>
                    <Dropdown
                        placeholder="Choose type"
                        fluid
                        search
                        selection
                        options={generateStepTypeSearchOptions()}
                        value={newStepData.type}
                        onChange={(e, data) => onDataChange(data.value, "type")}
                    />
                </div>
            </div>
            {getSubtypesTitle() && getSubtypes() && (
                <div className={styles.NewPlanStepInput}>
                    <div className={styles.NewPlanStepInputName}>
                        <span>{getSubtypesTitle()}:</span>
                    </div>
                    <div className={styles.NewPlanStepInputOption}>
                        <Dropdown
                            placeholder={getSubtypesTitle() || ""}
                            fluid
                            search
                            selection
                            options={generateStepSubtypeSearchOptions()}
                            value={newStepData.subtype}
                            onChange={(e, data) => onDataChange(data.value, "subtype")}
                        />
                    </div>
                </div>
            )}
            <div className={styles.NewPlanStepInput}>
                <div className={styles.NewPlanStepInputName}>
                    <span>Оберіть частоту: </span>
                </div>
                <div className={styles.NewPlanStepInputOption}>
                    <Dropdown
                        placeholder="Оберіть частоту"
                        fluid
                        search
                        selection
                        options={stepFrequenciesSearchOptions}
                        value={newStepData.frequency}
                        onChange={(e, data) => onDataChange(data.value, "frequency")}
                    />
                </div>
            </div>
            <div className={styles.NewPlanStepInput}>
                <div className={styles.NewPlanStepInputName}>
                    <span>Опис: </span>
                </div>
                <div className={styles.NewPlanStepInputOption}>
                    <Input
                        className={styles.TextInput}
                        type="text"
                        input={newStepData.description}
                        onChange={(e) => onDataChange(e.target.value, "description")}
                    />
                </div>
            </div>
            {renderDateChoose()}
            <Button
                disabled={!isSaveButtonActive}
                onClick={onSaveClick}
            >
                Зберегти
            </Button>
            <Button onClick={() => props.deleteStep(newStepData.id)}>Видалити</Button>
        </div>
    )
};

export default NewStepBlock;
