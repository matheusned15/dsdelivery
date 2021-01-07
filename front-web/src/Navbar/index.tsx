import './styles.css';
import { ReactComponent as Logo } from './logo.svg';
import React from 'react';

function Navbar(){
    return (
        <nav className="main-navbar">
            <Logo />
        
        </nav>
    )
}

export default Navbar;