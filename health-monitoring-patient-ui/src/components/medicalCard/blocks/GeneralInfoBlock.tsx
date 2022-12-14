import React, {useState} from "react";
import {MedicalCardData} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import InfoRow from "@src/components/common/rows/InfoRow";
import {MdExpandLess, MdExpandMore} from "react-icons/md";
import {Button} from "semantic-ui-react";
import styles from "@src/styles/App.module.scss";

interface GeneralInfoBlockProps {
    data: MedicalCardData;
    lang?: string;
}

const GeneralInfoBlock = (props: GeneralInfoBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const getPatientSexBlock = () => {
        if (props.data.sex) {
            const className = props.data.sex === 'MALE' ? styles.Male : styles.Female;

            return (
                <div className={className}>
                    <span>{props.data.sex}</span>
                </div>
            );
        }

        return null;
    };

    const getPatientMarks = () => {
        return (
            <div className={styles.CategoriesList}>
                <div className={styles.Category}>
                    <span>Учасник ліквідації аварії на ЧАЕС</span>
                </div>
                <div className={styles.Category}>
                    <span>Житель пригірських районів</span>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        return (
            <>
                <InfoRow title={getTranslation(TranslationID.SURNAME, props.lang)} value={props.data.surname}/>
                <InfoRow title={getTranslation(TranslationID.NAME, props.lang)} value={props.data.name}/>
                <InfoRow title={getTranslation(TranslationID.PATRONYMIC, props.lang)} value={props.data.middleName}/>
                <InfoRow title={getTranslation(TranslationID.SEX, props.lang)} value={getPatientSexBlock() || ""}/>
                <InfoRow title="Дата народження" value={props.data.dateOfBirth}/>
                <InfoRow title={getTranslation(TranslationID.AGE, props.lang)} value={props.data.age}/>
                <InfoRow title={"Додаткові категорії"} value={getPatientMarks()} />
            </>
        );
    };

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title={getTranslation(TranslationID.GENERAL_INFO_HEADER, props.lang)}/>
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    );
}

export default GeneralInfoBlock;
