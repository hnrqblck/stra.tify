import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Logo from '../assets/images/logo.png';
import '../styles/header.scss';
import '../styles/responsive.scss';

const Header = (props) => {

    return (
        <header className="header">
            <nav className='container'>
                <Link className='logo' to="/"> <img src={Logo} alt='stratify logo'/>stra.tify</Link>
                <div className='menu'>
                    <a className={props.inicio} href="#page-home">Início</a>
                    <a className={props.sobre} href="#aboutUs" >Sobre</a>
                    <a className={props.podcaster} href="#podcaster">Para Podcaster</a>
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
                </div>
            </nav>
        </header>
    );
};

export default Header;
