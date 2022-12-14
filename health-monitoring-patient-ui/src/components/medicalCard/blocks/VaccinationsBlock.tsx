import React, {useState} from "react";
import {ProcedureResult} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import BiSeparatedRow from "@src/components/common/rows/BiSeparatedRow";
import styles from "@src/styles/App.module.scss";
import {Button} from "semantic-ui-react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";

interface VaccinationsBlockProps {
    vaccinationsList: ProcedureResult[];
    lang?: string;
}

const VaccinationsBlock = (props: VaccinationsBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const isVaccinationsListEmpty = !props.vaccinationsList || props.vaccinationsList.length < 1;

    const renderVaccinationsList = () => {
        return (
            <>
                <BiSeparatedRow leftValue={"Назва"} rightValue={"Дата"} isHeader={true}/>
                {props.vaccinationsList.map(vaccination => {
                    return (
                        <BiSeparatedRow leftValue={vaccination.name} rightValue={vaccination.date}/>
                    )
                })}
            </>
        );
    };

    const renderNoVaccinationHint = () => {
        return (
            <div className={styles.Vaccinations}>
                <span className={styles.NoVaccinationsData}> Немає даних про щеплення</span>
            </div>
        );
    };

    const renderContent = () => {
        return isVaccinationsListEmpty ? renderNoVaccinationHint() : renderVaccinationsList();
    }

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title="Щеплення"/>
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    );
};

export default VaccinationsBlock;
