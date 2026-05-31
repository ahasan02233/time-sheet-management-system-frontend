import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTimesheet() {

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);

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

    const handleDateChange = (date) => {

        setSelectedDate(date);

        setTimesheet({
            ...timesheet,
            workDate: date.toISOString().split("T")[0]
        });
    };

    const submitTimesheet = async () => {

        try {

            await axios.post(
                "http://localhost:8080/api/employees/timesheet/create",
                timesheet
            );

            alert("Timesheet Submitted Successfully");

            navigate("/employee-dashboard");

        } catch (error) {

            console.log(error);

            alert("Failed To Submit Timesheet");
        }
    };

    return (

        <div style={styles.page}>

            <div style={styles.card}>

                <div style={styles.header}>

                    <div style={styles.iconBox}>
                        📝
                    </div>

                    <div>
                        <h1 style={styles.heading}>
                            CREATE TIMESHEET
                        </h1>

                        <p style={styles.subHeading}>
                            Submit your daily work details
                        </p>
                    </div>

                </div>

                <div style={styles.formSection}>

                    <label style={styles.label}>
                        Work Date
                    </label>

                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Work Date"
                        className="datePickerInput"
                        maxDate={new Date()}
                    />

                    <label style={styles.label}>
                        Hours Worked
                    </label>

                    <input
                        type="number"
                        name="hoursWorked"
                        placeholder="Enter Hours Worked"
                        value={timesheet.hoursWorked}
                        onChange={handleChange}
                    />

                    <label style={styles.label}>
                        Task Description
                    </label>

                    <textarea
                        name="taskDescription"
                        placeholder="Describe your work completed today..."
                        value={timesheet.taskDescription}
                        onChange={handleChange}
                        style={styles.textarea}
                    />

                    <button
                        style={styles.submitButton}
                        onClick={submitTimesheet}
                    >
                        💾 SAVE TIMESHEET
                    </button>

                    <button
                        style={styles.backButton}
                        onClick={() =>
                            navigate("/employee-dashboard")
                        }
                    >
                        ← BACK TO DASHBOARD
                    </button>

                </div>

            </div>

        </div>
    );
}

const styles = {

    page: {

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "40px",

        background:
            "linear-gradient(135deg,#0f172a,#0f4cdb,#6d28d9)"
    },

    card: {

        width: "850px",

        backgroundColor: "white",

        borderRadius: "25px",

        overflow: "hidden",

        boxShadow:
            "0 15px 40px rgba(0,0,0,0.25)"
    },

    header: {

        background:
            "linear-gradient(135deg,#001f4d,#003b8e)",

        color: "white",

        padding: "35px",

        display: "flex",

        alignItems: "center",

        gap: "20px"
    },

    iconBox: {

        width: "80px",

        height: "80px",

        borderRadius: "50%",

        background:
            "rgba(255,255,255,0.15)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        fontSize: "38px"
    },

    heading: {

        margin: 0,

        fontSize: "38px",

        fontWeight: "700"
    },

    subHeading: {

        marginTop: "8px",

        fontSize: "18px",

        color: "#dbeafe"
    },

    formSection: {

        padding: "35px"
    },

    label: {

        display: "block",

        marginBottom: "8px",

        marginTop: "18px",

        fontWeight: "600",

        color: "#1e293b",

        fontSize: "16px"
    },

    textarea: {

        minHeight: "170px",

        resize: "none"
    },

    submitButton: {

        width: "100%",

        marginTop: "30px",

        padding: "15px",

        border: "none",

        borderRadius: "12px",

        background:
            "linear-gradient(90deg,#2563eb,#7c3aed)",

        color: "white",

        fontSize: "18px",

        fontWeight: "600",

        cursor: "pointer"
    },

    backButton: {

        width: "100%",

        marginTop: "15px",

        padding: "15px",

        border: "2px solid #2563eb",

        borderRadius: "12px",

        backgroundColor: "white",

        color: "#2563eb",

        fontSize: "18px",

        fontWeight: "600",

        cursor: "pointer"
    }
};

export default CreateTimesheet;