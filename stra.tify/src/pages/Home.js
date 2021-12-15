import React from 'react';
import RoundButton from '../components/RoundButton';
import { ReactComponent as HexagonoColorido } from '../assets/images/hexagono-colorido.svg';
import PodcasterBanner from '../assets/images/podcaster-2.jpg';
import '../styles/home.scss';

const Home = () => {
    return (
        <div id='page-home'>
            <main className='container'>
                <HexagonoColorido className='main-content' />
                <h1 className='main-content'>Se aproxime de quem te entende.</h1>
                <p className='main-content'>Converse e compartilhe com pessoas que escutam o mesmo que você</p>
                <RoundButton class='main-button' text='Junte-se a nós' bgColor='#2CD648' color='#ffff' />
            </main>
            <aside className='container'>
                <img src={PodcasterBanner} alt='Banner podcast'/>
            </aside>
        </div>
    );
};

export default Home;
