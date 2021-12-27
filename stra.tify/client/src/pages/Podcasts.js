import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import SideNavbar from '../components/SideNavbar';
import BomDia from '../assets/images/bomdia.png';
import Mamilos from '../assets/images/mamilos.png';
import ManoAMano from '../assets/images/manoamano.png';
import NaoIviabilize from '../assets/images/nao-inviabilize.png';
import '../styles/podcasts.scss'

const Podcasts = () => {
    return (
        <div id='podcasts-page'>
            <SideNavbar className='sidenav'/>

            <main>
                <h1>Podcasts</h1>
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='grey' />}
                    />
                    <Input type='text' placeholder='Buscar por título' />
                </InputGroup>
                <section className='podcasts'>
                    <img src={BomDia} alt='Capa podcast'/>
                    <img src={Mamilos} alt='Capa podcast'/>
                    <img src={ManoAMano} alt='Capa podcast'/>
                    <img src={NaoIviabilize} alt='Capa podcast'/>
                    <img src={BomDia} alt='Capa podcast'/>
                    <img src={Mamilos} alt='Capa podcast'/>
                </section>
            </main>
        </div>
    );
};

export default Podcasts;
