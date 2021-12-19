import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react'
import { AuthContext } from './providers/auth';
import { authenticate } from '../services/requestFunctions';
// import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { ReactComponent as StraLogo2 } from '../assets/images/s-1.svg';

const LoginModal = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <>
        <ModalOverlay/>
            <ModalContent className='modal-login'>
                <ModalHeader className='modal-header'>
                    <StraLogo2/>
                    <span>strateegia</span>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id='login'>
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
                        <br/>
                        <Link className='forget-password' to="/">Esqueci minha senha</Link>
                        <br/>
                        <Button
                            className='btn-login'
                            bg='#EC2390'
                            color='#ffff'
                        >
                            Entrar
                        </Button>
                    </FormControl>
                </ModalBody>

            
            </ModalContent>
        </>
    )
}

export default LoginModal;
