import React from "react";
import PageHeader from "@src/components/common/headers/PageHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import NewPlanInputs from "@src/components/treatmentPlan/new/NewPlanInputs";

const CreateTreatmentPlanView = () => {
    const lang = "ua";

    return (
        <>
            <PageHeader title={getTranslation(TranslationID.CREATE_TREATMENT_PLAN_HEADER, lang)} />
            <NewPlanInputs lang={lang} />
        </>
    )
};

export default CreateTreatmentPlanView;
