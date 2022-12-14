import React, {useEffect, useState} from "react";
import styles from "@src/styles/App.module.scss";
import {Button} from "semantic-ui-react";
import TextInput from "@src/components/treatmentPlan/new/inputs/TextInput";
import {completeTreatmentPlan} from "@src/utils/externalCallUtils";

interface CompletePlanModalProps {
    planId: string;
    onClose: () => void;
}

const CompletePlanModal = (props: CompletePlanModalProps) => {
    const [conclusion, setConclusion] = useState<string>("");
    const [isCompleteButtonDisabled, setIsCompleteButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        if (conclusion) {
            setIsCompleteButtonDisabled(false);
        } else {
            setIsCompleteButtonDisabled(true);
        }
    }, [conclusion]);

    const onSavePlanClick = () => {
        completeTreatmentPlan({conclusion: conclusion});
        props.onClose();
    };

    return (
        <div className={styles.ModalContainer}>
            <div className={styles.Modal}>
                <div className={styles.ModalContent}>
                    <div className={styles.CloseButton}>
                        <Button onClick={props.onClose} >Х</Button>
                    </div>
                    <div>
                        <TextInput
                            title={"Введіть висновки плану лікування"}
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                        />
                        <Button
                            onClick={onSavePlanClick}
                            disabled={isCompleteButtonDisabled}
                        >
                            Завершити план!
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletePlanModal;
