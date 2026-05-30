// src/pages/EmployeeDashboard.jsx

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

            <h1>
                Welcome {employeeName}
            </h1>

            <div style={styles.card}>

                <button
                    style={styles.button}
                    onClick={() =>
                        navigate("/create-timesheet")
                    }
                >
                    Create Timesheet
                </button>

                <button
                    style={styles.button}
                    onClick={() =>
                        navigate("/my-timesheets")
                    }
                >
                    View My Timesheets
                </button>

                <button
                    style={styles.logoutButton}
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

const styles = {

    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px"
    },

    card: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "300px"
    },

    button: {
        padding: "12px",
        fontSize: "16px",
        border: "none",
        backgroundColor: "#1976d2",
        color: "white",
        cursor: "pointer",
        borderRadius: "5px"
    },

    logoutButton: {
        padding: "12px",
        fontSize: "16px",
        border: "none",
        backgroundColor: "red",
        color: "white",
        cursor: "pointer",
        borderRadius: "5px"
    }
};

export default EmployeeDashboard;