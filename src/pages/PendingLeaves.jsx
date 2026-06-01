import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PendingLeaves() {

    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedLeaveId, setSelectedLeaveId] = useState(null);
    const [actionType, setActionType] = useState("");
    const [managerComment, setManagerComment] = useState("");

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:8080/manager/leave/pending",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLeaves(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed To Load Leaves");
        }
    };

    const openModal = (leaveId, action) => {

        setSelectedLeaveId(leaveId);
        setActionType(action);
        setManagerComment("");
        setShowModal(true);
    };

    const submitAction = async () => {

        try {

            const token = localStorage.getItem("token");

            const url =
                actionType === "APPROVE"
                    ? `http://localhost:8080/manager/leave/${selectedLeaveId}/approve`
                    : `http://localhost:8080/manager/leave/${selectedLeaveId}/reject`;

            await axios.put(
                url,
                {
                    managerComment: managerComment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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

            <div style={styles.card}>

                <h1 style={styles.heading}>
                    Pending Leave Requests
                </h1>

                <table style={styles.table}>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Total Days</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {leaves.length > 0 ? (

                            leaves.map((leave) => (

                                <tr key={leave.id}>

                                    <td>{leave.employeeName}</td>

                                    <td>{leave.fromDate}</td>

                                    <td>{leave.toDate}</td>

                                    <td>{leave.totalDays}</td>

                                    <td>{leave.reason}</td>

                                    <td>

                                        <button
                                            style={styles.approve}
                                            onClick={() =>
                                                openModal(
                                                    leave.id,
                                                    "APPROVE"
                                                )
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            style={styles.reject}
                                            onClick={() =>
                                                openModal(
                                                    leave.id,
                                                    "REJECT"
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="6"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >
                                    No Pending Leaves
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

                <button
                    style={styles.back}
                    onClick={() =>
                        navigate("/manager-dashboard")
                    }
                >
                    Back To Dashboard
                </button>

            </div>

            {showModal && (

                <div style={styles.modalOverlay}>

                    <div style={styles.modal}>

                        <h2>
                            {actionType === "APPROVE"
                                ? "Approve Leave"
                                : "Reject Leave"}
                        </h2>

                        <textarea
                            style={styles.textarea}
                            placeholder="Enter Manager Comment"
                            value={managerComment}
                            onChange={(e) =>
                                setManagerComment(
                                    e.target.value
                                )
                            }
                        />

                        <div style={styles.modalButtons}>

                            <button
                                style={styles.cancelBtn}
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                Cancel
                            </button>

                            <button
                                style={
                                    actionType === "APPROVE"
                                        ? styles.approve
                                        : styles.reject
                                }
                                onClick={submitAction}
                            >
                                Submit
                            </button>

                        </div>

                    </div>

                </div>

            )}

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
        background: "white",
        borderRadius: "20px",
        padding: "25px"
    },

    heading: {
        marginBottom: "20px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    approve: {
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        marginRight: "10px"
    },

    reject: {
        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer"
    },

    back: {
        marginTop: "20px",
        padding: "12px 20px",
        border: "none",
        borderRadius: "8px",
        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",
        color: "white",
        cursor: "pointer"
    },

    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
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

export default PendingLeaves;