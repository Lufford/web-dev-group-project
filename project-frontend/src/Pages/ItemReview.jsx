/*Once "Customer" is clicked on the home page, customers are brought to item review where they can review an item*/
import React, { useEffect, useState } from "react";

export default function ItemReview() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("http://localhost:3000/items");

                if (!res.ok) {
                    throw new Error("Failed to fetch items");
                }

                const data = await res.json();

                if (data.status == "ok") {
                    setItems([data.data]);
                }

                else {
                    setItems([]);
                }
            }

            catch (err) {
                setError(err.message);
            }

            finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) return <p>Loading items...</p>;

    if (error) return <p style={{ color: "red"}}>{error}</p>;

    return (

        <div className = "itemReview-container">
            <h2>Give us reviews on the items below!</h2>
            <div className="itemReview-list">
                {items.length === 0 ? (
                    <p>No Items Available</p>
                ) : (
                    items.map((item) => (
                        <div key= {item._id} className = "itemReview-card">
                            <h3>{item.name}</h3>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}