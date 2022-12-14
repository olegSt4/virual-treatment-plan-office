import React, {useState} from "react";
import {PlanStep, PlanStepInput} from "@src/models/planManagementModels";
import CompleteStepModal from "@src/components/treatmentPlan/manage/patient/CompleteStepModal";
import styles from "@src/styles/App.module.scss";

interface PlanStepsPatientProps {
    planId: string;
    steps: PlanStep[];
}

const PlanStepsPatient = (props: PlanStepsPatientProps) => {
    const [showStepCompleteModal, setShowStepCompleteModal] = useState<boolean>(false);
    const [modalStep, setModalStep] = useState<PlanStep>();

    const openStepFillingModal = (step: PlanStep) => {
        setModalStep(step);
        setShowStepCompleteModal(true);
    };

    const closeModal = () => {
      setShowStepCompleteModal(false);
    };

    const renderStepInputs = (inputs: PlanStepInput[]) => {
        return inputs.map(input => {
            return (
                <div className={styles.NewPlanStepInput}>
                    <span>{input.name}: </span>
                    <div>
                        <span>{input.inputValue}</span>
                        {input.inputUnit && <span>{input.inputUnit}</span>}
                    </div>
                </div>
            )
        });
    };

    const renderFinishedSteps = () => {
        return props.steps.filter(step => step.isFinished).map(step => {
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
        })};

    const renderActiveSteps = () => {
        return props.steps.filter(step => step.isActive && !step.isFinished).map(step => {
            const stepTime = step.endPeriod
                ? `(${step.startPeriod} - ${step.endPeriod})`
                : `(${step.startPeriod})`;

            return (
                <div onClick={() => openStepFillingModal(step)} className={styles.Step}>
                    <div>
                        <span className={styles.StepName}>{step.description}</span>
                        <span className={styles.StepDate}>{stepTime}</span>
                    </div>
                </div>
            );
        });
    };

    const renderInActiveSteps = () => {
        return props.steps.filter(step => !step.isActive && !step.isFinished && !step.isFailed).map(step => {
            const stepTime = step.endPeriod
                ? `(${step.startPeriod} - ${step.endPeriod})`
                : `(${step.startPeriod})`;
            const className = `${styles.Step}  ${styles.InactiveStep}`;

            return (
                <div className={className}>
                    <div>
                        <span className={styles.StepName}>{step.description}</span>
                        <span className={styles.StepDate}>{stepTime}</span>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className={styles.CurrentSteps}>
            {renderFinishedSteps()}
            {renderActiveSteps()}
            {renderInActiveSteps()}
            {showStepCompleteModal && modalStep &&
                <CompleteStepModal planId={props.planId} stepToComplete={modalStep} onModalClose={closeModal} />
            }
        </div>
    );
};

export default PlanStepsPatient;
