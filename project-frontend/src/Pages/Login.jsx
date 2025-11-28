import React from 'react';
import { Link } from 'react-router-dom';

/*Vendors must login to continue and then are taken to the home page for vendors: /customerreviews */


export default function Login() {
    return (

        <div>
            <h2>Please login using your Vendor Email and Password:</h2>

                <nav>
                    <ul>
                                
                     <Link className="btn" to="/customerreviews">Login</Link> 
                     *BUTTON IS TEMPORARY - NEEDS AUTHENTICATION ADDED*
                                
                    </ul>
                        
                </nav>

            
          
        </div>

    );

}