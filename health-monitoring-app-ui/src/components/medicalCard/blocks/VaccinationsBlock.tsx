import React from "react";
import {ProcedureResult} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import BiSeparatedRow from "@src/components/common/rows/BiSeparatedRow";
import styles from "../../../styles/App.module.scss";

interface VaccinationsBlockProps {
    vaccinationsList: ProcedureResult[];
    lang?: string;
}

const VaccinationsBlock = (props: VaccinationsBlockProps) => {
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

    return (
        <div>
            <ColumnHeader title="Щеплення"/>
            {isVaccinationsListEmpty ? renderNoVaccinationHint() : renderVaccinationsList()}
        </div>
    );
};

export default VaccinationsBlock;
