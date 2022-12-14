import React from "react";
import {DASH} from "@src/models/constants";
import styles from "../../../styles/App.module.scss";

interface BiSeparatedRowProps {
    leftValue: string | number | undefined;
    rightValue: string | number | undefined;
    isHeader?: boolean;
}

const BiSeparatedRow = (props: BiSeparatedRowProps) => {
    const className = props.isHeader ? `${styles.BiSeparatedRow} ${styles.Bold}` : styles.BiSeparatedRow;

    return (
        <div className={className}>
            <div className={styles.Left}>
                <span>{props.leftValue || DASH}</span>
            </div>
            <div className={styles.Right}>
                <span>{props.rightValue || DASH}</span>
            </div>
        </div>
    )

}

export default BiSeparatedRow;
