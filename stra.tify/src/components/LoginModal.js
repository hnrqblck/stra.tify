import React from 'react';
import {
    Box,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement
  } from '@chakra-ui/react'
import { AuthContext } from './providers/auth';
import { authenticate } from '../services/requestFunctions';
import { useForm } from "react-hook-form";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { ReactComponent as StraLogo2 } from '../assets/images/s-1.svg';

const LoginModal = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const [loginErrors, setLoginErrors] = React.useState("");
    const auth = React.useContext(AuthContext);
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleLogin = (values) => {
        authenticate(values)
        .then((response) => {
            if (response.data) {
            auth.setApiToken(response.data.access_token);
            auth.setSession(response.data.access_token);
            navigate.push("/login");
            console.log(response.data)
            }
        })
        .catch((err) => {
            if (err.message === "Request failed with status code 403") {
            setLoginErrors("Acesso negado: email ou senha inválidos!");
            } else {
            setLoginErrors(err.message);
            }
        });
    };

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
                    {auth.isAuthenticated && <Navigate to="/podcast-home" />}
                    {!auth.isAuthenticated && (
                        <FormControl id='login' onSubmit={handleSubmit(handleLogin)}>
                            <FormLabel>E-mail</FormLabel>
                            <Input 
                                id='email'
                                type='email'
                                placeholder='email'
                                {...register("email", {
                                    required: "campo obrigatório *",
                                })}
                            />
                            <FormLabel>Senha</FormLabel>
                            <FormErrorMessage color="#dc0362">
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    id='password'
                                    type={show ? 'text' : 'password'}
                                    placeholder='*********'
                                    {...register("password", {
                                        required: "campo obrigatório *",
                                    })}
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
                            <FormErrorMessage color="#dc0362">
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                            <br/>
                            <Link className='forget-password' to="/">Esqueci minha senha</Link>
                            <br/>
                            </FormControl>
                        )}
                        {loginErrors && <Box color="#dc0362">{loginErrors}</Box>}
                            <Button
                                isLoading={isSubmitting}
                                className='btn-login'
                                bg='#EC2390'
                                color='#ffff'
                                type='submit'
                            >
                                Entrar
                            </Button>
                </ModalBody>

            
            </ModalContent>
        </>
    )
}

export default LoginModal;
