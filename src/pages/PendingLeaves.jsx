import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PendingLeaves() {

    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [selectedLeaveId, setSelectedLeaveId] =
        useState(null);

    const [actionType, setActionType] =
        useState("");

    const [managerComment, setManagerComment] =
        useState("");

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "http://localhost:8080/manager/leave/pending",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setLeaves(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed To Load Leaves");
        }
    };

    const openModal = (
        leaveId,
        action
    ) => {

        setSelectedLeaveId(leaveId);

        setActionType(action);

        setManagerComment("");

        setShowModal(true);
    };

    const submitAction = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const url =
                actionType === "APPROVE"
                    ? `http://localhost:8080/manager/leave/${selectedLeaveId}/approve`
                    : `http://localhost:8080/manager/leave/${selectedLeaveId}/reject`;

            await axios.put(
                url,
                {
                    managerComment
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
                    ? "Leave Approved Successfully"
                    : "Leave Rejected Successfully"
            );

            setShowModal(false);

            fetchLeaves();

        } catch (error) {

            console.log(error);

            alert("Operation Failed");
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.container}>

                <h1 style={styles.heading}>
                    Pending Leave Requests
                </h1>

                <div style={styles.tableContainer}>

                    <table style={styles.table}>

                        <thead>

                        <tr>

                            <th style={styles.th}>
                                Employee Name
                            </th>

                            <th style={styles.th}>
                                From Date
                            </th>

                            <th style={styles.th}>
                                To Date
                            </th>

                            <th style={styles.th}>
                                Total Days
                            </th>

                            <th style={styles.th}>
                                Reason
                            </th>

                            <th style={styles.th}>
                                Action
                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            leaves.length > 0 ?

                                leaves.map((leave) => (

                                    <tr
                                        key={leave.id}
                                        style={styles.row}
                                    >

                                        <td style={styles.td}>
                                            {leave.employeeName}
                                        </td>

                                        <td style={styles.td}>
                                            {leave.fromDate}
                                        </td>

                                        <td style={styles.td}>
                                            {leave.toDate}
                                        </td>

                                        <td style={styles.td}>
                                            {leave.totalDays}
                                        </td>

                                        <td style={styles.td}>
                                            {leave.reason}
                                        </td>

                                        <td style={styles.td}>

                                            <button
                                                style={
                                                    styles.approveButton
                                                }
                                                onClick={() =>
                                                    openModal(
                                                        leave.id,
                                                        "APPROVE"
                                                    )
                                                }
                                            >
                                                ✓ Approve
                                            </button>

                                            <button
                                                style={
                                                    styles.rejectButton
                                                }
                                                onClick={() =>
                                                    openModal(
                                                        leave.id,
                                                        "REJECT"
                                                    )
                                                }
                                            >
                                                ✕ Reject
                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={styles.noData}
                                    >
                                        No Pending Leave Requests
                                    </td>

                                </tr>
                        }

                        </tbody>

                    </table>

                </div>

                <button
                    style={styles.backButton}
                    onClick={() =>
                        navigate("/manager-dashboard")
                    }
                >
                    ← Back To Dashboard
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

                            <h2
                                style={
                                    styles.modalTitle
                                }
                            >
                                {

                                    actionType ===
                                    "APPROVE"

                                        ?

                                        "Approve Leave"

                                        :

                                        "Reject Leave"
                                }
                            </h2>

                            <textarea
                                style={
                                    styles.textarea
                                }
                                placeholder="Enter Manager Comment..."
                                value={managerComment}
                                onChange={(e) =>
                                    setManagerComment(
                                        e.target.value
                                    )
                                }
                            />

                            <div
                                style={
                                    styles.modalButtons
                                }
                            >

                                <button
                                    style={
                                        styles.cancelButton
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

        padding: "30px",

        background:
            "linear-gradient(135deg,#0f4cdb,#5a3fff,#8f3bff)"
    },

    container: {

        backgroundColor: "white",

        borderRadius: "25px",

        padding: "30px",

        boxShadow:
            "0px 12px 35px rgba(0,0,0,0.2)"
    },

    heading: {

        fontSize: "40px",

        color: "#0f172a",

        marginBottom: "25px",

        fontWeight: "700"
    },

    tableContainer: {

        overflowX: "auto"
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

        textAlign: "center",

        fontSize: "16px"
    },

    td: {

        padding: "16px",

        textAlign: "center",

        borderBottom:
            "1px solid #e5e7eb"
    },

    row: {

        transition: "0.3s"
    },

    approveButton: {

        backgroundColor: "#16a34a",

        color: "white",

        border: "none",

        padding: "10px 18px",

        borderRadius: "8px",

        cursor: "pointer",

        marginRight: "10px",

        fontWeight: "600"
    },

    rejectButton: {

        backgroundColor: "#dc2626",

        color: "white",

        border: "none",

        padding: "10px 18px",

        borderRadius: "8px",

        cursor: "pointer",

        fontWeight: "600"
    },

    backButton: {

        marginTop: "25px",

        padding: "14px 25px",

        border: "none",

        borderRadius: "10px",

        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",

        color: "white",

        fontSize: "16px",

        cursor: "pointer",

        fontWeight: "600"
    },

    noData: {

        textAlign: "center",

        padding: "25px",

        fontWeight: "600"
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

        backgroundColor: "white",

        borderRadius: "20px",

        padding: "25px"
    },

    modalTitle: {

        marginBottom: "15px"
    },

    textarea: {

        width: "100%",

        height: "120px",

        padding: "12px",

        borderRadius: "10px",

        border:
            "1px solid #d1d5db",

        resize: "none",

        boxSizing: "border-box"
    },

    modalButtons: {

        display: "flex",

        justifyContent: "flex-end",

        gap: "10px",

        marginTop: "15px"
    },

    cancelButton: {

        padding: "10px 15px",

        border: "none",

        borderRadius: "8px",

        cursor: "pointer",

        backgroundColor: "#94a3b8",

        color: "white"
    }
};

export default PendingLeaves;