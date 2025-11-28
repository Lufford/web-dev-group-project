import React from 'react';
import { Link } from 'react-router-dom';


/*Users pick Vendor or Customer*/


export default function Home() {
    return (

        <div>
            <h2>Click one of the options below:</h2>
            <nav>
                <ul>
                    
                    <Link className="btn" to="/login">Vendor</Link>
                    
                    <Link className="btn" to="/itemreview">Customer</Link>
                    
                </ul>
            
            </nav>
        </div>

    );

}