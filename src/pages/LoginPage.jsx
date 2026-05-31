import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:8080/api/employees/login",
                loginData
            );

            localStorage.setItem(
                "employeeName",
                response.data.employeeName
            );

            localStorage.setItem(
                "email",
                response.data.email
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert(response.data.message);

            if (response.data.role === "MANAGER") {

                navigate("/manager-dashboard");

            } else {

                navigate("/employee-dashboard");
            }

        } catch (error) {

            console.log(error);

            alert("Invalid Email Or Password");
        }
    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h1 style={styles.title}>
                    TimeSheet Management System
                </h1>

                <h3 style={styles.subtitle}>
                    Employee Login
                </h3>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={loginData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={loginData.password}
                        onChange={handleChange}
                        style={styles.input}
                    />

                    <button
                        type="submit"
                        style={styles.loginBtn}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        style={styles.registerBtn}
                        onClick={() => navigate("/register")}
                    >
                        Register New User
                    </button>

                </form>

            </div>

        </div>
    );
}

const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
            "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
    },

    card: {
        backgroundColor: "white",
        padding: "40px",
        width: "400px",
        borderRadius: "15px",
        boxShadow: "0px 8px 20px rgba(0,0,0,0.3)"
    },

    title: {
        textAlign: "center",
        color: "#1e3c72",
        marginBottom: "10px"
    },

    subtitle: {
        textAlign: "center",
        marginBottom: "25px"
    },

    input: {
        width: "100%",
        padding: "12px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "15px",
        boxSizing: "border-box"
    },

    loginBtn: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#1976d2",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        marginBottom: "10px"
    },

    registerBtn: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#43a047",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer"
    }
};

export default LoginPage;