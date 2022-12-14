import React from "react";
import {NewPlanStep, PlanStepType} from "@src/models/newTreatmentPlanModels";
import NewStepBlock from "@src/components/treatmentPlan/new/blocks/NewStepBlock";
import styles from "@src/styles/App.module.scss"
import {Button} from "semantic-ui-react";
import {addNewTreatmentPlanStep} from "@src/utils/externalCallUtils";

interface AddNewPlanStepModalProps {
    planId: string;
    availableStepTypes: PlanStepType[];
    onCloseModal: Function;
}

const AddNewPlanStepModal = (props: AddNewPlanStepModalProps) => {
    const initialStepData = {
        id: 1,
        planId: props.planId,
        type: "",
        frequency: "",
        description: "",
        stepPeriodStart: "",
        stepPeriodEnd: ""
    };

    const onSaveClick = (stepToSave: NewPlanStep) => {
        addNewTreatmentPlanStep(stepToSave);
        props.onCloseModal();
    };

    const onCloseClick = () => {
        props.onCloseModal();
    }

    return (
        <div className={styles.ModalContainer}>
            <div className={styles.Modal}>
                <Button onClick={onCloseClick}>Х</Button>
                <NewStepBlock
                    initialData={initialStepData}
                    availableStepTypes={props.availableStepTypes}
                    saveStep={onSaveClick}
                    deleteStep={ (id:string) => props.onCloseModal() }
                />
            </div>
        </div>
    );
};

export default AddNewPlanStepModal;
