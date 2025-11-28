import { Link } from 'react-router-dom';

export default function NavigationBar() {

    return ( //Navigation Bar
        <div>
            <h1>Review Place</h1>
            <nav>
                <div style ={{ display: 'flex', alignItems: 'center',  gap: '10px' }}>
                <Link to="/">Home</Link> | {" "}
                <Link to="/login">Login</Link> | {" "}
                <Link to="/itemreview">Reviews</Link> | {" "}

                
                </div>
    
            </nav>
            <br/>
            <hr />



        </div>
    );
}