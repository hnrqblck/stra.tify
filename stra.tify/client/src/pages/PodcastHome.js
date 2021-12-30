import React, { useState} from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { HeadsetIcon, SpotifyIcon } from '../components/CreateIcon';
import { fetchUserData, fetchMyData, fetchSavedShows } from '../services/requestFunctions';
import BomDia from '../assets/images/bomdia.png';
import Mamilos from '../assets/images/mamilos.png';
import ManoAMano from '../assets/images/manoamano.png';
import NaoIviabilize from '../assets/images/nao-inviabilize.png';
import Carousel, { consts } from 'react-elastic-carousel';
import Item from './Item';
import SideNavbar from '../components/SideNavbar';
import '../styles/podcast-home.scss'
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../services/firebase';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

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
    
    const params = getHashParams();
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [spotifyData, setSpotifyData] = useState({});
    const [lastShow, setLastShow] = useState({});
    const [randomShow, setRandomShow] = useState({});

    React.useEffect(() => {
        fetchUserData(localStorage.getItem("Access_Token"))
            .then(resp => {
                setUserData({
                    name: resp.name,
                })
            });
        

        if (localStorage.getItem("Spotify_Token")) {
            // setLoggedIn(true);
            fetchMyData(spotifyWebApi, setSpotifyData);
            fetchSavedShows(spotifyWebApi, setLastShow);
        }

        readProjectData();
        console.log(randomShow);
    }, []);
    
    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    if (params.access_token !== undefined) {
        localStorage.setItem("Spotify_Token", params.access_token);
        spotifyWebApi.setAccessToken(localStorage.getItem("Spotify_Token"));
    };

    function readProjectData() {
        const db = getDatabase(app);
        const readProjectRef = ref(db, 'projects/');
        onValue(readProjectRef, (snapshot) => {
            const data = snapshot.val();
            const arr = [];
            for (const show in data) {
                arr.push(show);
            }
            const rnd = arr[randomNumber(0, arr.length)];
            const oneShow = data[rnd];
            // setRandomShow(oneShow);
            setRandomShow({spotifyId: rnd, ...oneShow});
        })
      };

      function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    } 
    
    
    
    return (
        <div id='podcast-home--page'>
            <SideNavbar className='sidenav'/>

            <div className='main'>

                <section className='podcast'>
                    <div className='page-top'>
                        <a href='http://localhost:8888/' className={(loggedIn ? 'hidden' : '')}>
                            <Button
                                className='spotify-button'
                                leftIcon={<SpotifyIcon />}
                                bg='#363333'
                                color='#ffff'
                                borderRadius='100px'
                                _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                                >
                                Entre com Spotify
                            </Button>
                        </a>
                        <img src={spotifyData.img} className='spotify-img'/>
                        <p className='user-greeting'>Olá, {userData.name}</p>
                    </div>
                    
                    <div className='container'>
                        <div >
                            <img src={randomShow.cover} alt={`Capa ${randomShow.title}`} className='main-img'/>
                        </div>
                        <div className='podcast-details'>
                            <p>Podcast</p>
                            <h1>{randomShow.title}</h1>
                            <p>Entre agora na jornada e discuta os episódios</p>
                            <Link to={'/episodios/' + randomShow.spotifyId}>  
                                <Button 
                                    className='main-button'
                                    bg='#C4C4C4'
                                    color='#ffff'
                                    borderRadius='100px'
                                    _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                                    >
                                    Ver episódios
                                </Button>
                            </Link>
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
                                <Item><img src={BomDia} alt='Capa podcast'/></Item>
                            </Carousel>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PodcastHome;
