import React from "react";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {

    const navigate = useNavigate();

    const managerName =
        localStorage.getItem("employeeName") || "Manager";

    const logout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <div style={styles.page}>

            {/* Top Header */}

            <div style={styles.navbar}>

                <h1 style={styles.logo}>
                    TimeSheet Management System
                </h1>

                <div style={styles.userBox}>
                    👨‍💼 {managerName}
                </div>

            </div>

            {/* Welcome Card */}

            <div style={styles.welcomeCard}>

                <h1 style={styles.welcomeTitle}>
                    Welcome, {managerName}
                </h1>

                <p style={styles.welcomeText}>
                    Manage employee timesheets, approvals and reports efficiently.
                </p>

            </div>

            {/* Dashboard Cards */}

            <div style={styles.cardsContainer}>

                <div style={styles.card}>

                    <div style={styles.icon}>
                        📋
                    </div>

                    <h2>
                        Pending Requests
                    </h2>

                    <p>
                        Review and approve employee timesheets.
                    </p>

                    <button
                        style={styles.primaryButton}
                        onClick={() =>
                            navigate("/pending-timesheets")
                        }
                    >
                        View Requests
                    </button>

                </div>

                <div style={styles.card}>

                    <div style={styles.icon}>
                        📊
                    </div>

                    <h2>
                        Reports
                    </h2>

                    <p>
                        View approved and rejected timesheet reports.
                    </p>

                    <button
                        style={styles.primaryButton}
                        onClick={() =>
                            navigate("/manager-reports")
                        }
                    >
                        Open Reports
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
                        Securely sign out from the application.
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

    page: {

        minHeight: "100vh",

        padding: "30px",

        background:
            "linear-gradient(135deg, #0f4cdb 0%, #5a3fff 50%, #8f3bff 100%)"
    },

    navbar: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "30px"
    },

    logo: {

        color: "white",

        fontSize: "42px",

        fontWeight: "700"
    },

    userBox: {

        background:
            "rgba(255,255,255,0.15)",

        color: "white",

        padding: "15px 25px",

        borderRadius: "15px",

        fontSize: "22px",

        fontWeight: "600"
    },

    welcomeCard: {

        background: "white",

        borderRadius: "25px",

        padding: "40px",

        marginBottom: "35px",

        boxShadow:
            "0 10px 30px rgba(0,0,0,0.15)"
    },

    welcomeTitle: {

        fontSize: "48px",

        color: "#0f172a",

        marginBottom: "15px"
    },

    welcomeText: {

        fontSize: "22px",

        color: "#475569"
    },

    cardsContainer: {

        display: "flex",

        gap: "30px",

        flexWrap: "wrap"
    },

    card: {

        flex: "1",

        minWidth: "320px",

        background: "white",

        borderRadius: "25px",

        padding: "35px",

        textAlign: "center",

        boxShadow:
            "0 10px 30px rgba(0,0,0,0.15)"
    },

    icon: {

        fontSize: "70px",

        marginBottom: "20px"
    },

    primaryButton: {

        width: "100%",

        marginTop: "25px",

        padding: "15px",

        border: "none",

        borderRadius: "12px",

        color: "white",

        fontSize: "18px",

        cursor: "pointer",

        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)"
    },

    logoutButton: {

        width: "100%",

        marginTop: "25px",

        padding: "15px",

        border: "none",

        borderRadius: "12px",

        color: "white",

        fontSize: "18px",

        cursor: "pointer",

        background:
            "linear-gradient(90deg,#ef4444,#dc2626)"
    }
};

export default ManagerDashboard;