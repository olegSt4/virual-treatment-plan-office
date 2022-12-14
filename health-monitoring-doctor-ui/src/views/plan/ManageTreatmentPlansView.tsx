import React, {useEffect, useState} from "react";
import {getAllAvailablePlansForDoctor, getAllTreatmentPlanStepTypes} from "@src/utils/externalCallUtils";
import AllPlansBaseData from "@src/components/treatmentPlan/manage/AllPlansBaseData";
import PlanDetailedData from "@src/components/treatmentPlan/manage/PlanDetailedData";
import {useParams} from "react-router-dom";
import {PlanStepType} from "@src/models/newTreatmentPlanModels";
import styles from "@src/styles/App.module.scss";
import {TreatmentPlan} from "@src/models/planManagementModels";

const ManageTreatmentPlansView = () => {
    const { id } = useParams();

    const [allAvailablePlans, setAllAvailablePlans] = useState<TreatmentPlan[]>([]);
    const [allPlanStepTypes, setAllPlanStepTypes] = useState<PlanStepType[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string>("");
    const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan>();

    useEffect(() => {
        getAllAvailablePlansForDoctor().then(plans => setAllAvailablePlans(plans));
        getAllTreatmentPlanStepTypes().then(types => setAllPlanStepTypes(types));

        if (id) {
            selectPlan(id);
        }
    }, []);

    const selectPlan = (planId: string) => {
        setSelectedPlanId(planId);
        setSelectedPlan(allAvailablePlans.filter(plan => plan.planId === planId).pop());
    };

    return (
        <>
            <div className={styles.ManageTreatmentsPlanViewContainer}>
                <AllPlansBaseData plans={allAvailablePlans} onPlanSelect={selectPlan} />
                <PlanDetailedData
                    selectedPlanId={selectedPlanId}
                    selectedPlan={selectedPlan}
                    planStepTypes={allPlanStepTypes}
                />
            </div>
        </>
    )
};

export default ManageTreatmentPlansView;
