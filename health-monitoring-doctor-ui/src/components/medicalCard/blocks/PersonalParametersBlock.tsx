import React, {useState} from "react";
import {MedicalCardData} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import InfoRow from "@src/components/common/rows/InfoRow";
import styles from "@src/styles/App.module.scss";
import {Button} from "semantic-ui-react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";

interface PersonalParametersBlockProps {
    data: MedicalCardData;
    lang?: string;
}

const PersonalParametersBlock = (props: PersonalParametersBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const renderContent = () => {
        return (
            <>
                <InfoRow title={"Група крові"} value={props.data.bloodGroup}/>
            </>
        );
    };

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title="Персональні показники"/>
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    );
}

export default PersonalParametersBlock;
