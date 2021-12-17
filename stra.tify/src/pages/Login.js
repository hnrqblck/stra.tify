import React from 'react';
import Header from '../components/Header';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { ReactComponent as StraLogo } from '../assets/images/strateegiaLogo.svg';
import '../styles/login.scss'

const Login = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <div id='page-login'>
            <Header inicio='hidden' sobre='hidden' podcaster='hidden' login='hidden'/>
            <section className='container-login center-alignment'>
                <p>Bem-vindo!</p>
                <h1 className='item-login'>Acesse sua conta</h1>

                <Button
                    onClick={onOpen}
                    className='item-login'
                    leftIcon={<StraLogo />}
                    bg='#EC2390'
                    color='#ffff'
                >
                    Entrar com strateegia
                </Button>

                <Modal isOpen={isOpen} onClose={onClose} size={'xl'} bg='blue'>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>
                        <StraLogo/> strateegia
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <FormControl id='email'>
                        <FormLabel>E-mail</FormLabel>
                        <Input 
                            type='email'
                            placeholder='example@strateegia.com'
                        />
                        <FormLabel>Senha</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='*********'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {(show)
                                    ? <ViewIcon/>
                                    : <ViewOffIcon/>
                                }
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    </ModalBody>

                    
                    </ModalContent>
                </Modal>

                <Button
                    className='item-login'
                    bg='#C4C4C4'
                    color='#ffff'
                >
                    Cadastrar</Button>
            </section>
        </div>
    );
};

export default Login;
