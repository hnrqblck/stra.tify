import React from 'react';
import { Flex, Spacer, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { ReactComponent as HexagonoColorido } from '../assets/images/hexagono-colorido.svg';
import { ReactComponent as HexIcon } from '../assets/images/hexIcon.svg'
import { HomeIcon, AccountIcon, ExitIcon } from './CreateIcon';
import { SettingsIcon } from '@chakra-ui/icons'
import '../styles/sidenavbar.scss';

const SideNavbar = (props) => {
    return (
        <Flex id='side-navbar'>
            <Center h='900px' bg='#B7ECBC'>
                <HexagonoColorido className='hex'/>
                
                <nav className='container'>
                    <div>
                        <Link className={props.podcastHome} to="/podcast-home">  
                            <HomeIcon boxSize={30} />
                            <span>Início</span>
                        </Link>
                    </div>
                    <div className='podcasts'>
                        <Link className={props.podcasts} to="/podcasts"> 
                            <HexIcon/>
                            <span>Podcasts</span>
                        </Link>
                    </div>
                    <div >
                        <AccountIcon boxSize={30}/>
                        <span>Minha conta</span>
                    </div>
                    <div>
                        <SettingsIcon w={30} h={30}/>
                        <span>Configurações</span>
                    </div>
                    <div>
                        <ExitIcon boxSize={30} />
                        <span>Sair</span>
                    </div>
                </nav>
            </Center>
        </Flex>
    );
};

export default SideNavbar;
