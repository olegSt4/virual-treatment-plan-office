import React from "react";
import {ProcedureResult} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import InfoRow from "@src/components/common/rows/InfoRow";
import styles from "../../../styles/App.module.scss";

interface FlourographyBlock {
    data: ProcedureResult;
    lang?: string;
}

const FlourographyBlock = (props: FlourographyBlock) => {
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

    return (
        <div>
            <ColumnHeader title="Флюрографія"/>
            {props.data ? renderFlourographyData() : renderNoFlourographyDataHint()}
        </div>
    );
};

export default FlourographyBlock;
