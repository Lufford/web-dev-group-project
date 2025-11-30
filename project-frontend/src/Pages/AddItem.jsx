/*This component renders a form to add a new item. */
import React, { useState } from "react";

export default function AddItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:3000/items", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: token,
                },

                body: JSON.stringify({
                    name,
                    price,
                }),
            
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || "Failed to create item"); 
            }

            else {
                setMessage("Item created");
                setName("");
                setPrice("");
            }
        }
        
        catch (error) {
            setMessage("Server error. Try again later.");
        }

        setLoading(false);

    };

    return (
        <div>
            <h2>Add a new item for customers to review!</h2>

            <form onSubmit = {handleSubmit}>
                <input
                    type="text"
                    placeholder ="Item Name"
                    value={name}
                    onChange={(e) => setName (e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder ="Price"
                    value={price}
                    onChange={(e) => setPrice (e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding" : "Add Item"}
                </button>
            </form>
          
        </div>

    );

}