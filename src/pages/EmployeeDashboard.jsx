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

                <div style={styles.userBox}>
                    👤 {employeeName}
                </div>

            </div>

            <div style={styles.welcomeCard}>

                <h1>
                    Welcome, {employeeName}
                </h1>

                <p>
                    Manage your daily work and timesheets efficiently.
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
                        🚪
                    </div>

                    <h2>
                        Logout
                    </h2>

                    <p>
                        Sign out from the application.
                    </p>

                    <button
                        style={styles.logoutButton}
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}

const styles = {

    container: {

        height: "100vh",

        overflow: "hidden",

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

    userBox: {

        backgroundColor:
            "rgba(255,255,255,0.15)",

        color: "white",

        padding: "12px 20px",

        borderRadius: "15px",

        fontSize: "18px",

        backdropFilter: "blur(10px)"
    },

    welcomeCard: {

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "25px",

        marginBottom: "20px",

        boxShadow:
            "0px 10px 30px rgba(0,0,0,0.15)"
    },

    cardsContainer: {

        display: "grid",

        gridTemplateColumns:
            "repeat(3, 1fr)",

        gap: "20px"
    },

    card: {

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "20px",

        textAlign: "center",

        boxShadow:
            "0px 10px 25px rgba(0,0,0,0.15)"
    },

    icon: {

        fontSize: "40px",

        marginBottom: "10px"
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

        fontSize: "16px"
    },

    logoutButton: {

        width: "100%",

        marginTop: "20px",

        background:
            "linear-gradient(90deg,#ef4444,#dc2626)",

        color: "white",

        border: "none",

        padding: "14px",

        borderRadius: "12px",

        cursor: "pointer",

        fontSize: "16px"
    }
};

export default EmployeeDashboard;