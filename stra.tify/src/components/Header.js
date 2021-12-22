import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.scss';
import { Button } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Header = (props) => {

    function handleClick(event) {
        event.preventDefault();
    }

    return (
        <header className="header">
            <nav className='container'>
                <Link className='logo' to="/">Stra.tify</Link>
                <Link className={props.inicio} to="/">Início</Link>
                <Link className={props.sobre} to="/AboutUs">Sobre</Link>
                {/* <Link to={props.sobre} activeIdName="page-aboutus">Sobre</Link> */}
                <Link className={props.podcaster} to="/podcaster">Para Podcaster</Link>
                <Link className={props.login} to="/login">    
                    <Button 
                        rightIcon={<ChevronRightIcon color='#EC2390'/>}
                        variant='outline'
                        borderRadius='100px'
                        borderColor='#EC2390'
                        color='#EC2390'
                        _hover={{ borderColor: 'black', transition: '200ms ease' }}
                        >
                        Entrar
                    </Button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
