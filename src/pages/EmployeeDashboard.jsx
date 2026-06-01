import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

    const navigate = useNavigate();

    const employeeName =
        localStorage.getItem("employeeName");

    const logout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h1 style={styles.title}>
                    TimeSheet Management System
                </h1>

                <div style={styles.userSection}>

                    <div style={styles.userBox}>
                        👤 {employeeName}
                    </div>

                    <button
                        style={styles.smallLogoutButton}
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div style={styles.welcomeCard}>

                <h1>
                    Welcome, {employeeName}
                </h1>

                <p>
                    Manage your daily work, timesheets and leave requests efficiently.
                </p>

            </div>

            <div style={styles.cardsContainer}>

                <div style={styles.card}>

                    <div style={styles.icon}>
                        📝
                    </div>

                    <h2>
                        Create Timesheet
                    </h2>

                    <p>
                        Submit your daily work details.
                    </p>

                    <button
                        style={styles.primaryButton}
                        onClick={() =>
                            navigate("/create-timesheet")
                        }
                    >
                        Create
                    </button>

                </div>

                <div style={styles.card}>

                    <div style={styles.icon}>
                        📋
                    </div>

                    <h2>
                        My Timesheets
                    </h2>

                    <p>
                        View all submitted timesheets.
                    </p>

                    <button
                        style={styles.primaryButton}
                        onClick={() =>
                            navigate("/my-timesheets")
                        }
                    >
                        View
                    </button>

                </div>

                <div style={styles.card}>

                    <div style={styles.icon}>
                        🏖️
                    </div>

                    <h2>
                        Leave Management
                    </h2>

                    <p>
                        Apply leave and track leave approval status.
                    </p>

                    <button
                        style={styles.primaryButton}
                        onClick={() =>
                            navigate("/leave-management")
                        }
                    >
                        Manage Leave
                    </button>

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {

        minHeight: "100vh",

        padding: "20px 40px",

        background:
            "linear-gradient(135deg,#0f4cdb,#5a3fff,#8f3bff)"
    },

    header: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "20px"
    },

    title: {

        color: "white",

        fontSize: "28px",

        fontWeight: "700"
    },

    userSection: {

        display: "flex",

        alignItems: "center",

        gap: "12px"
    },

    userBox: {

        backgroundColor:
            "rgba(255,255,255,0.15)",

        color: "white",

        padding: "12px 20px",

        borderRadius: "15px",

        fontSize: "18px",

        backdropFilter: "blur(10px)"
    },

    smallLogoutButton: {

        background:
            "linear-gradient(90deg,#ef4444,#dc2626)",

        color: "white",

        border: "none",

        padding: "12px 18px",

        borderRadius: "10px",

        cursor: "pointer",

        fontWeight: "bold"
    },

    welcomeCard: {

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "25px",

        marginBottom: "25px",

        boxShadow:
            "0px 10px 30px rgba(0,0,0,0.15)"
    },

    cardsContainer: {

        display: "grid",

        gridTemplateColumns:
            "repeat(3, 1fr)",

        gap: "25px"
    },

    card: {

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "25px",

        textAlign: "center",

        boxShadow:
            "0px 10px 25px rgba(0,0,0,0.15)"
    },

    icon: {

        fontSize: "50px",

        marginBottom: "15px"
    },

    primaryButton: {

        width: "100%",

        marginTop: "20px",

        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",

        color: "white",

        border: "none",

        padding: "14px",

        borderRadius: "12px",

        cursor: "pointer",

        fontSize: "16px",

        fontWeight: "600"
    }
};

export default EmployeeDashboard;