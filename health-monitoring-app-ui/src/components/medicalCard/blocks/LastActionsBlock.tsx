import React from "react";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import {PatientAction} from "@src/models/emcModels";
import BiSeparatedRow from "@src/components/common/rows/BiSeparatedRow";

interface LastActionBlockProps {
    lang?: string;
    lastActions: PatientAction[];
}

const LastActionsBlock = (props: LastActionBlockProps) => {

    return (
        <div>
            <ColumnHeader title={getTranslation(TranslationID.LAST_ACTIVITIES_HEADER, props.lang)} />
            <BiSeparatedRow
                isHeader={true}
                leftValue={getTranslation(TranslationID.ACTIVITY_DESCRIPTION, props.lang)}
                rightValue={getTranslation(TranslationID.ACTIVITY_DATE, props.lang)}
            />
            {props.lastActions.map(a => <BiSeparatedRow leftValue={a.actionName} rightValue={a.actionDate} />)}
        </div>
    )
}

export default LastActionsBlock;