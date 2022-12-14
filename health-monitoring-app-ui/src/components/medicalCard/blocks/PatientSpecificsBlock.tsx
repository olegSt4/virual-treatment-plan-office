import React from "react";
import {PatientSpecific} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import styles from "@src/styles/App.module.scss";
import {FiAlertTriangle} from "react-icons/fi";

interface PatientSpecificsBlockProps {
    specificsList: PatientSpecific[];
    lang?: string;
}

const PatientSpecificsBlock = (props: PatientSpecificsBlockProps) => {
    const renderSpecificsList = () => {
      return props.specificsList.map(specific => {
          return (
              <div className={styles.Specifics}>
                  {specific.isCritical && <FiAlertTriangle/>}
                  <div className={styles.SpecificName}>
                      <span>{specific.specificName}</span>
                  </div>
              </div>
          );
      });
    };

    const renderNoSpecificsHint = () => {
        return (
            <div className={styles.Specifics}>
                <div className={styles.SpecificName}>
                    <span>У цього пацієнта немає особливих застережень</span>
                </div>
            </div>
        );
    };

    return (
        <div>
            <ColumnHeader title="Особливості"/>
            <div>
                {props.specificsList && props.specificsList.length > 0 ? renderSpecificsList() : renderNoSpecificsHint()}
            </div>
        </div>
    )
};

export default PatientSpecificsBlock;
