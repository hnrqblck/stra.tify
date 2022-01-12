import React from 'react';
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useForm, FormProvider } from "react-hook-form";
import { Link } from 'react-router-dom';
import { SearchIcon } from '@chakra-ui/icons'
import { SpotifyIcon } from '../components/CreateIcon';
import { searchShow, fetchMyData } from '../services/requestFunctions';
import SideNavbar from '../components/SideNavbar';
import '../styles/podcasts.scss'
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from '../services/firebase';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

const Podcasts = () => {

    const params = getHashParams();
    const [query, setQuery] = React.useState('');
    const [shows, setShows] = React.useState({});
    const [spotifyData, setSpotifyData] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState([]);

    const {
        handleSubmit,
        register
    } = useForm();

    React.useEffect(() => {
        if (localStorage.getItem("Spotify_Token")) {
            fetchMyData(spotifyWebApi, setSpotifyData);
        }

        readProjectData();
    }, [])

    React.useEffect(() => {
        spotifyWebApi.setAccessToken(localStorage.getItem("Spotify_Token"));
        searchShow(spotifyWebApi, query, setSearchResult);

    }, [query]);

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
            setShows(data);
        })
      };

    const pressEnter = (data) => {
        setQuery('');
        const search = (JSON.stringify(data.searchContent));
        const slicedSearch = search.slice(0, -1);
        setQuery(slicedSearch.slice(1));
    };

    return (
        <div id='podcasts-page'>
            <SideNavbar className='sidenav'/>

            <main>
                <div className='podcasts-head'>
                    <h1>Podcasts</h1>
                    <p>Conecte-se com Spotify e crie debates.</p>
                </div>
                <div className='search-bar'>
                    <FormProvider>
                        <form onSubmit={handleSubmit(pressEnter)}>
                            <InputGroup>
                                <InputLeftElement
                                pointerEvents='none'
                                children={<SearchIcon color='grey' />}
                                />
                                <Input
                                isReadOnly={spotifyData ? false : true}
                                {...register("searchContent")}
                                type='text' placeholder='Busque com Spotify'/>
                            </InputGroup>
                        </form>
                    </FormProvider>
                    {spotifyData.img
                    ? 
                        <img src={spotifyData.img} className='spotify-img'/> 
                    :
                        <a href='https://stratify-spotify.herokuapp.com/'>
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
                    }
                    
                </div>
                <section>
                    <h2>Conversas acontecendo</h2>
                    <div className='podcasts'>
                        {searchResult.length > 0 ? 
                            searchResult.slice(0, 6).map(ep => (
                            <Link to={`/episodios/${ep.id}`} key={ep.id}>
                                <img key={ep.id} src={ep.images[1].url}/>
                            </Link>
                        )) : 
                            Object.entries(shows).map(show => (
                                <Link to={'/episodios/' + show[1].showId} key={show[0]}>
                                    <img src={show[1].cover} alt='Capa podcast' key={show[1].projectId}/>
                                </Link>    
                            ))
                        }
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Podcasts;
