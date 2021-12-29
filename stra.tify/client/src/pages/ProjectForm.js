import React from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Radio,
    RadioGroup,
    Textarea,
    Box
  } from '@chakra-ui/react'
import SideNavbar from '../components/SideNavbar';
import { fetchUserData, fetchShow, createProject } from '../services/requestFunctions';
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate} from 'react-router-dom';
import { ReactComponent as BigHex } from '../assets/images/bighex-formcolor.svg';
import { ReactComponent as SmallHex } from '../assets/images/smhex-formcolor.svg';
import '../styles/project-form.scss';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

const ProjectForm = () => {
    const params = useParams();

    const [userData, setUserData] = React.useState({});
    const [createErrors, setCreateErrors] = React.useState("");
    const [color, setColor] = React.useState('rosa');
    const [show, setShow] = React.useState({
        title: '',
        publisher: '',
        episodes: [],
        cover: '',
        description: ''
    });
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
    } = useForm();


    React.useEffect(() => {
        fetchUserData(localStorage.getItem("Access_Token"))
        .then(resp => {
            setUserData({
                name: resp.name,
                userId: resp.id, 
            })
        });

        spotifyWebApi.setAccessToken(localStorage.getItem("Spotify_Token"));
        fetchShow(spotifyWebApi, params.id, setShow);
    }, []);


    const handleCreateProj = (values) => {
        console.log(values.title);
        createProject(localStorage.getItem("Access_Token"), values, userData.userId)
        .then((response) => {
            if (response.data) navigate('/podcast-home')
        })
        .catch((err) => {
            if (err.message === "Request failed with status code 403") {
            setCreateErrors("Não é possível criar a jornada!");
            } else {
            setCreateErrors(err.message);
            }
        });
    }
    


    return (
        <div id='project-form'>
            <SideNavbar className='sidenav'/>

            <div className='main'>

                <section className='above'>
                    <div className='page-top'>
                        <p className='user-greeting'>Olá, {userData.name}</p>
                    </div>
                </section>
                
                <section className='form'>
                    <div className='container'>
                    <h1>Criar Jornada {show.title}</h1>
                        <FormProvider>
                            <form onSubmit={handleSubmit(handleCreateProj)}>
                                <FormControl id='project' className='form-container'>
                                    <div>
                                        <FormLabel>Título</FormLabel>
                                        <Input 
                                            isReadOnly
                                            id='title'
                                            type='text'
                                            value={show.title}
                                            {...register("title")}
                                        />
                                        <FormLabel>Descrição</FormLabel>
                                        <Textarea 
                                            isReadOnly
                                            id='description'
                                            value={show.description.slice(0, 299)}
                                            {...register("description")}
                                        />
                                    </div>
                                    <div className='choose-color'>
                                        <h2>Escolha a cor da jornada</h2>
                                        <BigHex className={`big-hex ${color}`}/>
                                        <span className='color-name'>{color.charAt(0).toLocaleUpperCase() + color.slice(1, 10)}</span>
                                        <RadioGroup onChange={setColor} value={color}>
                                            <Stack spacing={0} direction='row' wrap='wrap' className='colors-picker'>
                                                <Radio 
                                                    value='roxo'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='roxo'/>
                                                </Radio>
                                                <Radio 
                                                    value='azul'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='azul' />
                                                </Radio>
                                                <Radio 
                                                    value='laranja'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='laranja'/>
                                                </Radio>
                                                <Radio
                                                    value='amarelo'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='amarelo'/>
                                                </Radio>
                                                <Radio
                                                    value='magenta'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='magenta'/>
                                                </Radio>
                                                <Radio
                                                    value='verde'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='verde'/>
                                                </Radio>
                                                <Radio
                                                    value='rosa'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='rosa'/>
                                                </Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </div>
                                    </FormControl>
                                    {createErrors && <Box color="#dc0362">{createErrors}</Box>}
                                    <Button
                                        // isLoading={isSubmitting}
                                        className='btn-login'
                                        bg='#2CD648'
                                        color='#ffff'
                                        type='submit'
                                    >
                                        Criar jornada
                                    </Button>
                            </form>
                        </FormProvider>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectForm;
