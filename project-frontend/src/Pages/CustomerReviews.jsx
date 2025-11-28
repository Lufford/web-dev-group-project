import React from 'react';
import { Link } from 'react-router-dom';
/*Once you login as a vendor you are taken to this page, you can view all items and their reviews here */


export default function CustomerReviews() {
    return (

        <div>
            <h2>View Customer Reviews Below:</h2>

            <nav>
                <ul>
                    
                    <Link className="btn" to="/additem">Add Item</Link>
                    
                </ul>
            
            </nav>
          
        </div>

    );

}