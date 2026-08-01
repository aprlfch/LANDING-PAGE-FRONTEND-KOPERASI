import React from "react";
import styles from "./A4Paper.module.css";

function A4Paper({ children, isDownload }) {
    console.log(isDownload, 'is')
    return (
        <div className={`${styles.paper} ${isDownload ? styles.downloadMode : ""}`}>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

export default A4Paper;
