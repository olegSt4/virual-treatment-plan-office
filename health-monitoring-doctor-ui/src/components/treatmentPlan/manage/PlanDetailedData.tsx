import React, {useState} from "react";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import PlanBaseData from "@src/components/treatmentPlan/manage/PlanBaseData";
import PlanStepsDoctor from "@src/components/treatmentPlan/manage/PlanStepsDoctor";
import PlanFailedSteps from "@src/components/treatmentPlan/manage/PlanFailedSteps";
import {PlanStepType} from "@src/models/newTreatmentPlanModels";
import styles from "../../../styles/App.module.scss";
import {TreatmentPlan} from "@src/models/planManagementModels";
import {Button} from "semantic-ui-react";
import CompletePlanModal from "@src/components/treatmentPlan/manage/modal/CompletePlanModal";

interface PlanDetailedDataProps {
    planStepTypes: PlanStepType[];

    selectedPlanId: string;
    selectedPlan?: TreatmentPlan;
}

const PlanDetailedData = (props: PlanDetailedDataProps) => {
    const [showCompletePlanModal, setShowCompletePlanModal] = useState<boolean>(false);

    const renderHint = (hintMessage: string) => {
        return (
            <div className={styles.Hint}>
                <span>{hintMessage}</span>
            </div>
        );
    };

    const getPlanFailedSteps = () => {
        return (props.selectedPlan?.steps || []).filter(step => step.isFailed);
    };

    return (
        <div className={styles.PlanDetailedData}>
            {!props.selectedPlanId && !props.selectedPlan && renderHint("Виберіть план зі списку")}
            {props.selectedPlanId && !props.selectedPlan && renderHint(`Не знайдено планів лікування із id [${props.selectedPlanId}]`)}
            {props.selectedPlanId && props.selectedPlan && (
                <>
                    <ColumnHeader
                        title={`План лікування #${props.selectedPlan?.planId} пацієнта ${props.selectedPlan?.patientFullName}`}
                    />
                    <div className={styles.PlanDataContainer}>
                        <div className={styles.Left}>
                            <ColumnHeader title={"Загальна інформація"} />
                            <PlanBaseData selectedPlan={props.selectedPlan} />
                            <PlanFailedSteps failedSteps={getPlanFailedSteps()} />
                        </div>
                        <div className={styles.Right}>
                            <ColumnHeader title={"Кроки лікування"}/>
                            <PlanStepsDoctor
                                planStepTypes={props.planStepTypes}
                                planId={props.selectedPlanId} steps={props.selectedPlan?.steps || []}
                            />
                        </div>
                    </div>
                    <div className={styles.CompletePlanButton}>
                        <Button onClick={() => setShowCompletePlanModal(true)} className={styles.Button}>
                            Завершити план!
                        </Button>
                    </div>
                    {showCompletePlanModal &&
                        <CompletePlanModal planId={props.selectedPlanId || ""} onClose={() => setShowCompletePlanModal(false)}/>}
                </>
            )}
        </div>
    );
};

export default PlanDetailedData;
