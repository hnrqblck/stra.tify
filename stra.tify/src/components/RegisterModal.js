import React from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Checkbox
  } from '@chakra-ui/react'
import { ReactComponent as StraLogo2 } from '../assets/images/s-1.svg';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

const RegisterModal = () => {
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
                    <FormControl id='register'>
                        <FormLabel>Nome</FormLabel>
                        <Input 
                            type='text'
                            placeholder='Nome completo'
                        />
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
                        <Checkbox defaultIsChecked>Li e aceito os termos de uso</Checkbox>
                        <br/>
                        <Button
                            className='btn-login'
                            bg='#EC2390'
                            color='#ffff'
                        >
                            Cadastrar
                        </Button>
                    </FormControl>
                </ModalBody>

            
            </ModalContent>
        </>
    )
}

export default RegisterModal;
