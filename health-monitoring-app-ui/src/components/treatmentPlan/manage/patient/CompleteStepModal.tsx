import React, {useEffect, useState} from "react";
import {CompletedStep, FilledInput, PlanStep, PlanStepInputType} from "@src/models/planManagementModels";
import {Button, Dropdown} from "semantic-ui-react";
import {DropdownSearchOption} from "@src/models/commonModels";
import styles from "../../../../styles/App.module.scss";
import {completePlanStep} from "@src/utils/externalCallUtils";

interface CompleteStepModalProps {
    planId: string;
    stepToComplete: PlanStep;
    onModalClose: Function;
}

const CompleteStepModal = (props: CompleteStepModalProps) => {
    const [commentText, setCommentText] = useState<string>("");
    const [inputsValues, setInputsValues] = useState<FilledInput[]>([]);


    useEffect(() => {
        if (props.stepToComplete.inputs && props.stepToComplete.inputs.length > 0) {
            setInputsValues(props.stepToComplete.inputs.map(input => {
                return {
                    name: input.name,
                    type: input.type,
                    value: ""
                };
            }))
        }
    }, []);

    const completeStep = () => {
        const stepToComplete: CompletedStep = {
            stepId: props.stepToComplete.id,
            comment: commentText,
            inputs: inputsValues
        };

        completePlanStep(props.planId, stepToComplete);
        props.onModalClose();
    };

    const isSaveButtonEnabled = () => {
        const isCommentRequired = props.stepToComplete.type === "CONSULTATION";
        const allValuesSet = (inputsValues && inputsValues.length > 0)
            ? inputsValues.map(val => val.value).reduce((prev, cur) => prev && cur)
            : true;

        return isCommentRequired ? commentText && allValuesSet : allValuesSet;
    };

    const getInputOptionsForDropdown = (options: string[]): DropdownSearchOption[] => {
        return options.map((option, index) => {
            return {
                key: index,
                text: option,
                value: option
            };
        });
    };

    const findCorrespondingValueHolder = (inputName: string): any => {
        return inputsValues.filter(val => val.name === inputName).pop();
    };

    const setValue = (inputName: string, data: any) => {
        setInputsValues(inputsValues.map(val => {
            if (val.name === inputName) {
                val.value = data;
            }

            return val;
        }));
    }

    const renderStepInputs = () => {
        if (props.stepToComplete.inputs) {
            return props.stepToComplete.inputs.map(input => {
                if (input.type === PlanStepInputType.NUMBER) {
                    return (
                        <div className={styles.StepInput}>
                            <span className={styles.StepInputName}>{input.name}</span>
                            <div>
                                <input
                                    type="text"
                                    value={findCorrespondingValueHolder(input.name)?.value}
                                    onChange={e => setValue(input.name, e.target.value)}
                                />
                                {input.inputUnit && <span>{input.inputUnit}</span>}
                            </div>

                        </div>
                    );
                } else {
                    return (
                        <div className={styles.StepInput}>
                            <span className={styles.StepInputName}>{input.name}</span>
                            <Dropdown
                                className={styles.DropDown}
                                placeholder={`Виберіть "${input.name}"`}
                                fluid
                                search
                                selection
                                options={getInputOptionsForDropdown(input.options || [])}
                                onChange={(e, data) => setValue(input.name, data.value)}
                                value={findCorrespondingValueHolder(input.name)?.value}
                            />
                        </div>
                    );
                }
            });
        } else {
            return null;
        }
    };

    return (
        <div className={styles.ModalContainer}>
            <div className={styles.Modal}>
                <Button onClick={() => props.onModalClose()}>X</Button>
                <div>
                    <span className={styles.StepHeader}>{props.stepToComplete.description}</span>
                    <div className={styles.Comment}>
                        <span className={styles.Hint}>Додайте коментар: </span>
                        <input
                            className={styles.Input}
                            placeholder="Запишіть будь-які зауваження, результати, рекомендації"
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                        />
                    </div>
                    <div>
                        {renderStepInputs()}
                    </div>
                    <Button
                        disabled={!isSaveButtonEnabled()}
                        onClick={completeStep}>Позначити виконаним!</Button>
                </div>
            </div>
        </div>
    );
};

export default CompleteStepModal;
