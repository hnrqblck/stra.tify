import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { ReactComponent as HexPodcaster } from '../assets/images/hex-podcaster.svg';
import '../styles/podcaster.scss';
import '../styles/responsive.scss';

const Podcaster = () => {
    return (
        <div id='podcaster'>
            <main className='container'>
                <p>Dicas de Sucesso</p>
                <h1>Ei, Podcaster !</h1>
                <p>O stra.tify irá te guiar para o strateegia, será uma experiência incrível de te aproximar aos ouvintes. Faça seu cadastro com o  e-mail do Podcast.</p>
                <Link to='/login'>
                    <Button 
                        className='main-button'
                        bg='#2CD648'
                        color='#ffff'
                        borderRadius='100px'
                        _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                        >
                        Acessar agora
                    </Button>
                </Link>
            </main>
            <aside className='container'>
                <HexPodcaster />
            </aside>
        </div>
    );
};

export default Podcaster;
