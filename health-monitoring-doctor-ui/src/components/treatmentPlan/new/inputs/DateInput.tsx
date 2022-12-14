import React, {ChangeEvent} from "react";
import {Input, InputOnChangeData} from "semantic-ui-react";
import styles from "@src/styles/App.module.scss";

interface DateInputProps {
    title: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
}

const DateInput = (props: DateInputProps) => {

    return (
        <div className={styles.InputItem}>
            <span className={styles.InputOptionHeader}>
                {props.title}
            </span>
            <div className={styles.InputOption}>
                <Input
                    type={"date"}
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default DateInput;
