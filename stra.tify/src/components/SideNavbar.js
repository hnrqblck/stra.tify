import React from 'react';
import { Flex, Spacer, Center } from '@chakra-ui/react'
import { ReactComponent as HexagonoColorido } from '../assets/images/hexagono-colorido.svg';
import { ReactComponent as HexIcon } from '../assets/images/hexIcon.svg'
import { HomeIcon, AccountIcon, ExitIcon } from './CreateIcon';
import { SettingsIcon } from '@chakra-ui/icons'
import '../styles/podcast.scss';

const SideNavbar = () => {
    return (
        <Flex id='side-navbar'>
            <Center w='305px' h='900px' bg='#B7ECBC'>
                <HexagonoColorido className='hex'/>
                
                <nav className='container'>
                    <div>
                        <HomeIcon boxSize={30} />
                        <span>Início</span>
                    </div>
                    <div className='podcasts'>
                        <HexIcon/>
                        <span>Podcasts</span>
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
