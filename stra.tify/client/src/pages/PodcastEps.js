import React from 'react';
import { Button } from '@chakra-ui/react';
import { fetchUserData, fetchShow } from '../services/requestFunctions';
import SideNavbar from '../components/SideNavbar';
import '../styles/episodes.scss'
import { useParams, Link} from 'react-router-dom';
// import { readProjectData } from '../services/firebase';
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../services/firebase';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

const PodcastEps = () => {
    const params = useParams();

    const [userData, setUserData] = React.useState({});
    const [showDb, setShowDb] = React.useState(false);
    const [show, setShow] = React.useState({
        title: '',
        publisher: '',
        episodes: [],
        cover: ''
    });

    React.useEffect(() => {
        fetchUserData(localStorage.getItem("Access_Token"))
        .then(resp => {
            setUserData({
                name: resp.name,
            })
        });

        spotifyWebApi.setAccessToken(localStorage.getItem("Spotify_Token"));
        fetchShow(spotifyWebApi, params.id, setShow);

        readProjectData(params.id);
    }, []);
    
    
    function msToHMS(ms) {
        const hms = new Date(ms).toISOString().slice(11,19);
        return hms;
    }

    function reformatDate(dateStr)
    {
        const dArr = dateStr.split("-"); 
        return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0].substring(2);
    }

    function readProjectData(spotifyId) {
        const db = getDatabase(app);
        const readProjectRef = ref(db, 'projects/' + spotifyId);
        onValue(readProjectRef, (snapshot) => {
          const data = snapshot.val();
          console.log(data)
          if (data !== null) setShowDb(true);
        })
        // console.log(showDb)
      };


    return (
        <div id='podcast-home--page'>
            <SideNavbar className='sidenav'/>

            <div className='main'>

                <section className='podcast'>
                    <div className='page-top'>
                    <p className='user-greeting'>Olá, {userData.name}</p>
                    </div>
                    
                    <div className='container'>
                        <div className='pod-img'>
                            <img src={show.cover} alt='Capa podcast'/>
                        </div>
                        <div className='podcast-details'>
                            <p>Podcast</p>
                            <h1>{show.title}</h1>
                            <p>{show.publisher}</p>
                            {showDb ? '' :
                                <Link to={`/create-project/${params.id}`}>
                                <Button
                                    className='create-button'
                                    bg='#2CD648'
                                    color='#ffff'
                                    borderRadius='100px'
                                    _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                                >
                                    Criar jornada
                                </Button>
                            </Link> }
                            
                        </div>
                    </div>
                </section>
                
                <section className='episodes'>
                    <div className='container'>
                        {
                            show.episodes.slice(0, 10).map(episode => (
                                <div key={episode.id}>
                                    <div className='episode'>
                                        <img src={episode.images[0].url} />
                                        <div className='ep-description'>
                                            <h2>{episode.name}</h2>
                                            <p>{reformatDate(episode.release_date)} - { msToHMS(episode.duration_ms) }</p>
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
                                    <div className='divider'></div>
                                </div>
                            ))
                        }       

                    </div>

                </section>
            </div>
        </div>
    );
};

export default PodcastEps;
