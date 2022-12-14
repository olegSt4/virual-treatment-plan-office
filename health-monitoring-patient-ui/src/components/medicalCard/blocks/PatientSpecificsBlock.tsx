import React, {useState} from "react";
import {PatientSpecific} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import styles from "@src/styles/App.module.scss";
import {FiAlertTriangle} from "react-icons/fi";
import {Button} from "semantic-ui-react";
import {MdExpandLess, MdExpandMore} from "react-icons/md";

interface PatientSpecificsBlockProps {
    specificsList: PatientSpecific[];
    lang?: string;
}

const PatientSpecificsBlock = (props: PatientSpecificsBlockProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const renderSpecificsList = () => {
      return props.specificsList.map(specific => {
          return (
              <div className={styles.Specifics}>
                  {specific.isCritical && <FiAlertTriangle/>}
                  <div className={styles.SpecificName}>
                      <span>{specific.name}</span>
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

    const renderContent = () => {
        return (
            <div>
                {props.specificsList && props.specificsList.length > 0 ? renderSpecificsList() : renderNoSpecificsHint()}
            </div>
        );
    };

    return (
        <div className={styles.CardBlock}>
            <ColumnHeader title="Особливості"/>
            <Button className={styles.ExpandButton} onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button>
            {isExpanded && renderContent()}
        </div>
    )
};

export default PatientSpecificsBlock;
