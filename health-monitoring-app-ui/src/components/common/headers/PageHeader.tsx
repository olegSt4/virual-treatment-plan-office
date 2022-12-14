import React from "react";
import styles from "../../../styles/App.module.scss"

interface PageHeaderProps {
    title: string | undefined;
}

const PageHeader = (props: PageHeaderProps) => {
    return (
        <div className={styles.PageHeader}>
            <span>{props.title}</span>
        </div>
    )
}

export default PageHeader;
