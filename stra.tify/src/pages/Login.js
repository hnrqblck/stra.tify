import React from 'react';
import Header from '../components/Header';
import {
    Button,
    Modal,
    useDisclosure,
  } from '@chakra-ui/react'

import { ReactComponent as StraLogo } from '../assets/images/strateegiaLogo.svg';
import { ReactComponent as HexBottom } from '../assets/images/hexagono-bottom.svg';
import '../styles/login.scss'
import '../styles/responsive.scss';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const Login = () => {
    const { isOpen: isLoginModalOpen, onOpen: onLoginModalOpen, onClose: onLoginModalClose } = useDisclosure();
    const { isOpen: isRegisterModalOpen, onOpen: onRegisterModalOpen, onClose: onRegisterModalClose } = useDisclosure();
    const initialRef = React.useRef()
    const finalRef = React.useRef()

    return (
        <div id='page-login'>
            <Header inicio='hidden' sobre='hidden' podcaster='hidden' login='hidden'/>
            <section className='container-login center-alignment'>
                <p>Bem-vindo!</p>
                <h1 className='item-login'>Acesse sua conta</h1>

                <Button
                    ref={finalRef}
                    onClick={onLoginModalOpen}
                    className='item-login'
                    leftIcon={<StraLogo />}
                    bg='#EC2390'
                    color='#ffff'
                >
                    Entrar com strateegia
                </Button>
                <Button
                    onClick={onRegisterModalOpen}
                    className='item-login'
                    bg='#C4C4C4'
                    color='#ffff'
                >
                    Cadastrar
                </Button>

                <Modal isOpen={isLoginModalOpen} onClose={onLoginModalClose} size={'xl'} bg='blue'>
                    <LoginModal/>
                </Modal>
                {/* <Modal isOpen={isRegisterModalOpen} onClose={onRegisterModalClose} size={'xl'} bg='blue' initialFocusRef={initialRef} finalFocusRef={finalRef}> */}
                    <RegisterModal isOpen={isRegisterModalOpen} onClose={onRegisterModalClose} initialFocusRef={initialRef} finalFocusRef={finalRef}/>
                {/* </Modal> */}
            </section>
            <div className='hex-div'>
                <HexBottom className='hex-bottom'/>
            </div>
        </div>
    );
};

export default Login;
