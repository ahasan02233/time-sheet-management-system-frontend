// src/pages/ManagerDashboard.jsx

import React, {
    useEffect,
    useState
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {

    const navigate = useNavigate();

    const [pending, setPending] = useState([]);

    useEffect(() => {

        loadPending();

    }, []);

    const loadPending = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(

                "http://localhost:8080/manager/pending",

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setPending(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed To Load Pending Timesheets");
        }
    };

    const approve = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.put(

                `http://localhost:8080/manager/approve/${id}`,

                {
                    comment: "Approved"
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Timesheet Approved");

            loadPending();

        } catch (error) {

            console.log(error);

            alert("Approval Failed");
        }
    };

    const reject = async (id) => {

        try {

            const token =
                localStorage.getItem("token");

            await axios.put(

                `http://localhost:8080/manager/reject/${id}`,

                {
                    comment: "Rejected"
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert("Timesheet Rejected");

            loadPending();

        } catch (error) {

            console.log(error);

            alert("Reject Failed");
        }
    };

    const logout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <div style={styles.container}>

            <h1>
                Manager Dashboard
            </h1>

            <h2>
                Pending Timesheets
            </h2>

            {
                pending.length > 0 ?

                    pending.map((item) => (

                        <div
                            key={item.id}
                            style={styles.card}
                        >

                            <h3>
                                Employee: {item.employeeName}
                            </h3>

                            <p>
                                Date: {item.workDate}
                            </p>

                            <p>
                                Hours: {item.hoursWorked}
                            </p>

                            <p>
                                Task: {item.taskDescription}
                            </p>

                            <button
                                style={styles.approveBtn}
                                onClick={() =>
                                    approve(item.id)
                                }
                            >
                                Approve
                            </button>

                            <button
                                style={styles.rejectBtn}
                                onClick={() =>
                                    reject(item.id)
                                }
                            >
                                Reject
                            </button>

                        </div>

                    ))

                    :

                    <h3>
                        No Pending Timesheets
                    </h3>
            }

            <br />

            <button
                style={styles.logoutBtn}
                onClick={logout}
            >
                Logout
            </button>

        </div>
    );
}

const styles = {

    container: {
    padding: "30px",
    minHeight: "100vh"
},

    card: {
        border: "1px solid lightgray",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px"
    },

    approveBtn: {
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "10px",
        marginRight: "10px",
        cursor: "pointer"
    },

    rejectBtn: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "10px",
        cursor: "pointer"
    },

    logoutBtn: {
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        padding: "12px",
        cursor: "pointer"
    }
};

export default ManagerDashboard;