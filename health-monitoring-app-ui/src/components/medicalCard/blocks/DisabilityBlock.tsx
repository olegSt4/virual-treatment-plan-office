import React from "react";
import {Disability, DisabilityLevel} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import styles from "@src/styles/App.module.scss";

interface DisabilityBlockProps {
    data: Disability;
    lang?: string;
}

const DisabilityBlock = (props: DisabilityBlockProps) => {

    const renderDisabilitiesTable = () => {
        return Object.keys(DisabilityLevel).map(level => {
            const levelClassName = (!props.data && level === DisabilityLevel.NONE) || (props.data && level === props.data.level)
                ? `${styles.DisabilityLevel} ${styles.ChosenDisability}`
                : styles.DisabilityLevel;

            return (
                <div className={levelClassName}>
                    <span>{level}</span>
                </div>
            );
        });
    };

    return (
        <div>
            <ColumnHeader title="Інвалідність"/>
            <div className={styles.Disability}>
                {renderDisabilitiesTable()}
            </div>
            {props.data && props.data.name && (
                <div className={styles.DisabilityName}>
                    <span>Опис: </span>
                    <span className={styles.DisabilityDescription}>{props.data.name}</span>
                </div>
            )}
        </div>
    );
};

export default DisabilityBlock;
