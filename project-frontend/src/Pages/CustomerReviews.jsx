
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

/*Once you login as a vendor you are taken to this page, you can view all items and their reviews here */


export default function CustomerReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {

            const token = localStorage.getItem("token");
            if(!token){
                setError("Unauthorized: Please log in to view reviews.");
                setLoading(false);
                return;
                }

            try {
               const res = await fetch("http://localhost:5000/reviews/customerreviews", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token,
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error("Failed to fetch reviews");
                } else{
                    if(Array.isArray(data.data)){
                        setReviews(data.data);
                        }
                    else{
                        setReviews([]);
                        }
                    }
                    
    
            } 
            
            catch (err) {
                setError(err.message);
            } 
            

            setLoading(false);

        };

        fetchReviews();
    }, []);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) return <p style={{ color: "red"}}>{error}</p>;

    return (

        <div>
            <h2>View Customer Reviews Below:</h2>

            <nav>
                <ul>
                    
                    <Link className="btn" to="/additem">Add Item</Link>
                    
                </ul>
            
            </nav>

            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <p>No reviews available.</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="review-card">
                            <h3>Item: {review.item.name}</h3>
                            <p><strong>Reviewed by:</strong> {review.name}</p>
                            <p><strong>Review:</strong> {review.review}</p>
                        </div>
                    ))
                )}
            </div>
          
        </div>

    );

}