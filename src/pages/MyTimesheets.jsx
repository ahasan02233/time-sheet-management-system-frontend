import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyTimesheets() {

    const navigate = useNavigate();

    const [timesheets, setTimesheets] = useState([]);

    useEffect(() => {
        fetchTimesheets();
    }, []);

    const fetchTimesheets = async () => {

        try {

            const email =
                localStorage.getItem("email");

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    `http://localhost:8080/api/employees/timesheet/my?email=${email}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setTimesheets(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed To Load Timesheets");
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.header}>

                <h1 style={styles.title}>
                    My Timesheets
                </h1>

                <p style={styles.subtitle}>
                    View all your submitted timesheets
                </p>

            </div>

            <div style={styles.card}>

                <div style={styles.cardHeader}>

                    <h2>
                        Timesheet Records
                    </h2>

                    <div style={styles.recordCount}>
                        Total Records : {timesheets.length}
                    </div>

                </div>

                <div style={styles.tableContainer}>

                    <table style={styles.table}>

                        <thead>

                        <tr>

                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Hours</th>
                            <th style={styles.th}>Task Description</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Manager Comment</th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            timesheets.length > 0 ?

                                timesheets.map((item) => (

                                    <tr key={item.id}>

                                        <td style={styles.td}>
                                            {item.workDate}
                                        </td>

                                        <td style={styles.td}>
                                            {item.hoursWorked}
                                        </td>

                                        <td style={styles.td}>
                                            {item.taskDescription}
                                        </td>

                                        <td style={styles.td}>

                                            <span
                                                style={{
                                                    ...styles.badge,

                                                    backgroundColor:
                                                        item.status === "APPROVED"
                                                            ? "#d4edda"
                                                            : item.status === "REJECTED"
                                                            ? "#f8d7da"
                                                            : "#fff3cd",

                                                    color:
                                                        item.status === "APPROVED"
                                                            ? "#155724"
                                                            : item.status === "REJECTED"
                                                            ? "#721c24"
                                                            : "#856404"
                                                }}
                                            >
                                                {item.status}
                                            </span>

                                        </td>

                                        <td style={styles.td}>
                                            {item.managerComment}
                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        style={styles.noData}
                                        colSpan="5"
                                    >
                                        No Timesheets Found
                                    </td>

                                </tr>
                        }

                        </tbody>

                    </table>

                </div>

                <div style={styles.buttonSection}>

                    <button
                        style={styles.button}
                        onClick={() =>
                            navigate("/employee-dashboard")
                        }
                    >
                        Back To Dashboard
                    </button>

                </div>

            </div>

        </div>
    );
}

const styles = {

    page: {

        minHeight: "100vh",

        background:
            "linear-gradient(135deg,#0f4cdb,#5a3fff,#8f3bff)",

        padding: "40px"
    },

    header: {

        color: "white",

        marginBottom: "30px"
    },

    title: {

        fontSize: "48px",

        fontWeight: "bold"
    },

    subtitle: {

        fontSize: "18px",

        marginTop: "10px"
    },

    card: {

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "30px",

        boxShadow:
            "0px 10px 30px rgba(0,0,0,0.2)"
    },

    cardHeader: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "25px"
    },

    recordCount: {

        backgroundColor: "#eef4ff",

        padding: "10px 20px",

        borderRadius: "10px",

        fontWeight: "bold"
    },

    tableContainer: {

        overflowX: "auto"
    },

    table: {

        width: "100%",

        borderCollapse: "collapse",

        tableLayout: "fixed"
    },

    th: {

        padding: "18px",

        textAlign: "center",

        backgroundColor: "#eef4ff",

        color: "#1e293b",

        fontWeight: "bold"
    },

    td: {

        padding: "18px",

        textAlign: "center",

        borderBottom: "1px solid #e5e7eb"
    },

    badge: {

        padding: "8px 16px",

        borderRadius: "20px",

        fontWeight: "bold"
    },

    noData: {

        padding: "25px",

        textAlign: "center"
    },

    buttonSection: {

        textAlign: "center",

        marginTop: "30px"
    },

    button: {

        background:
            "linear-gradient(90deg,#0f4cdb,#6a11cb)",

        color: "white",

        border: "none",

        padding: "15px 40px",

        borderRadius: "10px",

        cursor: "pointer",

        fontSize: "16px",

        fontWeight: "bold"
    }
};

export default MyTimesheets;