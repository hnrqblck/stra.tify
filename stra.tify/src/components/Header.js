import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';
import RoundButton from './RoundButton';

const Header = () => {

    function handleClick(event) {
        event.preventDefault();
    }

    return (
        <header className="header">
            <nav className='container'>
                <Link className='logo' to="/">Stra.tify</Link>
                <Link className='active' to="/">Início</Link>
                <Link to="/login">Sobre</Link>
                <Link to="/podcaster">Para Podcaster</Link>
                <RoundButton onClick={handleClick} text='Entrar >' class='outlined'/>
            </nav>
        </header>
    );
};

export default Header;
