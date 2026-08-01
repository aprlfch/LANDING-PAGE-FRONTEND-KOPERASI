import PropTypes from "prop-types";
import { BellOutlined, MenuOutlined } from "@ant-design/icons";
import styles from "./Topbar.module.css";
import { Button, Dropdown, Badge } from "antd";
import { useNavigate } from "react-router-dom";

function Topbar({ changeSidebar }) {
    const navigate = useNavigate();

    // Data sementara (tanpa API)
    const user = {
        fullname: "Guest User",
        job_title: "Administrator",
    };

    const notificationCount = 0;

    const gotoNotif = () => {
        navigate("/notification");
    };

    const items = [
        {
            key: "logout",
            label: (
                <Button
                    danger
                    className={styles.btnAction}
                    onClick={() => navigate("/")}
                >
                    Keluar
                </Button>
            ),
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <button className={styles.btnMenu} onClick={changeSidebar}>
                    <MenuOutlined />
                </button>
            </div>

            <div className={styles.right}>
                <div onClick={gotoNotif} className={styles.notifWrapper}>
                    <Badge
                        count={notificationCount}
                        showZero={false}
                        overflowCount={99}
                        className={styles.badge}
                    >
                        <BellOutlined className={styles.iconNotif} />
                    </Badge>
                </div>

                <Dropdown
                    menu={{ items }}
                    placement="bottomRight"
                    trigger={["click"]}
                >
                    <div className={styles.profile}>
                        <img
                            src={user.image}
                            alt={user.fullname}
                            className={styles.profileImage}
                        />

                        <div className={styles.profileInfo}>
                            <p className={styles.name}>{user.fullname}</p>
                            <p className={styles.role}>{user.job_title}</p>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

Topbar.propTypes = {
    changeSidebar: PropTypes.func.isRequired,
};

export default Topbar;