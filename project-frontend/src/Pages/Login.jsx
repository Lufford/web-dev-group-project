
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

/*Vendors must login to continue and then are taken to the home page for vendors: /customerreviews */


export default function Login() {

    ///state variables for email, password, error message
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleLogin = async () => {
    console.log("button clicked");
setError("");
try {
    console.log("Login request sent");

    const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),

        
    });

    const data = await res.json();

    if (!res.ok) {
        setError(data.error ||"Login Incorrect");
     
    }

    /// login succsessful
    else if (data.token) {

        console.log("Login successful:", data);

    
        ///stores token in local storage
        localStorage.setItem("token", data.token);

        ///moves to customer reviews page
        navigate('/customerreviews');

    }
    
    else{
        setError("Login Failed: Unauthorized Credentials");

    
    }
 




    ///catches errors
} catch (error) {
    setError("Server error: Login Failure");
    console.error("Error during login:", error);
}
} 

    
    if (error) return <p style={{ color: "red"}}>{error}</p>;

    return (

        <div>
            <h2>Please login using your Vendor Email and Password:</h2>

            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br/>

            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br/>

            <button className="btn" onClick={handleLogin}>Login</button>

            
          
        </div>

    );

}