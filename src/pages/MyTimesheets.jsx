// src/pages/MyTimesheets.jsx

import React, {
    useEffect,
    useState
} from "react";

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

        <div style={styles.container}>

            <h1>
                My Timesheets
            </h1>

            <table style={styles.table}>

                <thead>

                <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    <th>Task Description</th>
                    <th>Status</th>
                    <th>Manager Comment</th>
                </tr>

                </thead>

                <tbody>

                {
                    timesheets.length > 0 ?

                        timesheets.map((item) => (

                            <tr key={item.id}>

                                <td>{item.workDate}</td>

                                <td>{item.hoursWorked}</td>

                                <td>{item.taskDescription}</td>

                                <td>{item.status}</td>

                                <td>{item.managerComment}</td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="5">

                                No Timesheets Found

                            </td>

                        </tr>
                }

                </tbody>

            </table>

            <br />

            <button
                style={styles.button}
                onClick={() =>
                    navigate("/employee-dashboard")
                }
            >
                Back To Dashboard
            </button>

        </div>
    );
}

const styles = {

    container: {
        padding: "30px"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    button: {
        padding: "12px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px"
    }
};

export default MyTimesheets;