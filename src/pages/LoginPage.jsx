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

            alert("Invalid Email or Password");
        }
    };

    return (
        <div>
            <h2>Employee Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
}

export default LoginPage;