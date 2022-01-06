import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { HeadsetIcon } from '../components/CreateIcon';
import { fetchUserData } from '../services/requestFunctions';
import Carousel, { consts } from 'react-elastic-carousel';
import Item from './Item';
import SideNavbar from '../components/SideNavbar';
import '../styles/podcast-home.scss'
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../services/firebase';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];

const myArrow = ({type, onClick, isEdge}) => {
    const pointer = type === consts.PREV ? <ArrowLeftIcon/> : <ArrowRightIcon/>;
    return (
        <Button onClick={onClick} disabled={isEdge} padding='0'>
          {pointer}
        </Button>
    );
};

const PodcastHome = () => {
    const [userData, setUserData] = React.useState({});
    const [shows, setShows] = React.useState({});
    const [randomShow, setRandomShow] = React.useState({});

    React.useEffect(() => {
        fetchUserData(localStorage.getItem("Access_Token"))
            .then(resp => {
                setUserData({
                    name: resp.name,
                })
            });

            readProjectData();
    }, []);

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
            setRandomShow(oneShow);
            setShows(data);
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
                            <Link to={'/episodios/' + randomShow.showId}>  
                                <Button 
                                    className='main-button'
                                    variant='outline'
                                    borderRadius='100px'
                                    borderColor='#EC2390'
                                    color='#EC2390'
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
                            {
                                Object.entries(shows).slice(0, 10).map(show => (
                                    <Link to={'/episodios/' + show[1].showId} key={show[0]}>
                                        <Item key={show[1].showId}><img src={show[1].cover} alt='Capa podcast' key={show[1].projectId}/></Item>
                                    </Link>    
                                ))
                            }
                            </Carousel> 
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PodcastHome;
