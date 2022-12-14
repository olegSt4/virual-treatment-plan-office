import React, {useState} from "react";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import {PatientAction} from "@src/models/emcModels";
import BiSeparatedRow from "@src/components/common/rows/BiSeparatedRow";
import styles from "@src/styles/App.module.scss";
import {Button} from "semantic-ui-react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";

interface LastActionBlockProps {
    lang?: string;
    lastActions: PatientAction[];
}

const LastActionsBlock = (props: LastActionBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const renderContent = () => {
        return (
            <>
                <BiSeparatedRow
                    isHeader={true}
                    leftValue={getTranslation(TranslationID.ACTIVITY_DESCRIPTION, props.lang)}
                    rightValue={getTranslation(TranslationID.ACTIVITY_DATE, props.lang)}
                />
                {props.lastActions.map(a => <BiSeparatedRow leftValue={a.actionName} rightValue={a.actionDate}/>)}
            </>
        );
    };

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title={getTranslation(TranslationID.LAST_ACTIVITIES_HEADER, props.lang)} />
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    )
}

export default LastActionsBlock;