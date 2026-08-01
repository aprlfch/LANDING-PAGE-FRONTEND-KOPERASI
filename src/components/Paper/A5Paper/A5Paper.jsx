import React from "react";
import styles from "./A5Paper.module.css";

function A5Paper({ children, isDownload }) {
    console.log(isDownload, 'is')
    return (
        <div className={`${styles.paper} ${isDownload ? styles.downloadMode : ""}`}>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

export default A5Paper;
