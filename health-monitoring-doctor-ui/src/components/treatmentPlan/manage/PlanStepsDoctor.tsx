import React, {useState} from "react";
import {Button} from "semantic-ui-react";
import AddNewPlanStepModal from "@src/components/treatmentPlan/manage/modal/AddNewPlanStepModal";
import {PlanStepType} from "@src/models/newTreatmentPlanModels";
import styles from "../../../styles/App.module.scss";
import {PlanStep, PlanStepInput} from "@src/models/planManagementModels";
import {deleteTreatmentPlanStepById} from "@src/utils/externalCallUtils";

interface PlanStepsProps {
    planId: string;
    steps: PlanStep[];
    planStepTypes: PlanStepType[];
}

const PlanStepsDoctor = (props: PlanStepsProps) => {
    const [showAddNewStepModal, setShowAddNewStepModal] = useState<boolean>(false);
    const [steps, setSteps] = useState<PlanStep[]>(props.steps);

    const removeStep = (stepId: string) => {
        deleteTreatmentPlanStepById(stepId)
            .then(deletedStep => {
                setSteps(steps.filter(step => step.id !== stepId));
            })
            .catch(err => {
                console.log(`Cannot delete step with id ${stepId}`);
                console.log(err);
            })
    };

    const onCloseModal = () => {
      setShowAddNewStepModal(false);
    };

    const renderStepInputs = (inputs: PlanStepInput[]) => {
        return inputs.map(input => {
            return (
                <div className={styles.StepInput}>
                    <span className={styles.StepInputName}>{input.name}: </span>
                    <div>
                        <span>{input.inputValue}</span>
                        {input.inputUnit && <span>{input.inputUnit}</span>}
                    </div>
                </div>
            );
        });
    };

    const renderFinishedSteps = () => {
        return steps.filter(step => step.isFinished).map(step => {
            const stepTime = step.endPeriod
                ? `(${step.startPeriod} - ${step.endPeriod})`
                : `(${step.startPeriod})`;
            const className = `${styles.Step} ${styles.FinishedStep}`;

           return (
               <div className={className}>
                   <div>
                       <span className={styles.StepName}>{step.description}</span>
                       <span className={styles.StepDate}>{stepTime}</span>
                   </div>
                   {step.comment && (
                       <div className={styles.StepComment}>
                           <span className={styles.StepCommentTitle}>Comment:</span>
                           <span className={styles.StepCommentValue}>{step.comment}</span>
                       </div>
                   )}
                   {step.inputs && renderStepInputs(step.inputs)}
               </div>
           )
        });
    };

    const renderActiveSteps = () => {
        return steps.filter(step => step.isActive && !step.isFinished).map(step => {
            const stepTime = step.endPeriod
                ? `(${step.startPeriod} - ${step.endPeriod})`
                : `(${step.startPeriod})`;
            const className = `${styles.Step} ${styles.StepWithButton}`;

            return (
                <div className={className}>
                    <div>
                        <span className={styles.StepName}>{step.description}</span>
                        <span className={styles.StepDate}>{stepTime}</span>
                    </div>
                    <Button onClick={() => removeStep(step.id)}>Видалити крок лікування</Button>
                </div>
            );
        });
    };

    const renderInActiveSteps = () => {
        return steps.filter(step => !step.isActive && !step.isFinished && !step.isFailed).map(step => {
            const stepTime = step.endPeriod
                ? `(${step.startPeriod} - ${step.endPeriod})`
                : `(${step.startPeriod})`;
            const className = `${styles.Step}  ${styles.InactiveStep} ${styles.StepWithButton}`;

            return (
                <div className={className}>
                    <div>
                        <span className={styles.StepName}>{step.description}</span>
                        <span className={styles.StepDate}>{stepTime}</span>
                    </div>
                    <Button onClick={() => removeStep(step.id)}>Видалити крок лікування</Button>
                </div>
            );
        });
    };

    return (
        <div className={styles.CurrentSteps}>
            {renderFinishedSteps()}
            {renderActiveSteps()}
            {renderInActiveSteps()}
            <div>
                <Button onClick={() => setShowAddNewStepModal(true)}>Додати новий крок +</Button>
            </div>
            {showAddNewStepModal && <AddNewPlanStepModal
                planId={props.planId}
                availableStepTypes={props.planStepTypes}
                onCloseModal={onCloseModal}
            />}
        </div>
    );
};

export default PlanStepsDoctor;
