import React from "react";
import InfoRow from "@src/components/common/rows/InfoRow";
import {TreatmentPlan} from "@src/models/planManagementModels";
import styles from "@src//styles/App.module.scss";

interface PlanBaseDataProps {
    selectedPlan?: TreatmentPlan;
}

const PlanBaseData = (props: PlanBaseDataProps) => {

    return (
        <>
            {props.selectedPlan && (
                <div className={styles.GeneralData}>
                    <InfoRow title="Назва плану" value={props.selectedPlan.name} />
                    <InfoRow title="Категорія" value={props.selectedPlan.category} />
                    <InfoRow title="Дата початку" value={props.selectedPlan.startDate} />
                    <InfoRow title="Дата закінчення" value={props.selectedPlan.endDate} />
                </div>
            )}
        </>
    )
};

export default PlanBaseData;
