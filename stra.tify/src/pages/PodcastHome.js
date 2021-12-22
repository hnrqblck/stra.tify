import React from 'react';
import { Button } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { HeadsetIcon } from '../components/CreateIcon';
import BomDia from '../assets/images/bomdia.png';
import Mamilos from '../assets/images/mamilos.png';
import ManoAMano from '../assets/images/manoamano.png';
import NaoIviabilize from '../assets/images/nao-inviabilize.png';
import Carousel, { consts } from 'react-elastic-carousel';
import Item from './Item';
import SideNavbar from '../components/SideNavbar';
import '../styles/podcast.scss'

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
]

const myArrow = ({type, onClick, isEdge}) => {
    const pointer = type === consts.PREV ? <ArrowLeftIcon/> : <ArrowRightIcon/>;
    return (
        <Button onClick={onClick} disabled={isEdge} padding='0'>
          {pointer}
        </Button>
    );
}

const PodcastHome = () => {

    return (
        <div id='podcast-home--page'>
            <SideNavbar className='sidenav'/>

            <div className='main'>

                <section className='podcast'>
                    <p className='user-greeting'>Olá, nome user.</p>
                    <div className='container'>
                        <div className='main-img'>
                            <img src={BomDia} alt='Capa podcast'/>
                        </div>
                        <div className='podcast-details'>
                            <p>Podcast</p>
                            <h1>Bom dia, Obvious</h1>
                            <p>Entre agora na jornada e discuta os episódios</p>
                            <Button 
                                className='main-button'
                                bg='#EC2390'
                                color='#ffff'
                                borderRadius='100px'
                                _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                                >
                                Junte se a nós
                            </Button>
                        </div>
                    </div>
                </section>
                
                <section className='podcasts-recentes'>
                    <div className='podcasts-recentes--title'>
                        <HeadsetIcon boxSize={30}/>
                        <h2>Podcasts Recentes</h2>
                    </div>
                    <div className='container'>
                        <div>
                            <Carousel breakPoints={breakPoints}  enableMouseSwipe enableSwipe renderArrow={myArrow}>
                                <Item><img src={Mamilos} alt='Capa podcast'/></Item>
                                <Item><img src={ManoAMano} alt='Capa podcast'/></Item>
                                <Item><img src={NaoIviabilize} alt='Capa podcast'/></Item>
                            </Carousel>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PodcastHome;
