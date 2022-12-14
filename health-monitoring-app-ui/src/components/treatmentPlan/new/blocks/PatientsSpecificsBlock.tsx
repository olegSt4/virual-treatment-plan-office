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

    return hasPatientSpecifics
        ?  (
            <div>
                {props.specificsList.map(specific => {
                    return (
                        <div className={styles.PatientSpecifics}>
                            {specific.isCritical && <FiAlertTriangle/>}
                            <span>{specific.specificName}</span>
                        </div>
                    );
                })}
            </div>
        ) : (
            <div className={styles.PatientSpecifics}>
                <span>У цього пацієнта відсутні особливі застереження</span>
            </div>
        );
};

export default PatientsSpecificsBlock;
