import React from 'react';
import { LinkedinIcon } from '../components/CreateIcon';
import '../styles/about-us.scss';
import '../styles/responsive.scss';

const AboutUs = () => {
    return (
        <div id='page--about-us'>
            <section className='container'>
                <div className='about-us'>
                    <h1>Sobre nós</h1>
                    <p>O stra.tify foi fundado no ano de 2021 em Recife. Desenvolvido por Henrique Balck juntamente com Letícia Siqueira.</p>
                </div>
                <div className='contact'>
                        <h1>Contato</h1>
                    <div>
                        <LinkedinIcon boxsixe={24}/>
                        <a href='https://www.linkedin.com/in/henrique-black/' target='_blank'>/in/henrique-black/</a>
                    </div>
                    <div>
                        <LinkedinIcon boxsixe={24}/>
                        <a href='https://www.linkedin.com/in/let%C3%ADcia-siqueira-/' target='_blank'>/in/letícia-siqueira-/</a>
                    </div>
                </div>
                <div className='questions'>
                    <h1>Alguma dúvida?</h1>
                    <p>support@strateegia.digital</p>
                </div>

            </section>
            <p className='rights'>2021 Stra.tify - Todos os direitos reservados</p>
        </div>
    );
};

export default AboutUs;
