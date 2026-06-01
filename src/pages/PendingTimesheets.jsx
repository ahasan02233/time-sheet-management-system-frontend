import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PendingTimesheets() {

    const navigate = useNavigate();

    const [timesheets, setTimesheets] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const [actionType, setActionType] = useState("");

    const [comment, setComment] = useState("");

    useEffect(() => {
        fetchPendingTimesheets();
    }, []);

    const fetchPendingTimesheets = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "http://localhost:8080/manager/pending",
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

    const openModal = (id, action) => {

        setSelectedId(id);

        setActionType(action);

        setComment("");

        setShowModal(true);
    };

    const submitAction = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const url =
                actionType === "APPROVE"
                    ? `http://localhost:8080/manager/approve/${selectedId}`
                    : `http://localhost:8080/manager/reject/${selectedId}`;

            await axios.put(
                url,
                {
                    comment
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                actionType === "APPROVE"
                    ? "Timesheet Approved Successfully"
                    : "Timesheet Rejected Successfully"
            );

            setShowModal(false);

            fetchPendingTimesheets();

        } catch (error) {

            console.log(error);

            alert("Operation Failed");
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.card}>

                <h1 style={styles.heading}>
                    Pending Timesheets
                </h1>

                <table style={styles.table}>

                    <thead>

                    <tr>

                        <th style={styles.th}>
                            Employee
                        </th>

                        <th style={styles.th}>
                            Work Date
                        </th>

                        <th style={styles.th}>
                            Hours
                        </th>

                        <th style={styles.th}>
                            Task Description
                        </th>

                        <th style={styles.th}>
                            Action
                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        timesheets.length > 0 ?

                            timesheets.map((item) => (

                                <tr
                                    key={item.id}
                                    style={styles.row}
                                >

                                    <td style={styles.td}>
                                        {item.employeeName}
                                    </td>

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

                                        <button
                                            style={styles.approveButton}
                                            onClick={() =>
                                                openModal(
                                                    item.id,
                                                    "APPROVE"
                                                )
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            style={styles.rejectButton}
                                            onClick={() =>
                                                openModal(
                                                    item.id,
                                                    "REJECT"
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "25px"
                                    }}
                                >
                                    No Pending Timesheets
                                </td>

                            </tr>
                    }

                    </tbody>

                </table>

                <button
                    style={styles.backButton}
                    onClick={() =>
                        navigate(
                            "/manager-dashboard"
                        )
                    }
                >
                    Back To Dashboard
                </button>

            </div>

            {

                showModal && (

                    <div
                        style={
                            styles.modalOverlay
                        }
                    >

                        <div
                            style={
                                styles.modal
                            }
                        >

                            <h2>

                                {

                                    actionType ===
                                    "APPROVE"

                                        ?

                                        "Approve Timesheet"

                                        :

                                        "Reject Timesheet"
                                }

                            </h2>

                            <textarea
                                placeholder="Enter Manager Comment"
                                value={comment}
                                onChange={(e) =>
                                    setComment(
                                        e.target.value
                                    )
                                }
                                style={
                                    styles.textarea
                                }
                            />

                            <div
                                style={
                                    styles.modalButtons
                                }
                            >

                                <button
                                    style={
                                        styles.cancelBtn
                                    }
                                    onClick={() =>
                                        setShowModal(
                                            false
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    style={
                                        actionType ===
                                        "APPROVE"

                                            ?

                                            styles.approveButton

                                            :

                                            styles.rejectButton
                                    }
                                    onClick={
                                        submitAction
                                    }
                                >
                                    Submit
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    );
}

const styles = {

    page: {

        minHeight: "100vh",

        background:
            "linear-gradient(135deg,#0f4cdb,#5a3fff,#8f3bff)",

        padding: "30px"
    },

    card: {

        background:
            "rgba(255,255,255,0.97)",

        borderRadius: "25px",

        padding: "30px",

        boxShadow:
            "0 15px 35px rgba(0,0,0,0.15)"
    },

    heading: {

        fontSize: "38px",

        fontWeight: "700",

        color: "#1e293b",

        marginBottom: "25px"
    },

    table: {

        width: "100%",

        borderCollapse: "collapse"
    },

    th: {

        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",

        color: "white",

        padding: "16px",

        textAlign: "center"
    },

    td: {

        padding: "16px",

        textAlign: "center",

        borderBottom:
            "1px solid #e5e7eb"
    },

    row: {

        backgroundColor: "white"
    },

    approveButton: {

        background: "#16a34a",

        color: "white",

        border: "none",

        padding: "10px 15px",

        borderRadius: "8px",

        cursor: "pointer",

        marginRight: "10px"
    },

    rejectButton: {

        background: "#dc2626",

        color: "white",

        border: "none",

        padding: "10px 15px",

        borderRadius: "8px",

        cursor: "pointer"
    },

    backButton: {

        marginTop: "25px",

        padding: "14px 30px",

        border: "none",

        borderRadius: "10px",

        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",

        color: "white",

        fontSize: "16px",

        cursor: "pointer"
    },

    modalOverlay: {

        position: "fixed",

        top: 0,

        left: 0,

        width: "100%",

        height: "100%",

        background:
            "rgba(0,0,0,0.5)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"
    },

    modal: {

        width: "450px",

        background: "white",

        borderRadius: "15px",

        padding: "25px"
    },

    textarea: {

        width: "100%",

        height: "120px",

        padding: "10px",

        marginTop: "15px",

        marginBottom: "15px",

        boxSizing: "border-box"
    },

    modalButtons: {

        display: "flex",

        justifyContent: "flex-end",

        gap: "10px"
    },

    cancelBtn: {

        padding: "10px 15px",

        border: "none",

        borderRadius: "8px",

        cursor: "pointer"
    }
};

export default PendingTimesheets;