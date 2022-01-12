import React from 'react';
import { Flex, Spacer, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { ReactComponent as HexagonoColorido } from '../assets/images/logo-svg.svg';
import { HomeIcon, AccountIcon, ExitIcon, HexIcon } from './CreateIcon';
import { SettingsIcon } from '@chakra-ui/icons'
import '../styles/sidenavbar.scss';
import '../styles/responsive.scss';

function logOff() {
    localStorage.removeItem('Access_Token');
    localStorage.removeItem('Refresh_Token');
}

const SideNavbar = (props) => {
    return (
        <Flex id='side-navbar'>
            <Center h='900px' bg='#B7ECBC'>
                <HexagonoColorido className='hex'/>
                
                <nav className='container'>
                    <div className='hover'>
                        <Link className={props.podcastHome} to="/podcast-home/">  
                            <HomeIcon boxSize={30} />
                            <span>Início</span>
                        </Link>
                    </div>
                    <div className='podcasts hover' >
                        <Link className={props.podcasts} to="/podcasts"> 
                            <HexIcon boxSize={30}/>
                            <span>Podcasts</span>
                        </Link>
                    </div>
                    {/* <div>
                        <SettingsIcon w={30} h={30}/>
                        <span>Configurações</span>
                    </div> */}
                    <div className='hover'>
                        <Link className={props.home} to="/" onClick={logOff}>
                            <ExitIcon boxSize={30} />
                            <span>Sair</span>
                        </Link>
                    </div>
                </nav>
            </Center>
        </Flex>
    );
};

export default SideNavbar;
