import React from "react";
import {DASH} from "@src/models/constants";
import styles from "../../../styles/App.module.scss";

interface InfoRowProps {
    title?: string;
    value?: string | number | JSX.Element;
}

const InfoRow = (props: InfoRowProps) => {
    const titleText = props.title ? `${props.title}: ` : "";
    const valueText = props.value || props.value === "" ? props.value : DASH;


    return (
        <div className={styles.InfoRow}>
            <span className={styles.InfoRowTitle}>{titleText}</span>
            <span>{valueText}</span>
        </div>
    )
}

export default InfoRow;
