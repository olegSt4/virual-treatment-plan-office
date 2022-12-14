import React from "react";
import {MedicalCardData} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import InfoRow from "@src/components/common/rows/InfoRow";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";

interface ContactsBlockProps {
    data: MedicalCardData;
    lang?: string;
}

const ContactsBlock = (props: ContactsBlockProps) => {

    return (
        <div>
            <ColumnHeader title="Контакти" />
            <InfoRow title="Адреса" value={props.data.address}/>
            <InfoRow title={getTranslation(TranslationID.EMAIL, props.lang)} value={props.data.mail} />
            <InfoRow title={getTranslation(TranslationID.PHONE, props.lang)} value={props.data.phone} />
        </div>
    );
}

export default ContactsBlock;
