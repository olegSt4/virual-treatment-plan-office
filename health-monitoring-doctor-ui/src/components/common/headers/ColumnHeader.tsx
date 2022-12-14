import React from "react";
import styles from "../../../styles/App.module.scss";

interface ColumnHeaderProps {
    title?: string;
}

const ColumnHeader = (props: ColumnHeaderProps) => {
    return (
        <div className={styles.SubHeader}>
            <span>{props.title}</span>
        </div>
    );
}

export default ColumnHeader;
