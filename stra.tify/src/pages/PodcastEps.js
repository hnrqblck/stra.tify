import React from 'react';
import { Button } from '@chakra-ui/react';
import { SpotifyIcon } from '../components/CreateIcon';
import { fetchUserData, fetchShow } from '../services/requestFunctions';
import SideNavbar from '../components/SideNavbar';
import '../styles/episodes.scss'
import { useParams, Link} from 'react-router-dom';
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../services/firebase';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

const PodcastEps = () => {
    const params = useParams();

    const [userData, setUserData] = React.useState({});
    const [showDb, setShowDb] = React.useState(false);
    const [readShow, setReadShow] = React.useState({});
    const [show, setShow] = React.useState({
        title: '',
        publisher: '',
        episodes: [],
        cover: ''
    });
    const date = new Date;
    const today = date.toLocaleDateString();

    React.useEffect(() => {
        fetchUserData(localStorage.getItem("Access_Token"))
        .then(resp => {
            setUserData({
                name: resp.name,
                userId: resp.id
            })
        });

        
        spotifyWebApi.setAccessToken(localStorage.getItem("Spotify_Token"));
        fetchShow(spotifyWebApi, params.id, setShow);
        
        readProjectData(params.id);

        // if(spotifyWebApi && showDb && readShow.createdAt !== today) {

        // }
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
          if (data !== null) setShowDb(true);
          setReadShow(data);
        })
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
                            <img src={ showDb ? readShow.cover : show.cover } alt='Capa podcast'/>
                        </div>
                        <div className='podcast-details'>
                            <p>Podcast</p>
                            <h1>{ showDb ? readShow.title : show.title}</h1>
                            {/* <p>{ showDb ? readShow.publisher : show.publisher}</p> */}
                            <p>{showDb ? 'Faça parte de um grupo de discussão. Se aproxime de quem te entende.' : 'Crie um espaço para discussão. Se aproxime de quem te entende.'}</p>
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
                            (showDb ? readShow : show).episodes.map((episode, index) => (
                                
                                <div key={episode.id}>
                                    <div className='episode'>
                                        <div className='img-desc'>
                                            <img src={episode.images[0].url} />
                                            <div className='ep-description'>
                                                <h2>{episode.name}</h2>
                                                <p>{reformatDate(episode.release_date)} - { msToHMS(episode.duration_ms) }</p>
                                            </div>
                                        </div>
                                        <div>
                                            <a href={episode.external_urls.spotify} target='_blank'>
                                                <Button
                                                    className='spotify-button'
                                                    leftIcon={<SpotifyIcon />}
                                                    bg='#363333'
                                                    color='#ffff'
                                                    borderRadius='100px'
                                                    _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                                                    >
                                                    Ouvir ep
                                                </Button>
                                            </a>
                                            {
                                                (showDb ? 
                                                    episode.isCreated  ? 
                                                    <a href={`https://app.strateegia.digital/journey/${readShow.projectId}/map/${readShow.map}/point/${episode.pointId}`} target='_blank'>
                                                        <Button
                                                            className='create-button'
                                                            bg='#DD76AC'
                                                            color='#ffff'
                                                            borderRadius='100px'
                                                            _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                                                        >
                                                            Participar
                                                        </Button>
                                                    </a> : 
                                                    readShow.createdBy === userData.userId ?
                                                    <Link to={`/create-kit/${readShow.showId}/${index} `}>
                                                        <Button
                                                            className='create-button'
                                                            bg='#2CD648'
                                                            color='#ffff'
                                                            borderRadius='100px'
                                                            _hover={{ boxShadow: '0 2px 2px rgba(0, 0, 0, .30)', transition: '200ms ease' }}
                                                        >
                                                            Criar agora
                                                        </Button>
                                                    </Link>
                                                    : ''
                                                    : '')
                                            }
                                        </div>
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
