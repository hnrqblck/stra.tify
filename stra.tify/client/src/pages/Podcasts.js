import React from 'react';
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useForm, FormProvider } from "react-hook-form";
import { SearchIcon } from '@chakra-ui/icons'
import { searchShow } from '../services/requestFunctions';
import SideNavbar from '../components/SideNavbar';
import BomDia from '../assets/images/bomdia.png';
import Mamilos from '../assets/images/mamilos.png';
import ManoAMano from '../assets/images/manoamano.png';
import NaoIviabilize from '../assets/images/nao-inviabilize.png';
import '../styles/podcasts.scss'
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

const Podcasts = () => {

    const [query, setQuery] = React.useState('');
    const [searchResult, setSearchResult] = React.useState([]);

    const {
        handleSubmit,
        register
    } = useForm();

    React.useEffect(() => {
        spotifyWebApi.setAccessToken(localStorage.getItem("Spotify_Token"));
        searchShow(spotifyWebApi, query , ["show"], setSearchResult);

        // if (localStorage.getItem("Spotify_Token")) {
        //     searchShow(spotifyWebApi, "Bom dia obvious" , ["show"] );
        // }
    }, [query]);

    const pressEnter = (data) => {
        setQuery('');
        const search = (JSON.stringify(data.searchContent));
        const slicedSearch = search.slice(0, -1);
        setQuery(slicedSearch.slice(1));
    }

  
    console.log(query);
    console.log(searchResult);

    return (
        <div id='podcasts-page'>
            <SideNavbar className='sidenav'/>

            <main>
                <h1>Podcasts</h1>
                <FormProvider>
                    <form onSubmit={handleSubmit(pressEnter)}>
                        <InputGroup>
                        {/* <button type='submit'> */}
                            <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='grey' />}
                            />
                        {/* </button> */}
                            <Input
                            //  onKeyUp={(event) => pressEnter(event)} 
                            {...register("searchContent")}
                             type='text' placeholder='Buscar por título'/>
                        </InputGroup>
                    </form>
                </FormProvider>
                <section className='podcasts'>
                    {
                        searchResult.map(ep => (
                            <img key={ep.id} src={ep.images[1].url}/>
                        ))
                    }
                </section>
            </main>
        </div>
    );
};

export default Podcasts;
