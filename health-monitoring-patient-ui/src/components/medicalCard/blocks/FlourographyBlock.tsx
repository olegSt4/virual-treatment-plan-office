import React, {useState} from "react";
import {ProcedureResult} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import InfoRow from "@src/components/common/rows/InfoRow";
import styles from "@src/styles/App.module.scss";
import {Button} from "semantic-ui-react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";

interface FlourographyBlock {
    data: ProcedureResult;
    lang?: string;
}

const FlourographyBlock = (props: FlourographyBlock) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const renderFlourographyData = () => {
        return (
            <>
                <InfoRow title="Дата" value={props.data.date}/>
                <InfoRow title="Заключення" value={props.data.result}/>
            </>
        );
    };

    const renderNoFlourographyDataHint = () => {
        return (
            <div className={styles.Flourography}>
                <span className={styles.NoFlourographyData}>Немає даних про флюрографію</span>
            </div>
        );
    };

    const renderContent = () => {
        return (
            <>
                {props.data ? renderFlourographyData() : renderNoFlourographyDataHint()}
            </>
        );
    };

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title="Флюрографія"/>
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    );
};

export default FlourographyBlock;
