import React from "react";
import {MedicalCardData} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import InfoRow from "@src/components/common/rows/InfoRow";

interface GeneralInfoBlockProps {
    data: MedicalCardData;
    lang?: string;
}

const GeneralInfoBlock = (props: GeneralInfoBlockProps) => {

    return (
        <div>
            <ColumnHeader title={getTranslation(TranslationID.GENERAL_INFO_HEADER, props.lang)}/>
            <InfoRow title={getTranslation(TranslationID.SURNAME, props.lang)} value={props.data.surname} />
            <InfoRow title={getTranslation(TranslationID.NAME, props.lang)} value={props.data.name}/>
            <InfoRow title={getTranslation(TranslationID.PATRONYMIC, props.lang)} value={props.data.middleName} />
            <InfoRow title={getTranslation(TranslationID.SEX, props.lang)} value={props.data.sex} />
            <InfoRow title="Дата народження" value={props.data.dateOfBirth} />
            <InfoRow title={getTranslation(TranslationID.AGE, props.lang)} value={props.data.age} />
        </div>
    );
}

export default GeneralInfoBlock;
