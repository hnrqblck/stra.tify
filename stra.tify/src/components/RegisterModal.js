import React from 'react';
import {
    Box,
    Button,
    Modal,
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
    InputRightElement,
    Checkbox,
    useDisclosure, 
    useToast
  } from '@chakra-ui/react'
import { signUp } from '../services/requestFunctions';
import { useNavigate, Navigate } from 'react-router-dom';
import { ReactComponent as StraLogo2 } from '../assets/images/s-1.svg';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { FormProvider, useForm } from 'react-hook-form';

const RegisterModal = (props) => {
    
    const { onClose }  = useDisclosure();
    const [show, setShow] = React.useState(false);
    const [loginErrors, setLoginErrors] = React.useState("");
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const toast = useToast();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const handleRegister = (values) => {
        signUp(values)
        .then((response) => {
            if (response.data) {
                onClose(props.onClose)
                toast({
                    title: 'Cadastro realizado!',
                    description: 'Seu cadastro foi realizado com sucesso.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true.valueOf,
                })
            }
        })
        .catch((err) => {
            if (err.message === "Request failed with status code 403") {
                toast({
                    title: 'Acesso negado:',
                    description: ' email ou senha inválidos!',
                    status: 'error',
                    duration: 5000,
                    isClosable: true.valueOf,
                })
                setLoginErrors("Acesso negado: email ou senha inválidos!");
            } else if (err.message === "Request failed with status code 409"){
                toast({
                    title: 'Acesso negado:',
                    description: 'email já cadastrado!',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true.valueOf,
                })
                setLoginErrors("Acesso negado: email já cadastrado!");
            } else {
                toast({
                    title: 'Acesso negado:',
                    description: err.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true.valueOf,
                })
                setLoginErrors(err.message);
            }
        });
    };

    return (
        <>
        <Modal isOpen={props.isOpen} onClose={props.onClose} size={'xl'} bg='blue' initialFocusRef={props.initialFocusRef} finalFocusRef={props.finalFocusRef}>
            <ModalOverlay/>
                <ModalContent className='modal-login'>
                    <ModalHeader className='modal-header'>
                        <StraLogo2/>
                        <span>strateegia</span>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormProvider>
                            <form onSubmit={handleSubmit(handleRegister)}>
                                <FormControl id='register'>
                                    <FormLabel>Nome</FormLabel>
                                    <Input 
                                        id='name'
                                        type='text'
                                        placeholder='Nome completo'
                                        {...register("name", {
                                            required: "campo obrigatório *",
                                        })}
                                    />
                                    <FormLabel>E-mail</FormLabel>
                                    <Input 
                                        id='email'
                                        type='email'
                                        placeholder='example@strateegia.com'
                                        {...register("email", {
                                            required: "campo obrigatório *",
                                        })}
                                    />
                                    <FormErrorMessage color="#dc0362">
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                    <FormLabel>Senha</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            id='password'
                                            pr='4.5rem'
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
                                    <FormLabel>Confirmar a senha</FormLabel>
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
                                    <Checkbox 
                                        id='terms'
                                        defaultIsChecked
                                        {...register("terms", {
                                            required: "campo obrigatório *",
                                        })}
                                    >
                                        Li e aceito os termos de uso
                                    </Checkbox>
                                    <br/>
                                    {loginErrors && <Box color="#dc0362">{loginErrors}</Box>}
                                    <Button
                                        onClick={props.onClose}
                                        className='btn-login'
                                        bg='#EC2390'
                                        color='#ffff'
                                        type='submit'
                                    >
                                        Cadastrar
                                    </Button>
                                </FormControl>
                            </form>
                        </FormProvider>
                    </ModalBody>

                
                </ModalContent>
            </Modal>
        </>
    )
}

export default RegisterModal;
