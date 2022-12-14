import React, {ChangeEvent} from "react";
import styles from "@src/styles/App.module.scss";
import {Input} from "semantic-ui-react";

interface NumberInputProps {
    title: string;
    value: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput = (props: NumberInputProps) => {

    return (
        <div className={styles.NewPlanStepInput}>
            <div className={styles.NewPlanStepInputName}>
                <span>{props.title}</span>
            </div>
            <div className={styles.NewPlanStepInputOption}>
                <Input
                    type="number"
                    input={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default NumberInput;