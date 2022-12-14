import React, {useState} from "react";
import {CurrentPlanBaseInfo} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import {getPatientTreatmentPlan} from "@src/utils/urlUtils";
import styles from "../../../styles/App.module.scss";
import {BiLinkExternal} from "react-icons/bi";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {Button} from "semantic-ui-react";

interface CurrentPlansBlockProps {
    lang?: string;
    plans: CurrentPlanBaseInfo[]
}

const CurrentPlansBlock = (props: CurrentPlansBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const noActivePlans = !props.plans || props.plans.length < 1;

    const noActivePlansText = (
        <div className={styles.NoActivePlans}>
            <span>{getTranslation(TranslationID.NO_ACTIVE_PLANS, props.lang)}</span>
        </div>
    );

    const activePlans = props.plans.map(plan => {
        if (plan.isAvailableToSee) {
            return (
                <div className={styles.AvailablePlan}>
                    <a href={getPatientTreatmentPlan(plan.planId)}>{plan.planName}</a>
                    <BiLinkExternal />
                </div>
            )
        } else {
            return (
                <div className={styles.NonAvailablePlan}>
                    <span>{plan.planName}</span>
                </div>
            )
        }
    });

    const renderContent = () => {
        return (
            <>
                {noActivePlans ? noActivePlansText : activePlans}
            </>
        )
    }

    return (
        <div className={`${styles.PatientCardCurrentPlans} ${styles.CardBlock}`}>
            <ColumnHeader title={getTranslation(TranslationID.CURRENT_PLANS_HEADER, props.lang)} />
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    )
}

export default CurrentPlansBlock;