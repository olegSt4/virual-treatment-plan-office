import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PageHeader from "@src/components/common/headers/PageHeader";
import {TreatmentPlan} from "@src/models/planManagementModels";
import {getPatientPersonalTreatmentPlan} from "@src/utils/externalCallUtils";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import PlanBaseData from "@src/components/treatmentPlan/manage/doctor/PlanBaseData";
import PlanFailedSteps from "@src/components/treatmentPlan/manage/doctor/PlanFailedSteps";
import PlanStepsPatient from "@src/components/treatmentPlan/manage/patient/PlanStepsPatient";
import styles from "../../styles/App.module.scss";

const PatientTreatmentPlanView = () => {
    const { id } = useParams();

    const [patientPlan, setPatientPlan] = useState<TreatmentPlan>();

    useEffect(() => {
        if (id) {
            getPatientPersonalTreatmentPlan(id).then(plan => setPatientPlan(plan));
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
                    <PlanStepsPatient planId={id || ""} steps={patientPlan.steps} />
                </div>
            </div>
        </>
    ) : null;
};

export default PatientTreatmentPlanView;
