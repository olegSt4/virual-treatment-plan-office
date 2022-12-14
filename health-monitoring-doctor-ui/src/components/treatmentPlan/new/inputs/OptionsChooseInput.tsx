import React, {SyntheticEvent} from "react";
import styles from "@src/styles/App.module.scss";
import {Dropdown, DropdownProps} from "semantic-ui-react";
import {DropdownSearchOption} from "@src/models/commonModels";

interface OptionsChooseInputProps {
    title: string;
    placeholder: string;
    options: DropdownSearchOption[];
    value: string;
    onOptionChange: (event: SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
}

const OptionsChooseInput = (props: OptionsChooseInputProps) => {
    return (
        <div className={styles.InputItem}>
            <span className={styles.InputOptionHeader}>
                {props.title}
            </span>
            <div className={styles.InputOption}>
                <Dropdown
                    placeholder={props.placeholder}
                    fluid
                    search
                    selection
                    options={props.options}
                    value={props.value}
                    onChange={props.onOptionChange}
                />
            </div>
        </div>
    )
}

export default OptionsChooseInput;
