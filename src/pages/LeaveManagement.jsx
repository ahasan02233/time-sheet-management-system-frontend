import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LeaveManagement() {

    const navigate = useNavigate();

    const [leaveData, setLeaveData] = useState({
        email: localStorage.getItem("email"),
        fromDate: "",
        toDate: "",
        reason: ""
    });

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const email =
                localStorage.getItem("email");

            const response =
                await axios.get(
                    `http://localhost:8080/api/employees/leave/my?email=${email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            setLeaves(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setLeaveData({
            ...leaveData,
            [e.target.name]: e.target.value
        });
    };

    const applyLeave = async () => {

        try {

            if (
                leaveData.fromDate >
                leaveData.toDate
            ) {

                alert(
                    "From Date cannot be after To Date"
                );

                return;
            }

            const token =
                localStorage.getItem("token");

            await axios.post(
                "http://localhost:8080/api/employees/leave/apply",
                leaveData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Leave Applied Successfully"
            );

            setLeaveData({
                email:
                    localStorage.getItem("email"),
                fromDate: "",
                toDate: "",
                reason: ""
            });

            fetchLeaves();

        } catch (error) {

            console.log(error);

            alert(
                "Failed To Apply Leave"
            );
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.leftCard}>

                <h1 style={styles.heading}>
                    Leave Management
                </h1>

                <div style={styles.dateRow}>

                    <div style={styles.dateField}>

                        <label style={styles.label}>
                            From Date
                        </label>

                        <input
                            type="date"
                            name="fromDate"
                            value={leaveData.fromDate}
                            onChange={handleChange}
                            style={styles.input}
                        />

                    </div>

                    <div style={styles.dateField}>

                        <label style={styles.label}>
                            To Date
                        </label>

                        <input
                            type="date"
                            name="toDate"
                            value={leaveData.toDate}
                            onChange={handleChange}
                            style={styles.input}
                        />

                    </div>

                </div>

                <label style={styles.label}>
                    Reason
                </label>

                <textarea
                    name="reason"
                    placeholder="Enter Leave Reason"
                    value={leaveData.reason}
                    onChange={handleChange}
                    style={styles.textarea}
                />

                <button
                    style={styles.applyButton}
                    onClick={applyLeave}
                >
                    Apply Leave
                </button>

                <button
                    style={styles.backButton}
                    onClick={() =>
                        navigate(
                            "/employee-dashboard"
                        )
                    }
                >
                    Back To Dashboard
                </button>

            </div>

            <div style={styles.rightCard}>

                <div style={styles.tableHeader}>

                    <h2>
                        My Leave Requests
                    </h2>

                    <div style={styles.countBox}>
                        Total : {leaves.length}
                    </div>

                </div>

                <div style={styles.tableContainer}>

                    <table style={styles.table}>

                        <thead>

                        <tr>

                            <th style={styles.th}>
                                From Date
                            </th>

                            <th style={styles.th}>
                                To Date
                            </th>

                            <th style={styles.th}>
                                Reason
                            </th>

                            <th style={styles.th}>
                                Status
                            </th>

                            <th style={styles.th}>
                                Manager Comment
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            leaves.length > 0 ?

                                leaves.map((leave) => (

                                    <tr
                                        key={leave.id}
                                    >

                                        <td style={styles.td}>
                                            {leave.fromDate}
                                        </td>

                                        <td style={styles.td}>
                                            {leave.toDate}
                                        </td>

                                        <td style={styles.td}>
                                            {leave.reason}
                                        </td>

                                        <td style={styles.td}>

                                            <span
                                                style={{
                                                    ...styles.badge,

                                                    backgroundColor:
                                                        leave.status === "APPROVED"
                                                            ? "#d4edda"
                                                            : leave.status === "REJECTED"
                                                            ? "#f8d7da"
                                                            : "#fff3cd",

                                                    color:
                                                        leave.status === "APPROVED"
                                                            ? "#155724"
                                                            : leave.status === "REJECTED"
                                                            ? "#721c24"
                                                            : "#856404"
                                                }}
                                            >
                                                {leave.status}
                                            </span>

                                        </td>

                                        <td style={styles.td}>
                                            {leave.managerComment}
                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={styles.noData}
                                    >
                                        No Leave Records Found
                                    </td>

                                </tr>
                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

const styles = {

    page: {

        height: "100vh",

        overflow: "hidden",

        display: "flex",

        gap: "20px",

        padding: "20px",

        background:
            "linear-gradient(135deg,#0f4cdb,#5a3fff,#8f3bff)",

        boxSizing: "border-box"
    },

    leftCard: {

        width: "30%",

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "25px",

        boxShadow:
            "0px 10px 25px rgba(0,0,0,0.15)"
    },

    rightCard: {

        width: "70%",

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "25px",

        boxShadow:
            "0px 10px 25px rgba(0,0,0,0.15)",

        display: "flex",

        flexDirection: "column"
    },

    heading: {

        textAlign: "center",

        marginBottom: "25px"
    },

    dateRow: {

        display: "flex",

        gap: "12px",

        marginBottom: "15px"
    },

    dateField: {

        flex: 1
    },

    label: {

        display: "block",

        marginBottom: "8px",

        fontWeight: "600"
    },

    input: {

        width: "100%",

        padding: "12px",

        borderRadius: "8px",

        border: "1px solid #ccc",

        boxSizing: "border-box"
    },

    textarea: {

        width: "100%",

        height: "90px",

        padding: "12px",

        borderRadius: "8px",

        border: "1px solid #ccc",

        resize: "none",

        boxSizing: "border-box"
    },

    applyButton: {

        width: "100%",

        marginTop: "15px",

        padding: "14px",

        border: "none",

        borderRadius: "10px",

        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",

        color: "white",

        fontWeight: "bold",

        cursor: "pointer"
    },

    backButton: {

        width: "100%",

        marginTop: "10px",

        padding: "14px",

        border: "none",

        borderRadius: "10px",

        background:
            "linear-gradient(90deg,#0f4cdb,#6a11cb)",

        color: "white",

        fontWeight: "bold",

        cursor: "pointer"
    },

    tableHeader: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        marginBottom: "15px"
    },

    countBox: {

        backgroundColor: "#eef4ff",

        padding: "8px 15px",

        borderRadius: "10px",

        fontWeight: "bold"
    },

    tableContainer: {

        flex: 1,

        overflowY: "auto"
    },

    table: {

        width: "100%",

        borderCollapse: "collapse"
    },

    th: {

        padding: "15px",

        backgroundColor: "#eef4ff"
    },

    td: {

        padding: "15px",

        textAlign: "center",

        borderBottom:
            "1px solid #e5e7eb"
    },

    badge: {

        padding: "6px 12px",

        borderRadius: "20px",

        fontWeight: "bold"
    },

    noData: {

        textAlign: "center",

        padding: "25px"
    }
};

export default LeaveManagement;