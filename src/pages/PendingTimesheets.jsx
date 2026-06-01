import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PendingTimesheets() {

    const navigate = useNavigate();

    const [timesheets, setTimesheets] = useState([]);

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

    const approveTimesheet = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.put(
                `http://localhost:8080/manager/approve/${id}`,
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

            fetchPendingTimesheets();

        } catch (error) {

            console.log(error);
        }
    };

    const rejectTimesheet = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.put(
                `http://localhost:8080/manager/reject/${id}`,
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

            fetchPendingTimesheets();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div style={styles.page}>

            <h1>
                Pending Timesheets
            </h1>

            <input
                type="text"
                placeholder="Manager Comment"
                value={comment}
                onChange={(e) =>
                    setComment(e.target.value)
                }
                style={styles.input}
            />

            <table style={styles.table}>

                <thead>

                <tr>

                    <th>Name</th>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Task</th>
                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {
                    timesheets.map((item) => (

                        <tr key={item.id}>

                            <td>{item.employeeName}</td>
                            <td>{item.workDate}</td>
                            <td>{item.hoursWorked}</td>
                            <td>{item.taskDescription}</td>

                            <td>

                                <button
                                    style={styles.approve}
                                    onClick={() =>
                                        approveTimesheet(item.id)
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    style={styles.reject}
                                    onClick={() =>
                                        rejectTimesheet(item.id)
                                    }
                                >
                                    Reject
                                </button>

                            </td>

                        </tr>
                    ))
                }

                </tbody>

            </table>

            <button
                style={styles.back}
                onClick={() =>
                    navigate("/manager-dashboard")
                }
            >
                Back
            </button>

        </div>
    );
}

const styles = {

    page: {
        padding: "30px"
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "20px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    approve: {
        marginRight: "10px",
        padding: "8px 15px",
        background: "green",
        color: "white",
        border: "none"
    },

    reject: {
        padding: "8px 15px",
        background: "red",
        color: "white",
        border: "none"
    },

    back: {
        marginTop: "20px",
        padding: "12px 20px"
    }
};

export default PendingTimesheets;