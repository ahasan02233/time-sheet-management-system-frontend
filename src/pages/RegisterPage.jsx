import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/api/employees/register",
                employee
            );

            alert(response.data.message);

            setEmployee({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "USER"
            });

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (

        <div style={styles.container}>

            <form style={styles.form} onSubmit={handleSubmit}>

                <h2 style={styles.heading}>
                    Employee Registration
                </h2>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={employee.firstName}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={employee.lastName}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={employee.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={employee.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.registerButton}>
                    Register
                </button>

                <p style={styles.text}>
                    Already an Employee?
                </p>

                <button
                    type="button"
                    style={styles.loginButton}
                    onClick={() => navigate("/login")}
                >
                    Go To Login
                </button>

            </form>

        </div>
    );
}

const styles = {

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4"
    },

    form: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
    },

    heading: {
        textAlign: "center"
    },

    input: {
        padding: "10px",
        fontSize: "16px"
    },

    registerButton: {
        padding: "10px",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "16px"
    },

    loginButton: {
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "16px"
    },

    text: {
        textAlign: "center",
        margin: "0"
    }
};

export default RegisterPage;