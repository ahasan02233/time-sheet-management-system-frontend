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

            <div style={styles.card}>

                <h1>
                    Welcome, {employeeName}
                </h1>

                <p>
                    Employee Portal
                </p>

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
                    View Timesheets
                </button>

                <button
                    style={styles.logout}
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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },

    card: {
        backgroundColor: "white",
        width: "450px",
        padding: "40px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
    },

    button: {
        width: "100%",
        padding: "14px",
        marginTop: "15px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#1976d2",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
    },

    logout: {
        width: "100%",
        padding: "14px",
        marginTop: "15px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#d32f2f",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
    }
};

export default EmployeeDashboard;