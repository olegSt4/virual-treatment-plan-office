import React, {ChangeEvent} from "react";
import styles from "@src/styles/App.module.scss";
import {Input} from "semantic-ui-react";

interface TextInputProps {
    title: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {

    return (
        <div className={styles.InputItem}>
            <span className={styles.InputOptionHeader}>
                {props.title}
            </span>
            <div className={styles.InputOption}>
                <Input
                    className={styles.TextInput}
                    type="text"
                    value={props.value}
                    onChange={props.onChange}
                />
            </div>
        </div>
    );
};

export default TextInput;
