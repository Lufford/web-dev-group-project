/*Once "Customer" is clicked on the home page, customers are brought to item review where they can review an item*/
import React, { useEffect, useState } from "react";

export default function ItemReview() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reviews, setReviews] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("https://web-dev-group-project-backend.onrender.com/items/public");

                if (!res.ok) {
                    throw new Error("Failed to fetch items");
                }

                const data = await res.json();

                if (data.status == "ok") {
                    setItems(data.data);
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

    //handle review changes
    const handleReviewChange = (itemId, field, value) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [itemId]: {
                ...prevReviews[itemId],
                [field]: value,
            },
        }));
    }

    //handle review submission
    const handleSubmitReview = async (itemId) => {
        const reviewData = reviews[itemId];

        if (!reviewData || !reviewData.name || !reviewData.review) {
            setMessage("Please fill in all review fields");
            return;
        }

        const bodyData = {
            name: reviewData.name, 
            review: reviewData.review, 
            item: itemId};

        try {
            const res = await fetch(`https://web-dev-group-project-backend.onrender.com/reviews`, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(bodyData),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.error || "Failed to submit review");
            }

            else {
                setMessage("Review submitted successfully");
                setReviews((prevReviews) => ({
                    ...prevReviews,
                    [itemId]: { name: "", review: "" },
                }));
            }
        }

        catch (error) {
            setMessage("Server error. Try again later.");
        }
    }

    ///check for token

 

    // messages

    if (loading) return <p>Loading items...</p>;

    if (error) return <p style={{ color: "red"}}>{error}</p>;
    

    return (

        <div className="Item">
            <div className = "card-container">
                <h2>Give us reviews on the items below!</h2>
                
                <div className="card-list">
                    {items.length === 0 ? (
                        <p>No Items Available</p>
                    ) : (
                        items.map((item) => (
                            <div key= {item._id} className = "card">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>

                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={reviews[item._id]?.name || ""}
                                    onChange={(e) => handleReviewChange(item._id,"name", e.target.value)}
                                />

                                <textarea
                                    type="text"
                                    placeholder="Your Review"
                                    value={reviews[item._id]?.review || ""}
                                    onChange={(e) => handleReviewChange(item._id,"review", e.target.value)}
                                />

                                <button onClick={() => handleSubmitReview(item._id)}>Submit Review</button>
                            </div>
                        ))
                    )}
                </div>

            </div>
            
            {message && <p>{message}</p>}           
        </div>
        

       
    );
}