import React from 'react';
import { Button } from '@chakra-ui/react';
import BomDia from '../assets/images/bomdia.png';
import Ep1 from '../assets/images/ep-bomdia.png';
import Ep2 from '../assets/images/ep-bomdia2.png';
import SideNavbar from '../components/SideNavbar';
import '../styles/episodes.scss'

const PodcastEps = () => {

    return (
        <div id='podcast-home--page'>
            <SideNavbar className='sidenav'/>

            <div className='main'>

                <section className='podcast'>
                    <div className='page-top'>
                        <p className='user-greeting'>Olá, nome user.</p>
                    </div>
                    
                    <div className='container'>
                        <div className='pod-img'>
                            <img src={BomDia} alt='Capa podcast'/>
                        </div>
                        <div className='podcast-details'>
                            <p>Podcast</p>
                            <h1>Bom dia, Obvious</h1>
                            <p>Obvious Agency</p>
                        </div>
                    </div>
                </section>
                
                <section className='episodes'>
                    <div className='container'>
                        <div className='episode'>
                            <img src={Ep1} alt='Capa episódio'/>
                            <div className='ep-description'>
                                <h2>#121/ Cansada sim, endividada também, com Amanda dias</h2>
                                <p>22 de nov - 40min 23s</p>
                            </div>
                            <Button
                                className='create-button'
                                bg='#2CD648'
                                color='#ffff'
                                borderRadius='100px'
                                _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                            >
                                Criar agora
                            </Button>
                        </div>
                        <div className='divider'></div>
                        <div className='episode'>
                            <img src={Ep2} alt='Capa episódio'/>
                            <div className='ep-description'>
                                <h2>#120/ Os memes vão salvar a internet ?  com Victoria Chioccarello</h2>
                                <p>15 de nov - 38min 53s</p>
                            </div>
                            <Button
                                className='create-button'
                                bg='#E169AA'
                                color='#ffff'
                                borderRadius='100px'
                                _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                            >
                                Ver kit
                            </Button>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    );
};

export default PodcastEps;
