/*This component renders a form to add a new item. */

import React, { useState, useEffect } from "react";

export default function AddItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [items, setItems] = useState([]);

    const [editItem, setEditItem] = useState(null);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const loadItems = async () => {
            if (!token) return;

            try {
                const res = await fetch ("http://localhost:3000/items", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                });

                if (!res.ok) {
                    setItems([]);
                    return;
                }

                const data = await res.json();

                if (data.status === "ok") {
                    setItems(data.data);
                }

                else {
                    setItems([]);
                }
            }

            catch (error) {
                setMessage("Error Loading Items");
            }
        };

        loadItems();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const editing = Boolean(editItem);

        const url = editing
            ? `http://localhost:3000/items/${editItem}`
            : "http://localhost:3000/items";

        const method = editing ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method: method,
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
                setMessage(data.error || "Failed to save item"); 
            }

            else {
                setMessage(editing ? "Item updated" : "Item created");

                if (editing) {
                    setItems((prev) =>
                        prev.map((item) =>
                            item._id === editItem ? data.newItem : item
                        )
                    );
                }

                else {
                    setItems((prev) => [...prev, data.data]);
                }

                setEditItem(null);
                setName("");
                setPrice("");
            }
        }
        
        catch (error) {
            setMessage("Server error. Try again later.");
        }

        setLoading(false);

    };

    const startEdit = (item) => {
        setEditItem(item._id);
        setName(item.name);
        setPrice(item.price);
        setMessage(`Editing "${item.name}"`);
    }

    //Delete
    const deleteItem = async (id) => {
        if (!window.confirm("Delete?")) return;

        try {
            const res = await fetch(`http://localhost:3000/items/${id}`, {
                method: "DELETE",
                headers: { token: token },
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setMessage(data.error || "Deleting Failed");
            }

            else {
                setItems((prev) => prev.filter ((item) => item._id !== id));
                setMessage("Deleted");
            }
        }

        catch (error) {
            setMessage("Server Error Deleting");
        }
    };

    return (
        <div>
            <h2>{editItem ? "Edit Item" : "Add Item"}</h2>

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
                    {loading 
                    ? editItem ? "Saving" : "Adding"
                    : editItem ? "Save Changes" : "Add Item"}
                </button>
            </form>

            {message && <p>{message}</p>}

            <h3> VENDOR ITEMS </h3>
            
            <div className="card-container">
                <div className="card-list">
                    {items.length === 0 ? (
                        <p>No Items</p>
                    ) : (
                        items.map((item) => (
                            <div key={item._id} className="card">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <button onClick={() => startEdit(item)}>Edit</button>
                                <button onClick={() => deleteItem(item._id)}>Delete</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

}