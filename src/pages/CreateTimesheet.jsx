// src/pages/CreateTimesheet.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateTimesheet() {

    const navigate = useNavigate();

    const [timesheet, setTimesheet] = useState({

        email: localStorage.getItem("email"),

        workDate: "",

        hoursWorked: "",

        taskDescription: ""
    });

    const handleChange = (e) => {

        setTimesheet({

            ...timesheet,

            [e.target.name]: e.target.value
        });
    };

    const submitTimesheet = async () => {

        try {

            await axios.post(

                "http://localhost:8080/api/employees/timesheet/create",

                timesheet
            );

            alert("Timesheet Submitted Successfully");

            setTimesheet({

                email: localStorage.getItem("email"),

                workDate: "",

                hoursWorked: "",

                taskDescription: ""
            });

        } catch (error) {

            console.log(error);

            alert("Failed To Submit Timesheet");
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2>Create Timesheet</h2>

                <label>
                    Work Date
                </label>

                <input

                    type="date"

                    name="workDate"

                    value={timesheet.workDate}

                    onChange={handleChange}

                    style={styles.input}
                />

                <label>
                    Hours Worked
                </label>

                <input

                    type="number"

                    name="hoursWorked"

                    placeholder="Enter Hours"

                    value={timesheet.hoursWorked}

                    onChange={handleChange}

                    style={styles.input}
                />

                <label>
                    Task Description
                </label>

                <textarea

                    name="taskDescription"

                    placeholder="Describe your work"

                    value={timesheet.taskDescription}

                    onChange={handleChange}

                    style={styles.textarea}
                />

                <button

                    style={styles.submitButton}

                    onClick={submitTimesheet}
                >
                    Submit Timesheet
                </button>

                <button

                    style={styles.backButton}

                    onClick={() =>
                        navigate("/employee-dashboard")
                    }
                >
                    Back
                </button>

            </div>

        </div>
    );
}

const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "50px"
    },

    card: {
        width: "500px",
        padding: "30px",
        boxShadow: "0px 0px 10px lightgray",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },

    input: {
        padding: "10px",
        fontSize: "16px"
    },

    textarea: {
        minHeight: "120px",
        padding: "10px",
        fontSize: "16px"
    },

    submitButton: {
        padding: "12px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px"
    },

    backButton: {
        padding: "12px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px"
    }
};

export default CreateTimesheet;