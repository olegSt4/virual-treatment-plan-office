import React from "react";
import {PatientSpecific} from "@src/models/emcModels";
import {FiAlertTriangle} from "react-icons/fi";
import styles from "../../../../styles/App.module.scss";

interface PatientSpecificsProps {
    patientCardId: string;
    specificsList: PatientSpecific[];
}

const PatientsSpecificsBlock = (props: PatientSpecificsProps) => {
    const hasPatientSpecifics = props.patientCardId && props.specificsList && props.specificsList.length > 0;

    const hintText = props.patientCardId
        ?  "У цього пацієнта відсутні особливі застереження"
        : "Виберіть пацієнта зі списку";

    return hasPatientSpecifics
        ?  (
            <div>
                {props.specificsList.map(specific => {
                    return (
                        <div className={styles.PatientSpecifics}>
                            {specific.isCritical && <FiAlertTriangle/>}
                            <span>{specific.name}</span>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className={styles.PatientSpecifics}>
                <span>{hintText}</span>
            </div>
        );
};

export default PatientsSpecificsBlock;
