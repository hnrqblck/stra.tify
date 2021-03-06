import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import Header from '../components/Header';
import { ReactComponent as HexagonoColorido } from '../assets/images/hexagono-colorido.svg';
import PodcasterBanner from '../assets/images/podcaster-2.jpg';
import '../styles/home.scss';
// import '../styles/responsive.scss';
import Banner from './Banner';
import Podcaster from './Podcaster';
import AboutUs from './AboutUs';

const Home = () => {
    return (
        <>
            <div id='page-home'>
                <Header />
                <main className='container'>
                    <HexagonoColorido className='main-content hidden' />
                    <h1 className='main-content'>Se aproxime de quem te entende.</h1>
                    <p className='main-content'>Converse e compartilhe com pessoas que escutam o mesmo que você</p>
                    
                    <Link to='/login'>
                        <Button 
                            className='main-button'
                            bg='#2CD648'
                            color='#ffff'
                            borderRadius='100px'
                            _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                            >
                            Junte se a nós
                        </Button>
                    </Link>
                    
                </main>
                <aside className='container'>
                    <img src={PodcasterBanner} alt='Banner podcast'/>
                </aside>
            </div>

            <div id='aboutUs'>
                <Banner />
            </div>

            <div id='podcaster'>
                <Podcaster />
            </div>

            <div id='footer'>
                <AboutUs />
            </div>

        </>
    );
};

export default Home;
