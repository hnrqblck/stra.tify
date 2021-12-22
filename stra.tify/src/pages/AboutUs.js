import React from 'react';
import Lightbulb from '../assets/images/lightbulb.png';
import SpeechBalloon from '../assets/images/balloons.png';
import ThumbsUp from '../assets/images/thumbsUp.png';
import '../styles/about-us.scss';

const AboutUs = () => {
    return (
        <div id='about-us'>
            <h1>Pensamos em um espaço perfeito para você.</h1>
            <p className='description'>Stra.tify é uma plataforma que une os ouvintes e os Podcaster  num ambiente só.</p>
            <section className='cards'>
                <div>
                    <img src={Lightbulb} alt='Lâmpada'/>
                    <p>Dê a sua sugestão para os podcaster</p>
                </div>
                <div>
                    <img src={SpeechBalloon} alt='Balões de conversação'/>
                    <p>Comente com outros ouvintes</p>
                </div>
                <div>
                    <img src={ThumbsUp} alt='Mão com o polegar para cima'/>
                    <p>Indique algo extraordinário</p>
                </div>

            </section>

        </div>
    )
}

export default AboutUs;
