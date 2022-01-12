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
    Select,
    Box,
    useToast
  } from '@chakra-ui/react'
import SideNavbar from '../components/SideNavbar';
import { fetchUserData, createKit, createDivPoint } from '../services/requestFunctions';
import { useForm, FormProvider } from "react-hook-form";
import { useParams, useNavigate} from 'react-router-dom';
import { ReactComponent as BigHex } from '../assets/images/bighex-formcolor.svg';
import { ReactComponent as SmallHex } from '../assets/images/smhex-formcolor.svg';
import '../styles/kit-form.scss';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { app } from '../services/firebase';

const KitForm = () => {
    const { showId, epId } = useParams();
    const [userData, setUserData] = React.useState({});
    const [createErrors, setCreateErrors] = React.useState("");
    const [color, setColor] = React.useState('rosa');
    const [show, setShow] = React.useState({});
    const [episode, setEpisode] = React.useState({});
    const [epImage, setEpImage] = React.useState('');
    const tags = ['O que achou deste episódio?', 'O que você gostaria de ouvir nos próximos encontros?', 'O que você gostaria de indicar?'];
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        setValue, 
    } = useForm();
    const toast = useToast();

    React.useEffect(() => {
        fetchUserData(localStorage.getItem("Access_Token"))
        .then(resp => {
            setUserData({
                name: resp.name,
                userId: resp.id, 
            })
        });
        readProjectData(showId, epId);
    }, []);
    
    function readProjectData(spotifyId, epId) {
        const db = getDatabase(app);
        const readProjectRef = ref(db, 'projects/' + spotifyId);
        onValue(readProjectRef, (snapshot) => {
          const data = snapshot.val();
          setShow(data);
        })
        const readEpRef = ref(db, 'projects/' + spotifyId + '/episodes/' + epId);
        onValue(readEpRef, (snapshot) => {
          const data = snapshot.val();
          setEpisode(data);
          setEpImage(data.images[0].url)
        })
     }

     function updateProjectData(spotifyId, col, row) {
        const db = getDatabase();
        update(ref(db, 'projects/' + spotifyId ), {
            kitsPosition: {
                col: col,
                row: row,
            }
        });
    }

     function updateEpData(spotifyId, epId, pointId) {
        const db = getDatabase();
        update(ref(db, 'projects/' + spotifyId + '/episodes/' + epId), {
            isCreated: true,
            pointId: pointId, 
        });
    }

    async function handleCreateKit (values) {
        const data = await createKit(localStorage.getItem("Access_Token"), values, episode.name, episode.external_urls.spotify)
        .then((response) => {
            if (response.data) navigate(`/episodios/${showId}`);
            createDivPoint(localStorage.getItem("Access_Token"), show.map, show.kitsPosition.col, show.kitsPosition.row, response.data.id)
            .then(resp => {
                updateEpData(showId, epId, resp.data.id);
                let col = show.kitsPosition.col;
                let row = show.kitsPosition.row;
                if (row < 4) {
                    row = row + 1;
                } else {
                    row = 0;
                    col = col + 1;
                }
                updateProjectData(showId, col, row)
            });
            toast({
                title: 'Projeto criado!',
                description: 'criado com sucesso.',
                status: 'success',
                duration: 5000,
                isClosable: true.valueOf,
            }); 
        })
        .catch((err) => {
            if (err.message === "Request failed with status code 403") {
                setCreateErrors("Não é possível criar o kit!");
            } else {
                setCreateErrors(err.message);
            }
        });
    }
    
    return (
        <div id='kit-form'>
            <SideNavbar className='sidenav'/>
            <div className='main'>

                <section className='above'>
                    <div className='page-top'>
                        <p className='user-greeting'>Olá, {userData.name}</p>
                    </div>
                </section>

                <section className='details-header'>
                    <FormProvider>
                        <form className='details-form'>
                            <div className='podcast'>
                                <FormLabel>Podcast</FormLabel>
                                <Select placeholder={show.title}></Select>
                            </div>
                            <div className='episode'>
                                <FormLabel>Episódio</FormLabel>
                                <Select placeholder={episode.name}>
                                    {/* {
                                        show.episodes.map((episode, index) => (
                                            <option value={index}>{episode.name}</option>
                                        ))
                                    } */}
                                </Select>
                            </div>
                        </form>
                    </FormProvider>
                    <div className='mini-banner'>
                        <img src={epImage}/>
                        <div className='text'>
                            <h2>{episode.name}</h2>
                            <p>{show.title}</p>
                        </div>
                    </div>
                </section>
                
                <section className='form'>
                    <div className='container'>
                        <FormProvider>
                            <form onSubmit={handleSubmit(handleCreateKit)}>
                                <FormControl id='project'>
                                <div className='form-container'>
                                    <div>
                                        <FormLabel>Título</FormLabel>
                                        <Input 
                                            isReadOnly
                                            id='title'
                                            type='text'
                                            value={episode.name}
                                            {...register("title")}
                                        />
                                        <FormLabel>Descrição</FormLabel>
                                        <Textarea 
                                            isReadOnly
                                            id='description'
                                            value={episode.description}
                                            {...register("description")}
                                        />
                                        <FormLabel>Questões</FormLabel>
                                        <div className='questions'>
                                            {tags.map(tag => <div className='tags'>{tag}</div>)}
                                        </div>
                                    </div>
                                    <div className='choose-color'>
                                        <h2>Escolha a cor do kit</h2>
                                        <BigHex className={`big-hex ${color}`}/>
                                        <RadioGroup onChange={setColor} value={color}>
                                            <Stack spacing={0} direction='row' wrap='wrap' className='colors-picker'>
                                                <Radio 
                                                    value='PURPLE'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='PURPLE'/>
                                                </Radio>
                                                <Radio 
                                                    value='BLUE'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='BLUE' />
                                                </Radio>
                                                <Radio 
                                                    value='ORANGE'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='ORANGE'/>
                                                </Radio>
                                                <Radio
                                                    value='YELLOW'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='YELLOW'/>
                                                </Radio>
                                                <Radio
                                                    value='MAGENTA'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='MAGENTA'/>
                                                </Radio>
                                                <Radio
                                                    value='TEAL'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='TEAL'/>
                                                </Radio>
                                                <Radio
                                                    value='PINK'
                                                    {...register("color", {
                                                        required: "campo obrigatório *",
                                                    })}
                                                >
                                                    <SmallHex className='PINK'/>
                                                </Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </div>
                                    </div>
                                    </FormControl>
                                    {createErrors && <Box color="#dc0362">{createErrors}</Box>}
                                    <Button
                                        onClick={() => {
                                            setValue('title', episode.name, {
                                                shouldTouch: false,
                                            });
                                            setValue('description', episode.description.slice(1, 999), {
                                                shouldTouch: false,
                                            });
                                            
                                        }}
                                        className='btn-login'
                                        bg='#2CD648'
                                        color='#ffff'
                                        type='submit'
                                    >
                                        Criar
                                    </Button>
                            </form>
                        </FormProvider>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default KitForm;
