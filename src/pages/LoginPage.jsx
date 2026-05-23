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

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert("Invalid Email or Password");
        }
    };

    return (

        <div style={styles.container}>

            <form style={styles.form} onSubmit={handleSubmit}>

                <h2 style={styles.heading}>
                    Employee Login
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleChange}
                    style={styles.input}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    style={styles.input}
                />

                <button type="submit" style={styles.loginButton}>
                    Login
                </button>

                <p style={styles.text}>
                    New User?
                </p>

                <button
                    type="button"
                    style={styles.registerButton}
                    onClick={() => navigate("/register")}
                >
                    Go To Register
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

    loginButton: {
        padding: "10px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        cursor: "pointer",
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

    text: {
        textAlign: "center",
        margin: "0"
    }
};

export default LoginPage;