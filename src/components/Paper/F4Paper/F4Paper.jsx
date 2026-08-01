import React from "react";
import styles from "./F4Paper.module.css";

const F4Paper = React.forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className={styles.paper}>
            {children}
        </div>
    );
});

F4Paper.displayName = "F4Paper";

export default F4Paper;