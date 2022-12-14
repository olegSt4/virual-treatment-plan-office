import React, {useState} from "react";
import {MedicalCardData} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import InfoRow from "@src/components/common/rows/InfoRow";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import styles from "@src/styles/App.module.scss";
import {Button} from "semantic-ui-react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {fetchJSON, Method} from "@src/utils/fetchUtils";

interface ContactsBlockProps {
    data: MedicalCardData;
    lang?: string;
}

const ContactsBlock = (props: ContactsBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const sentMockRequest = () => {
        const dummyObj = {
            generalInfoBlockExpanded: false,
            lastActivitiesBlockExpanded: true,
            currentPlansBlockExpanded: true,
            patientSpecificsBlockExpanded: true,
            contactsBlockExpanded: false,
            personalMetricsBlockExpanded: true,
            flourograhpyBlockExpanded: false,
            vaccinationsBlockExpanded: true,
            disabilityBlockExpanded: true
        }

        fetchJSON("https://localhost:8080/not-existing", Method.PUT, {body: JSON.stringify(dummyObj)});
    }

    const changeAddressButton = (
        <div>
            <span>{props.data.address}</span>
            <Button onClick={sentMockRequest} className={styles.AddressButton}>Оновити</Button>
        </div>
    );

    const renderContent = () => {
        return (
            <>
                <InfoRow title="Адреса" value={changeAddressButton}/>
                <InfoRow title={getTranslation(TranslationID.EMAIL, props.lang)} value={props.data.mail}/>
                <InfoRow title={getTranslation(TranslationID.PHONE, props.lang)} value={props.data.phone}/>
            </>
        );
    };

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title="Контакти" />
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    );
}

export default ContactsBlock;
