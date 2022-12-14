import React from "react";
import {CurrentPlanBaseInfo} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import {getPatientTreatmentPlanForDoctor} from "@src/utils/urlUtils";
import styles from "../../../styles/App.module.scss";

interface CurrentPlansBlockProps {
    lang?: string;
    plans: CurrentPlanBaseInfo[]
}

const CurrentPlansBlock = (props: CurrentPlansBlockProps) => {

    const noActivePlans = !props.plans || props.plans.length < 1;

    const noActivePlansText = (
        <div className={styles.NoActivePlans}>
            <span>{getTranslation(TranslationID.NO_ACTIVE_PLANS, props.lang)}</span>
        </div>
    );

    const activePlans = !noActivePlans && props.plans.map(plan => {
        if (plan.isAvailableToSee) {
            return (
                <div className={styles.AvailablePlan}>
                    <a href={getPatientTreatmentPlanForDoctor(plan.planId)}>{plan.planName}</a>
                </div>
            )
        } else {
            return (
                <div className={styles.NonAvailablePlan}>
                    <span>{plan.planName}</span>
                </div>
            )
        }
    })

    return (
        <div className={styles.PatientCardCurrentPlans}>
            <ColumnHeader title={getTranslation(TranslationID.CURRENT_PLANS_HEADER, props.lang)} />
            {noActivePlans && noActivePlansText}
            {!noActivePlans && activePlans}
        </div>
    )
}

export default CurrentPlansBlock;
