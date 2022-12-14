import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PageHeader from "@src/components/common/headers/PageHeader";
import {TreatmentPlan} from "@src/models/planManagementModels";
import {getPersonalTreatmentPlan} from "@src/utils/externalCallUtils";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import PlanSteps from "@src/components/treatmentPlan/PlanSteps";
import styles from "../../styles/App.module.scss";
import PlanBaseData from "@src/components/treatmentPlan/PlanBaseData";
import PlanFailedSteps from "@src/components/treatmentPlan/PlanFailedSteps";

const TreatmentPlanView = () => {
    const { id } = useParams();

    const [patientPlan, setPatientPlan] = useState<TreatmentPlan>();

    useEffect(() => {
        if (id) {
            getPersonalTreatmentPlan(id).then(plan => setPatientPlan(plan));
        }
    }, []);

    const getPlanFailedSteps = () => {
        return (patientPlan?.steps || []).filter(step => step.isFailed);
    };

    return patientPlan ? (
        <>
            <PageHeader title={`"${patientPlan.name}"`} />
            <div className={styles.PatientTreatmentPlanViewContainer}>
                <div className={styles.Left}>
                    <ColumnHeader title={"Загальна інформація"} />
                    <PlanBaseData selectedPlan={patientPlan} />
                    <PlanFailedSteps failedSteps={getPlanFailedSteps()} />
                </div>
                <div className={styles.Right}>
                    <ColumnHeader title={"Кроки лікування"} />
                    <PlanSteps planId={id || ""} steps={patientPlan.steps} />
                </div>
            </div>
        </>
    ) : null;
};

export default TreatmentPlanView;
