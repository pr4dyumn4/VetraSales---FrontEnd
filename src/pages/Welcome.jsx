import React from 'react'
import { useNavigate } from 'react-router-dom';
function Welcome() {
    const navigate = useNavigate()
    return (<div className='container'>
    <h1>Welcome</h1>
    <form className='welcome-card'>
        <button onClick={() => navigate('/sign_in_page')}>Sign In</button>
        <button onClick={() => navigate('/sign_up_page')}>Sign Up</button>
    </form>
</div>
);
}

export default Welcome;
