import React, {useState} from "react";
import {Disability, DisabilityLevel} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import styles from "@src/styles/App.module.scss";
import {Button} from "semantic-ui-react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";

interface DisabilityBlockProps {
    data: Disability;
    lang?: string;
}

const DisabilityBlock = (props: DisabilityBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

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

    const renderDisabilityDescription = () => {
        if (props.data && props.data.name) {
            return (
                <div className={styles.DisabilityName}>
                    <span>Опис: </span>
                    <span className={styles.DisabilityDescription}>{props.data.name}</span>
                </div>
            );
        }

        return (
            <div className={styles.DisabilityName}>
                <span>У даного пацієнта немає групи інвалідності</span>
            </div>
        );
    }

    const renderContent = () => {
        return (
            <div className={styles.Disability}>
                <div className={styles.DisabilityText}>
                    {renderDisabilityDescription()}
                </div>
                <div className={styles.DisabilityTable}>
                    {renderDisabilitiesTable()}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title="Інвалідність"/>
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    );
};

export default DisabilityBlock;
