import React from "react";
import {MedicalCardData} from "@src/models/emcModels";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import PageHeader from "@src/components/common/headers/PageHeader";
import InfoRow from "@src/components/common/rows/InfoRow";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import LastActionsBlock from "@src/components/medicalCard/blocks/LastActionsBlock";
import CurrentPlansBlock from "@src/components/medicalCard/blocks/CurrentPlansBlock";
import styles from "../../styles/App.module.scss";
import BiSeparatedRow from "@src/components/common/rows/BiSeparatedRow";
import {FiAlertTriangle} from "react-icons/fi";
import GeneralInfoBlock from "@src/components/medicalCard/blocks/GeneralInfoBlock";
import ContactsBlock from "@src/components/medicalCard/blocks/ContactsBlock";
import PersonalParametersBlock from "@src/components/medicalCard/blocks/PersonalParametersBlock";
import FlourographyBlock from "@src/components/medicalCard/blocks/FlourographyBlock";
import VaccinationsBlock from "@src/components/medicalCard/blocks/VaccinationsBlock";
import DisabilityBlock from "@src/components/medicalCard/blocks/DisabilityBlock";
import PatientSpecificsBlock from "@src/components/medicalCard/blocks/PatientSpecificsBlock";

export interface MedicalCardDataProps {
    cardId: string | undefined,
    data: MedicalCardData | undefined;
    lang?: string;
}

const MedicalCard = (props: MedicalCardDataProps) => {
    const data: MedicalCardData | undefined = props.data;
    const lang = props.lang;
    const pageTitle = data && `${getTranslation(TranslationID.MEDICAL_CARD_HEADER, lang)} #${data.id}`

    const renderNoDataMessage = () => {
        return (
            <h1>{`${getTranslation(TranslationID.NO_CARD_DATA)} #${props.cardId}`}</h1>
        );
    };

    return data ? (
        <div>
            <PageHeader title={pageTitle}/>
            <div className={styles.PatientCardContainer}>
                <div className={styles.PatientCardHalf}>
                    <GeneralInfoBlock data={data} lang={lang}/>
                    <LastActionsBlock lastActions={data.lastActions} lang={lang}/>
                    <CurrentPlansBlock plans={data.currentPlans} lang={lang}/>
                </div>
                <div className={styles.PatientCardHalf}>
                    <ContactsBlock data={data} lang={lang}/>
                    <PersonalParametersBlock data={data} lang={lang} />
                    <FlourographyBlock data={data.fluorography} lang={lang} />
                    <VaccinationsBlock vaccinationsList={data.vaccinations} lang={lang} />
                    <DisabilityBlock data={data.disability} lang={lang} />
                    <PatientSpecificsBlock specificsList={data.specifics} lang={lang} />
                </div>
            </div>
        </div>
    ) : renderNoDataMessage();
};

export default MedicalCard;
