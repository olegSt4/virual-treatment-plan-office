import React from "react";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import {PlanStep} from "@src/models/planManagementModels";
import styles from "../../../styles/App.module.scss";

interface PlanFailedStepsProps {
    failedSteps: PlanStep[];
}

const PlanFailedSteps = (props: PlanFailedStepsProps) => {
    const renderFailedSteps = () => {
        return props.failedSteps.map(failedStep => {
            const stepTime = failedStep.endPeriod
                ? `(${failedStep.startPeriod} - ${failedStep.endPeriod})`
                : `(${failedStep.startPeriod})`;

            return (
                <div className={styles.FailedStep}>
                    <span className={styles.FailedStepName}>{failedStep.description}</span>
                    <span className={styles.FailedStepDate}>{stepTime}</span>
                </div>
            )
        });
    }

    return (
        <div className={styles.FailedStepsList}>
            <ColumnHeader title="Невиконані кроки лікування" />
            {props.failedSteps.length > 0 && renderFailedSteps()}
            {props.failedSteps.length < 1 && <span className={styles.NoFailedSteps}>No failed steps!</span>}
        </div>
    );
};

export default PlanFailedSteps;
